import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  heroBackground,
  heroBackground2,
  heroBackground3,
  heroBackground4,
  heroBackground5,
  heroBackground6,
  heroBackground7,
} from "../../assets/hero";
import Header from "../layout/Header";

const ROTATION_MS = 5_000;

const heroSlides = [
  {
    src: heroBackground,
    alt: "Albanian cycling landscape",
    titleLine2Key: "hero.slides.slide1.titleLine2",
    hasContent: true,
  },
  {
    src: heroBackground2,
    alt: "Albanian coastal scenery",
    titleLine2Key: "hero.slides.slide2.titleLine2",
    hasContent: true,
  },
  {
    src: heroBackground3,
    alt: "Albanian mountain landscape",
    titleLine2Key: "hero.slides.slide3.titleLine2",
    hasContent: true,
  },
  {
    src: heroBackground4,
    alt: "Albanian valley scenery",
    titleLine2Key: "hero.slides.slide4.titleLine2",
    hasContent: true,
  },
  {
    src: heroBackground5,
    alt: "Albanian countryside",
    titleLine2Key: "hero.slides.slide5.titleLine2",
    hasContent: true,
  },
  { src: heroBackground6, alt: "Albanian bike tour view", hasContent: false },
  { src: heroBackground7, alt: "Albanian adventure scenery", hasContent: false },
];



export default function Hero() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, ROTATION_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-dvh flex-col px-hero-x py-hero-y text-white">
      {heroSlides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/44" />

      <Header />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center text-center">
        {heroSlides[activeIndex].hasContent && (
          <>
            <h1
              key={activeIndex}
              className="m-0 leading-[0.92] transition-opacity duration-700 ease-in-out"
            >
              <span className="block font-sans text-hero-title font-medium">{t("hero.titleLine1")}</span>
              <span className="block font-serif text-hero-title-accent font-medium">
                {t(heroSlides[activeIndex].titleLine2Key)}
              </span>
            </h1>
            <p className="mx-auto mt-[clamp(0.5rem,1.5vh,1.875rem)] max-w-content font-sans text-hero-body tracking-wide short:leading-tight">
              {t("hero.body")}
            </p>

            <div className="mt-[clamp(0.5rem,1.5vh,1.5rem)] flex flex-wrap justify-center gap-3 sm:gap-[15px]">
              <Link
                to="/tours"
                className="inline-flex h-btn-sm items-center justify-center rounded-[11px] bg-brand px-6 text-btn leading-none text-white no-underline sm:px-8 lg:px-[39px]"
              >
                {t("hero.exploreNow")}
              </Link>
              <a
                href="#cta"
                className="inline-flex h-btn-sm items-center justify-center rounded-[11px] border border-white bg-transparent px-6 text-btn leading-none text-white no-underline sm:px-8 lg:px-[39px]"
              >
                {t("hero.watchVideos")}
              </a>
            </div>
          </>
        )}
        
    </div>
    </section>
  );
}
