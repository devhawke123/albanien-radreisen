import ContactHero from "../components/sections/contact/ContactHero";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactLocation from "../components/sections/contact/ContactLocation";
import FaqSection from "../components/sections/FaqSection";
import PageFooter from "../components/layout/PageFooter";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <FaqSection />
      <ContactLocation />
      <PageFooter />
    </>
  );
}
