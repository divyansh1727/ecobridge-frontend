import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName",data.user.id);
      
      

      // Redirect to dashboard
      onLoginSuccess(data.user.role);

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white text-black p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
       Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}