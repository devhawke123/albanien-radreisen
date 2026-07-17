import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { aboutIntroPhoto } from "../../../assets/aboutPage";
import { mountainIllustration } from "../../../assets/shared";

function StatCard({ value, label }) {
  return (
    <div className="relative overflow-hidden rounded-[14px] border border-[rgba(106,114,130,0.6)] bg-white text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="px-4 pt-6">
        <p className="font-sans text-[clamp(1.75rem,4vw,3.375rem)] font-bold leading-[1.15] text-black">
          {value}
        </p>
        <p className="mt-1 font-sans text-[clamp(0.9375rem,1.8vw,1.5rem)] font-medium text-black">{label}</p>
      </div>
      <img
        src={mountainIllustration}
        alt=""
        aria-hidden
        className="pointer-events-none mt-3 h-16 w-full object-cover opacity-70 xs:h-20 sm:h-24"
      />
    </div>
  );
}

export default function AboutIntro() {
  const { t } = useTranslation();
  const stats = t("aboutIntro.stats", { returnObjects: true });

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-[60px]">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-section-label font-semibold text-brand">{t("aboutIntro.label")}</p>
            <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
              {t("aboutIntro.title")}
            </h2>
             <div className="mt-10 grid grid-cols-1 gap-4 xs:grid-cols-3 sm:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
            <div className="mt-6 flex flex-col gap-4 font-sans text-body-lead text-text-muted sm:gap-6">
              <p>{t("aboutIntro.paragraph1")}</p>
              <p>{t("aboutIntro.paragraph2")}</p>
            </div>
          </div>

       

          <img
            src={aboutIntroPhoto}
            alt="Cyclists group photo in Albania"
            className="h-[220px] w-full shrink-0 rounded-2xl object-cover sm:h-[300px] lg:h-[420px] lg:w-[420px]"
          />
        </div>

    
        <Link
          to="/tours"
          className="mt-8 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-10 sm:w-auto"
        >
          {t("aboutIntro.exploreNow")}
        </Link>
      </div>
    </section>
  );
}
