import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTourBySlug } from "../data/toursCatalog";

export function useTourSlug() {
  const { slug } = useParams();
  return slug ?? "8-day-cycling";
}

export function useTour() {
  const slug = useTourSlug();
  const { t, i18n } = useTranslation();
  const tour = getTourBySlug(slug);
  const content = t(`toursContent.${slug}`, { returnObjects: true });

  const tTour = useMemo(
    () => (key, options) => t(`toursContent.${slug}.${key}`, options),
    [t, slug],
  );

  return {
    slug,
    tour,
    content: content && typeof content === "object" ? content : {},
    tTour,
    t,
    i18n,
    locale: i18n.language?.startsWith("de") ? "de" : "en",
  };
}
