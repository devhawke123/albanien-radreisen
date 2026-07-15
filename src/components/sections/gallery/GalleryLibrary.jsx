import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  galleryFeatured,
  galleryGrid1,
  galleryGrid2,
  galleryGrid3,
  galleryGrid4,
  galleryGrid5,
  galleryGrid6,
  galleryGrid7,
  galleryGrid8,
  galleryGrid9,
} from "../../../assets/galleryPage";
import { cyclepinkGirl } from "../../../assets/shared";

const PAGE_SIZE = 9;

const GALLERY_ITEMS = [
  galleryGrid1,
  galleryGrid2,
  galleryGrid3,
  galleryGrid4,
  galleryGrid5,
  galleryGrid6,
  galleryGrid7,
  galleryGrid8,
  galleryGrid9,
];

function PageArrow({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      {direction === "prev" ? (
        <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function GalleryLibrary() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const alts = t("galleryPage.alts", { returnObjects: true });
  const altList = Array.isArray(alts) ? alts : [];

  const totalPages = Math.max(1, Math.ceil(GALLERY_ITEMS.length / PAGE_SIZE));
  const pageItems = GALLERY_ITEMS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function goTo(nextPage) {
    setPage(((nextPage % totalPages) + totalPages) % totalPages);
  }

  return (
    <section className="relative overflow-hidden bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <img
        src={cyclepinkGirl}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-4 top-28 hidden w-[180px] opacity-90 xl:block xl:w-[212px]"
      />

      <div className="relative z-10 mx-auto max-w-hero">
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-[1002px] flex-1">
            <h2 className="font-serif text-section-title font-semibold capitalize text-black">
              {t("galleryPage.libraryTitle")}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:gap-[27px]">
          {pageItems.map((src, index) => {
            const altIndex = page * PAGE_SIZE + index;

            return (
              <div key={`${page}-${altIndex}`} className="aspect-[567/376] overflow-hidden rounded-[2px]">
                <img
                  src={src}
                  alt={altList[altIndex] ?? altList[altIndex % Math.max(altList.length, 1)] ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 sm:mt-12">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={totalPages <= 1}
            aria-label={t("galleryPage.previousPage")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 text-black transition-colors hover:bg-brand-pale disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <PageArrow direction="prev" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={t("galleryPage.showPage", { page: index + 1 })}
                aria-pressed={index === page}
                className={`h-2.5 cursor-pointer rounded-full transition-all ${
                  index === page ? "w-8 bg-brand" : "w-2.5 bg-black/25 hover:bg-black/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={totalPages <= 1}
            aria-label={t("galleryPage.nextPage")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 text-black transition-colors hover:bg-brand-pale disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <PageArrow direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
