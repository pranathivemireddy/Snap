import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function Payment({ amount }) {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const generateToken = () => Math.floor(100000 + Math.random() * 900000);

  const handleClick = (value) => {
    if (number.length < 10) {
      setNumber((prev) => prev + value);
    }
  };

  const handleClear = () => setNumber("");
  const handleBack = () => setNumber((i) => i.slice(0, -1));

  const sendMessage = () => {
    if (number.length >= 10) {
      const token = generateToken();
      const message = `Your payment token is: ${token}`;

      window.location.href = `sms:${number}?body=${encodeURIComponent(message)}`;

      localStorage.setItem("paymentToken", token);
      localStorage.setItem("paymentAmount", amount);

      setTimeout(() => {
        navigate(`/payment-qr?token=${token}&amount=${amount}`);
      }, 1000);
    } else {
      alert("Please enter a valid 10-digit number");
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <>
      {/* Top Navigation Buttons */}
      <div className="flex fixed top-0 left-0 w-full justify-between items-center bg-white px-4 py-3 shadow z-10">
        {/* Back Button on the Left */}
        <Link
          to="/cart"
          className="text-gray-700 hover:text-black"
        >
          <FaArrowLeft size={20} />
          
          
        </Link>

        {/* Home Button on the Right */}
        <Link to="/stalls" className="text-gray-700 hover:text-black">
          <FaHome size={20} />
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-xs mx-auto mt-24 p-4 bg-white shadow rounded">
        <input
          readOnly
          value={number}
          className="w-full mb-4 p-3 border rounded text-center text-lg"
          placeholder="Mobile Number"
        />
        <div className="grid grid-cols-3 mb-2 gap-1.5 p-1">
          {keys.map((n) => (
            <button
              key={n}
              onClick={() => handleClick(n)}
              className="text-black rounded py-3 shadow-sm hover:bg-gray-200"
            >
              {n}
            </button>
          ))}

          <button
            onClick={handleBack}
            className="flex-1 hover:bg-red-600 text-white bg-red-400 shadow-sm py-1 rounded text-lg"
          >
            Back
          </button>
          <button> </button>
          <button
            onClick={handleClear}
            className="flex-1 hover:bg-gray-400 text-black shadow-sm py-1 rounded text-lg"
          >
            Clear
          </button>
        </div>

        <button
          onClick={sendMessage}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded text-lg mt-4"
        >
          Submit
        </button>
      </div>
    </>
  );
}
