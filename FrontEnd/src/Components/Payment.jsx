import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function Payment() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  // ✅ Get amount from localStorage
  const amount = localStorage.getItem("paymentAmount") || 0;

  // ✅ Generate 3-digit token
  const generateToken = () => Math.floor(100 + Math.random() * 900);

  const handleClick = (value) => {
    if (number.length < 10) {
      setNumber((prev) => prev + value);
    }
  };

  const handleClear = () => setNumber("");
  const handleBack = () => setNumber((prev) => prev.slice(0, -1));

  const sendMessage = () => {
    if (number.length === 10) {
      const token = generateToken();

      // ✅ Store token and amount
      localStorage.setItem("paymentToken", token);
      localStorage.setItem("paymentAmount", amount);

      // ✅ Navigate to QR page
      setTimeout(() => {
        navigate("/paymentqr");
      }, 1000);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <>
      {/* 🔝 Top Navigation */}
      <div className="flex fixed top-0 left-0 w-full justify-between items-center bg-white px-4 py-3 shadow z-10">
        <Link to="/cart" className="flex items-center gap-2 px-4 py-2 rounded no-underline">
          <FaArrowLeft size={20} />
        </Link>
        <Link to="/stalls" className="text-gray-700 hover:text-black">
          <FaHome size={20} />
        </Link>
      </div>

      {/* 💳 Payment Input */}
      <div className="max-w-xs mx-auto mt-24 p-4 bg-white shadow rounded">
        {/* 💰 Display amount */}
        <p className="text-center text-lg font-semibold mb-4">
          Total to Pay: ₹{amount}
        </p>

        <input
          readOnly
          value={number}
          className="w-full mb-4 p-3 border rounded text-center text-lg"
          placeholder="Mobile Number"
        />

        {/* 🔢 Keypad */}
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
          <button disabled />
          <button
            onClick={handleClear}
            className="flex-1 hover:bg-gray-400 text-black shadow-sm py-1 rounded text-lg"
          >
            Clear
          </button>
        </div>

        {/* ✅ Submit */}
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
