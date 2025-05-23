import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Stalls() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const displayNameMap = {
    "Biryanis": "🥘The Biryani Spot",
    "Burgers": "🍔The Burger Vault",
    "Pizzas": "🍕Pizzarity",
    "Wraps": "🌯Wrapeats",
    "Milkshakes": "🥤Sippity",
    "Icecreams": "🍦Snoozy Scoops",
  };
  const routeMap = {
    "Biryanis": "/biryanispot",
    "Burgers": "/burgervault",
    "Icecreams": "/snoozyscoops",
    "Milkshakes": "/sippity",
    "Pizzas": "/pizzarity",
    "Wraps": "/wrapeats",
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/allcategories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load categories",err);
        setLoading(false);
      });
  }, []);

  const handleClick = (name) => {
    const path = routeMap[name];
    if (path) {
      navigate(path);
    } else {
      console.warn("No route mapped for category:", name);
    }
  };

  if (loading) {
    return <p className="p-4 text-center">Loading categories...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 mt-8">
      {categories.map(({ _id, name,image_url }, idx) => (
        <div
          key={_id}
          onClick={() => handleClick(name)}
          className="relative h-20 rounded-xl bg-cover bg-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
          style={{ backgroundImage: `url(${image_url})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-semibold">{displayNameMap[name]||name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stalls;
