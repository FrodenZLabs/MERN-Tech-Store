import { useSidebarContext } from "../context/SidebarContext";
import { HiMenuAlt1, HiSearch, HiX } from "react-icons/hi";
import {
  Dropdown,
  Label,
  TextInput,
  Navbar,
  Avatar,
  NavbarBrand,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import SmallScreen from "../helpers/SmallScreen";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/reducers/authSlice";
import { toast } from "react-toastify";
import { logoutUser } from "../services/authService";

const NavbarHeader = () => {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();

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

  return (
    <Navbar fluid className="">
      <div className="w-full lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPageWithSidebar && (
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="sr-only">Toggle Sidebar</span>
                {isOpenOnSmallScreens && SmallScreen() ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            )}
            <NavbarBrand href="/">
              <img src="" alt="" className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold">
                Tech Store.
              </span>
            </NavbarBrand>
            <form action="" className="ml-16 hidden md:block">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <TextInput
                icon={HiSearch}
                id="search"
                name="search"
                placeholder="Search"
                size={32}
                type="search"
                required
              />
            </form>
          </div>
          <div className="flex items-center lg:gap-3">
            <div className="flex items-center">
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden"
              >
                <span className="sr-only">Search</span>
                <HiSearch className="h-6 w-6" />
              </button>
            </div>
            <div className="lg:block">
              <UserDropdown handleSignout={handleSignout} />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const UserDropdown = ({ handleSignout }) => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar rounded size="sm" />
        </span>
      }
    >
      <DropdownHeader>
        <span className="block text-sm">Neil Sims</span>
        <span className="block truncate text-sm font-medium">
          neil.sims@flowbite.com
        </span>
      </DropdownHeader>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
    </Dropdown>
  );
};

export default NavbarHeader;
