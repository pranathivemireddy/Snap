import { useNavigate } from "react-router-dom";

function Stalls() {
  const navigate = useNavigate();

  const pathMap = {
    "🥘The Biryani Spot": "/biryanispot",
    "🍕Pizzarity": "/pizzarity",
    "🍔The Burger Vault": "/burgervault",
    "🌯WrapEats": "/wrapeats",
    "🧋Sippity": "/sippity",
    "🍦Snoozy Scoops": "/snoozyscoops"
  };
  const bgColors = [
    "bg-amber-100",
    "bg-amber-200",
    "bg-amber-300",
    "bg-amber-400",
    "bg-amber-500",
    "bg-amber-600"
  ];
  
  const handleClick = (e) => {
    const clickedText = e.target.innerText;
    const path = pathMap[clickedText];
    if (path) {
      navigate(path);
    } else {
      console.warn("No route mapped for:", clickedText);
    }
  };

  return (
    <>
      <div className="stalls flex flex-col gap-4.5 mt-35">
        {Object.keys(pathMap).map((label, idx) => (
          <div
            key={idx}
            className={`h-10 ${bgColors[idx % bgColors.length]} rounded-s-lg rounded-r-lg text-center cursor-pointer p-2`}
            onClick={handleClick}
          >
            {label}
          </div>
        ))}
      </div>
    </>
  );
}

export default Stalls;