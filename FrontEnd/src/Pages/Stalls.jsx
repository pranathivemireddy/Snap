import { useNavigate } from "react-router-dom";

function Stalls() {
  const navigate = useNavigate();

  const pathMap = {
    "🥘The Biryani Spot": "/biryanispot",
    "🍕Pizzarity": "/pizzarity",
    "🍔The Burger Vault": "/burgervault",
    "🌯WrapEats": "/wrapeats",
    "🧋Sippity": "/sippity",
    "🍦Snoozy Scoops": "/snoozyscoops",
  };

  const images = [
    "/biryani.jpg",
    "/pizza.jpg",
    "/burger.jpg",
    "/wrap.jpg",
    "/sippity.jpg",
    "/icecream.jpg",
  ];

  const handleClick = (label) => {
    const path = pathMap[label];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 mt-8">
      {Object.entries(pathMap).map(([label, path], idx) => (
        <div
          key={label}
          onClick={() => handleClick(label)}
          className="relative h-20 rounded-xl bg-cover bg-center shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-semibold">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stalls;
