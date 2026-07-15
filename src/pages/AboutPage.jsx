import AboutHero from "../components/sections/about/AboutHero";
import AboutIntro from "../components/sections/about/AboutIntro";
import MeetTheTeam from "../components/sections/about/MeetTheTeam";
import FaqSection from "../components/sections/FaqSection";
import HowItWorks from "../components/sections/HowItWorks";
import PageFooter from "../components/layout/PageFooter";
import WhyChooseUs from "../components/sections/WhyChooseUs";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <WhyChooseUs />
      <MeetTheTeam />
      <HowItWorks />
      <FaqSection />
      <PageFooter />
    </>
  );
}
