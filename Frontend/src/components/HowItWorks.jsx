import { FaFileAlt, FaCheckCircle, FaLaptop } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileAlt />,
      title: "Apply for Credit Assessment",
      description: "Fill out a short form for AI-based credit evaluation.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Get Personalized Offers",
      description: "AI suggests the best financing plans based on credit risk.",
    },
    {
      icon: <FaLaptop />,
      title: "Own Tech, Pay Smartly",
      description: "Purchase a device and pay flexibly.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-gray-100 h-[60vh] flex items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-amber-500">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center p-6 bg-white rounded-lg shadow-md text-left space-x-4"
              whileHover={{
                scale: 1.07,
                x: [0, -3, 3, -3, 3, 0],
                y: [0, -3, 3, -3, 3, 0],
                transition: { duration: 0.4 },
              }}
            >
              {/* Icon Section */}
              <div className="text-4xl text-amber-600 flex-shrink-0">
                {step.icon}
              </div>

              {/* Text Section */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
