import { motion } from "framer-motion";
import Banner from "../assets/banner.jpg";

const FinalCTA = () => {
  return (
    <section
      id="signup"
      className="relative bg-cover bg-center py-16"
      style={{
        backgroundImage: `url(${Banner})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        viewport={{ once: true }}
        className="relative z-10 text-center text-white"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">
          Ready to Get Started?
        </h2>
        <motion.a
          href="/register"
          whileHover={{ scale: 1.05 }}
          className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-700 text-white font-medium rounded-lg shadow-md uppercase"
        >
          Sign Up Now
        </motion.a>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
