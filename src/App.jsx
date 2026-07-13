import AboutUs from "./components/sections/AboutUs";
import FaqSection from "./components/sections/FaqSection";
import FeaturedTours from "./components/sections/FeaturedTours";
import Gallery from "./components/sections/Gallery";
import Hero from "./components/sections/Hero";
import HowItWorks from "./components/sections/HowItWorks";
import JourneyOverview from "./components/sections/JourneyOverview";
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
      <Gallery />
      <JourneyOverview />
      <PageFooter />
    </main>
  );
}

export default App;
