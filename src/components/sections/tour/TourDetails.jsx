import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  iconTourCalendar,
  iconTourCheck,
  iconTourDuration,
  iconTourGroup,
  iconTourLocation,
} from "../../../assets/tourPage";
import { iconStar } from "../../../assets/shared";
import { useTour } from "../../../hooks/useTour";
import BookingCard from "./BookingCard";

const TABS = ["overview", "itinerary", "included", "reviews"];
const STAT_ICONS = [iconTourDuration, iconTourLocation, iconTourGroup, iconTourCalendar];

function PricingTable({ title, rows, labelKey, valueKey }) {
  return (
    <div>
      <h3 className="m-0 font-sans text-lg font-semibold text-black sm:text-xl">{title}</h3>
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
        <table className="w-full border-collapse font-sans text-sm sm:text-base">
          <tbody>
            {rows.map((row) => (
              <tr key={row[labelKey]} className="border-b border-gray-200 last:border-b-0">
                <td className="px-4 py-3 text-[#364153] sm:px-5">{row[labelKey]}</td>
                <td className="px-4 py-3 text-right font-semibold text-black sm:px-5">{row[valueKey]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OverviewPanel({ content, photos }) {
  const { t } = useTranslation();
  const stats = content.stats ?? [];
  const highlights = content.highlights ?? [];
  const tourInfo = content.tourInfo ?? [];
  const pricingBase = content.pricingBase ?? [];
  const pricingSupplements = content.pricingSupplements ?? [];
  const pricingBikes = content.pricingBikes ?? [];
  const importantNotes = content.importantNotes ?? [];

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map((stat, index) => (
          <article
            key={stat.label}
            className="rounded-[14px] bg-[#fff8f8] px-4 py-5 shadow-[0_4px_4px_rgba(0,0,0,0.12)] sm:px-5"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[11px] bg-brand-soft/74 sm:h-12 sm:w-12">
              <img src={STAT_ICONS[index]} alt="" className="h-6 w-6" aria-hidden />
            </div>
            <p className="m-0 font-sans text-base font-medium text-black sm:text-xl">{stat.label}</p>
            <p className="m-0 mt-1 font-sans text-sm text-black/65 sm:text-lg">{stat.value}</p>
          </article>
        ))}
      </div>

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.quickDescriptionTitle")}
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-[#4a5565] sm:text-xl sm:leading-[1.6]">
          {content.quickDescription}
        </p>
        <p className="mt-3 font-sans text-base text-[#364153] sm:text-lg">
          {content.quickDescriptionAudience}
        </p>
      </div>

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.aboutTitle")}
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-[#4a5565] sm:text-xl sm:leading-[1.6]">
          {content.aboutBody}
        </p>
      </div>

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.tourInfoTitle")}
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full border-collapse font-sans text-sm sm:text-base">
            <tbody>
              {tourInfo.map((row) => (
                <tr key={row.field} className="border-b border-gray-200 last:border-b-0">
                  <td className="bg-gray-50 px-4 py-3 font-medium text-black sm:px-5">{row.field}</td>
                  <td className="px-4 py-3 text-[#364153] sm:px-5">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.highlightsTitle")}
        </h2>
        <ul className="mt-4 list-none space-y-3 p-0">
          {highlights.map((item) => (
            <li key={item} className="flex gap-3 font-sans text-base text-[#364153] sm:text-xl">
              <img src={iconTourCheck} alt="" className="mt-1 h-[18px] w-[18px] shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.pricingTitle")}
        </h2>
        <PricingTable
          title={t("tourPage.pricingBaseTitle")}
          rows={pricingBase}
          labelKey="package"
          valueKey="price"
        />
        <PricingTable
          title={t("tourPage.pricingSupplementsTitle")}
          rows={pricingSupplements}
          labelKey="option"
          valueKey="price"
        />
        <PricingTable
          title={t("tourPage.pricingBikesTitle")}
          rows={pricingBikes}
          labelKey="bike"
          valueKey="price"
        />
      </div>

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.importantNotesTitle")}
        </h2>
        <ul className="mt-4 list-none space-y-2 p-0">
          {importantNotes.map((note) => (
            <li key={note} className="flex gap-3 font-sans text-base text-[#364153] sm:text-lg">
              <span className="mt-1 text-brand" aria-hidden>
                •
              </span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.photosTitle")}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1.4fr_1fr] sm:gap-4">
          <img src={photos[0]} alt="" className="h-56 w-full rounded-2xl object-cover sm:h-[434px]" />
          <div className="grid gap-3 sm:gap-4">
            <img src={photos[1]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[200px]" />
            <img src={photos[2]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[218px]" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 xs:grid-cols-3 sm:gap-4">
          <img src={photos[3]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[218px]" />
          <img src={photos[4]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[218px]" />
          <img src={photos[5]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[218px]" />
        </div>
      </div>
    </div>
  );
}

function ItineraryDayContent({ day, labels }) {
  return (
    <div className="space-y-3 px-4 pb-4 pl-[4.25rem] font-sans text-sm leading-relaxed text-[#4a5565] sm:px-5 sm:text-base">
      {day.items && (
        <ul className="m-0 list-disc space-y-1 pl-5">
          {day.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {day.distance && (
        <p className="m-0">
          <strong>{labels.distance}:</strong> {day.distance}
        </p>
      )}
      {day.cyclingDistance && (
        <p className="m-0">
          <strong>{labels.cyclingDistance}:</strong> {day.cyclingDistance}
        </p>
      )}
      {day.elevation && (
        <p className="m-0">
          <strong>{labels.elevation}:</strong> {day.elevation}
        </p>
      )}
      {day.highlights && (
        <div>
          <p className="m-0 mb-1 font-semibold text-black">{labels.highlights}:</p>
          <ul className="m-0 list-disc space-y-1 pl-5">
            {day.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {day.overnight && (
        <p className="m-0 font-medium text-black">
          {labels.overnight}: {day.overnight}
        </p>
      )}
    </div>
  );
}

function ItineraryPanel({ content }) {
  const { t } = useTranslation();
  const days = content.itinerary ?? [];
  const labels = t("tourPage.itineraryLabels", { returnObjects: true });
  const [openDay, setOpenDay] = useState(0);

  return (
    <div>
      <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
        {t("tourPage.itineraryTitle")}
      </h2>
      <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200">
        {days.map((day, index) => {
          const isOpen = openDay === index;
          return (
            <div key={day.title}>
              <button
                type="button"
                onClick={() => setOpenDay(isOpen ? -1 : index)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="flex-1 font-sans text-base font-semibold text-black sm:text-xl">
                  {day.title}
                </span>
                <span className="text-gray-400" aria-hidden>
                  {isOpen ? "▴" : "▾"}
                </span>
              </button>
              {isOpen && <ItineraryDayContent day={day} labels={labels} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IncludedPanel({ content }) {
  const { t } = useTranslation();
  const included = content.included ?? [];
  const notIncluded = content.notIncluded ?? [];
  const features = content.features ?? [];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
        {t("tourPage.includedTitle")}
      </h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-[#fff8f8] p-5 sm:p-6">
          <h3 className="m-0 flex items-center gap-2 font-sans text-lg font-semibold text-black sm:text-xl">
            <span className="text-brand" aria-hidden>
              ✓
            </span>
            {t("tourPage.includedLabel")}
          </h3>
          <ul className="mt-4 list-none space-y-3 p-0">
            {included.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-sm text-[#364153] sm:text-base">
                <img src={iconTourCheck} alt="" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-gray-50 p-5 sm:p-6">
          <h3 className="m-0 flex items-center gap-2 font-sans text-lg font-semibold text-black sm:text-xl">
            <span className="text-gray-400" aria-hidden>
              ✕
            </span>
            {t("tourPage.notIncludedLabel")}
          </h3>
          <ul className="mt-4 list-none space-y-3 p-0">
            {notIncluded.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-sm text-[#364153] sm:text-base">
                <span className="mt-0.5 text-gray-400" aria-hidden>
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div>
        <h3 className="m-0 font-sans text-lg font-semibold text-black sm:text-xl">
          {t("tourPage.featuresTitle")}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 font-sans text-sm text-gray-600"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsPanel({ content }) {
  const { t } = useTranslation();
  const reviews = content.reviews ?? [];

  return (
    <div>
      <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
        {t("tourPage.reviewsTitle")}
      </h2>
      <div className="mt-6 grid gap-4">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-2xl border border-gray-200 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={iconStar} alt="" className="h-3.5 w-3.5" aria-hidden />
              ))}
              <span className="font-medium text-gray-700">{review.rating}</span>
            </div>
            <p className="mt-3 font-sans text-base leading-relaxed text-[#4a5565] sm:text-lg">
              “{review.quote}”
            </p>
            <p className="mt-3 font-sans text-sm font-semibold text-black">{review.name}</p>
            <p className="m-0 font-sans text-sm text-gray-500">{review.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function TourDetails() {
  const { t } = useTranslation();
  const { tour, content } = useTour();
  const [activeTab, setActiveTab] = useState("overview");

  if (!tour) return <Navigate to="/tours" replace />;

  return (
    <section className="bg-white px-hero-x py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-hero gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-10 xl:gap-14">
        <div>
          <div className="mb-8 inline-flex max-w-full overflow-x-auto rounded-2xl bg-gray-100 p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-xl px-4 py-3 font-sans text-sm font-semibold capitalize sm:px-6 sm:text-base ${
                  activeTab === tab ? "bg-brand text-white" : "text-gray-600"
                }`}
              >
                {t(`tourPage.tabs.${tab}`)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && <OverviewPanel content={content} photos={tour.photos} />}
          {activeTab === "itinerary" && <ItineraryPanel content={content} />}
          {activeTab === "included" && <IncludedPanel content={content} />}
          {activeTab === "reviews" && <ReviewsPanel content={content} />}
        </div>

        <BookingCard key={tour.slug} />
      </div>
    </section>
  );
}
