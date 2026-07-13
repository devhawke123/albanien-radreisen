import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  heroBackground,
  heroBackground2,
  heroBackground3,
  logo,
  iconCalendar,
  iconLocation,
  iconPeople,
} from "../../assets/hero";
import { iconCart } from "../../assets/shared";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const ROTATION_MS = 2_000;

const heroSlides = [
  { src: heroBackground, alt: "Albanian coastal cliffs" },
  { src: heroBackground2, alt: "Albanian mountain landscape" },
  { src: heroBackground3, alt: "Albanian valley scenery" },
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

  function goTo(index) {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }

  return (
    <section className="relative flex h-dvh flex-col overflow-hidden px-hero-x py-hero-y text-white">
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

      <header className="relative z-10 mx-auto grid w-full max-w-hero shrink-0 grid-cols-1 items-center justify-items-center gap-3 xs:gap-4 md:grid-cols-[auto_1fr_auto] md:gap-6 lg:gap-8">
        <img
          className="h-auto w-24 xs:w-28 sm:w-32 md:w-36 lg:w-[168px]"
          src={logo}
          alt="Albanien Radreisen"
        />

        <nav className="flex min-h-0 w-full flex-wrap items-center justify-center gap-3 rounded-[21px] border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-sm sm:gap-5 sm:px-5 sm:py-2 md:w-auto lg:gap-7 lg:px-6">
          <a
            href="#"
            className="rounded-[18px] bg-white px-4 py-1 font-sans text-nav leading-snug text-brand-light no-underline sm:px-5 lg:px-[23px]"
          >
            {t("nav.home")}
          </a>
          <a href="#about" className="text-nav leading-snug text-white/85 no-underline">
            {t("nav.about")}
          </a>
          <a href="#tours" className="text-nav leading-snug text-white/85 no-underline">
            {t("nav.cyclingTours")}
          </a>
          <a href="#" className="hidden text-nav leading-snug text-white/85 no-underline sm:inline">
            {t("nav.imprint")}
          </a>
          <a href="#" className="text-nav leading-snug text-white/85 no-underline">
            {t("nav.contact")}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white bg-white/16 backdrop-blur-sm"
            aria-label={t("nav.cartLabel")}
          >
            <img src={iconCart} alt="" className="h-6 w-6" aria-hidden />
          </button>
          <button
            className="h-btn-lg cursor-pointer rounded-[11px] bg-white/80 px-6 text-btn leading-none text-black sm:px-8 lg:px-[39px]"
            type="button"
          >
            {t("nav.getStarted")}
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center text-center">
        <h1 className="m-0 leading-[0.92]">
          <span className="block font-sans text-hero-title font-medium">{t("hero.titleLine1")}</span>
          <span className="block font-serif text-hero-title-accent font-medium">{t("hero.titleLine2")}</span>
        </h1>
        <p className="mx-auto mt-[clamp(0.5rem,1.5vh,1.875rem)] max-w-content font-sans text-hero-body tracking-wide short:leading-tight">
          {t("hero.body")}
        </p>

        <div className="mt-[clamp(0.5rem,1.5vh,1.5rem)] flex flex-wrap justify-center gap-3 sm:gap-[15px]">
          <button
            className="h-btn-sm cursor-pointer rounded-[11px] bg-brand px-6 text-btn leading-none text-white sm:px-8 lg:px-[39px]"
            type="button"
          >
            {t("hero.exploreNow")}
          </button>
          <button
            className="h-btn-sm cursor-pointer rounded-[11px] border border-white bg-transparent px-6 text-btn leading-none text-white sm:px-8 lg:px-[39px]"
            type="button"
          >
            {t("hero.watchVideos")}
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-auto w-[min(100%,808px)] shrink-0 flex-col items-stretch justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-sm xs:h-search-bar xs:flex-row xs:flex-wrap xs:items-center sm:gap-3 sm:px-4 lg:gap-4">
        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1 text-nav text-white sm:gap-2.5 sm:px-4"
        >
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={iconLocation} alt="" aria-hidden />
          <span>{t("hero.destination")}</span>
        </button>
        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1 text-nav text-white sm:gap-2.5 sm:px-4"
        >
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={iconPeople} alt="" aria-hidden />
          <span>{t("hero.people")}</span>
        </button>
        <button
          type="button"
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-2 py-1 text-nav text-white sm:gap-2.5 sm:px-4"
        >
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={iconCalendar} alt="" aria-hidden />
          <span>{t("hero.date")}</span>
        </button>
        <button
          className="h-btn-sm w-full shrink-0 cursor-pointer rounded-[15px] border border-white bg-brand/45 px-4 text-nav text-white xs:w-auto sm:px-6"
          type="button"
        >
          {t("hero.exploreTours")}
        </button>
      </div>

      {/* <div className="absolute bottom-[clamp(0.5rem,2vh,2.5rem)] right-[clamp(1rem,4vw,5rem)] z-10 hidden items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-2 py-2 backdrop-blur-sm sm:flex"> */}
        {/* <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous background"
          className="flex h-8 w-8 cursor-pointer items-center justify-center text-white"
        >
          <SlideArrow direction="prev" />
        </button> */}

        {/* {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show background ${index + 1}`}
              aria-pressed={isActive}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-all ${
                isActive ? "ring-2 ring-white" : "opacity-80 hover:opacity-100"
              }`}
            >
              <img src={slide.src} alt="" className="h-full w-full object-cover" />
            </button>
          );
        })} */}

        {/* <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next background"
          className="flex h-8 w-8 cursor-pointer items-center justify-center text-white"
        >
          <SlideArrow direction="next" />
        </button> */}
      {/* </div> */}
    </section>
  );
}
