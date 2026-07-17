import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cycleGirl, mountainIllustration } from "../../assets/shared";
import FaqAccordionItem from "../ui/FaqAccordionItem";

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
            <Link
              to="/faq"
              className="mt-5 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-6 sm:w-auto"
            >
              {t("faq.viewAll")}
            </Link>

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
              <FaqAccordionItem
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
