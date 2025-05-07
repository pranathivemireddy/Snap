import { Link } from "react-router-dom";
import data from "../Data/data.json";
import { useState } from "react";
function Sippity() {
  const sippity = data[0]?.milkshakes || [];
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSippity = sippity.filter((milkshake) => 
    milkshake.cuisineName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <div className="flex flex-row gap-2 p-2 sticky top-0 bg-white z-10 shadow-sm">
        <input
          type="text"
          placeholder="Search milkshakes..."
          className="border px-3 py-1 rounded flex-grow max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="border bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600 transition">
          Veg
        </button>
        <button className="border bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition">
          Non Veg
        </button>
      </div>

      <div className="p-4 pb-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Our Milkshake Collection
        </h2>
        {filteredSippity.length === 0 && <p className="text-center text-gray-500">No milkshakes found</p>}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSippity.map((milkshake) => (
            <div
              key={milkshake.id}
              className="flex flex-col items-center rounded-lg p-4 bg-white"
            >
              <div className="relative">
                <button className="absolute bottom-0 left-0 bg-white border text-black rounded-full w-6 h-6 flex items-center justify-center text-sm ">
                  -
                </button>
                <img
                  src={milkshake.cuisineImg}
                  alt={milkshake.cuisineName}
                  className="w-24 h-24 object-cover rounded-full border"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/100x100?text=Milkshake";
                    e.target.onerror = null;
                  }}
                />
                <button className="absolute bottom-0 right-0 bg-white text-black border rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-green-600">
                  +
                </button>
              </div>
              <div>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  {milkshake.cuisineName}
                </h3>
                <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                  ₹{milkshake.cuisinePrice}
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
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
          Go to Cart
        </button>
      </div>
    </>
  );
}
export default Sippity;
