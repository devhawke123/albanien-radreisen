import { useTranslation } from "react-i18next";
import { iconCalendar, iconLocation, iconPeople } from "../../assets/hero";
import { iconClock, iconHeart, iconStar } from "../../assets/shared";

export default function TourCard({
  image,
  imageAlt,
  location,
  people,
  date,
  duration,
  rating = 4.9,
  reviewCount = 38,
  title,
  price = "€1,290",
  priceSuffix,
  amenities,
  moreAmenitiesLabel,
  faded = false,
}) {
  const { t } = useTranslation();
  imageAlt ??= t("tourCard.imageAlt");
  location ??= t("tourCard.location");
  people ??= t("tourCard.people");
  date ??= t("tourCard.date");
  duration ??= t("tourCard.duration");
  title ??= t("tourCard.title");
  priceSuffix ??= t("tourCard.priceSuffix");
  amenities ??= t("tourCard.amenities", { returnObjects: true });
  moreAmenitiesLabel ??= t("tourCard.moreAmenities");

  return (
    <article className="overflow-hidden rounded-[17px] border border-gray-400 bg-white">
      <div className="relative h-44 xs:h-48 sm:h-52 md:h-56">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
          <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-card-meta text-white backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1">
              <img src={iconLocation} alt="" className="h-2.5 w-2.5 shrink-0" aria-hidden />
              {location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-card-meta text-white backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1">
              <img src={iconPeople} alt="" className="h-2.5 w-2.5 shrink-0" aria-hidden />
              {people}
            </span>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/50 sm:h-9 sm:w-9"
            aria-label={t("tourCard.saveTour")}
          >
            <img src={iconHeart} alt="" className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 sm:p-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-card-meta text-white backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1">
            <img src={iconCalendar} alt="" className="h-2.5 w-2.5 shrink-0" aria-hidden />
            {date}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-card-meta text-white backdrop-blur-sm sm:gap-1.5 sm:px-2.5 sm:py-1">
            <img src={iconClock} alt="" className="h-2.5 w-2.5 shrink-0" aria-hidden />
            {duration}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 px-3 pb-4 pt-3 sm:space-y-3 sm:px-4 sm:pb-5 sm:pt-4">
        <div className="flex flex-wrap items-center gap-1.5 text-card-meta text-gray-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <img key={i} src={iconStar} alt="" className="h-3 w-3" aria-hidden />
          ))}
          <span className="font-medium text-gray-600">{rating}</span>
          <span>
            · {reviewCount} {t("tourCard.reviews")}
          </span>
        </div>

        <h3 className="line-clamp-2 font-semibold text-card-title text-gray-900">{title}</h3>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-card-meta font-medium uppercase tracking-wide text-gray-400">
              {t("tourCard.from")}
            </p>
            <p className="font-bold tracking-tight text-card-price text-gray-900">
              {price} <span className="text-card-meta font-medium text-gray-400">{priceSuffix}</span>
            </p>
          </div>
          <button
            type="button"
            className={`shrink-0 rounded-md px-4 py-2 text-card-meta font-medium text-white sm:px-5 sm:text-sm ${
              faded ? "bg-brand/45" : "bg-brand"
            }`}
          >
            {t("tourCard.bookNow")}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-2.5 text-card-meta text-gray-500 sm:gap-3 sm:pt-3">
          {amenities.map((item) => (
            <span key={item} className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {item}
            </span>
          ))}
          <span className="ml-auto text-gray-400">{moreAmenitiesLabel}</span>
        </div>
      </div>
    </article>
  );
}
