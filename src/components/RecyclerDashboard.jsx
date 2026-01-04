import { useEffect, useState } from "react";

const API_BASE = "https://ecbridge.onrender.com";

export default function RecyclerDashboard({ onBack }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  // 🔁 Fetch matched waste
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/waste`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch waste", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/waste/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setActionMsg(`Waste ${status.toLowerCase()} successfully`);

      // 🔁 Refetch list from backend (source of truth)
      await fetchRequests();

      // Clear message after 2s
      setTimeout(() => setActionMsg(""), 2000);

    } catch (error) {
      console.error(error);
      alert("Error updating waste status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] px-6 py-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Recycler Dashboard
      </h2>

      {actionMsg && (
        <p className="text-center mb-4 text-green-300 font-semibold">
          {actionMsg}
        </p>
      )}

      {loading && (
        <p className="text-center">Loading requests...</p>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-center">
          No matched waste requests available
        </p>
      )}

      <div className="space-y-6 max-w-3xl mx-auto">
        {requests.map((waste) => (
          <div
            key={waste._id}
            className="bg-white/90 text-[#0b3d2e] p-6 rounded-xl shadow-lg"
          >
            <p><b>Type:</b> {waste.type}</p>
            <p><b>Quantity:</b> {waste.quantity} kg</p>
            <p><b>Location:</b> {waste.location}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => updateStatus(waste._id, "ACCEPTED")}
                className="flex-1 bg-green-300 py-2 rounded-lg font-bold hover:bg-green-200"
              >
                Accept
              </button>
              <button
                onClick={() => updateStatus(waste._id, "REJECTED")}
                className="flex-1 bg-red-300 py-2 rounded-lg font-bold hover:bg-red-200"
              >
                Reject
              </button>
            </div>
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
