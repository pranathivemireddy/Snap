import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { FaArrowLeft, FaHome, FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const previousRoute = location.state?.from || "/stalls";

  const handleIncrease = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.cuisinePrice * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
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

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex items-center bg-white p-3 rounded shadow-sm justify-between"
              >
                <img
                  src={item.cuisineImg}
                  alt={item.cuisineName}
                  className="w-14 h-14 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.cuisineName}</h3>
                  <div className="flex items-center mt-1 space-x-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaPlus />
                    </button>
                    <span className="text-green-600 font-semibold ml-4">
                      ₹{item.cuisinePrice * item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <div className="text-lg font-bold text-right mt-4 text-gray-800">
              <span className="mr-2">Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </>
        )}
      </div>

      {/* Proceed to Payment */}
      {cartItems.length > 0 && (
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
      )}
    </div>
  );
}

export default Cart;
