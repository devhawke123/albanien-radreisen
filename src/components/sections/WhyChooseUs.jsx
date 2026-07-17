import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cycleGirl } from "../../assets/shared";
import { iconBicycle, iconMountain, iconPerson } from "../../assets/journey-icons";

const featureIcons = [iconMountain, iconBicycle, iconPerson];

function FeatureCard({ title, description, icon }) {
  return (
    <article className="flex items-center gap-3 rounded-3xl border border-brand bg-white px-4 py-3.5 sm:gap-6 sm:rounded-[64px] sm:px-6 sm:py-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-soft sm:h-[72px] sm:w-[72px] md:h-[88px] md:w-[88px]">
        <img src={icon} alt="" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" aria-hidden />
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-feature-title font-bold text-black">{title}</h3>
        <p className="mt-1 font-sans text-feature-body text-text-subtle">{description}</p>
      </div>
    </article>
  );
}

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const features = t("whyChooseUs.features", { returnObjects: true }).map((feature, index) => ({
    ...feature,
    icon: featureIcons[index],
  }));

  return (
    <section className="bg-brand-pale/45 px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <p className="font-sans text-section-label font-semibold text-brand">{t("whyChooseUs.label")}</p>
            <h2 className="mt-4 max-w-[671px] font-serif text-section-title font-semibold capitalize text-black">
              {t("whyChooseUs.title")}
            </h2>
            <Link
              to="/tours"
              className="mt-6 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-8 sm:w-auto"
            >
              {t("whyChooseUs.exploreMore")}
            </Link>
            <img
              src={cycleGirl}
              alt="Cyclist planning a route with a map"
              className="mx-auto mt-6 w-full max-w-[500px] object-contain sm:mt-8 lg:mx-0 lg:max-w-[820px]"
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <p className="max-w-[910px] font-sans text-body-lead font-semibold text-text-muted">
              {t("whyChooseUs.lead")}
            </p>
            <div className="flex flex-col gap-6">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
