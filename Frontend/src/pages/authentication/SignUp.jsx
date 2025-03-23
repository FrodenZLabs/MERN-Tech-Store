import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/reducers/authSlice";
import { registerUser } from "../../redux/services/authService";
import { toast } from "react-toastify";
import NavbarHeader from "../../components/NavbarHeader";
import { motion } from "framer-motion";
import AboutBanner from "../../assets/about-banner.jpg";
import Footer from "../../components/Footer";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.authentication);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpStart());

    try {
      const data = await registerUser(formData);
      dispatch(signUpSuccess());
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      dispatch(signUpFailure(err));
      toast.error(error);
    }
  };

  return (
    <>
      <NavbarHeader />
      <section
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${AboutBanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex items-end justify-center h-full pb-[8vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-xl"
          >
            <h1 className="text-5xl font-bold mb-4">Create an account</h1>
          </motion.div>
        </div>
      </section>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 uppercase">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-600 text-lg font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-green-300"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-green-500 text-white p-3 rounded-xl uppercase text-lg font-semibold hover:bg-green-700 transition disabled:bg-green-300"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
