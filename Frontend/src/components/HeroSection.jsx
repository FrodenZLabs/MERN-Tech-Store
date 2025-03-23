import HeroBg from "../assets/bg-hero.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url(${HeroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white max-w-xl"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-400 italic">Smart</span> Financing for
            Students – Own Tech, Pay Smartly!
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            AI-driven credit risk assessment & dynamic pricing for easy tech
            purchases.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
