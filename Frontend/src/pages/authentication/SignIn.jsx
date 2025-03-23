import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/reducers/authSlice";
import {
  fetchUserPrediction,
  loginUser,
} from "../../redux/services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import NavbarHeader from "../../components/NavbarHeader";
import AboutBanner from "../../assets/about-banner.jpg";
import { motion } from "framer-motion";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const data = await loginUser(email, password);
      dispatch(signInSuccess(data));
      toast.success(data.message);

      // Fetch user's credit prediction status
      try {
        const userPrediction = await fetchUserPrediction(data.user._id);
        console.log("User Prediction:", userPrediction);

        // Redirect based on whether user has a credit prediction
        if (userPrediction) {
          navigate("/dashboard"); // Regular user - redirect to dashboard
        } else {
          navigate("/credit-assessment"); // New user - redirect to credit assessment
        }
      } catch (predictionError) {
        console.error("Error fetching prediction:", predictionError);
        toast.error("Failed to fetch user prediction.");
      }
    } catch (err) {
      dispatch(signInFailure(err));
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
            <h1 className="text-5xl font-bold mb-4">Welcome back</h1>
          </motion.div>
        </div>
      </section>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 uppercase">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-600 text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-green-500 text-white p-3 rounded-xl text-lg uppercase font-semibold hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
