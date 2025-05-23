import { useState } from "react";
import Sidebar from "./Sidebar";
import Biryanispot from "../src/Pages/Biryanispot";
import Pizzarity from "../src/Pages/Pizzarity";
import BurgerVault from "../src/Pages/BurgerVault";
import Wrapeats from "../src/Pages/Wrapeats";
import Sippity from "../src/Pages/Sippity";
import Snoozyscoops from "../src/Pages/Snoozyscoops";

function Admin() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryMap = {
    biryanis: <Biryanispot />,
    pizzas: <Pizzarity />,
    burgers: <BurgerVault />,
    wraps: <Wrapeats />,
    milkshakes: <Sippity />,
    icecreams: <Snoozyscoops />,
  };
  
  const renderContent = () => {
    return categoryMap[selectedCategory] || (
      <p className="text-gray-400">Please select a category</p>
    );
  };
  

  return (
    <div className="flex">
      <Sidebar setSelectedCategory={setSelectedCategory} />
      <div className="admin w-full h-lvh">
        <h1 className="text-xl font-bold text-center mt-4">Welcome, Admin!</h1>
        <div className="admin-content p-6 w-full">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Admin;
