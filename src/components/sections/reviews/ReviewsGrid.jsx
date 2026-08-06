import { useTranslation } from "react-i18next";
import { iconStarFilled } from "../../../assets/sections";

export default function ReviewsGrid() {
  const { t } = useTranslation();
  const testimonials = t("testimonials.items", { returnObjects: true });

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-hero grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
        {testimonials.map((card) => (
          <article
            key={`${card.name}-${card.travelDate}`}
            className="flex flex-col rounded-[21px] bg-[#f9f9f9] p-5 shadow-[0_4px_2px_rgba(0,0,0,0.25)] sm:p-6"
          >
            <div className="flex items-center gap-[2px]">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <img key={starIndex} src={iconStarFilled} alt="" aria-hidden className="h-[14px] w-[14px]" />
              ))}
            </div>
            <p className="mt-2 font-serif text-[14px] font-semibold leading-snug text-[#1a1714]">{card.name}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-[#8a7670]">
              {t("testimonials.travelDateLabel")}: {card.travelDate}
            </p>
            <p className="mt-3 font-sans text-base leading-[1.6] text-[#1a1714] sm:text-lg sm:leading-[1.625]">
              {card.quote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
