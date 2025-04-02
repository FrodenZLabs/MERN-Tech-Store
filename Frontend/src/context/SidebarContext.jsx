import { createContext, useContext, useEffect, useState } from "react";
import Browser from "../helpers/Browser";
import SmallScreen from "../helpers/SmallScreen";

const SidebarContext = createContext(undefined);

export const SidebarProvider = ({ children }) => {
  const location = Browser() ? window.location.pathname : "/";
  const [isOpen, setOpen] = useState(
    Browser() ? window.localStorage.getItem("isSidebarOpen") === "true" : false
  );

  // Save latest state to localStorage
  useEffect(() => {
    window.localStorage.setItem("isSidebarOpen", isOpen.toString());
  }, [isOpen]);

  // Close Sidebar on page change on mobile
  useEffect(() => {
    if (SmallScreen) {
      setOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const handleMobileTapInsideMain = (event) => {
      const main = document.querySelector("main");
      const isClickInsideMain = main?.contains(event.target);
      if (SmallScreen() && isClickInsideMain) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMobileTapInsideMain);
    return () => {
      document.removeEventListener("mousedown", handleMobileTapInsideMain);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpenOnSmallScreens: isOpen,
        isPageWithSidebar: true,
        setOpenOnSmallScreens: setOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useSidebarContext should be used within the SidebarContext provider!"
    );
  }

  return context;
};
