import AboutUs from "./components/sections/AboutUs";
import FaqSection from "./components/sections/FaqSection";
import FeaturedTours from "./components/sections/FeaturedTours";
import Hero from "./components/sections/Hero";
import HowItWorks from "./components/sections/HowItWorks";
import PageFooter from "./components/layout/PageFooter";
import StatsBanner from "./components/sections/StatsBanner";
import Testimonials from "./components/sections/Testimonials";
import WhyChooseUs from "./components/sections/WhyChooseUs";

function App() {
  return (
    <main className="bg-white">
      <Hero />
      <AboutUs />
      <StatsBanner />
      <FeaturedTours />
      <WhyChooseUs />
      <HowItWorks />
      <FaqSection />
      <Testimonials />
      <PageFooter />
    </main>
  );
}

export default App;
