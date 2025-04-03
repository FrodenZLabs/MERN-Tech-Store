// import React from 'react'
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  TextInput,
} from "flowbite-react";
import { HiChartPie, HiSearch } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUsersRectangle } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import SmallScreen from "../helpers/SmallScreen";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import { MdOutlineCreditScore, MdPayments } from "react-icons/md";
import { signoutSuccess } from "../redux/reducers/authSlice";
import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SidebarMenu = () => {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();
  const [currentPage, setCurrentPage] = useState("");
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
      toast.error("An error occurred while trying to log out");
    }
  };

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <div
      className={classNames("lg:!block h-full", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown"
        collapsed={isSidebarOpenOnSmallScreens && !SmallScreen()}
        className=" border-r border-gray-300"
      >
        <div className="flex h-full flex-col py-2">
          {/* Top section (Search + Sidebar Items) */}
          <div className="flex-1">
            <form action="" className="pb-3 md:hidden">
              <TextInput
                icon={HiSearch}
                placeholder="Search"
                size={32}
                required
                type="search"
              />
            </form>
            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem
                  href="/admin"
                  icon={HiChartPie}
                  className={"/admin" === currentPage ? "bg-gray-100" : ""}
                >
                  Dashboard
                </SidebarItem>
                <SidebarItem
                  href="/admin/products"
                  icon={AiFillProduct}
                  className={
                    "/admin/products" === currentPage ? "bg-gray-100" : ""
                  }
                >
                  Products
                </SidebarItem>
                <SidebarItem
                  href="/admin/users"
                  icon={FaUsers}
                  className={
                    "/admin/users" === currentPage ? "bg-gray-100" : ""
                  }
                >
                  Users
                </SidebarItem>
                <SidebarItem
                  href="/admin/guarantors"
                  icon={FaUsersRectangle}
                  className={
                    "/admin/guarantors" === currentPage ? "bg-gray-100" : ""
                  }
                >
                  Guarantors
                </SidebarItem>
                <SidebarItem
                  href="/admin/payments"
                  icon={MdPayments}
                  className={
                    "/admin/payments" === currentPage ? "bg-gray-100" : ""
                  }
                >
                  Payments
                </SidebarItem>
                <SidebarItem
                  href="/admin/credit-risks"
                  icon={GiCash}
                  className={
                    "/admin/credit-risks" === currentPage ? "bg-gray-100" : ""
                  }
                >
                  Credit Risks
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </div>

          {/* Bottom section (Sign Out button) */}
          <div className="mt-auto border-t border-gray-300 py-4">
            <SidebarItems>
              <SidebarItemGroup>
                <SidebarItem href="" icon={CgProfile}>
                  Profile
                </SidebarItem>
                <SidebarItem
                  icon={FaSignOutAlt}
                  className="bg-red-100 hover:bg-red-400 hover:text-white"
                  onClick={handleSignout}
                >
                  Sign Out
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
