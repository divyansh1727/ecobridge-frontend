import { useEffect } from "react";

export default function WasteStatus({ data, onBack }) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] text-white px-6">
      <div className="bg-white/90 text-[#0b3d2e] rounded-2xl p-8 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Waste Request Status
        </h2>

        <p><b>Request ID:</b> {data.requestId}</p>
        <p><b>Waste Type:</b> {data.type}</p>
        <p><b>Quantity:</b> {data.quantity} kg</p>
        <p><b>Location:</b> {data.location}</p>

        <div className="mt-4 p-3 bg-green-100 rounded-lg text-center font-semibold">
          Status: {data.status}
        </div>

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
