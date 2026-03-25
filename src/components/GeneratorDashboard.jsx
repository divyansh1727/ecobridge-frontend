import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function GeneratorDashboard({ onBack }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_BASE}/api/generator/requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132]">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Waste Requests
      </h2>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && requests.length === 0 && (
        <p className="text-center">No requests found</p>
      )}

      <div className="space-y-6 max-w-3xl mx-auto">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white/90 text-[#0b3d2e] p-6 rounded-xl shadow-lg"
          >
            <p><b>Waste Type:</b> {req.wasteType}</p>
            <p><b>Quantity:</b> {req.quantity} kg</p>
            <p><b>Status:</b> {req.status}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-[#062e23] rounded-xl font-semibold hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}