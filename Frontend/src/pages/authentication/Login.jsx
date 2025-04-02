import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import LoginImage from "../../assets/images/authentication/login.jpg";
import AboutBanner from "../../assets/images/Landing Page/about-banner.jpg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/reducers/authSlice";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { HashLoader } from "react-spinners";
import FooterSectionComponent from "../../components/FooterSectionComponent";
import NavbarHeaderComponent from "../../components/NavbarSectionComponent";
import { fetchUserPrediction } from "../../services/userService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const data = await loginUser(email, password);
      dispatch(signInSuccess(data));
      toast.success(data.message);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        try {
          const userPrediction = await fetchUserPrediction(data.user._id);

          // Redirect based on whether user has a credit prediction
          if (userPrediction) {
            navigate("/products"); // Regular user - redirect to dashboard
          } else {
            navigate("/credit-assessment"); // New user - redirect to credit assessment
          }
        } catch (error) {
          console.error("Error fetching prediction:", error);
          toast.error("Failed to fetch user prediction.");
        }
      }
    } catch (err) {
      dispatch(signInFailure(err));
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <>
      <NavbarHeaderComponent />

      <section
        className="relative bg-cover bg-center h-[20vh]"
        style={{
          backgroundImage: `url(${AboutBanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </section>

      <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
        {/* Full-screen loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
            <HashLoader color="#ffcb00" size={200} />
          </div>
        )}

        <Card
          horizontal
          imgSrc={LoginImage}
          imgAlt=""
          className="w-full md:max-w-4xl md:[&>*]:w-full md:[&>*]:p-10 [&>img]:hidden md:[&>img]:w-80 md:[&>img]:p-0 lg:[&>img]:block"
        >
          <h1 className="mb-3 text-2xl font-bold md:text-3xl">
            Sign in to platform
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4 flex flex-col gap-y-3">
              <Label htmlFor="email">Your email</Label>
              <TextInput
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="mb-6 flex flex-col gap-y-3 relative">
              <Label htmlFor="password">Your password</Label>
              <TextInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-3 top-[60%] transform"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <MdVisibilityOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <MdVisibility className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <Checkbox id="rememberMe" name="rememberMe" />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
              <a
                href="#"
                className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
              >
                Forgot Password?
              </a>
            </div>
            <div className="mb-6 w-full">
              <Button
                type="submit"
                className="w-full flex items-center gap-x-4 bg-blue-500 hover:bg-green-500 transition duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Logging in...
                  </>
                ) : (
                  "Login to your account"
                )}
              </Button>
            </div>

            <p className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </Card>
      </div>
      <FooterSectionComponent />
    </>
  );
};

export default LoginPage;
