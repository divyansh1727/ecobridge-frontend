import { motion } from "framer-motion";
import { FaRecycle, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaRecycle className="text-green-400 text-3xl mb-2" />,
      title: "Smart Recycling",
      desc: "Connects waste generators with authorized recycling organizations efficiently."
    },
    {
      icon: <FaLeaf className="text-green-400 text-3xl mb-2" />,
      title: "Eco-Friendly",
      desc: "Encourages sustainable waste management practices to protect the environment."
    },
    {
      icon: <FaMapMarkerAlt className="text-green-400 text-3xl mb-2" />,
      title: "Real-time Tracking",
      desc: "Monitor waste collection, processing, and recycling progress in real time."
    },
  ];

  return (
    <section className="w-full px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-green-950/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-green-100">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
