import { useEffect, useState } from "react";

export default function WasteStatus({ data, onBack }) {
  const [waste, setWaste] = useState(data);

  useEffect(() => {
    if (waste.status === "ACCEPTED" || waste.status === "REJECTED") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://ecbridge.onrender.com/api/waste/${data._id}`
        );
        const updated = await res.json();
        if (updated?.status) setWaste(updated);
      } catch (err) {
        console.error("Failed to fetch status", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [data._id, waste.status]);

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    MATCHED: "bg-blue-100 text-blue-800",
    ACCEPTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] text-white px-6">
      <div className="bg-white/90 text-[#0b3d2e] rounded-2xl p-8 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Waste Request Status
        </h2>

        <p><b>Request ID:</b> {waste._id}</p>
        <p><b>Waste Type:</b> {waste.type}</p>
        <p><b>Quantity:</b> {waste.quantity} kg</p>
        <p><b>Location:</b> {waste.location}</p>

        <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${statusColor[waste.status]}`}>
          Status: {waste.status}
        </div>

        {waste.status === "ACCEPTED" && (
          <p className="text-green-700 text-center mt-3 font-bold">
            🎉 Recycler accepted your request!
          </p>
        )}

        {waste.status === "REJECTED" && (
          <p className="text-red-600 text-center mt-3 font-bold">
            ❌ Recycler rejected your request
          </p>
        )}

        <button
          onClick={onBack}
          className="mt-6 w-full py-2 bg-green-300 rounded-xl font-bold hover:bg-green-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}
