import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/services/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/reducers/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while trying to logout out");
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button
        onClick={handleSignout}
        className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
