import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { homeAboutAlbaniaCoast, homeAboutAlbaniaCyclists } from "../../assets/sections";

export default function HomeAboutAlbania() {
  const { t } = useTranslation();

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,727px)_minmax(0,1fr)] lg:items-start lg:gap-[60px] xl:gap-[80px]">
          <div>
            <p className="font-sans text-section-label font-semibold text-brand">{t("homeAboutAlbania.label")}</p>
            <h2 className="mt-4 max-w-[711px] font-serif text-section-title font-semibold capitalize text-black">
              {t("homeAboutAlbania.title")}
            </h2>

            <Link
              to="/about"
              className="mt-6 inline-flex h-btn-sm w-full items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:w-auto"
            >
              {t("homeAboutAlbania.cta")}
            </Link>

            <div className="mt-8 max-w-[1042px] space-y-4 font-sans text-body-lead font-medium text-black">
              <p>{t("homeAboutAlbania.body1")}</p>
              <p>{t("homeAboutAlbania.body2")}</p>
              <p>{t("homeAboutAlbania.body3")}</p>
            </div>
          </div>

          <div className="relative  mx-auto h-[340px] w-full max-w-[720px] lg:mx-0 lg:h-[690px]">
            <img
              src={homeAboutAlbaniaCoast}
              alt={t("homeAboutAlbania.imageAltCoast")}
              className="absolute left-0 top-0 h-[60%] w-[60%] rounded-[11px] object-cover"
            />
            <img
              src={homeAboutAlbaniaCyclists}
              alt={t("homeAboutAlbania.imageAltCyclists")}
              className="absolute bottom-0 right-0 h-[60%] w-[60%] rounded-[11px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
