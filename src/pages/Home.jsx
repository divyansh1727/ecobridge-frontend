import { motion } from "framer-motion"; 
import logo from "../assets/logo.png";
import { FaRecycle, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";

export default function Home({ onContinue }) {
  const features = [
    {
      icon: <FaRecycle />,
      title: "Efficient Recycling",
      desc: "Connect with certified recycling centers based on your waste type and quantity.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly",
      desc: "Promote sustainable practices and reduce environmental impact.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Smart Tracking",
      desc: "Track your waste collection and disposal in real-time.",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#062e23] via-[#0b3d2e] to-[#0f5132] text-white"
    >

      {/* Logo */}
      <motion.img
        src={logo}
        alt="EcoBridge Logo"
        className="h-24 w-24 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      />

      {/* Headline */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Smart Waste Coordination for a <span className="text-green-300">Sustainable Future</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 text-lg md:text-xl text-green-100 max-w-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        EcoBridge connects waste generators with authorized recycling and processing organizations intelligently.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onContinue}
        className="mt-10 px-12 py-4 bg-green-300 text-[#062e23] rounded-2xl text-lg font-bold hover:bg-green-200 shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 120 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>

      {/* Bottom Icons */}
      <motion.div
        className="flex gap-12 mt-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <FaRecycle className="text-green-400 text-4xl mb-2" />
          <span className="text-green-100">Recycling</span>
        </div>

        <div className="flex flex-col items-center">
          <FaLeaf className="text-green-400 text-4xl mb-2" />
          <span className="text-green-100">Eco-Friendly</span>
        </div>

        <div className="flex flex-col items-center">
          <FaMapMarkerAlt className="text-green-400 text-4xl mb-2" />
          <span className="text-green-100">Tracking</span>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        id="features"
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-green-950/70 backdrop-blur-md shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <div className="text-green-300 text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-green-100">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
