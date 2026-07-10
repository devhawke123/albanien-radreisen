import AboutUs from "./components/AboutUs";
import ExploreCta from "./components/ExploreCta";
import FaqSection from "./components/FaqSection";
import FeaturedTours from "./components/FeaturedTours";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import StatsBanner from "./components/StatsBanner";
import WhyChooseUs from "./components/WhyChooseUs";

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
      <ExploreCta />
      <Footer />
    </main>
  );
}

export default App;
