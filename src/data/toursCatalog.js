import {
  tourDetailPhotos,
  vjosaValleyPhotos,
  vjosaBridgeGroup,
  vjosaHikingBreak,
  ebikeTourPhotos,
  ebikeMainImage,
  montenegroTourPhotos,
  montenegroBannerGroup,
  montenegroWinterHike,
  montenegroFerryCrossing,
  regularBikeMainImage,
} from "../assets/gallery/index.js";

/** Shared departure windows for the classic cycling tour. */
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

/** Actual confirmed departure dates for the Albania – Montenegro tour. */
export const MONTENEGRO_DEPARTURES = [
  { id: "2026-04-26", checkIn: "2026-04-26", checkOut: "2026-05-03" },
  { id: "2026-05-24", checkIn: "2026-05-24", checkOut: "2026-05-31" },
  { id: "2026-06-14", checkIn: "2026-06-14", checkOut: "2026-06-21" },
  { id: "2026-09-13", checkIn: "2026-09-13", checkOut: "2026-09-20" },
  { id: "2026-09-27", checkIn: "2026-09-27", checkOut: "2026-10-04" },
  { id: "2026-10-11", checkIn: "2026-10-11", checkOut: "2026-10-18" },
  { id: "2027-04-05", checkIn: "2027-04-05", checkOut: "2027-04-12" },
  { id: "2027-04-15", checkIn: "2027-04-15", checkOut: "2027-04-22" },
  { id: "2027-04-28", checkIn: "2027-04-28", checkOut: "2027-05-05" },
  { id: "2027-05-15", checkIn: "2027-05-15", checkOut: "2027-05-22" },
  { id: "2027-06-15", checkIn: "2027-06-15", checkOut: "2027-06-22" },
  { id: "2027-09-07", checkIn: "2027-09-07", checkOut: "2027-09-14" },
  { id: "2027-09-16", checkIn: "2027-09-16", checkOut: "2027-09-23" },
  { id: "2027-09-25", checkIn: "2027-09-25", checkOut: "2027-10-02" },
  { id: "2027-10-05", checkIn: "2027-10-05", checkOut: "2027-10-12" },
  { id: "2027-10-14", checkIn: "2027-10-14", checkOut: "2027-10-21" },
  { id: "2027-10-24", checkIn: "2027-10-24", checkOut: "2027-11-01" },
];

/** Actual confirmed departure dates for the Vjosa Valley tour. */
export const VJOSA_VALLEY_DEPARTURES = [
  { id: "2026-06-18", checkIn: "2026-06-18", checkOut: "2026-06-26" },
  { id: "2026-10-01", checkIn: "2026-10-01", checkOut: "2026-10-09" },
  { id: "2027-04-16", checkIn: "2027-04-16", checkOut: "2027-04-24" },
  { id: "2027-05-21", checkIn: "2027-05-21", checkOut: "2027-05-28" },
  { id: "2027-06-16", checkIn: "2027-06-16", checkOut: "2027-06-26" },
  { id: "2027-10-01", checkIn: "2027-10-01", checkOut: "2027-10-09" },
  { id: "2027-10-12", checkIn: "2027-10-12", checkOut: "2027-10-20" },
];

/** Actual confirmed departure dates for the E-Bike Mediterranean Flair tour (2026/27 seasons). */
export const EBIKE_MEDITERRANEAN_DEPARTURES = [
  { id: "2026-08-29", checkIn: "2026-08-29", checkOut: "2026-09-05" },
  { id: "2026-09-08", checkIn: "2026-09-08", checkOut: "2026-09-15" },
  { id: "2026-09-19", checkIn: "2026-09-19", checkOut: "2026-09-26" },
  { id: "2026-09-30", checkIn: "2026-09-30", checkOut: "2026-10-07" },
  { id: "2026-10-10", checkIn: "2026-10-10", checkOut: "2026-10-17" },
  { id: "2026-10-21", checkIn: "2026-10-21", checkOut: "2026-10-28" },
  { id: "2026-10-31", checkIn: "2026-10-31", checkOut: "2026-11-07" },
  { id: "2027-04-02", checkIn: "2027-04-02", checkOut: "2027-04-09" },
  { id: "2027-04-09", checkIn: "2027-04-09", checkOut: "2027-04-16" },
  { id: "2027-04-16", checkIn: "2027-04-16", checkOut: "2027-04-23" },
  { id: "2027-04-30", checkIn: "2027-04-30", checkOut: "2027-05-07" },
  { id: "2027-05-07", checkIn: "2027-05-07", checkOut: "2027-05-14" },
  { id: "2027-05-14", checkIn: "2027-05-14", checkOut: "2027-05-21" },
  { id: "2027-05-21", checkIn: "2027-05-21", checkOut: "2027-05-28" },
  { id: "2027-05-28", checkIn: "2027-05-28", checkOut: "2027-06-04" },
  { id: "2027-06-04", checkIn: "2027-06-04", checkOut: "2027-06-11" },
  { id: "2027-06-11", checkIn: "2027-06-11", checkOut: "2027-06-18" },
  { id: "2027-06-18", checkIn: "2027-06-18", checkOut: "2027-06-26" },
  { id: "2027-06-26", checkIn: "2027-06-26", checkOut: "2027-07-03" },
  { id: "2027-09-03", checkIn: "2027-09-03", checkOut: "2027-09-10" },
  { id: "2027-09-10", checkIn: "2027-09-10", checkOut: "2027-09-17" },
  { id: "2027-09-17", checkIn: "2027-09-17", checkOut: "2027-09-24" },
  { id: "2027-09-24", checkIn: "2027-09-24", checkOut: "2027-10-01" },
  { id: "2027-10-01", checkIn: "2027-10-01", checkOut: "2027-10-09" },
  { id: "2027-10-09", checkIn: "2027-10-09", checkOut: "2027-10-16" },
  { id: "2027-10-16", checkIn: "2027-10-16", checkOut: "2027-10-23" },
  { id: "2027-10-23", checkIn: "2027-10-23", checkOut: "2027-10-30" },
];

/** Confirmed departure dates for the West Balkans tour (2027 season). */
export const WEST_BALKANS_DEPARTURES = [
  { id: "2027-04-09", checkIn: "2027-04-09", checkOut: "2027-04-22" },
  { id: "2027-04-30", checkIn: "2027-04-30", checkOut: "2027-05-13" },
  { id: "2027-05-07", checkIn: "2027-05-07", checkOut: "2027-05-21" },
  { id: "2027-09-07", checkIn: "2027-09-07", checkOut: "2027-09-21" },
  { id: "2027-09-28", checkIn: "2027-09-28", checkOut: "2027-10-10" },
  { id: "2027-10-13", checkIn: "2027-10-13", checkOut: "2027-10-26" },
];

/** Confirmed departure dates for the 10-Day Vjosa River tour (2027 season). */
export const VJOSA_RIVER_DEPARTURES = [
  { id: "2027-05-21", checkIn: "2027-05-21", checkOut: "2027-05-28" },
  { id: "2027-06-16", checkIn: "2027-06-16", checkOut: "2027-06-26" },
  { id: "2027-10-01", checkIn: "2027-10-01", checkOut: "2027-10-09" },
];

export const TOURS = [
  {
    id: "8-day-cycling",
    slug: "8-day-cycling",
    basePrice: 1290,
    cardImage: regularBikeMainImage,
    heroImage: regularBikeMainImage,
    photos: tourDetailPhotos,
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
    cardImage: montenegroBannerGroup,
    heroImage: montenegroBannerGroup,
    photos: montenegroTourPhotos,
    departures: MONTENEGRO_DEPARTURES,
    addons: [
      { id: "bike", price: 120 },
      { id: "ebike", price: 225 },
      { id: "single", price: 190 },
    ],
  },
  {
    id: "9-day-vjosa-valley",
    slug: "9-day-vjosa-valley",
    basePrice: 1390,
    cardImage: vjosaBridgeGroup,
    heroImage: vjosaBridgeGroup,
    photos: vjosaValleyPhotos,
    departures: VJOSA_VALLEY_DEPARTURES,
    addons: [
      { id: "bike", price: 120 },
      { id: "ebike", price: 225 },
      { id: "single", price: 220 },
    ],
  },
  {
    id: "8-day-ebike-mediterranean-flair",
    slug: "8-day-ebike-mediterranean-flair",
    basePrice: 1290,
    cardImage: ebikeMainImage,
    heroImage: ebikeMainImage,
    photos: ebikeTourPhotos,
    departures: EBIKE_MEDITERRANEAN_DEPARTURES,
    addons: [
      { id: "bike", price: 120 },
      { id: "ebike", price: 200 },
      { id: "single", price: 200 },
    ],
  },
  {
    id: "15-day-west-balkans",
    slug: "15-day-west-balkans",
    basePrice: 1850,
    cardImage: montenegroFerryCrossing,
    heroImage: montenegroFerryCrossing,
    photos: tourDetailPhotos,
    departures: WEST_BALKANS_DEPARTURES,
    addons: [
      { id: "bike", price: 150 },
      { id: "ebike", price: 250 },
      { id: "single", price: 250 },
    ],
  },
  {
    id: "10-day-vjosa-river-tour",
    slug: "10-day-vjosa-river-tour",
    basePrice: 1390,
    cardImage: vjosaHikingBreak,
    heroImage: vjosaHikingBreak,
    photos: tourDetailPhotos,
    departures: VJOSA_RIVER_DEPARTURES,
    addons: [
      { id: "bike", price: 120 },
      { id: "ebike", price: 225 },
      { id: "single", price: 220 },
    ],
  },
  {
    id: "8-day-balkan-adventure",
    slug: "8-day-balkan-adventure",
    basePrice: 1290,
    cardImage: montenegroWinterHike,
    heroImage: montenegroWinterHike,
    photos: montenegroTourPhotos,
    departures: MONTENEGRO_DEPARTURES,
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
