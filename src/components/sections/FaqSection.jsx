import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cycleGirl, mountainIllustration } from "../../assets/shared";

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5 ${open ? "rotate-0 text-white" : "rotate-180 text-brand"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  if (isOpen) {
    return (
      <div className="rounded-xl bg-[#fee] px-4 py-4 sm:px-6 sm:py-5">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-3 text-left sm:items-center sm:gap-4"
          aria-expanded={isOpen}
        >
          <span className="min-w-0 font-sans text-faq-question font-medium text-[#070707]">
            {item.question}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand sm:h-10 sm:w-10">
            <ChevronIcon open={isOpen} />
          </span>
        </button>
        <p className="mt-3 font-sans text-faq-answer text-black sm:mt-4">{item.answer}</p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 rounded-xl bg-white px-4 py-3.5 text-left sm:items-center sm:gap-4 sm:px-6 sm:py-4"
        aria-expanded={isOpen}
      >
        <span className="min-w-0 font-sans text-faq-question font-medium text-[#070707]">
          {item.question}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ffe8e8] sm:h-10 sm:w-10">
          <ChevronIcon open={isOpen} />
        </span>
      </button>
      <div className="mt-4 border-b border-black/10 sm:mt-6" />
    </div>
  );
}

export default function FaqSection() {
  const { t } = useTranslation();
  const faqs = t("faq.items", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(3);

  return (
    <section id="faq" className="bg-brand-pale/45 px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,651px)_1fr] lg:gap-16 xl:gap-24">
          <div className="relative lg:min-h-[520px]">
            <p className="font-sans text-section-label font-semibold text-brand">{t("faq.label")}</p>
            <h2 className="mt-4 max-w-[671px] font-serif text-section-title font-semibold capitalize text-black">
              {t("faq.title")}
            </h2>
            <button
              type="button"
              className="mt-5 h-btn-sm w-full cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white sm:mt-6 sm:w-auto"
            >
              {t("faq.viewAll")}
            </button>

            <img
              src={mountainIllustration}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-2 bottom-0 hidden w-[min(100%,833px)] opacity-70 md:block"
            />
            <img
              src={cycleGirl}
              alt="Cyclist with map planning a tour"
              className="pointer-events-none relative z-10 mx-auto mt-8 w-full max-w-[260px] object-contain xs:max-w-[300px] sm:max-w-[321px] lg:absolute lg:bottom-0 lg:left-0 lg:mx-0 lg:mt-0"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-6 sm:gap-8 lg:gap-10">
            {faqs.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
