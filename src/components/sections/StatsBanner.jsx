import { useTranslation } from "react-i18next";
import { cyclistDecoration } from "../../assets/about";
import { mountainIllustration } from "../../assets/shared";

export default function StatsBanner() {
  const { t } = useTranslation();
  const stats = t("stats.items", { returnObjects: true });

  return (
    <section className="px-hero-x pb-16 md:pb-20">
      <div className="relative mx-auto max-w-[1660px] overflow-hidden rounded-[19px] bg-brand-pale px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
        <img
          src={cyclistDecoration}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-4 hidden h-24 w-auto sm:block md:left-8 md:h-28 lg:left-12 lg:h-[112px]"
        />
        <img
          src={mountainIllustration}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-0 -bottom-1/4 hidden h-24 w-auto -translate-y-1/2 sm:block md:h-28 lg:h-[112px]"
        />

        <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-6 xs:gap-x-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-0 xl:gap-x-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col items-center text-center">
              <p className="font-sans text-stat-value font-bold leading-none text-stat">{stat.value}</p>
              <p className="mt-2 max-w-[11rem] font-sans text-stat-label leading-snug text-stat sm:mt-3 lg:max-w-[10.5rem] xl:max-w-[12rem]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
