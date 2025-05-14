import { Link,useNavigate } from "react-router-dom";
import data from "../Data/data.json";
import { useState } from "react";
import { useCart } from "../Components/CartContext.jsx";

function Pizzarity() {
  const pizzas = data[0]?.pizzas || [];
  const navigate=useNavigate()
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [quantities, setQuantities] = useState({});
  const filteredPizzas = pizzas.filter((pizza) =>{
    const matchesSearch = pizza.cuisineName.toLowerCase().includes(searchTerm.toLowerCase());
    const showVeg = vegFilter && pizza.veganFriendly;
    const showNonVeg = nonVegFilter && !pizza.veganFriendly;
    if (!vegFilter && !nonVegFilter) return matchesSearch;  
    return matchesSearch && (showVeg || showNonVeg);  
  });
  const handleIncrement = (wrapId) => {
    setQuantities((prev) => ({
      ...prev,
      [wrapId]: (prev[wrapId] || 0) + 1,
    }));
  };

  const handleDecrement = (wrapId) => {
    setQuantities((prev) => ({
      ...prev,
      [wrapId]: Math.max((prev[wrapId] || 0) - 1, 0),
    }));
  };
  const handleAddToCart = () => {
    const selectedItems = pizzas
      .filter((pizza) => (quantities[pizza.id] || 0) > 0)
      .map((pizza) => ({
        ...pizza,
        quantity: quantities[pizza.id],
      }));

    selectedItems.forEach((item) => addToCart(item));

    navigate("/cart"); 
  };

  return (
    <>
      <div className="flex flex-row gap-2 p-2 sticky top-0 bg-white z-10">
        <input
          type="text"
          placeholder="Search pizzas..."
          className="border px-3 py-1 rounded flex-grow max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className={`border px-3 py-1 rounded transition ${vegFilter ? 'bg-green-500 text-white' : 'bg-white text-green-500'}`}
          onClick={() => setVegFilter(!vegFilter)}
        >
          Veg
        </button>
        <button 
          className={`border px-3 py-1 rounded transition ${nonVegFilter ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
          onClick={() => setNonVegFilter(!nonVegFilter)}
        >
          Non Veg
        </button>
      </div>

      <div className="p-4 pb-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Our Pizza Collection
        </h2>
        {filteredPizzas.length === 0 && ( <p className="text-center text-gray-500">No pizzas found</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="flex flex-col items-center rounded-lg p-4 bg-white relative shadow-sm"
            >
              <div className="absolute top-2 right-2">
                {pizza.veganFriendly ? (
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
              <button className="absolute bottom-0 left-0 bg-white border text-black rounded-full w-6 h-6 flex items-center justify-center text-sm " onClick={() => handleDecrement(pizza.id)}>
                  -
                </button>
                <img
                  src={pizza.cuisineImg}
                  alt={pizza.cuisineName}
                  className="w-24 h-24 object-cover rounded-full border"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/100x100?text=pizza";
                    e.target.onerror = null;
                  }}/>
                <button className="absolute bottom-0 right-0 bg-white text-black border rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-green-600" onClick={() => handleIncrement(pizza.id)}>
                  +
                </button>
              </div>
              <div>
              <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">
                {pizza.cuisineName}
              </h3>
              <h3 className="mt-2 font-semibold text-gray-800 text-center text-sm">₹{pizza.cuisinePrice}</h3>
              <h3 className='mt-2 font-semibold text-gray-800 text-center text-sm'>Quantity:{quantities[pizza.id]||0}</h3>
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
  pizzas.forEach((pizza) => {
    const qty = quantities[pizza.id] || 0;
    if (qty > 0) {
      addToCart({...pizza,
        quantity: qty,
        cuisinePrice: parseFloat(pizza.cuisinePrice),});
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
export default Pizzarity;