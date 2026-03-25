import { useState, useEffect } from "react";

const wasteTypes = [
  "Plastic",
  "Metal",
  "Paper",
  "Organic",
  "E-Waste",
  "Glass",
  "Textile",
  "Others"
];

export default function RecycleForm({ onBack, onSubmit }) {
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  wasteType: "",
  minQuantity: "",
  pricePerKg: "",
  processingMethod: "",
  availability: true
});

  const [coords, setCoords] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* 🔥 Auto detect location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error("Location error:", error);
        alert("Please allow location access to register recycler.");
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  let tempErrors = {};

  if (!form.name) tempErrors.name = "Enter organization name";
  if (!form.email) tempErrors.email = "Enter email";
  if (!form.password) tempErrors.password = "Enter password";
  if (!form.wasteType) tempErrors.wasteType = "Select waste type";
  if (!form.minQuantity) tempErrors.minQuantity = "Enter minimum quantity";
  if (!form.pricePerKg) tempErrors.pricePerKg = "Enter price per kg";
  if (!form.processingMethod) tempErrors.processingMethod = "Enter method";
  if (!coords) tempErrors.coords = "Location not detected";

  setErrors(tempErrors);
  if (Object.keys(tempErrors).length !== 0) return;

  try {
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recycler/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          minQuantity: Number(form.minQuantity),
          pricePerKg: Number(form.pricePerKg),
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      }
    );

    if (!res.ok) throw new Error("Registration failed");

    const data = await res.json();

    // ✅ SAVE CORRECT ID
    localStorage.setItem("recyclerId", data.recycler._id);

    alert("Recycler registered successfully!");

    onSubmit();

  } catch (err) {
    console.error(err);
    alert("Failed to register recycler");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 text-[#0b3d2e] rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Recycler Registration
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Organization Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg border"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <select
          name="wasteType"
          value={form.wasteType}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg border"
        >
          <option value="">Select Waste Type</option>
          {wasteTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.wasteType && <p className="text-red-500">{errors.wasteType}</p>}


        <input
          type="number"
          name="minQuantity"
          placeholder="Minimum Quantity (kg)"
          value={form.minQuantity}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg border"
        />
        {errors.minQuantity && <p className="text-red-500">{errors.minQuantity}</p>}

        <input
          type="number"
          name="pricePerKg"
          placeholder="Price per Kg (₹)"
          value={form.pricePerKg}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg border"
        />
        {errors.pricePerKg && <p className="text-red-500">{errors.pricePerKg}</p>}

        <input
          type="text"
          name="processingMethod"
          placeholder="Processing Method"
          value={form.processingMethod}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg border"
        />
        {errors.processingMethod && <p className="text-red-500">{errors.processingMethod}</p>}
        <input
  type="email"
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={handleChange}
  className="w-full mb-3 p-3 rounded-lg border"
/>

<input
  type="password"
  name="password"
  placeholder="Password"
  value={form.password}
  onChange={handleChange}
  className="w-full mb-3 p-3 rounded-lg border"
/>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-3 bg-green-300 font-bold rounded-2xl hover:bg-green-200"
        >
          {loading ? "Registering..." : "Register Recycler"}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="mt-4 w-full py-2 bg-gray-200 rounded-xl font-semibold"
        >
          Back
        </button>
      </form>
    </div>
  );
}