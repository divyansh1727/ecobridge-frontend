export default function ComparisonTable({ results, wasteType, location, onBack }) {

  // 🔒 SAFETY CHECK
  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="text-center mt-10 text-white">
        <h2 className="text-xl font-bold text-red-400">
          No eligible recyclers found
        </h2>
        <button
          onClick={onBack}
          className="mt-4 bg-green-400 px-4 py-2 rounded-lg hover:bg-green-300 transition"
        >
          Back
        </button>
      </div>
    );
  }

  // 🔐 USER ID FIX
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = "user_" + Date.now();
    localStorage.setItem("userId", userId);
  }

  // ✅ SELECT FUNCTION
  const handleSelect = async (recycler) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generatorId: userId,
            contact: "9999999999",
            wasteType,
            quantity: recycler.pricePerKg
              ? recycler.totalEarning / recycler.pricePerKg
              : 0,
            recyclerId: recycler._id
          })
        }
      );

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      alert("Request created successfully");
      onBack(data._id);

    } catch (err) {
      console.error(err);
      alert("Failed to create request");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] p-4 text-white">

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        ♻️ Smart Recycler Comparison
      </h2>

      {/* 🌍 GOOGLE SEARCH */}
      <div className="text-center mb-6">
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(
            wasteType + " recycling in " + location
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 transition shadow-lg"
        >
          🌍 Explore More on Maps
        </a>
      </div>

      {/* 📱 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-xl">

          <thead className="bg-white/20 text-sm md:text-base">
            <tr>
              <th className="p-3">Recycler</th>
              <th className="p-3">Distance</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
              <th className="p-3">Method</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r, index) => {

              // 🔥 DEBUG (REMOVE LATER)
              console.log("Recycler:", r);

              const isGoogle = String(r._id).startsWith("g_");

              return (
                <tr
                  key={index}
                  className={`border-b border-white/10 hover:bg-white/10 transition ${
                    r.recommended ? "bg-green-400/20" : ""
                  }`}
                >
                  <td className="p-3 font-semibold">{r.name}</td>

                  <td className="p-3 text-sm">
                    {r.distanceKm || "-"}
                  </td>

                  <td className="p-3">₹{r.pricePerKg}</td>

                  <td className="p-3 text-green-300 font-bold">
                    ₹{r.totalEarning}
                  </td>

                  <td className="p-3 text-xs md:text-sm">
                    {r.processingMethod}
                  </td>

                  <td className="p-3">
                    {r.rating ? `⭐ ${r.rating}` : "-"}
                  </td>

                  {/* ✅ FINAL FIXED ACTION COLUMN */}
                  <td className="p-3">
                    {isGoogle ? (
                      r.placeId ? (
                        <a
  href={`https://www.google.com/maps/search/?api=1&query=${r.name}&query_place_id=${r.placeId}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 text-white text-sm"
>
  View 🌍
</a>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No Link
                        </span>
                      )
                    ) : (
                      <button
                        onClick={() => handleSelect(r)}
                        className="bg-green-400 px-3 py-1 rounded-lg hover:bg-green-300 text-black font-semibold"
                      >
                        Select
                      </button>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* BACK BUTTON */}
      <div className="text-center mt-6">
        <button
          onClick={onBack}
          className="bg-green-400 px-4 py-2 rounded-xl hover:bg-green-300 transition text-black font-semibold"
        >
          ⬅ Back
        </button>
      </div>

    </div>
  );
}