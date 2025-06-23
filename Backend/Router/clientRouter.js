const express = require('express');
const getItemsByCategory = require('../Controllers/clientController');
const Stripe = require('stripe');
const dotenv = require('dotenv');
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

const clientRoute = express.Router();

// 👇 Customer fetches food items
clientRoute.get('/items/:category', getItemsByCategory);

// 👇 Payment Intent creation
clientRoute.post('/create-payment-intent', async (req, res) => {
  const { amount, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount), // Amount in paise
      currency: 'inr',
      receipt_email: email,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe PaymentIntent error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 👇 Order confirmation email sending
clientRoute.post('/send-email', async (req, res) => {
  const { email, orderId } = req.body;

  // TODO: Add actual email logic using nodemailer or SendGrid
  console.log(`📧 Sending confirmation email to ${email} for Order ID: ${orderId}`);
  res.send({ success: true, message: `Confirmation email sent to ${email}` });
});

module.exports = clientRoute;



