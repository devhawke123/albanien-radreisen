import { hilltopGroupPic } from "../../../assets/tours";
import TourCard from "../../ui/TourCard";

const TOUR_CARDS = [hilltopGroupPic, hilltopGroupPic, hilltopGroupPic];

export default function ToursGrid() {
  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-hero grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOUR_CARDS.map((image, index) => (
          <TourCard key={index} image={image} />
        ))}
      </div>
    </section>
  );
}
