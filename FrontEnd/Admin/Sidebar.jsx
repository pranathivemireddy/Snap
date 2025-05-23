import { useEffect, useState } from 'react';
import axios from 'axios';

function Sidebar({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/allcategories')
      .then(res => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch categories", err);
        setCategories([]); 
      });
  }, []);

  return (
    <div className="sidebar w-24 lg:w-60 h-lvh bg-amber-100 text-center text-xl font-bold flex flex-col">
      <div className="mt-6">Categories</div>
      <div className="flex-1 overflow-hidden mt-3">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="p-3 rounded cursor-pointer"
            onClick={() => setSelectedCategory(cat.name.toLowerCase())}
          >
            <img
              src={cat.image_url}
              alt={cat.name}
              className="w-18 h-18 mx-auto object-cover rounded-full"
            />
            <p className="text-sm mt-1">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
