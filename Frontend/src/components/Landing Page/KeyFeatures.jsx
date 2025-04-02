import { FaBrain, FaChartLine, FaLock, FaMoneyBillWave } from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Credit Risk Assessment",
      description: "Advanced AI algorithms evaluate your creditworthiness.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Flexible Payment Plans",
      description: "Choose payment plans that fit your budget.",
    },
    {
      icon: <FaChartLine />,
      title: "Real-Time Credit Monitoring",
      description: "Track your credit score in real-time.",
    },
    {
      icon: <FaLock />,
      title: "Secure & Transparent Transactions",
      description: "Your data and transactions are always secure.",
    },
  ];

  return (
    <section id="features" className="h-[70vh] flex items-center bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-amber-500">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-6 bg-white rounded-lg shadow-md text-left space-x-4"
            >
              <div className="text-4xl text-amber-600 mb-4">{feature.icon}</div>

              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
