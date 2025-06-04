import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import biryanisImg from '/biryani.jpg'
import burgersImg from "/burger.jpg";
import pizzasImg from "/pizza.jpg";
import wrapsImg from "/wraps.jpg";
import milkshakesImg from "/milkshake.jpg";
import icecreamsImg from "/icecream.jpg";

function Stalls() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayNameMap = {
    Biryanis: "🥘The Biryani Spot",
    Burgers: "🍔The Burger Vault",
    Pizzas: "🍕Pizzarity",
    Wraps: "🌯Wrapeats",
    Milkshakes: "🥤Sippity",
    Icecreams: "🍦Snoozy Scoops",
  };

  const routeMap = {
    Biryanis: "/biryanispot",
    Burgers: "/burgervault",
    Icecreams: "/snoozyscoops",
    Milkshakes: "/sippity",
    Pizzas: "/pizzarity",
    Wraps: "/wrapeats",
  };

  const imageMap = {
    Biryanis: biryanisImg,
    Burgers: burgersImg,
    Pizzas: pizzasImg,
    Wraps: wrapsImg,
    Milkshakes: milkshakesImg,
    Icecreams: icecreamsImg,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/allcategories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load categories");
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
      {categories.map(({ _id, name }) => (
        <div
          key={_id}
          onClick={() => handleClick(name)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(name);
            }
          }}
          className="
            relative h-20 rounded-xl bg-cover bg-center shadow-md cursor-pointer
            md:hover:scale-105 md:hover:shadow-lg
            transition-transform duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            lg:col-span-1 lg:h-58
          "
          style={{ backgroundImage: `url(${imageMap[name]})` }}
          role="button"
          aria-label={`Go to ${displayNameMap[name] || name} stall`}
        >
          <div className="absolute inset-0 bg-opacity-50 rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {displayNameMap[name] || name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stalls;
