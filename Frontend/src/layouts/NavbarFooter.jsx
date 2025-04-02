import FooterSectionComponent from "../components/FooterSectionComponent";
import { Outlet } from "react-router-dom";
import NavbarSection from "../components/NavbarSection";

const NavbarFooter = () => {
  return (
    <div>
      <NavbarSection />
      <Outlet />
      <FooterSectionComponent />
    </div>
  );
};

export default NavbarFooter;
