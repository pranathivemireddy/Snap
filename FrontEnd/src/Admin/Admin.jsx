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
      <div className="flex items-center justify-center h-full">
        <h2 className="text-red-400 font-bold text-xl text-center mt-40">
          Please select a category
        </h2>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar: Full width on mobile, fixed width on larger screens */}
      <div className="w-full md:w-1/4 lg:w-1/5">
        <Sidebar setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">
        <h1 className="text-xl font-bold text-center mt-4 mb-4 px-4">
          Welcome, Admin!
        </h1>
        <div className="p-4 flex-1 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Admin;
