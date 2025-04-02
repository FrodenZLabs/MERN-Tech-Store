import FooterSectionComponent from "../components/FooterSectionComponent";
import AboutUs from "../components/Landing Page/AboutUs";
import FAQ from "../components/Landing Page/FAQ";
import FinalCTA from "../components/Landing Page/FinalCTA";
import HeroSection from "../components/Landing Page/HeroSection";
import HowItWorks from "../components/Landing Page/HowItWorks";
import KeyFeatures from "../components/Landing Page/KeyFeatures";
import Testimonials from "../components/Landing Page/Testimonials";
import NavbarHeaderComponent from "../components/NavbarSectionComponent";

const LandingPage = () => {
  return (
    <>
      <NavbarHeaderComponent />
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <AboutUs />
      <Testimonials />
      <FinalCTA />
      <FAQ />
      <FooterSectionComponent />
    </>
  );
};

export default LandingPage;
