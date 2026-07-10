import {
  howItWorksCardBg,
  howItWorksStep2,
  howItWorksStep3,
} from "../assets/sections";

const steps = [
  {
    number: 1,
    title: "Choose Your Tour",
    description:
      "Browse our collection of guided cycling tours and select the route that best matches your interests, fitness level, and travel dates.",
    image: howItWorksCardBg,
    imageClass: "h-[158%] w-full max-w-none object-cover object-top",
    gradient: "from-white to-[#c6eafd]",
    imageHeight: "h-[255px]",
  },
  {
    number: 2,
    title: "Complete Your Booking",
    description:
      "Reserve your spot by submitting your booking details. We'll take care of the planning, accommodation, and tour arrangements.",
    image: howItWorksStep2,
    imageClass: "h-full w-full object-cover object-center",
    gradient: "from-white to-[#aedcf9]/85",
    imageHeight: "h-[248px]",
  },
  {
    number: 3,
    title: "Confirm Availability",
    description:
      "Get in touch with us to check tour availability. We'll answer your questions and help you choose the perfect departure date.",
    image: howItWorksStep3,
    imageClass: "h-[254%] w-full max-w-none object-cover object-top",
    gradient: "from-white to-[#9cd2fa]",
    imageHeight: "h-[248px]",
  },
];

function StepBadge({ number }) {
  return (
    <div className="relative mb-6 flex h-[69px] w-[68px] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-brand" />
      <span className="relative font-sans text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-none text-white">
        {number}
      </span>
    </div>
  );
}

function HowItWorksCard({ step }) {
  return (
    <article className="flex w-full max-w-[505px] flex-col overflow-hidden rounded-b-[36px]">
      <div className={`flex flex-col bg-gradient-to-b ${step.gradient} px-8 pb-6 pt-7`}>
        <StepBadge number={step.number} />
        <h3 className="font-sans text-[clamp(1.5rem,2.5vw,2.1875rem)] font-bold leading-tight text-black">
          {step.title}
        </h3>
        <p className="mt-3 font-sans text-[clamp(1rem,1.8vw,1.375rem)] font-semibold leading-snug text-black">
          {step.description}
        </p>
      </div>

      <div className={`relative ${step.imageHeight} w-full overflow-hidden rounded-b-[36px]`}>
        <img src={step.image} alt="" className={step.imageClass} />
      </div>
    </article>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">Featured Tours</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">How It Works</h2>
          <button
            type="button"
            className="mt-7 h-btn-sm cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white"
          >
            Book Your Tour
          </button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-[89px] xl:gap-16">
          {steps.map((step) => (
            <HowItWorksCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
