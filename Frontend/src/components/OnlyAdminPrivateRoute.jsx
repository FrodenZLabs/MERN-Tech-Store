import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.authentication);

  return currentUser && currentUser.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default OnlyAdminPrivateRoute;
