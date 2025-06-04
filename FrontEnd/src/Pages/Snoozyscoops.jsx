import { useLocation, useNavigate, Link } from "react-router-dom";
import customhook from "../Hooks/customhook";
import { useCart } from "../Components/CartContext";
import ItemCard from "../Components/Itemcard";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "../Components/Editform";

const Snoozyscoops = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    document.body.style.overflow = "hidden"; // lock scroll when modal is open
  };

  const handleUpdate = async (updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/admin/items/${editingItem._id}`,
        updatedData
      );
      setItems((prev) =>
        prev.map((i) => (i._id === editingItem._id ? res.data : i))
      );
      setEditingItem(null);
      document.body.style.overflow = "auto"; // restore scroll
      toast.success("Item updated successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      await axios.delete(`http://localhost:5000/admin/items/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success(`Deleted ${name}`);
    }
  };

  const {
    filteredItems,
    searchTerm,
    setSearchTerm,
    quantities,
    increment,
    decrement,
    setItems,
  } = customhook("http://localhost:5000/client/items/icecreams");

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedItems = isAdmin
    ? filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredItems;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  return (
    <>
      <ToastContainer />
      {/* Filters */}
      <div className="flex gap-2 p-2 sticky top-0 bg-white dark:bg-gray-900 justify-between z-10">
        <input
          type="text"
          className="border px-2 py-0.5 rounded flex-grow max-w-md"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          {isAdmin && (
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
            className="bg-violet-500 text-white px-3 py-1 rounded"
          >
            + Add Item
          </button>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* ❌ Close button */}
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
              onSubmit={handleUpdate}
              onCancel={() => {
                setEditingItem(null);
                document.body.style.overflow = "auto";
              }}
            />
          </div>
        </div>
      )}

      {/* Item Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
            hideDietIndicator={true}
          />
        ))}
      </div>
      {isAdmin && (
        <div className="flex justify-center my-4 space-x-2">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
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
          ))}
        </div>
      )}

      {/* Bottom Cart Actions (only for customers) */}
      {!isAdmin && (
        <div className="fixed bottom-0 left-0 w-full flex justify-around bg-white dark:bg-gray-900 p-4 shadow-lg z-20">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            <Link to="/stalls">Back</Link>
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
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
          >
            Go to Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Snoozyscoops;
