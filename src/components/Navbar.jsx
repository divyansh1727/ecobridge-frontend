import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ currentStep, goHome }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (id) => {
    setIsOpen(false);

    if (currentStep !== "home") {
      goHome();
      setTimeout(() => scrollToSection(id), 350);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-950/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-2 md:py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("home")}>
          <img
            src={logo}
            alt="EcoBridge Logo"
            className="h-14 w-14 md:h-16 md:w-16 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-white font-semibold">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              onClick={() => handleNavClick(link.id)}
              className="hover:text-green-300 transition-colors cursor-pointer"
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-green-950/95 backdrop-blur-md text-white flex flex-col items-center gap-6 py-6"
        >
          {navLinks.map((link, idx) => (
            <motion.li
              key={idx}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleNavClick(link.id)}
              className="text-lg font-semibold hover:text-green-300 transition-colors cursor-pointer"
            >
              {link.name}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
}
