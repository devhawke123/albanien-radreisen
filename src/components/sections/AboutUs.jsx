import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { aboutUsImage } from "../../assets/about";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-[30px]">
          <div className="flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-[100px]">
            <h2 className="shrink-0 font-sans text-section-label font-semibold text-brand lg:w-[148px]">
              {t("about.label")}
            </h2>
            <blockquote className="m-0 max-w-[941px] text-pretty text-black">
              <span className="font-sans text-section-quote font-semibold">{t("about.quote")}</span>
            </blockquote>
          </div>

          <img
            src={aboutUsImage}
            alt="Cyclists exploring the Albanian countryside"
            className="h-[200px] w-full shrink-0 rounded-2xl object-cover xs:h-[220px] sm:h-[280px] lg:h-[331px] lg:w-[537px]"
          />
        </div>

        <Link
          to="/about"
          className="mt-8 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-10 sm:w-auto lg:ml-[248px]"
        >
          {t("about.exploreMore")}
        </Link>
      </div>
    </section>
  );
}
