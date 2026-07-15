import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  featuredSlide1,
  featuredSlide2,
  featuredSlide3,
  featuredSlideHero,
  hilltopGroupPic,
} from "../../assets/tours";
import { iconPhoto } from "../../assets/shared";
import TourCard from "../ui/TourCard";

const ROTATION_MS = 10_000;

const featuredSlideSources = [
  { src: featuredSlideHero, position: { width: "194.48%", left: "-27.7%", top: "0.05%" } },
  { src: featuredSlide1, objectPosition: "center 35%" },
  { src: featuredSlide2, objectPosition: "center center" },
  { src: featuredSlide3, objectPosition: "center center" },
];

const tourImages = [hilltopGroupPic, hilltopGroupPic, hilltopGroupPic, hilltopGroupPic];

function SlideImage({ slide, isActive }) {
  if (slide.position) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={slide.src}
          alt={slide.alt}
          className="absolute h-full max-w-none object-cover"
          style={{
            width: slide.position.width,
            left: slide.position.left,
            top: slide.position.top,
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={slide.src}
      alt={slide.alt}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{ objectPosition: slide.objectPosition }}
    />
  );
}

function FeaturedTourShowcase() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const slideAlts = t("tours.slideAlts", { returnObjects: true });
  const featuredSlides = featuredSlideSources.map((slide, index) => ({
    ...slide,
    alt: slideAlts[index],
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredSlideSources.length);
    }, ROTATION_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <article className="relative aspect-[4/5] max-h-[min(70vh,600px)] w-full overflow-hidden rounded-[20px] sm:aspect-[788/927] sm:max-h-none sm:rounded-[30px]">
      {featuredSlides.map((slide, index) => (
        <SlideImage key={slide.src} slide={slide} isActive={index === activeIndex} />
      ))}

      <div className="absolute inset-0 bg-black/28" />

      <div className="relative flex h-full flex-col justify-end p-4 sm:p-8 lg:p-11">
        <h3 className="max-w-[700px] font-serif text-card-feature-title font-medium text-white">
          {t("tours.showcaseTitle")}
        </h3>
        <p className="mt-2 max-w-[700px] font-sans text-card-feature-body text-white">
          {t("tours.showcaseBody")}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
          {featuredSlides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={isActive}
                className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg transition-all sm:h-16 sm:w-16 sm:rounded-xl md:h-20 md:w-20 ${
                  isActive
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black/20"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <img src={slide.src} alt="" className="h-full w-full object-cover" />
              </button>
            );
          })}

          <Link
            to="/tours/8-day-cycling"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-black/45 px-3 text-xs text-white no-underline sm:h-16 sm:rounded-xl sm:px-4 sm:text-sm md:h-20"
          >
            <img src={iconPhoto} alt="" className="h-4 w-4" aria-hidden />
            {t("tours.seeAll")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedTours() {
  const { t } = useTranslation();

  return (
    <section id="tours" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">{t("tours.label")}</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            {t("tours.title")}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-[minmax(0,1.1fr)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,788px)_1fr] xl:gap-[61px]">
          <FeaturedTourShowcase />

          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xs:gap-5 sm:gap-6 lg:grid-cols-2">
            {tourImages.map((image, index) => (
              <TourCard key={index} image={image} faded={index >= 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
