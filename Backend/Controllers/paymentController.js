import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Payment Intent Creation
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, email, mobile, items } = req.body;
        
        // Validate amount exists and is a number
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        // Convert amount to paise and validate minimum
        const amountInPaise = Math.round(amount);
        const minimumAmount = 5000; // ₹50.00 (5000 paise)
        
        if (amountInPaise < minimumAmount) {
            return res.status(400).json({
                error: "Amount too small",
                details: `Minimum payment is ₹50.00 (received ₹${amount/100})`
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPaise,
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
            metadata: {
                email,
                mobile,
                items: JSON.stringify(items)
            }
        });

        res.status(200).json({ 
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error("Payment intent error:", error);
        res.status(500).json({ 
            error: "Payment processing failed",
            details: error.message 
        });
    }
};

// Webhook Handler for sending emails
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            await sendReceiptEmail(paymentIntent);
            break;
        case 'payment_intent.payment_failed':
            const failedIntent = event.data.object;
            console.log('Payment failed:', failedIntent.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};

// Email sending function
const sendReceiptEmail = async (paymentIntent) => {
    try {
        const { email, items } = paymentIntent.metadata;
        const parsedItems = JSON.parse(items);
        const totalAmount = paymentIntent.amount / 100;
        
        // Create HTML for the email
        const itemsHtml = parsedItems.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.price * item.quantity}</td>
            </tr>
        `).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Payment Receipt',
            html: `
                <h1>Thank you for your payment!</h1>
                <p>Your payment of ₹${totalAmount} was successful.</p>
                <p>Transaction ID: ${paymentIntent.id}</p>
                
                <h2>Order Details</h2>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" align="right"><strong>Total:</strong></td>
                            <td><strong>₹${totalAmount}</strong></td>
                        </tr>
                    </tfoot>
                </table>
                
                <p>If you have any questions, please contact our support team.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Receipt email sent to:', email);
    } catch (error) {
        console.error('Error sending receipt email:', error);
    }
};