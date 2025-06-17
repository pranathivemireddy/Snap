import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { FaArrowLeft, FaHome } from "react-icons/fa";

function Cart() {
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.cuisinePrice * item.quantity,
    0
  );

  const previousRoute = location.state?.from || "/stalls";

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 🔝 Header with back, title, and home */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <button
          onClick={() => navigate(previousRoute)}
          className="text-gray-700 hover:text-black"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Your Cart</h1>
        <Link to="/stalls" className="text-gray-700 hover:text-black">
          <FaHome size={20} />
        </Link>
      </div>

      {/* 📦 Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-center bg-white p-3 rounded shadow-sm"
              >
                <img
                  src={item.cuisineImg}
                  alt={item.cuisineName}
                  className="w-14 h-14 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.cuisineName}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    ₹{item.cuisinePrice * item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="text-lg font-bold text-right mt-4 text-gray-800">
              <span className="mr-2">Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </>
        )}
      </div>

      {/* 🔻 Footer Buttons */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white p-4 shadow-inner z-10">
        <button
          onClick={() => {
            localStorage.setItem("paymentAmount", totalAmount);
            navigate("/payment");
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md font-medium"
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
}

export default Cart;
