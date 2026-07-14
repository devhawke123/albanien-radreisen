import { useState } from "react";
import { useTranslation } from "react-i18next";
import FaqAccordionItem from "../../ui/FaqAccordionItem";

export default function FaqList() {
  const { t } = useTranslation();
  const faqs = t("faq.items", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(3);

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[727px] flex-col items-center text-center">
        <p className="font-sans text-section-label font-semibold text-brand">{t("faq.label")}</p>
        <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
          {t("faq.title")}
        </h2>
        <button
          type="button"
          className="mt-5 h-btn-sm cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white sm:mt-6"
        >
          {t("nav.getStarted")}
        </button>
      </div>

      <div className="mx-auto mt-10 flex max-w-[872px] flex-col gap-6 sm:mt-12 sm:gap-8">
        {faqs.map((item, index) => (
          <FaqAccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
}
