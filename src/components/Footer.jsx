import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const socialIcons = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
  ];

  return (
    <footer className="bg-[#062e23] text-green-100 px-6 py-12 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        {/* Logo + About */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-white mb-2">EcoBridge</h1>
          <p className="text-green-200 max-w-xs">
            Smart waste coordination platform connecting generators with authorized recycling organizations.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <a href="#home" className="hover:text-green-300 transition-colors">Home</a>
          <a href="#features" className="hover:text-green-300 transition-colors">Features</a>
          <a href="#contact" className="hover:text-green-300 transition-colors">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4">
            {socialIcons.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.link}
                className="text-green-200 text-xl p-2 rounded-full"
                whileHover={{
                  scale: 1.3,
                  color: "#22c55e",
                  textShadow: "0 0 8px #22c55e",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-green-200 text-sm mt-12 border-t border-green-800 pt-4">
        &copy; {new Date().getFullYear()} EcoBridge. All rights reserved.
      </div>
    </footer>
  );
}
