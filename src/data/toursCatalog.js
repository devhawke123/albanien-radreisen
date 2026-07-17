import { hilltopGroupPic, featuredSlide2 } from "../assets/tours";
import { tourHeroImage, tourPhoto1, tourPhoto2 } from "../assets/tourPage";

/** Shared departure windows for the 2026 booking season. */
export const SHARED_DEPARTURES = [
  { id: "2027-06-10", checkIn: "2027-06-10", checkOut: "2027-06-17" },
  { id: "2026-08-29", checkIn: "2026-08-29", checkOut: "2026-09-05" },
  { id: "2026-09-08", checkIn: "2026-09-08", checkOut: "2026-09-15" },
  { id: "2026-09-19", checkIn: "2026-09-19", checkOut: "2026-09-26" },
  { id: "2026-09-30", checkIn: "2026-09-30", checkOut: "2026-10-07" },
  { id: "2026-10-10", checkIn: "2026-10-10", checkOut: "2026-10-17" },
  { id: "2026-10-21", checkIn: "2026-10-21", checkOut: "2026-10-28" },
  { id: "2026-10-30", checkIn: "2026-10-30", checkOut: "2026-11-08" },
  { id: "2026-10-31", checkIn: "2026-10-31", checkOut: "2026-11-07" },
];

export const TOURS = [
  {
    id: "8-day-cycling",
    slug: "8-day-cycling",
    basePrice: 1290,
    cardImage: hilltopGroupPic,
    heroImage: tourHeroImage,
    photos: [tourPhoto1, tourPhoto2, tourPhoto2],
    departures: SHARED_DEPARTURES,
    addons: [
      { id: "bike", price: 120 },
      { id: "ebike", price: 225 },
      { id: "single", price: 200 },
    ],
  },
  {
    id: "8-day-albania-montenegro",
    slug: "8-day-albania-montenegro",
    basePrice: 1290,
    cardImage: featuredSlide2,
    heroImage: featuredSlide2,
    photos: [tourPhoto2, tourPhoto1, tourPhoto2],
    departures: SHARED_DEPARTURES,
    addons: [
      { id: "bike", price: 120 },
      { id: "ebike", price: 225 },
      { id: "single", price: 190 },
    ],
  },
];

export function getTourBySlug(slug) {
  return TOURS.find((tour) => tour.slug === slug) ?? null;
}

export function getRelatedTours(slug) {
  return TOURS.filter((tour) => tour.slug !== slug);
}
