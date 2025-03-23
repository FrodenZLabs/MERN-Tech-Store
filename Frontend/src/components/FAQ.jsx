import { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "How does the AI credit assessment work?",
      answer:
        "Our AI analyzes financial factors and assigns a credit risk score.",
    },
    {
      question: "What happens if I miss a payment?",
      answer:
        "You'll receive a notification with options to catch up, but repeated delays may affect future financing.",
    },
    {
      question: "Do I need a guarantor?",
      answer:
        "Yes, a guarantor is required to support your application and improve approval chances.",
    },
    {
      question: "What tech products can I purchase?",
      answer:
        "You can finance laptops, smartphones, tablets, and other essential tech devices.",
    },
    {
      question: "How is the repayment structured?",
      answer:
        "Payments are made in affordable monthly installments based on your financial capability.",
    },
    {
      question: "Can I upgrade my device before full repayment?",
      answer:
        "Yes, but eligibility depends on your repayment history and updated credit assessment.",
    },
    {
      question: "Is my personal data secure?",
      answer:
        "Absolutely. We use advanced encryption to protect your information.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up, complete the assessment, and explore available financing options.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="flex items-center h-[80vh] bg-[#f0f0f0]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center px-6"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-amber-500">
          Frequently Asked Questions
        </h2>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {questions.slice(0, 3).map((q, index) => (
              <FAQItem
                key={index}
                index={index}
                openIndex={openIndex}
                toggleQuestion={toggleQuestion}
                {...q}
              />
            ))}
          </div>

          {/* Middle Column */}
          <div className="space-y-4">
            {questions.slice(3, 6).map((q, index) => (
              <FAQItem
                key={index + 3}
                index={index + 3}
                openIndex={openIndex}
                toggleQuestion={toggleQuestion}
                {...q}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {questions.slice(6, 8).map((q, index) => (
              <FAQItem
                key={index + 6}
                index={index + 6}
                openIndex={openIndex}
                toggleQuestion={toggleQuestion}
                {...q}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* Reusable FAQ Item Component */
// eslint-disable-next-line react/prop-types
const FAQItem = ({ index, openIndex, toggleQuestion, question, answer }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Question Button */}
      <button
        onClick={() => toggleQuestion(index)}
        className="flex items-center justify-between w-full py-4 px-6 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        <span className="text-left font-medium">{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            openIndex === index ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Answer Panel (Collapsible Section) */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: openIndex === index ? "200px" : "0",
          padding: openIndex === index ? "16px" : "0px",
          opacity: openIndex === index ? 1 : 0,
        }}
      >
        {answer}
      </div>
    </div>
  );
};

export default FAQ;
