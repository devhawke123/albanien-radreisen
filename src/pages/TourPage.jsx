import TourHero from "../components/sections/tour/TourHero";
import TourDetails from "../components/sections/tour/TourDetails";
import RelatedTours from "../components/sections/tour/RelatedTours";
import PageFooter from "../components/layout/PageFooter";

export default function TourPage() {
  return (
    <>
      <TourHero />
      <TourDetails />
      <RelatedTours />
      <PageFooter />
    </>
  );
}
