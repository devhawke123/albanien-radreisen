import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { relatedTour1, relatedTour2, relatedTour3 } from "../../../assets/tourPage";
import { iconCalendar, iconLocation, iconPeople } from "../../../assets/hero";
import { iconStar } from "../../../assets/shared";

const IMAGES = [relatedTour1, relatedTour2, relatedTour3];

export default function RelatedTours() {
  const { t } = useTranslation();
  const tours = t("tourPage.related", { returnObjects: true });

  return (
    <section className="bg-white px-hero-x pb-16 pt-4 md:pb-20 lg:pb-24">
      <div className="mx-auto max-w-hero">
        <p className="font-sans text-section-label font-semibold text-brand">
          {t("tourPage.relatedLabel")}
        </p>
        <h2 className="mt-3 font-serif text-section-title font-semibold capitalize text-black">
          {t("tourPage.relatedTitle")}
        </h2>

        <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {tours.map((tour, index) => (
            <article
              key={tour.title}
              className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)]"
            >
              <div className="relative h-48 sm:h-52">
                <img
                  src={IMAGES[index]}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <img src={iconLocation} alt="" className="h-2.5 w-2.5" aria-hidden />
                  {tour.location}
                </span>
                <div className="absolute bottom-4 left-4 flex gap-3 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <img src={iconCalendar} alt="" className="h-2.5 w-2.5" aria-hidden />
                    {tour.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <img src={iconPeople} alt="" className="h-2.5 w-2.5" aria-hidden />
                    {tour.group}
                  </span>
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img key={i} src={iconStar} alt="" className="h-3 w-3" aria-hidden />
                  ))}
                  <span>
                    {tour.rating} · {tour.reviews} {t("tourCard.reviews")}
                  </span>
                </div>

                <h3 className="m-0 font-sans text-base font-semibold text-[#101828] sm:text-lg">
                  {tour.title}
                </h3>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="m-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {t("tourCard.from")}
                    </p>
                    <p className="m-0 font-sans text-lg font-bold text-black">
                      {tour.price}{" "}
                      <span className="text-sm font-normal text-gray-400">
                        {t("tourCard.priceSuffix")}
                      </span>
                    </p>
                  </div>
                  <Link
                    to="/tours/8-day-cycling"
                    className="shrink-0 rounded-[14px] bg-brand px-4 py-2 font-sans text-xs font-bold text-white no-underline"
                  >
                    {t("tourPage.viewTour")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
