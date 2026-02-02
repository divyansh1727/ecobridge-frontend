import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 Protect admin route
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setStats(res.data))
      .catch(() => {
        setStats({
          generators: 0,
          recyclers: 0,
          pendingRequests: 0,
          completedRecycles: 0,
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex relative">

      {/* ☰ MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* 🌑 BACKDROP (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-700 text-white p-6 z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <h1 className="text-2xl font-bold mb-8">EcoBridge Admin</h1>

        <nav className="space-y-4">
          <button
            className="block w-full text-left hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </button>

          <button
            className="block w-full text-left hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Waste Generators
          </button>

          <button
            className="block w-full text-left hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Recyclers
          </button>

          <button
            className="block w-full text-left hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Waste Requests
          </button>

          <button
            className="block w-full text-left hover:text-green-200"
            onClick={() => setOpen(false)}
          >
            Assignments
          </button>

          <button
            className="block w-full text-left text-red-300 mt-10"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin/login";
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 p-4 md:p-8 mt-12 md:mt-0">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        {/* ---------- STATS GRID ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Waste Generators"
            value={stats?.generators}
            color="bg-blue-500"
          />

          <StatCard
            title="Recyclers"
            value={stats?.recyclers}
            color="bg-green-500"
          />

          <StatCard
            title="Pending Requests"
            value={stats?.pendingRequests}
            color="bg-yellow-500"
          />

          <StatCard
            title="Completed Recycles"
            value={stats?.completedRecycles}
            color="bg-teal-500"
          />
        </div>
      </main>
    </div>
  );
}

/* ---------- REUSABLE CARD ---------- */
function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow text-white ${color}`}>
      <p className="text-sm opacity-90">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value ?? "—"}</h3>
    </div>
  );
}
