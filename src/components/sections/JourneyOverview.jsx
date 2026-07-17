import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { journeyMap } from "../../assets/journey";
import { iconBicycle, iconBoat, iconMountain, iconPerson } from "../../assets/journey-icons";
import { mountainIllustration } from "../../assets/shared";

const activityAssets = [
  { icon: iconBicycle, iconClass: "h-[34px] w-[34px]" },
  { icon: iconBoat, iconClass: "h-7 w-7" },
  { icon: iconMountain, iconClass: "h-[38px] w-[38px]" },
  { icon: iconPerson, iconClass: "h-[30px] w-[30px]" },
];

function ActivityCard({ title, description, icon, iconClass }) {
  return (
    <article className="flex flex-col rounded-[24px] bg-white px-5 py-6 shadow-[0_4px_2px_rgba(0,0,0,0.25)] sm:rounded-[30px] sm:px-6 sm:pb-8 sm:pt-9">
      <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-brand-soft sm:h-[60px] sm:w-[62px]">
        <img src={icon} alt="" aria-hidden className={iconClass} />
      </div>
      <h3 className="mt-4 font-sans text-[clamp(1.125rem,2vw,1.875rem)] font-semibold leading-tight text-[#1c2a20]">
        {title}
      </h3>
      <p className="mt-2 font-sans text-[clamp(0.9375rem,1.6vw,1.25rem)] leading-snug text-[#7a6e5e]">
        {description}
      </p>
    </article>
  );
}

export default function JourneyOverview() {
  const { t } = useTranslation();
  const activities = t("journey.activities", { returnObjects: true }).map((activity, index) => ({
    ...activity,
    ...activityAssets[index],
  }));

  return (
    <section id="journey" className="relative overflow-hidden bg-[#fff3f3] px-hero-x py-16 md:py-20 lg:py-24">
      <img
        src={mountainIllustration}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-auto w-full -translate-y-1/2 opacity-40 sm:block"
      />

      <div className="relative z-10 mx-auto max-w-hero">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          <div className="min-w-0">
            <p className="font-sans text-section-label font-semibold text-brand">{t("journey.label")}</p>
            <h2 className="mt-4 max-w-[751px] font-serif text-section-title font-semibold capitalize text-black">
              {t("journey.title")}
            </h2>
            <p className="mt-4 max-w-[866px] font-sans text-[clamp(1rem,2vw,1.625rem)] font-medium leading-relaxed text-black/80">
              {t("journey.body")}
            </p>
            <Link
              to="/tours"
              className="mt-5 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-6 sm:w-auto"
            >
              {t("journey.getStarted")}
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10">
              {activities.map((activity) => (
                <ActivityCard key={activity.title} {...activity} />
              ))}
            </div>
          </div>

          <div className="relative aspect-[756/888] w-full overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <img
              src={journeyMap}
              alt={t("journey.mapAlt")}
              className="absolute h-[106%] w-[103%] max-w-none -left-[2.5%] -top-[4.5%] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
