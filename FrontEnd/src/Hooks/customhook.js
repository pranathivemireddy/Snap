import { useEffect, useState } from "react";
import axios from "axios";

const useFilteredItems = (endpoint) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err));
  }, [endpoint]);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.cuisineName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    if (!matchesSearch) return false;
  
    if (vegFilter && item.veganFriendly) return true;
    if (nonVegFilter && !item.veganFriendly) return true;
    if (!vegFilter && !nonVegFilter) return true; // All items
    return false;
  });
  

  const toggleVeg = (value = !vegFilter) => setVegFilter(value);
  const toggleNonVeg = (value = !nonVegFilter) => setNonVegFilter(value);

  const increment = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return {
    items,
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
  };
};

export default useFilteredItems;
