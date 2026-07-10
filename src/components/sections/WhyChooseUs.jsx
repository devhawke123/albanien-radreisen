import { cycleGirl } from "../../assets/about";
import { iconBicycle, iconMountain, iconPerson } from "../../assets/journey-icons";

const features = [
  {
    title: "Expertly Planned Tours",
    description:
      "Ride carefully designed routes that showcase Albania's most breathtaking landscapes and hidden gems.",
    icon: iconMountain,
  },
  {
    title: "Local Guides & Authentic Experiences",
    description:
      "Ride carefully designed routes that showcase Albania's most breathtaking landscapes and hidden gems.",
    icon: iconBicycle,
  },
  {
    title: "Comfortable & Safe Adventures",
    description:
      "Ride carefully designed routes that showcase Albania's most breathtaking landscapes and hidden gems.",
    icon: iconPerson,
  },
];

function FeatureCard({ title, description, icon }) {
  return (
    <article className="flex items-center gap-4 rounded-[64px] border border-brand bg-white px-5 py-4 sm:gap-6 sm:px-6 sm:py-5">
      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-brand bg-brand-soft sm:h-[88px] sm:w-[88px]">
        <img src={icon} alt="" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden />
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-feature-title font-bold text-black">{title}</h3>
        <p className="mt-1 font-sans text-feature-body text-text-subtle">{description}</p>
      </div>
    </article>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-pale/45 px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <p className="font-sans text-section-label font-semibold text-brand">Why Choose Us</p>
            <h2 className="mt-4 max-w-[671px] font-serif text-section-title font-semibold capitalize text-black">
              Why Ride With TARKO?
            </h2>
            <button
              type="button"
              className="mt-8 h-btn-sm cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white"
            >
              Explore More
            </button>
            <img
              src={cycleGirl}
              alt="Cyclist planning a route with a map"
              className="mt-8 w-full max-w-[820px] object-contain"
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <p className="max-w-[910px] font-sans text-body-lead font-semibold text-text-muted">
              From expertly planned routes to local guides, we create authentic cycling experiences that let you
              discover Albania safely, comfortably, and at your own pace.
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
