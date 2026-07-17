import { useTranslation } from "react-i18next";
import { TOURS } from "../../../data/toursCatalog";
import { formatEuro } from "../../../utils/bookingPricing";
import TourCard from "../../ui/TourCard";

export default function ToursGrid() {
  const { t } = useTranslation();

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-hero grid-cols-1 gap-6 sm:grid-cols-2">
        {TOURS.map((tour) => {
          const card = t(`toursContent.${tour.slug}.card`, { returnObjects: true });
          return (
            <TourCard
              key={tour.slug}
              image={tour.cardImage}
              imageAlt={card.imageAlt}
              location={card.location}
              people={card.people}
              date={card.date}
              duration={card.duration}
              title={card.title}
              price={formatEuro(tour.basePrice).replace("€ ", "€")}
              amenities={card.amenities}
              moreAmenitiesLabel={card.moreAmenities}
              to={`/tours/${tour.slug}`}
            />
          );
        })}
      </div>
    </section>
  );
}
