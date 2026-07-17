import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { howItWorksCardBg, howItWorksStep3 } from "../../assets/sections";
import { journeyBackground } from "../../assets/shared";

const stepAssets = [
  {
    image: howItWorksCardBg,
    imageClass: "h-[158%] w-full max-w-none object-cover object-top",
    gradient: "from-white to-[#c6eafd]",
    imageHeight: "h-[180px] sm:h-[220px] md:h-[248px] lg:h-[255px]",
  },
  {
    image: journeyBackground,
    imageClass: "h-full w-full object-cover object-center",
    gradient: "from-white to-[#aedcf9]/85",
    imageHeight: "h-[180px] sm:h-[220px] md:h-[248px]",
  },
  {
    image: howItWorksStep3,
    imageClass: "h-[254%] w-full max-w-none object-cover object-top",
    gradient: "from-white to-[#9cd2fa]",
    imageHeight: "h-[180px] sm:h-[220px] md:h-[248px]",
  },
];

function StepBadge({ number }) {
  return (
    <div className="relative mb-4 flex h-12 w-12 items-center justify-center sm:mb-6 sm:h-[69px] sm:w-[68px]">
      <div className="absolute inset-0 rounded-full bg-brand" />
      <span className="relative font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-none text-white">
        {number}
      </span>
    </div>
  );
}

function HowItWorksCard({ step }) {
  return (
    <article className="mx-auto flex w-full max-w-[505px] flex-col overflow-hidden rounded-b-[24px] sm:rounded-b-[36px]">
      <div
        className={`flex flex-col bg-gradient-to-b ${step.gradient} px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-7`}
      >
        <StepBadge number={step.number} />
        <h3 className="font-sans text-step-title font-bold text-black">{step.title}</h3>
        <p className="mt-2 font-sans text-step-body font-semibold text-black sm:mt-3">{step.description}</p>
      </div>

      <div
        className={`relative ${step.imageHeight} w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[36px]`}
      >
        <img src={step.image} alt="" className={step.imageClass} />
      </div>
    </article>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true }).map((step, index) => ({
    number: index + 1,
    ...step,
    ...stepAssets[index],
  }));

  return (
    <section id="how-it-works" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">{t("howItWorks.label")}</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            {t("howItWorks.title")}
          </h2>
          <Link
            to="/tours"
            className="mt-5 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-7 sm:w-auto"
          >
            {t("howItWorks.bookYourTour")}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-16">
          {steps.map((step) => (
            <HowItWorksCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
