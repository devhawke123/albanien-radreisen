import { useEffect, useState } from "react";
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

const featuredSlides = [
  {
    src: featuredSlideHero,
    alt: "Hikers on an Albanian mountain trail",
    position: { width: "194.48%", left: "-27.7%", top: "0.05%" },
  },
  {
    src: featuredSlide1,
    alt: "Cyclists in an Albanian poppy field",
    objectPosition: "center 35%",
  },
  {
    src: featuredSlide2,
    alt: "Cyclists on a scenic Albanian route",
    objectPosition: "center center",
  },
  {
    src: featuredSlide3,
    alt: "Cycling group adventure in Albania",
    objectPosition: "center center",
  },
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredSlides.length);
    }, ROTATION_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <article className="relative aspect-[788/927] w-full overflow-hidden rounded-[30px]">
      {featuredSlides.map((slide, index) => (
        <SlideImage key={slide.src} slide={slide} isActive={index === activeIndex} />
      ))}

      <div className="absolute inset-0 bg-black/28" />

      <div className="relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-11">
        <h3 className="max-w-[700px] font-serif text-card-feature-title font-medium text-white">
          Explore Albania&apos;s Best Routes
        </h3>
        <p className="mt-2 max-w-[700px] font-sans text-card-feature-body text-white">
          Discover scenic cycling journeys designed for adventure, culture, and nature lovers.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {featuredSlides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={isActive}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-all sm:h-20 sm:w-20 ${
                  isActive ? "ring-2 ring-white ring-offset-2 ring-offset-black/20" : "opacity-80 hover:opacity-100"
                }`}
              >
                <img src={slide.src} alt="" className="h-full w-full object-cover" />
              </button>
            );
          })}

          <button
            type="button"
            className="inline-flex h-16 items-center gap-2 rounded-xl bg-black/45 px-4 text-sm text-white sm:h-20"
          >
            <img src={iconPhoto} alt="" className="h-4 w-4" aria-hidden />
            See all
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedTours() {
  return (
    <section id="tours" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">Featured Tours</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            Find Your Perfect Cycling Adventure
          </h2>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,788px)_1fr] xl:gap-[61px]">
          <FeaturedTourShowcase />

          <div className="grid gap-6 sm:grid-cols-2">
            {tourImages.map((image, index) => (
              <TourCard key={index} image={image} faded={index >= 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
