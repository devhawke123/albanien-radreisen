import { iconCalendar, iconLocation, iconPeople } from "../assets/hero";
import { iconClock, iconHeart, iconStar } from "../assets/shared";

const amenities = ["Hotel", "Guide", "Bike"];

export default function TourCard({ image, faded = false }) {
  return (
    <article className="overflow-hidden rounded-[17px] border border-gray-400 bg-white">
      <div className="relative h-56">
        <img src={image} alt="Cycling tour in Albania" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
              <img src={iconLocation} alt="" className="h-2.5 w-2.5" aria-hidden />
              Albania
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
              <img src={iconPeople} alt="" className="h-2.5 w-2.5" aria-hidden />
              12 People
            </span>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
            aria-label="Save tour"
          >
            <img src={iconHeart} alt="" className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            <img src={iconCalendar} alt="" className="h-2.5 w-2.5" aria-hidden />
            12 Sep 2025
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            <img src={iconClock} alt="" className="h-2.5 w-2.5" aria-hidden />
            8 days
          </span>
        </div>
      </div>

      <div className="space-y-3 px-4 pb-5 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <img key={i} src={iconStar} alt="" className="h-3 w-3" aria-hidden />
          ))}
          <span className="font-medium text-gray-600">4.9</span>
          <span>· 38 reviews</span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-gray-900">
          8-day cycling &amp; discovery tour through Albania (2026)
        </h3>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">From</p>
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              €1,290 <span className="text-sm font-medium text-gray-400">/ person</span>
            </p>
          </div>
          <button
            type="button"
            className={`rounded-md px-5 py-2 text-sm font-medium text-white ${
              faded ? "bg-brand/45" : "bg-brand"
            }`}
          >
            Book Now
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
          {amenities.map((item) => (
            <span key={item} className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {item}
            </span>
          ))}
          <span className="ml-auto text-gray-400">+3 more</span>
        </div>
      </div>
    </article>
  );
}
