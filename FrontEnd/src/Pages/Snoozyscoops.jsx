import { Link, useNavigate } from "react-router-dom";
import data from "../Data/data.json";
import { useState } from "react";
import { useCart } from "../Components/CartContext.jsx";
function Snoozyscoops() {
  const snoozyscoops = data[0]?.icecreams || [];
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const filteredSnoozyscoops = snoozyscoops.filter((icecream) =>
    icecream.cuisineName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleIncrement = (icecreamId) => {
    setQuantities((prev) => ({
      ...prev,
      [icecreamId]: (prev[icecreamId] || 0) + 1,
    }));
  };
  const handleDecrement = (icecreamId) => {
    setQuantities((prev) => ({
      ...prev,
      [icecreamId]: Math.max((prev[icecreamId] || 0) - 1, 0),
    }));
  };

  return (
    <>
      <div className="flex flex-row gap-2 p-2 sticky top-0 bg-white z-10 shadow-sm">
        <input
          type="text"
          placeholder="Search icecreams..."
          className="border px-3 py-1 rounded flex-grow max-w-md"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>

      <div className="p-4 pb-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Our Icecreams Collection
        </h2>
        {filteredSnoozyscoops.length === 0 && (
          <p className="text-center text-gray-500">No icecreams found</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredSnoozyscoops.map((icecream) => (
            <div
              key={icecream.id}
              className="flex flex-col items-center rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="relative">
                <button
                  className="absolute bottom-0 left-0 bg-white border text-black rounded-full w-6 h-6 flex items-center justify-center text-sm "
                  onClick={() => handleDecrement(icecream.id)}
                >
                  -
                </button>
                <img
                  src={icecream.cuisineImg}
                  alt={icecream.cuisineName}
                  className="w-24 h-24 object-cover rounded-full border lg:rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/100x100?text=Icecream";
                    e.target.onerror = null;
                  }}
                />
                <button
                  className="absolute bottom-0 right-0 bg-white text-black border rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-green-600"
                  onClick={() => handleIncrement(icecream.id)}
                >
                  +
                </button>
              </div>
              <div>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  {icecream.cuisineName}
                </h3>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  ₹{icecream.cuisinePrice}
                </h3>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  Quantity:{quantities[icecream.id] || 0}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex fixed bottom-0 left-0 w-full justify-around bg-white p-4  shadow-lg">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          <Link to="/" className="text-white no-underline">
            Home
          </Link>
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
          <Link to="/stalls" className="text-white no-underline">
            Back
          </Link>
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          onClick={() => {
            snoozyscoops.forEach((icecream) => {
              const qty = quantities[icecream.id] || 0;
              if (qty > 0) {
                addToCart({
                  ...icecream,
                  quantity: qty,
                  cuisinePrice: parseFloat(icecream.cuisinePrice),
                });
              }
            });
            navigate("/cart");
          }}
        >
          Go to Cart
        </button>
      </div>
    </>
  );
}
export default Snoozyscoops;
