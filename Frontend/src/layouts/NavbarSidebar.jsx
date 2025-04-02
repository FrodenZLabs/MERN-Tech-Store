import classNames from "classnames";
import NavbarHeader from "../components/NavbarHeader";
import { SidebarMenu } from "../components/SidebarMenu";
import { Footer, FooterLink, FooterLinkGroup } from "flowbite-react";
import { SidebarProvider, useSidebarContext } from "../context/SidebarContext";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

export function NavbarSidebar({ children, isFooter = true }) {
  return (
    <SidebarProvider>
      <NavbarHeader />
      <div className="flex items-start h-[90vh]">
        <SidebarMenu />
        <MainContent isFooter={isFooter}>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}

function MainContent({ children, isFooter }) {
  const { isOpenOnSmallScreens: isSidebarOpen } = useSidebarContext();

  return (
    <main
      className={classNames(
        "overflow-y-auto relative w-full h-full bg-gray-50 transition-all duration-300",
        isSidebarOpen ? "" : ""
      )}
    >
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  );
}

function MainContentFooter() {
  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <FooterLinkGroup>
            <FooterLink href="#" className="mr-3 mb-3 lg:mb-0">
              Terms and conditions
            </FooterLink>
            <FooterLink href="#" className="mr-3 mb-3 lg:mb-0">
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" className="mr-3">
              Licensing
            </FooterLink>
            <FooterLink href="#" className="mr-3">
              Cookie Policy
            </FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup>
            <div className="flex gap-4 md:gap-0">
              <FooterLink href="#" className="hover:[&>*]:text-black">
                <MdFacebook className="text-lg" />
              </FooterLink>
              <FooterLink href="#" className="hover:[&>*]:text-black">
                <FaInstagram className="text-lg" />
              </FooterLink>
              <FooterLink href="#" className="hover:[&>*]:text-black">
                <FaGithub className="text-lg" />
              </FooterLink>
              <FooterLink href="#" className="hover:[&>*]:text-black">
                <FaTwitter className="text-lg" />
              </FooterLink>
              <FooterLink href="#" className="hover:[&>*]:text-black">
                <FaDribbble className="text-lg" />
              </FooterLink>
            </div>
          </FooterLinkGroup>
        </div>
      </Footer>
      <p className="my-8 text-center text-sm text-gray-500">
        &copy; 2024 Frodev.com. All rights reserved.
      </p>
    </>
  );
}

export default NavbarSidebar;
