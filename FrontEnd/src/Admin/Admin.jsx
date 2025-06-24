import { useState } from "react";
import Sidebar from "./Sidebar";
import Biryanispot from '../Pages/Biryanispot';
import Pizzarity from "../Pages/Pizzarity";
import BurgerVault from "../Pages/BurgerVault";
import Wrapeats from "../Pages/Wrapeats";
import Sippity from "../Pages/Sippity";
import Snoozyscoops from "../Pages/Snoozyscoops";

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
        <h2 className="text-red-400 font-bold text-xl text-center">
          Please select a category
        </h2>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed width on desktop, full width on mobile */}
      <div className="w-60">
        <Sidebar setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="text-xl font-bold text-center mt-4 mb-2">
          Welcome, Admin!
        </header>
        <main className="flex-1 overflow-y-auto px-4 pb-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Admin;
