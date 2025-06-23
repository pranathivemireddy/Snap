import { useState } from "react";
import { useNavigate, useLocation,Link} from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaHome } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_51RP0qvR2xnlM6CS3V2N2eVLbDlSl4DQBdCnmWu9Gt3kxOpsKUujHyzRqsAXFEH6GSJ5FUj0VTcjgc4jdlnmYy2rA00CZmgURoh");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const amount = localStorage.getItem("paymentAmount") || 
    cartItems.reduce((sum, item) => sum + item.cuisinePrice * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
          toast.error("Payment system not ready. Please try again.");
          return;
        }
      
        setIsProcessing(true);
        setError(null);
      
        try {
          const response = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amount * 100,
              email, // Make sure email is included
              mobile,
              items: cartItems.map(item => ({
                id: item.id,
                name: item.cuisineName,
                quantity: item.quantity,
                price: item.cuisinePrice
              }))
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Payment failed");
          }
      
          const { clientSecret } = await response.json();
      
          const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  email: email, // Ensure email is sent to Stripe
                  phone: mobile,
                  name: "Customer"
                },
              },
            }
          );
      
          if (stripeError) throw stripeError;
      
          if (paymentIntent.status === "succeeded") {
            clearCart();
            localStorage.removeItem("paymentAmount");
            toast.success("Payment successful! A receipt has been sent to your email.");
            setTimeout(() => {
              navigate("/payment-success", { 
                state: { 
                  paymentId: paymentIntent.id,
                  amount: amount,
                  items: cartItems,
                  email: email // Include email in navigation state
                } 
              });
            }, 2000);
          }
        } catch (err) {
          setError(err.message);
          toast.error(err.message || "Payment processing failed");
        } finally {
          setIsProcessing(false);
        }
      };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-screen">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">Payment Details</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Card Details</label>
            <div className="px-3 py-2 border border-gray-300 rounded-md">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }} 
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Order Summary</h4>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.cuisineName} × {item.quantity}
                  </span>
                  <span className="font-medium">₹{item.cuisinePrice * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{amount}</span>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center py-2">{error}</div>
          )}

          <button
            type="submit" 
            disabled={isProcessing}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const previousRoute = location.state?.from || "/stalls";

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.cuisinePrice * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <button
          onClick={() => navigate(previousRoute)}
          className="text-gray-700 hover:text-black p-2 rounded-full hover:bg-gray-100"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Payment</h1>
        <Link 
          to="/stalls" 
          className="text-gray-700 hover:text-black p-2 rounded-full hover:bg-gray-100"
        >
          <FaHome size={20} />
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-gray-100 pb-4">
                      <img
                        src={item.cuisineImg}
                        alt={item.cuisineName}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.cuisineName}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-green-600">
                        ₹{item.cuisinePrice * item.quantity}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Payment Form Modal */}
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Payment;