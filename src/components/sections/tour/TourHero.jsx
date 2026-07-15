import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../layout/Header";
import { tourHeroImage } from "../../../assets/tourPage";
import { iconCalendar, iconPeople } from "../../../assets/hero";
import { iconClock, iconStar } from "../../../assets/shared";

export default function TourHero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[420px] flex-col px-hero-x py-hero-y text-white xs:min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
      <img
        src={tourHeroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/32" />

      <Header />

      <div className="relative z-10 mx-auto mt-6 w-full max-w-hero">
        <Link
          to="/tours"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-2xl text-white no-underline backdrop-blur-sm"
          aria-label={t("tourPage.back")}
        >
          ←
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-hero flex-1 flex-col justify-end pb-8 sm:pb-12 lg:pb-14">
        <div className="max-w-[1100px]">
          <h1 className="m-0 font-sans text-[clamp(2rem,5vw,5rem)] font-medium capitalize leading-[0.92] tracking-[-0.03em] text-white">
            {t("tourPage.title")}
          </h1>

          <a
            href="#tour-booking"
            className="mt-5 inline-flex h-14 items-center justify-center rounded-2xl bg-brand px-8 font-sans text-btn font-medium text-white no-underline"
          >
            {t("tourPage.bookNow")}
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm text-white/90 sm:text-lg lg:text-xl">
            <span className="inline-flex items-center gap-1.5">
              <img src={iconStar} alt="" className="h-5 w-5" aria-hidden />
              <span className="font-semibold text-white">{t("tourPage.rating")}</span>
              <span className="text-white/70">{t("tourPage.reviewsMeta")}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <img src={iconClock} alt="" className="h-3.5 w-3.5" aria-hidden />
              {t("tourPage.meta.duration")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <img src={iconPeople} alt="" className="h-3.5 w-3.5" aria-hidden />
              {t("tourPage.meta.group")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <img src={iconCalendar} alt="" className="h-3.5 w-3.5" aria-hidden />
              {t("tourPage.meta.next")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
