export default function RoleSelect({ onSelect }) {
  return (
    <div className="min-h-screen bg-[#0b3d2e] flex flex-col items-center justify-center text-white px-6">
      
      <h2 className="text-3xl font-semibold mb-10 text-center">
        Select Your Role
      </h2>

      <div className="grid gap-6 w-80 mx-auto">

        <button
          onClick={() => onSelect("generator")}
          className="bg-white text-[#0b3d2e] py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          ♻️ Waste Generator
        </button>

        <button
          onClick={() => onSelect("recycler")}
          className="bg-green-200 text-[#0b3d2e] py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          🏭 Recycling Organization
        </button>

        <button
          onClick={() => onSelect("admin")}
          className="bg-green-900 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition shadow-lg"
        >
          🛡 Admin
        </button>

      </div>
    </div>
  );
}
