import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  galleryImageBottom,
  galleryImageLeft,
  galleryImageRight,
  galleryImageTop,
} from "../../assets/gallery";

function GalleryTile({ src, alt, className, imageClassName }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl sm:rounded-[20px] ${className}`}>
      <img src={src} alt={alt} className={imageClassName} />
    </div>
  );
}

export default function Gallery() {
  const { t } = useTranslation();
  const alts = t("gallery.alts", { returnObjects: true });

  return (
    <section id="gallery" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-hero flex-col items-center gap-10 sm:gap-14">
        <div className="mx-auto max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">{t("gallery.label")}</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            {t("gallery.title")}
          </h2>
          <Link
            to="/gallery"
            className="mt-5 inline-flex h-btn-sm w-full cursor-pointer items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline sm:mt-6 sm:w-auto"
          >
            {t("gallery.viewAll")}
          </Link>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 lg:grid-cols-[minmax(0,676fr)_minmax(0,609fr)_minmax(0,408fr)] lg:grid-rows-[minmax(0,476fr)_minmax(0,344fr)] lg:gap-[15px] lg:h-[min(647px,70vh)]">
          <GalleryTile
            src={galleryImageLeft}
            alt={alts[0]}
            className="aspect-[4/5] xs:aspect-[3/4] lg:col-start-1 lg:row-span-2 lg:aspect-auto "
            imageClassName="h-full w-full object-cover"
          />
          <GalleryTile
            src={galleryImageTop}
            alt={alts[1]}
            className="aspect-[4/3] lg:col-start-2 lg:row-start-1 lg:aspect-auto lg:h-full"
            imageClassName="absolute inset-0 h-full w-[144%] max-w-none -left-[44%] object-cover"
          />
          <GalleryTile
            src={galleryImageBottom}
            alt={alts[2]}
            className="aspect-[16/9] lg:col-start-2 lg:row-start-2 lg:aspect-auto lg:h-full"
            imageClassName="h-full w-full object-cover"
          />
          <GalleryTile
            src={galleryImageRight}
            alt={alts[3]}
            className="aspect-[3/4] xs:aspect-[16/9] xs:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-full"
            imageClassName="h-full w-full object-cover lg:absolute lg:inset-0  lg:max-w-none "
          />
        </div>
      </div>
    </section>
  );
}
