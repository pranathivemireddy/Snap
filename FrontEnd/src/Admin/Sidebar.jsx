import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMenu } from 'react-icons/fi';

function Sidebar({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // for mobile sidebar toggle

  useEffect(() => {
    axios
      .get('https://snap-9b5y.onrender.com/admin/allcategories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      });
  }, []);

  return (
    <>
      {/* 📱 Hamburger menu - visible only on small screens */}
      <div className="md:hidden flex items-center bg-amber-100 mt-0">
        <button onClick={() => setIsOpen(true)}>
          <FiMenu className="text-2xl" />
        </button>
        <h2 className="ml-4 text-lg font-semibold">Categories</h2>
      </div>

      {/* 🧭 Sidebar */}
      <div
        className={`bg-amber-100 z-30 transition-transform duration-300 ease-in-out
        md:relative md:w-60 md:block
        fixed top-0 left-0 h-screen w-1/2
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="text-center text-xl font-bold mt-6">Categories</div>

        {/* Scrollable list */}
        <div className="mt-4 px-2 space-y-4 overflow-y-auto h-[calc(100vh-100px)] pb-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="p-3 rounded cursor-pointer hover:bg-amber-200"
              onClick={() => {
                setSelectedCategory(cat.name.toLowerCase());
                setIsOpen(false); // close drawer on mobile
              }}
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-16 h-16 mx-auto object-cover rounded-full"
              />
              <p className="text-sm mt-1 text-center">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔲 Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
