import { useTranslation } from "react-i18next";
import { iconStarFilled } from "../../../assets/sections";
import {
  reviewsCardImage1,
  reviewsCardImage2,
  reviewsCardImage3,
  reviewsCardImage4,
} from "../../../assets/reviewsPage";

const CARD_IMAGES = [reviewsCardImage1, reviewsCardImage2, reviewsCardImage3, reviewsCardImage4];
const CARD_COUNT = 12;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 fill-white">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function ReviewsGrid() {
  const { t } = useTranslation();
  const testimonials = t("testimonials.items", { returnObjects: true });

  const cards = Array.from({ length: CARD_COUNT }, (_, index) => ({
    ...testimonials[index % testimonials.length],
    image: CARD_IMAGES[index % CARD_IMAGES.length],
  }));

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-hero grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={`${card.name}-${index}`}
            className="overflow-hidden rounded-[21px] bg-white shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
          >
            <div className="relative flex aspect-[16/9] items-center justify-center">
              <img src={card.image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <PlayIcon />
            </div>

            <div className="flex flex-col gap-2 p-5">
              <div className="flex items-center gap-[2px]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <img key={starIndex} src={iconStarFilled} alt="" aria-hidden className="h-[14px] w-[14px]" />
                ))}
              </div>
              <p className="font-serif text-base font-semibold text-[#1a1714]">{card.name}</p>
              <p className="text-sm text-[#8a7670]">{card.role}</p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-[#1a1714]">{`"${card.quote}"`}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
