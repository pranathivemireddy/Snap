import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome, FaArrowLeft } from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentId, amount, items = [] } = location.state || {};
  const previousRoute = location.state?.from || "/stalls";

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
        <h1 className="text-xl font-semibold text-gray-800">Payment Successful</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden text-center p-8">
          <div className="flex justify-center text-green-500 mb-4">
            <FaCheckCircle size={60} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          
          {paymentId && (
            <p className="text-gray-600 mb-6">
              <span className="font-medium">Transaction ID:</span> {paymentId}
            </p>
          )}

          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800">
              Total Paid: <span className="text-green-600">₹{amount}</span>
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Order Items</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.cuisineName} × {item.quantity}
                  </span>
                  <span className="font-medium">₹{item.cuisinePrice * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/stalls")}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm"
          >
            <FaHome className="mr-2" /> Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;