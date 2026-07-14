import { useTranslation } from "react-i18next";
import Header from "../../layout/Header";
import { aboutHeroImage } from "../../../assets/aboutPage";

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <section
      className="relative flex min-h-[420px] flex-col bg-cover bg-center px-hero-x py-hero-y text-white xs:min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.44), rgba(0,0,0,0.44)), url(${aboutHeroImage})`,
      }}
    >
      <Header />

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center text-center">
        <h1 className="m-0 font-serif text-hero-title-accent font-medium leading-[0.92]">
          {t("aboutHero.title")}
        </h1>
      </div>
    </section>
  );
}
