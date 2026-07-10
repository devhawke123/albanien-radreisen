import { useState } from "react";
import {
  cyclePinkGirl,
  lovedByTravelersHero,
  testimonialAvatar1,
  iconStarFilled,
  iconCarouselArrowLeft,
  iconCarouselArrowRight,
} from "../../assets/sections";

const testimonials = [
  {
    quote:
      "The routes were breathtaking, the organization was excellent, and our guide made every day unforgettable. Albania completely exceeded our expectations.",
    avatar: testimonialAvatar1,
    name: "Sarah Mitchell",
    role: "Adventure Traveler · New York, USA",
    rating: 5,
  },
  {
    quote:
      "Every detail was taken care of. The scenery, the food, the people — riding through Albania felt like discovering a country most tourists never see.",
    avatar: testimonialAvatar1,
    name: "James Carter",
    role: "Adventure Traveler · London, UK",
    rating: 5,
  },
  {
    quote:
      "Our guide's local knowledge turned every stop into a story. This was hands down the best cycling trip our group has ever taken.",
    avatar: testimonialAvatar1,
    name: "Elena Rossi",
    role: "Adventure Traveler · Milan, Italy",
    rating: 5,
  },
  {
    quote:
      "From the mountain descents to the coastal villages, everything was paced perfectly for our group. We're already planning our next trip back.",
    avatar: testimonialAvatar1,
    name: "Marco Alves",
    role: "Adventure Traveler · Lisbon, Portugal",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  function goTo(index) {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  return (
    <section id="testimonials" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-hero flex-col items-center gap-8">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">Testimonials</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            Loved By Travelers Like You
          </h2>
          <p className="mt-4 font-sans text-body-lead text-text-muted">
            Hear directly from our travelers — their stories, in their own words, on video.
          </p>
          <button
            type="button"
            className="mt-6 h-btn-sm cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white"
          >
            Explore More
          </button>
        </div>

        <div className="aspect-[1458/685] w-full overflow-hidden rounded-[31px]">
          <img
            src={lovedByTravelersHero}
            alt="Travelers exploring an Albanian old town"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative w-full rounded-bl-[40px] rounded-br-[30px] bg-brand-pale/60 px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <img
            src={cyclePinkGirl}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-10 hidden w-[190px] rotate-[13deg] opacity-95 lg:block"
          />

          <div className="relative max-w-[1323px] rounded-2xl bg-white p-6 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] sm:p-8">
            <p className="font-serif text-testimonial-quote italic text-[#1a1714]">{`"${active.quote}"`}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <img
                src={active.avatar}
                alt=""
                aria-hidden
                className="h-[74px] w-[72px] rounded-full object-cover"
              />
              <div className="h-[2px] w-8 shrink-0 bg-[#d94f3d]" />
              <div>
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <img key={i} src={iconStarFilled} alt="" aria-hidden className="h-[14px] w-[14px]" />
                  ))}
                </div>
                <p className="mt-1 font-sans text-lg font-semibold text-[#1a1714]">{active.name}</p>
                <p className="font-sans text-base text-[#8a7670]">{active.role}</p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous testimonial"
              className="flex h-[58px] w-[58px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/45 bg-[#eee]"
            >
              <img src={iconCarouselArrowLeft} alt="" aria-hidden className="h-8 w-[30px]" />
            </button>

            <div className="flex items-center gap-[6px]">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  className={`h-[6px] cursor-pointer rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-brand" : "w-[6px] bg-[#99a1af]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next testimonial"
              className="flex h-[58px] w-[58px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(217,79,61,0.3)] bg-brand"
            >
              <img src={iconCarouselArrowRight} alt="" aria-hidden className="h-[18px] w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
