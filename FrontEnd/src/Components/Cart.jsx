import { Link } from 'react-router-dom';
import { useCart } from "../Components/CartContext";

function Cart() {
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.cuisinePrice * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="text-center text-2xl mb-2.5 p-2 shadow-sm">Your Cart</div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-30">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.cuisineImg}
                  alt={item.cuisineName}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.cuisineName}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium">
                    ₹{item.cuisinePrice * item.quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="text-lg font-bold text-right mt-4">
              <span className="mr-2">Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full flex justify-around bg-white p-4 shadow-sm z-10">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
          <Link to="/" className="text-white no-underline">Home</Link>
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded">
          <Link to="/stalls" className="text-white no-underline">Back</Link>
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded">
          <Link to="/payment">Proceed To Payment</Link>
        </button>
      </div>
    </div>
  );
}

export default Cart;
