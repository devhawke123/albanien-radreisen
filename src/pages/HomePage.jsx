import AboutUs from "../components/sections/AboutUs";
import FaqSection from "../components/sections/FaqSection";
import FeaturedTours from "../components/sections/FeaturedTours";
import Gallery from "../components/sections/Gallery";
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import JourneyOverview from "../components/sections/JourneyOverview";
import PageFooter from "../components/layout/PageFooter";
import StatsBanner from "../components/sections/StatsBanner";
import Testimonials from "../components/sections/Testimonials";
import WhyChooseUs from "../components/sections/WhyChooseUs";

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
