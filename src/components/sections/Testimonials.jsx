import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  lovedByTravelersHero,
  testimonialAvatar1,
  iconStarFilled,
  iconCarouselArrowLeft,
  iconCarouselArrowRight,
} from "../../assets/sections";

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t("testimonials.items", { returnObjects: true }).map((item) => ({
    ...item,
    avatar: testimonialAvatar1,
    rating: 5,
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  function goTo(index) {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }

  return (
    <section id="testimonials" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-hero flex-col items-center gap-8">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">{t("testimonials.label")}</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            {t("testimonials.title")}
          </h2>
          <p className="mt-4 font-sans text-body-lead text-text-muted">{t("testimonials.body")}</p>
          <Link
            to="/testimonials"
            className="mt-5 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-6 sm:w-auto"
          >
            {t("testimonials.exploreMore")}
          </Link>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:aspect-[1458/685] sm:rounded-[31px]">
          <img
            src={lovedByTravelersHero}
            alt="Travelers exploring an Albanian old town"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative w-full rounded-bl-[24px] rounded-br-[20px] bg-brand-pale/60 px-4 py-8 sm:rounded-bl-[40px] sm:rounded-br-[30px] sm:px-10 sm:py-10 lg:px-14 lg:py-12">

          <div className="relative mx-auto max-w-[1323px] rounded-2xl bg-white p-4 text-center shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] sm:p-6 md:p-8">
            <p className="font-serif text-testimonial-quote italic text-[#1a1714]">{`"${active.quote}"`}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
              <img
                src={active.avatar}
                alt=""
                aria-hidden
                className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-[74px] sm:w-[72px]"
              />
              <div className="h-[2px] w-8 shrink-0 bg-[#d94f3d]" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-[2px]">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <img key={i} src={iconStarFilled} alt="" aria-hidden className="h-[14px] w-[14px]" />
                  ))}
                </div>
                <p className="mt-1 font-sans text-base font-semibold text-[#1a1714] sm:text-lg">
                  {active.name}
                </p>
                <p className="font-sans text-sm text-[#8a7670] sm:text-base">{active.role}</p>
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label={t("testimonials.previous")}
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/45 bg-[#eee] sm:h-[58px] sm:w-[58px]"
            >
              <img src={iconCarouselArrowLeft} alt="" aria-hidden className="h-6 w-5 sm:h-8 sm:w-[30px]" />
            </button>

            <div className="flex items-center gap-[6px]">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${t("testimonials.showTestimonial")} ${index + 1}`}
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
              aria-label={t("testimonials.next")}
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(217,79,61,0.3)] bg-brand sm:h-[58px] sm:w-[58px]"
            >
              <img src={iconCarouselArrowRight} alt="" aria-hidden className="h-[18px] w-5" />
            </button>
          </div>

          
        </div>
      </div>
    </section>
  );
}
