import AboutUs from "../components/AboutUs";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import FooterSection from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import KeyFeatures from "../components/KeyFeatures";
import NavbarHeader from "../components/NavbarHeader";
import Testimonials from "../components/Testimonials";

const LandingPage = () => {
  return (
    <>
      <NavbarHeader />
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <AboutUs />
      <Testimonials />
      <FinalCTA />
      <FAQ />
      <FooterSection />
    </>
  );
};

export default LandingPage;
