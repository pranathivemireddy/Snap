import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";

export default function PaymentQr() {
  const canvasRef = useRef(null);
  const [qrUrl, setQrUrl] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("paymentToken");
  const amount = localStorage.getItem("paymentAmount");
  const qrData = `Payment Token: ${token}, Amount: ₹${amount}`;

  useEffect(() => {
    QRCode.toDataURL(qrData)
      .then(setQrUrl)
      .catch((err) => console.error("QR generation error:", err));
  }, [qrData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-xl font-semibold mb-6">Scan to Complete Payment and money will be debited from your account</h2>

      {qrUrl && (
        <img src={qrUrl} alt="QR Code" className="w-64 h-64 bg-white p-4 rounded shadow" />
      )}

      <p className="mt-6 font-semibold text-lg">Amount: ₹{amount}</p>

      <button
        onClick={() => navigate("/stalls")}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Back to Stalls
      </button>
    </div>
  );
}
