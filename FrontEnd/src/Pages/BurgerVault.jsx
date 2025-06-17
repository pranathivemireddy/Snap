import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import customhook from "../Hooks/customhook";
import { useCart } from "../Components/CartContext";
import ItemCard from "../Components/Itemcard";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../Components/Editform";

const BurgerVault = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const category = "burgers";

  const {
    filteredItems,
    searchTerm,
    setSearchTerm,
    vegFilter,
    nonVegFilter,
    toggleVeg,
    toggleNonVeg,
    quantities,
    increment,
    decrement,
    setItems,
  } = customhook("https://snap-9b5y.onrender.com/client/items/burgers");

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalCartItems = Object.values(quantities).reduce(
    (acc, val) => acc + val,
    0
  );

  const paginatedItems = isAdmin
    ? filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredItems;

  const handleEdit = (item) => {
    setEditingItem(item);
    document.body.style.overflow = "hidden";
  };

  const handleUpdate = async (updatedData) => {
    try {
      let res;
      if (editingItem._id) {
        res = await axios.put(
          `https://snap-9b5y.onrender.com/admin/items/${category}/${editingItem._id}`,
          updatedData
        );
        setItems((prev) =>
          prev.map((i) => (i._id === editingItem._id ? res.data : i))
        );
        toast.success("Item updated successfully");
      } else {
        res = await axios.post(
          `https://snap-9b5y.onrender.com/admin/items/${category}`,
          updatedData
        );
        setItems((prev) => [...prev, res.data]);
        toast.success("Item added successfully");
      }

      setEditingItem(null);
      document.body.style.overflow = "auto";
    } catch (error) {
      console.log(error);
      toast.error("Error adding item");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await axios.delete(`https://snap-9b5y.onrender.com/admin/items/${category}/${id}`);
        setItems((prev) => prev.filter((i) => i._id !== id));
        toast.success(`Deleted ${name}`);
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-3 py-2 sticky top-0 bg-white dark:bg-gray-900 z-10 shadow-sm">
      {/* Left: Back Arrow */}
  {!isAdmin && (
    <Link
      to="/stalls"
      className="text-gray-700 dark:text-white hover:text-black mr-2"
    >
      <FiArrowLeft className="text-2xl" />
    </Link>
  )}

  {/* Center: Logo */}
  <div className="flex items-center justify-center mx-2">
  <img
  src="/burger.jpg"
  alt="Logo"
  className="h-14 w-14 sm:h-16 sm:w-16 object-cover rounded-full"
/>

  </div>

  {/* Middle: Search + Filters */}
  <div className="flex flex-wrap justify-center gap-2 mt-2 md:mt-0 max-w-xl mx-auto w-full">
  <input
    type="text"
    className="border px-2 py-1 rounded text-sm w-full sm:w-60"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    className={`px-2 py-1 text-sm border rounded ${
      !vegFilter && !nonVegFilter
        ? "bg-gray-800 text-white"
        : "text-gray-700 border-gray-700"
    }`}
    onClick={() => {
      toggleVeg(false);
      toggleNonVeg(false);
    }}
  >
    All
  </button>
  <button
    className={`px-2 py-1 text-sm border rounded ${
      vegFilter ? "bg-green-500 text-white" : "text-green-600 border-green-600"
    }`}
    onClick={() => {
      toggleVeg(true);
      toggleNonVeg(false);
    }}
  >
    Veg
  </button>
  <button
    className={`px-2 py-1 text-sm border rounded ${
      nonVegFilter ? "bg-red-500 text-white" : "text-red-600 border-red-600"
    }`}
    onClick={() => {
      toggleVeg(false);
      toggleNonVeg(true);
    }}
  >
    Non Veg
  </button>
</div>


  {/* Right: Cart or Add Item */}
  <div className="flex items-center ml-auto mt-2 md:mt-0">
    {!isAdmin ? (
      <button
        onClick={() => {
          filteredItems.forEach((item) => {
            const qty = quantities[item.id] || 0;
            if (qty > 0) {
              addToCart({
                ...item,
                quantity: qty,
                cuisinePrice: parseFloat(item.cuisinePrice),
              });
            }
          });
          navigate("/cart", { state: { from: location.pathname } });
        }}
        className="relative flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10"
      >
        <FiShoppingCart className="text-xl" />
        {totalCartItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {totalCartItems}
          </span>
        )}
      </button>
    ) : (
      <button
        onClick={() =>
          setEditingItem({
            cuisineName: "",
            cuisineDescription: "",
            cuisinePrice: "",
            servesFor: "",
            spicyLevel: "",
            veganFriendly: false,
            cuisineImg: "",
          })
        }
        className="bg-violet-500 text-white px-3 py-1 rounded text-sm"
      >
        + Add Item
      </button>
    )}
  </div>
</div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl font-bold"
              onClick={() => {
                setEditingItem(null);
                document.body.style.overflow = "auto";
              }}
            >
              &times;
            </button>
            <EditForm
              item={editingItem}
              title={editingItem._id ? "Edit Item" : "Add Item"}
              onSubmit={handleUpdate}
              onCancel={() => {
                setEditingItem(null);
                document.body.style.overflow = "auto";
              }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {paginatedItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            quantity={quantities[item.id]}
            increment={increment}
            decrement={decrement}
            isAdmin={isAdmin}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Pagination for Admin */}
      {isAdmin && (
        <div className="flex justify-center my-4 space-x-2">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
};

export default BurgerVault;
