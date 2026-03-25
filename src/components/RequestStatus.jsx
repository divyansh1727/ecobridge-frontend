import { useEffect, useState } from "react";

export default function RequestStatus({ requestId, onBack }) {
  const [request, setRequest] = useState(null);

  const fetchStatus = async () => {
    try {
      const id = requestId?._id || requestId; // ensure correct id

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/request/${id}`
      );

      const data = await res.json();
      setRequest(data);
    } catch (err) {
      console.error("Failed to fetch status", err);
    }
  };

  useEffect(() => {
    if (!requestId) return;

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, [requestId]);

  if (!request) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] text-white">
      <div className="bg-white/90 text-[#0b3d2e] p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Request Status</h2>

        <p><b>Waste Type:</b> {request.wasteType}</p>
        <p><b>Quantity:</b> {request.quantity} kg</p>

        <div className="mt-4 text-lg font-bold">
          Status: {request.status}
        </div>

        {request.status === "ACCEPTED" && (
          <p className="text-green-600 mt-3">
            🎉 Recycler Accepted Your Request!
          </p>
        )}

        {request.status === "REJECTED" && (
          <p className="text-red-600 mt-3">
            ❌ Recycler Rejected Your Request
          </p>
        )}

        <button
          onClick={onBack}
          className="mt-6 bg-green-300 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}