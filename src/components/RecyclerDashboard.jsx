import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function RecyclerDashboard({ onBack }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  const recyclerId = localStorage.getItem("recyclerId");

  // 🔁 Fetch ONLY this recycler's requests
  const fetchRequests = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found");
      setRequests([]);
      setLoading(false);
      return;
    }

    const res = await fetch(
      `${API_BASE}/api/requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      console.error("Unauthorized");
      setRequests([]);
      setLoading(false);
      return;
    }

    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);

  } catch (err) {
    console.error("Failed to fetch requests", err);
    setRequests([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Update request status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/request/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setActionMsg(`Request ${status.toLowerCase()} successfully`);

      // 🔁 Refresh list
      await fetchRequests();

      setTimeout(() => setActionMsg(""), 2000);

    } catch (error) {
      console.error(error);
      alert("Error updating request status");
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
          No incoming waste requests available
        </p>
      )}

      <div className="space-y-6 max-w-3xl mx-auto">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white/90 text-[#0b3d2e] p-6 rounded-xl shadow-lg"
          >
            <p><b>Generator:</b> {req.generatorName}</p>
            <p><b>Waste Type:</b> {req.wasteType}</p>
            <p><b>Quantity:</b> {req.quantity} kg</p>
            <p><b>Status:</b> {req.status}</p>

            {req.status === "PENDING" && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateStatus(req._id, "ACCEPTED")}
                  className="flex-1 bg-green-300 py-2 rounded-lg font-bold hover:bg-green-200"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(req._id, "REJECTED")}
                  className="flex-1 bg-red-300 py-2 rounded-lg font-bold hover:bg-red-200"
                >
                  Reject
                </button>
              </div>
            )}
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