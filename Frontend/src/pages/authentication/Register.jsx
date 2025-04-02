import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import CreateAccountImage from "../../assets/images/authentication/create-account.jpg";
import AboutBanner from "../../assets/images/Landing Page/about-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/reducers/authSlice";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";
import { HiMail } from "react-icons/hi";
import { MdKey, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { HashLoader } from "react-spinners";
import FooterSectionComponent from "../../components/FooterSectionComponent";
import NavbarHeaderComponent from "../../components/NavbarSectionComponent";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.authentication);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev); // Toggle confirm password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(signUpStart());

    try {
      const data = await registerUser(formData);
      dispatch(signUpSuccess());
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      dispatch(signUpFailure(err));
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

      <div className="flex flex-col items-center justify-center lg:h-screen lg:gap-y-12">
        {/* Full-screen loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
            <HashLoader color="#ffcb00" size={200} />
          </div>
        )}

        <Card
          horizontal
          imgSrc={CreateAccountImage}
          imgAlt=""
          className="w-full md:max-w-4xl md:[&>*]:w-full md:[&>*]:p-8 [&>img]:hidden md:[&>img]:w-80 md:[&>img]:p-0 lg:[&>img]:block"
        >
          <h1 className="mb-3 text-2xl font-bold md:text-3xl">
            Create a Free Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
              <div className="mb-4 flex flex-col gap-y-3">
                <Label htmlFor="username">Your username</Label>
                <TextInput
                  id="username"
                  name="username"
                  addon="@"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="username"
                  type="text"
                />
              </div>
              <div className="mb-4 flex flex-col gap-y-3">
                <Label htmlFor="email">Your email</Label>
                <TextInput
                  id="email"
                  name="email"
                  icon={HiMail}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  type="email"
                />
              </div>
              <div className="mb-4 flex flex-col gap-y-3 relative">
                <Label htmlFor="password">Your password</Label>
                <TextInput
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={MdKey}
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
              {/* Confirm Password Field */}
              <div className="mb-4 flex flex-col gap-y-3 relative">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  icon={MdKey}
                  required
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[60%] transform"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-7 mt-5 w-full">
              <Button
                type="submit"
                className="w-full flex items-center gap-x-4 bg-blue-500 hover:bg-green-500 transition duration-300 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Signing up...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </Card>
      </div>
      <FooterSectionComponent />
    </>
  );
};

export default RegisterPage;
