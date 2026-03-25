import { useState, useEffect } from "react";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
  "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Lucknow", "Nagpur","Gujarat"
];

const wasteTypes = [
  "Plastic", "Metal", "Paper", "Organic", "E-Waste", "Glass", "Textile", "Others"
];

export default function WasteForm({ onSubmitWaste }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: "",
    quantity: "",
    location: "",
  });

  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ✅ Auto Detect Location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log("Detected coords:", position.coords);
      },
      (error) => {
        console.error("Location error:", error);
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({ ...form, [name]: value });

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
  const getCoordinates = async (locationName) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName + ", India")}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );

    const data = await res.json();

    console.log("Geocode response:", data); // 🔥 debug

    if (!data.results || data.results.length === 0) {
      throw new Error("Invalid location");
    }

    return data.results[0].geometry.location;

  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  let tempErrors = {};

  if (form.contact.length !== 10)
    tempErrors.contact = "Enter valid 10-digit mobile number";

  if (!form.type)
    tempErrors.type = "Please select type of waste";

  if (!form.quantity || Number(form.quantity) <= 0)
    tempErrors.quantity = "Enter valid quantity";

  if (!form.location)
    tempErrors.location = "Please enter location";

  setErrors(tempErrors);

  if (Object.keys(tempErrors).length !== 0) return;

  try {
    setLoading(true);

    let finalCoords = null;

    // 🔥 TRY GEOCODING FIRST
    const geoCoords = await getCoordinates(form.location);

    if (geoCoords) {
      finalCoords = {
        latitude: geoCoords.lat,
        longitude: geoCoords.lng,
      };
      console.log("Using typed location:", finalCoords);
    } 
    // 🔥 FALLBACK TO GPS
    else if (coords) {
      finalCoords = coords;
      console.log("Fallback to GPS:", finalCoords);
    } 
    else {
      alert("Unable to detect location");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/compare`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wasteType: form.type,
          quantity: Number(form.quantity),
          latitude: finalCoords.latitude,
          longitude: finalCoords.longitude,
        }),
      }
    );

    const comparisonResults = await res.json();

    onSubmitWaste(comparisonResults, form.type, form.location);

  } catch (err) {
    console.error("Error fetching recycler comparison:", err);
    alert("Failed to fetch recycler comparison");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 text-[#0b3d2e] rounded-2xl p-8 shadow-lg backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Find Best Recycler
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400"
        />

        <input
          type="text"
          name="contact"
          placeholder="Mobile Number"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full mb-2 p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full mb-2 p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select Waste Type</option>
          {wasteTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>

        <div className="mb-2 flex items-center">
          <input
            type="number"
            min="1"
            step="1"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-l-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400"
          />
          <span className="bg-green-200 px-4 py-3 rounded-r-lg font-semibold">
            kg
          </span>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            name="location"
            placeholder="City"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400"
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

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 bg-green-300 text-[#062e23] font-bold rounded-2xl hover:bg-green-200 shadow-lg disabled:opacity-50"
        >
          {loading ? "Comparing..." : "Compare Recyclers"}
        </button>
      </form>
    </div>
  );
}