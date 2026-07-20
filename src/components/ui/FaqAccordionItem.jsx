function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5 ${open ? "rotate-0 text-white" : "rotate-360 text-brand"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqAccordionItem({ item, isOpen, onToggle }) {
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
