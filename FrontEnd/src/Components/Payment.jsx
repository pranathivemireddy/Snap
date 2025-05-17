import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

export default function Payment() {
  const [number, setNumber] = useState('');
  const handleClick = (value) => {
    if (number.length < 10) {
      setNumber((prev) => prev + value);
    }
  };
  const handleClear = () => setNumber('');
  const handleBack = () => setNumber(i => i.slice(0, -1));
  const sendMessage = () => {
    const message = encodeURIComponent('Hello, this is a payment message');
    if (number.length >= 10) {
      const whatsappLink = `https://wa.me/${number}?text=${message}`;
      window.open(whatsappLink, '_blank');
    } else {
      alert('Please enter a valid number');
    }
  };

  const sendSMS = () => {
    if (number.length >= 10) {
      window.location.href = `sms:${number}?body=Hello, this is a payment message`;
    } else {
      alert('Please enter a valid number');
    }
  };

  const keys = [
    '1', '2', '3','4', '5', '6','7', '8', '9','*', '0', '#'
  ];
  return (
    <div className="max-w-xs mx-auto mt-10 align-middle p-4 bg-white shadow rounded">
      <input
        readOnly
        value={number}
        className="w-full mb-4 p-3 border rounded text-center text-lg"
        placeholder="Mobile Number"
      />
      <div className="grid grid-cols-3 mb-2 gap-1.5 p-1">
        {keys.map((n) => (
          <div
            key={n}
            onClick={() => handleClick(n)}
            className="text-black rounded w-auto text-center gap-1.5 py-3 shadow-sm"
          >
            {n}
          </div>
        ))}

        <button
          onClick={handleBack}
          className="flex-1  hover:bg-red-600 text-black shadow-sm py-1 rounded text-lg"
        >
          X
        </button>

        <button
          onClick={()=>{}}        >
          
        </button>
        <button
          onClick={handleClear}
          className="flex-1 text-black shadow-sm py-1 rounded text-lg"
        >Clear        </button>
        <div />
      </div>

      <div className="flex flex-col gap-2 mt-4">
  <button
    onClick={sendMessage}
    className="flex-1 bg-green-300 shadow-sm py-1 rounded text-lg"
  >
    Submit
  </button>
 
</div>
 <div className="flex fixed bottom-0 left-0 w-full justify-around bg-white p-4 shadow-lg">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          <Link to="/stalls" className="text-white no-underline">
            Home
          </Link>
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
          <Link to="/cart" className="text-white no-underline">
            Back
          </Link>
        </button>
        
      </div>
    </div>
  );
}