import HeroBg from "../../assets/images/Landing Page/bg-hero.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url(${HeroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-400 italic">Smart</span> Financing for
            Students – Own Tech, Pay Smartly!
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            AI-driven credit risk assessment & dynamic pricing for easy tech
            purchases.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
