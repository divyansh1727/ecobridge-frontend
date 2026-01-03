import { useState } from "react";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
  "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Lucknow"
];

// Predefined waste types
const wasteTypes = [
  "Plastic", "Metal", "Paper", "Organic", "E-Waste", "Glass", "Textile", "Others"
];

export default function WasteForm({ onSubmitWaste, onBack}) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: "",
    quantity: "",
    location: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate mobile number
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({ ...form, [name]: value });

    // Autocomplete for location
    if (name === "location") {
      if (value === "") {
        setSuggestions([]);
      } else {
        const filtered = cities.filter(city =>
          city.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }
  };

  const handleSelectCity = (city) => {
    setForm({ ...form, location: city });
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  let tempErrors = {};
  if (form.contact.length !== 10)
    tempErrors.contact = "Enter valid 10-digit mobile number";
  if (!form.type)
    tempErrors.type = "Please select type of waste";
  setErrors(tempErrors);

  if (Object.keys(tempErrors).length === 0) {
    const wasteRequest = {
      ...form,
      status: "PENDING",
    };

    try {
      const res = await fetch("https://ecbridge.onrender.com/api/waste"
, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wasteRequest),
      });

      const data = await res.json();

      // send data to App.jsx
      if (onSubmitWaste) {
        onSubmitWaste(data);
      }

      alert("Waste request submitted successfully!");
    } catch (error) {
      console.error("Error submitting waste:", error);
      alert("Failed to submit waste request");
    }
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 text-[#0b3d2e] rounded-2xl p-8 shadow-lg backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Waste Collection Form
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Contact */}
        <input
          type="text"
          name="contact"
          placeholder="Mobile Number"
          value={form.contact}
          onChange={handleChange}
          required
          className={`w-full mb-2 p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 ${
            errors.contact ? "focus:ring-red-400" : "focus:ring-green-400"
          }`}
        />
        {errors.contact && (
          <p className="text-red-500 mb-2">{errors.contact}</p>
        )}

        {/* Waste Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className={`w-full mb-2 p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 ${
            errors.type ? "focus:ring-red-400" : "focus:ring-green-400"
          }`}
        >
          <option value="">Select Waste Type</option>
          {wasteTypes.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 mb-2">{errors.type}</p>
        )}

        {/* Quantity */}
        <div className="mb-4 flex items-center">
          <input
            type="number"
            min="1"
            step="1"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-l-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <span className="bg-green-200 px-4 py-3 rounded-r-lg font-semibold">
            kg
          </span>
        </div>
        {errors.quantity && (
          <p className="text-red-500 mb-2">{errors.quantity}</p>
        )}

        {/* Location */}
        <div className="relative mb-4">
          <input
            type="text"
            name="location"
            placeholder="City / Area"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white rounded-b-lg max-h-40 overflow-y-auto shadow-lg z-50">
              {suggestions.map((city, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-green-100 cursor-pointer"
                  onClick={() => handleSelectCity(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-green-300 text-[#062e23] font-bold rounded-2xl hover:bg-green-200 shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
