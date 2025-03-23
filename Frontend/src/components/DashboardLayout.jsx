import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const DashboardLayout = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Always Visible */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar - Always Visible */}
        <Navbar />

        {/* Dynamic Content (Switching Pages) */}
        <div className="p-6">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
