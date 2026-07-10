import { useState } from "react";
import { cycleGirl, faqMountainDecoration } from "../assets/sections";

const faqs = [
  {
    question: "Do I need previous cycling experience?",
    answer:
      "No. Our tours welcome riders of all levels, and our guides adapt the pace and support to match your experience.",
  },
  {
    question: "Are bikes included in the tour package?",
    answer: "Yes. High-quality touring bikes are included, along with helmets and basic repair support on the road.",
  },
  {
    question: "What should I bring for the tour?",
    answer:
      "Pack comfortable cycling clothing, sunscreen, a refillable water bottle, and any personal items you need for a multi-day ride.",
  },
  {
    question: "Are the tours suitable for beginners?",
    answer:
      "Yes. Our tours are designed for all experience levels, from beginners to experienced cyclists, with expert guidance throughout the journey.",
  },
  {
    question: "Can I book a private cycling tour?",
    answer:
      "Absolutely. We can arrange private departures for groups, families, or custom dates depending on availability.",
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-0 text-white" : "rotate-180 text-brand"}`}
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
      <div className="rounded-xl bg-[#fee] px-6 py-5">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 text-left"
          aria-expanded={isOpen}
        >
          <span className="font-sans text-[clamp(1.125rem,2vw,1.75rem)] font-medium leading-snug text-[#070707]">
            {item.question}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand">
            <ChevronIcon open={isOpen} />
          </span>
        </button>
        <p className="mt-4 max-w-[740px] font-sans text-[clamp(1rem,1.8vw,1.5rem)] leading-relaxed text-black">
          {item.answer}
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-xl bg-white px-6 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-sans text-[clamp(1.125rem,2vw,1.625rem)] font-medium leading-snug text-[#070707]">
          {item.question}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe8e8]">
          <ChevronIcon open={isOpen} />
        </span>
      </button>
      <div className="mt-6 border-b border-black/10" />
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(3);

  return (
    <section id="faq" className="bg-brand-pale/45 px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,651px)_1fr] lg:gap-16 xl:gap-24">
          <div className="relative min-h-[420px] pb-8 lg:min-h-[520px] lg:pb-0">
            <p className="font-sans text-section-label font-semibold text-brand">FAQ&apos;s</p>
            <h2 className="mt-4 max-w-[671px] font-serif text-section-title font-semibold capitalize text-black">
              Answers You Need, Anytime You Ask
            </h2>
            <button
              type="button"
              className="mt-6 h-btn-sm cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white"
            >
              View All
            </button>

            <img
              src={faqMountainDecoration}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-2 bottom-0 hidden w-[min(100%,833px)] opacity-70 lg:block"
            />
            <img
              src={cycleGirl}
              alt="Cyclist with map planning a tour"
              className="pointer-events-none relative z-10 mt-10 w-full max-w-[321px] object-contain lg:absolute lg:bottom-0 lg:left-0 lg:mt-0"
            />
          </div>

          <div className="flex flex-col gap-8 lg:gap-10">
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
