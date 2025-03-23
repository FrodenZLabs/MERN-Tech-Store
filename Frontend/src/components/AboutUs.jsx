import { motion } from "framer-motion";
import { HiLightBulb, HiShieldCheck, HiEye, HiUserGroup } from "react-icons/hi";
import Team1 from "../assets/team-1.jpg";
import Team2 from "../assets/team-2.jpg";
import Team3 from "../assets/team-3.jpg";

const AboutUs = () => {
  return (
    <section id="about-us" className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-amber-500">
            About Us
          </h2>
          <p className="text-lg lg:text-2xl text-gray-600 font-light">
            Empowering students to access technology through innovative
            financing solutions.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Mission */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800">Our Mission</h3>
            <p className="text-gray-700 text-justify">
              At TechFin, our mission is to make technology accessible to every
              student by providing flexible and affordable financing options
              powered by AI-driven credit risk assessment.
            </p>
            <p className="text-gray-700 text-justify">
              We believe that everyone deserves the opportunity to own the tools
              they need to succeed in their academic and professional journeys.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800">Our Vision</h3>
            <p className="text-gray-700 text-justify">
              Our vision is to revolutionize the way students purchase
              technology by creating a seamless, secure, and transparent
              financing experience.
            </p>
            <p className="text-gray-700 text-justify">
              We aim to be the go-to platform for students seeking smart and
              responsible financial solutions.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 space-y-8">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center text-amber-500"
          >
            Meet Our Team
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <img
                src={Team1}
                alt="CEO"
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h4 className="text-lg font-bold">John Doe</h4>
              <span className="text-gray-600">Founder & CEO</span>
              <p className="text-center text-gray-700 mt-2">
                John leads the vision and strategy behind TechFin, leveraging
                his expertise in AI and finance.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <img
                src={Team2}
                alt="CTO"
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h4 className="text-lg font-bold">Jane Smith</h4>
              <span className="text-gray-600">Chief Technology Officer</span>
              <p className="text-center text-gray-700 mt-2">
                Jane oversees the development of our cutting-edge AI algorithms
                and ensures a smooth user experience.
              </p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <img
                src={Team3}
                alt="COO"
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h4 className="text-lg font-bold">Alex Johnson</h4>
              <span className="text-gray-600">Chief Operating Officer</span>
              <p className="text-center text-gray-700 mt-2">
                Alex manages day-to-day operations and ensures that our platform
                runs efficiently and securely.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 space-y-8">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center text-amber-500"
          >
            Our Core Values
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 - Innovation */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <HiLightBulb className="h-12 w-12 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold mt-4">Innovation</h4>
              <p className="text-gray-700 mt-2">
                We continuously innovate to provide the best solutions for our
                users.
              </p>
            </div>

            {/* Value 2 - Security */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <HiShieldCheck className="h-12 w-12 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold mt-4">Security</h4>
              <p className="text-gray-700 mt-2">
                Your data and transactions are always protected with our
                advanced security measures.
              </p>
            </div>

            {/* Value 3 - Transparency */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <HiEye className="h-12 w-12 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold mt-4">Transparency</h4>
              <p className="text-gray-700 mt-2">
                We maintain complete transparency in all our processes and
                communications.
              </p>
            </div>

            {/* Value 4 - Customer Focus */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <HiUserGroup className="h-12 w-12 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold mt-4">Customer Focus</h4>
              <p className="text-gray-700 mt-2">
                Our primary goal is to deliver exceptional value and service to
                our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
