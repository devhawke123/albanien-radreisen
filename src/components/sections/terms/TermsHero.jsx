import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../layout/Header";

export default function TermsHero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col px-hero-x py-hero-y text-black">
      <Header light />

      <div className="mx-auto mt-6 flex w-full max-w-hero items-center gap-6 sm:mt-10 sm:gap-10">
        <Link
          to="/"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/20 text-2xl text-black no-underline"
          aria-label={t("termsPage.back")}
        >
          ←
        </Link>
        <h1 className="m-0 font-serif text-[clamp(2rem,5vw,4rem)] font-semibold capitalize leading-[1.2] tracking-[-0.02em] text-black">
          {t("termsPage.title")}
        </h1>
      </div>
    </section>
  );
}
