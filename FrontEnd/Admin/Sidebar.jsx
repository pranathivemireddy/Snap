import { useState } from 'react';
import Biryanispot from '../src/Pages/Biryanispot';
import Pizzarity from '../src/Pages/Pizzarity';
import BurgerVault from '../src/Pages/BurgerVault';
import Wrapeats from '../src/Pages/Wrapeats';
import Sippity from '../src/Pages/Sippity';
import Snoozyscoops from '../src/Pages/Snoozyscoops';
// Import other category components when you create them

function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar w-24 lg:w-xs h-lvh bg-amber-100 text-center text-xl font-bold">
        <div className="mt-8">Categories</div>
        <div className="flex flex-col mt-8 gap-8 p-3.5 text-black rounded-md">
          <div
            className="p-6 rounded bg-slate-50 cursor-pointer hover:bg-slate-200"
            onClick={() => setSelectedCategory('biryani')}
          >
            Biryanispot
          </div>
          <div
            className="p-6 rounded bg-slate-50 cursor-pointer hover:bg-slate-200"
            onClick={() => setSelectedCategory('pizza')}
          >
            Pizzarity
          </div>
          <div className="p-6 rounded bg-slate-50" onClick={()=>setSelectedCategory('burger')}>BurgerVault</div>
          <div className="p-6 rounded bg-slate-50"  onClick={()=>setSelectedCategory('wrap')}>Wrapeats</div>
          <div className="p-6 rounded bg-slate-50"  onClick={()=>setSelectedCategory('milkshake')}>Sippity</div>
          <div className="p-6 rounded bg-slate-50"  onClick={()=>setSelectedCategory('icecream')}>Snoozyscoops</div>
        </div>
      </div>

      <div className="flex-1 p-8">
        {selectedCategory === 'biryani' && <Biryanispot />}
        {selectedCategory === 'pizza' && <Pizzarity/>}
        {selectedCategory === 'pizza' && <BurgerVault/>}
        {selectedCategory === 'pizza' && <Wrapeats/>}
        {selectedCategory === 'pizza' && <Sippity/>}
        {selectedCategory === 'pizza' && <Snoozyscoops/>}
      </div>
    </div>
  );
}

export default Sidebar;
