import { useState } from "react";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
  "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Lucknow"
];

const wasteTypes = [
  "Plastic", "Metal", "Paper", "Organic", "E-Waste", "Glass", "Textile", "Others"
];

export default function RecycleForm({onSubmit,onBack}) {
  const [form, setForm] = useState({
    orgName: "",
    contact: "",
    type: "",
    capacity: "",
    location: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile validation
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({ ...form, [name]: value });

    // Autocomplete for location
    if (name === "location") {
      const filtered = cities.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSelectCity = (city) => {
    setForm({ ...form, location: city });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (form.contact.length !== 10) tempErrors.contact = "Enter valid 10-digit mobile number";
    if (!form.type) tempErrors.type = "Please select type of waste";
    if (!form.capacity) tempErrors.capacity = "Enter capacity in kg";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
  console.log("Recycler form submitted:", form);

  if (onSubmit) {
    onSubmit(form); // 👈 THIS IS THE KEY LINE
  }
}

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 text-[#0b3d2e] rounded-2xl p-8 shadow-lg backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Recycler Registration Form</h2>

        {/* Organization Name */}
        <input
          type="text"
          name="orgName"
          placeholder="Organization Name"
          value={form.orgName}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white text-[#0b3d2e] placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Contact */}
        <input
          type="text"
          name="contact"
          placeholder="Mobile Number"
          value={form.contact}
          onChange={handleChange}
          required
          className={`w-full mb-4 p-3 rounded-lg bg-white text-[#0b3d2e] placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 ${errors.contact ? 'focus:ring-red-400' : 'focus:ring-green-400'}`}
        />
        {errors.contact && <p className="text-red-500 mb-2">{errors.contact}</p>}

        {/* Type of Waste */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className={`w-full mb-4 p-3 rounded-lg bg-white text-[#0b3d2e] shadow-sm focus:outline-none focus:ring-2 ${errors.type ? 'focus:ring-red-400' : 'focus:ring-green-400'}`}
        >
          <option value="">Select Waste Type</option>
          {wasteTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
        {errors.type && <p className="text-red-500 mb-2">{errors.type}</p>}

        {/* Capacity */}
        <div className="mb-4 flex items-center">
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-l-lg bg-white text-[#0b3d2e] placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <span className="bg-green-200 text-[#0b3d2e] px-4 py-3 rounded-r-lg font-semibold">kg</span>
        </div>
        {errors.capacity && <p className="text-red-500 mb-2">{errors.capacity}</p>}

        {/* Location with autocomplete */}
        <div className="relative mb-4">
          <input
            type="text"
            name="location"
            placeholder="City / Area"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white text-[#0b3d2e] placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white rounded-b-lg max-h-40 overflow-y-auto shadow-lg z-50 text-[#0b3d2e]">
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
        <button
  type="button"
  onClick={onBack}
  className="mt-4 w-full py-2 bg-gray-200 text-[#0b3d2e] rounded-xl font-semibold hover:bg-gray-300"
>
  Back
</button>

      </form>
    </div>
  );
}
