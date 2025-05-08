import { Link, useNavigate } from "react-router-dom";
import data from "../Data/data.json";
import { useState } from "react";
function Wrapeats() {
  const wraps = data[0]?.wraps || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [quantities, setQuantities] = useState({});
  const filteredwraps = wraps.filter((wrap) => {
    const matchesSearch = wrap.cuisineName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const showVeg = vegFilter && wrap.veganFriendly;
    const showNonVeg = nonVegFilter && !wrap.veganFriendly;
    if (!vegFilter && !nonVegFilter) return matchesSearch;
    return matchesSearch && (showVeg || showNonVeg);
  });
  const handleIncrement = (wrapId) => {
    setQuantities((prev) => ({
      ...prev,
      [wrapId]: (prev[wrapId] || 0) + 1,
    }));
  };

  // Decrement quantity (won't go below 0)
  const handleDecrement = (wrapId) => {
    setQuantities((prev) => ({
      ...prev,
      [wrapId]: Math.max((prev[wrapId] || 0) - 1, 0),
    }));
  };

  return (
    <>
      <div className="flex flex-row gap-2 p-2 sticky top-0 bg-white z-10 shadow-sm">
        <input
          type="text"
          placeholder="Search wrap's..."
          className="border px-3 py-1 rounded flex-grow max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`border px-3 py-1 rounded transition ${
            vegFilter ? "bg-green-500 text-white" : "bg-white text-green-500"
          }`}
          onClick={() => setVegFilter(!vegFilter)}
        >
          Veg
        </button>
        <button
          className={`border px-3 py-1 rounded transition ${
            nonVegFilter ? "bg-red-500 text-white" : "bg-white text-red-500"
          }`}
          onClick={() => setNonVegFilter(!nonVegFilter)}
        >
          Non Veg
        </button>
      </div>

      <div className="p-4 pb-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Our Wraps Collection
        </h2>
        {filteredwraps.length === 0 && (
          <p className="text-center text-gray-500">No wraps found</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredwraps.map((wrap) => (
            <div
              key={wrap.id}
              className="flex flex-col items-center rounded-lg p-4 bg-white relative"
            >
              <div className="absolute top-2 right-2">
                {wrap.veganFriendly ? (
                  <div className="flex items-center justify-center w-6 h-6 bg-white border-2 border-green-600 rounded-full">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-6 h-6 bg-white border-2 border-red-600 rounded-sm">
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-red-600 -mt-[2px]"></div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="absolute bottom-0 left-0 bg-white border text-black rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  onClick={() => handleDecrement(wrap.id)}
                >
                  -
                </button>
                <img
                  src={wrap.cuisineImg}
                  alt={wrap.cuisineName}
                  className="w-24 h-24 object-cover rounded-full border"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/100x100?text=Wrap";
                    e.target.onerror = null;
                  }}
                />
                <div className="absolute bottom-0 right-0 flex items-center gap-1">
                  <span className="bg-white text-black text-sm px-1">
                    {quantities[wrap.id] || 0}
                  </span>
                  <button
                    className="bg-white text-black border rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-green-600"
                    onClick={() => handleIncrement(wrap.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  {wrap.cuisineName}
                </h3>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  ₹{Math.ceil(wrap.cuisinePrice * 10)}
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
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition" onClick={() => navigate('/cart')}>
          Go to Cart
        </button>
      </div>
    </>
  );
}
export default Wrapeats;
