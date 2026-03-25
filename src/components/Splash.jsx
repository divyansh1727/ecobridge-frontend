import logo from "../assets/logo.png";

export default function Splash() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0b3d2e]">
      
      <div className="flex flex-col items-center animate-fadeIn">
        
        {/* Logo */}
        <div className="bg-white rounded-full p-5 shadow-lg mb-6">
          <img
            src={logo}
            alt="EcoBridge Logo"
            className="w-20 h-20"
          />
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold tracking-wide text-white">
          Eco<span className="text-green-300">Bridge</span>
        </h1>

        {/* Tagline */}
        <p className="mt-2 text-green-200 text-sm tracking-wider">
          Connecting Waste to Worth
        </p>

        {/* Loader */}
        <div className="mt-8 h-1 w-32 bg-green-900 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-green-300 animate-loadingBar"></div>
        </div>

      </div>
    </div>
  );
}
