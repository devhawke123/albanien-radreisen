import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  iconTourCalendar,
  iconTourCheck,
  iconTourDuration,
  iconTourGroup,
  iconTourLocation,
  tourPhoto1,
  tourPhoto2,
} from "../../../assets/tourPage";
import { iconStar } from "../../../assets/shared";

const TABS = ["overview", "itinerary", "included", "reviews"];
const STAT_ICONS = [iconTourDuration, iconTourLocation, iconTourGroup, iconTourCalendar];

function OverviewPanel() {
  const { t } = useTranslation();
  const stats = t("tourPage.stats", { returnObjects: true });
  const highlights = t("tourPage.highlights", { returnObjects: true });
  const photos = [tourPhoto1, tourPhoto2, tourPhoto2];

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
          {t("tourPage.aboutTitle")}
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-[#4a5565] sm:text-xl sm:leading-[1.6]">
          {t("tourPage.aboutBody")}
        </p>
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

      <div>
        <h2 className="m-0 font-sans text-xl font-bold text-black sm:text-[28px] sm:leading-8">
          {t("tourPage.photosTitle")}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1.4fr_1fr] sm:gap-4">
          <img
            src={photos[0]}
            alt=""
            className="h-56 w-full rounded-2xl object-cover sm:h-[434px]"
          />
          <div className="grid gap-3 sm:gap-4">
            <img src={photos[1]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[200px]" />
            <img src={photos[2]} alt="" className="h-40 w-full rounded-2xl object-cover sm:h-[218px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItineraryPanel() {
  const { t } = useTranslation();
  const days = t("tourPage.itinerary", { returnObjects: true });
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
              {isOpen && (
                <p className="m-0 px-4 pb-4 pl-[4.25rem] font-sans text-sm leading-relaxed text-[#4a5565] sm:px-5 sm:text-base">
                  {day.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IncludedPanel() {
  const { t } = useTranslation();
  const included = t("tourPage.included", { returnObjects: true });
  const notIncluded = t("tourPage.notIncluded", { returnObjects: true });
  const features = t("tourPage.features", { returnObjects: true });

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

function ReviewsPanel() {
  const { t } = useTranslation();
  const reviews = t("tourPage.reviews", { returnObjects: true });

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

function BookingCard() {
  const { t } = useTranslation();
  const [formTab, setFormTab] = useState("booking");
  const [guests, setGuests] = useState(1);
  const [addons, setAddons] = useState([]);
  const addonItems = t("tourPage.booking.addons", { returnObjects: true });

  function toggleAddon(id) {
    setAddons((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    // ponytail: no booking API yet — wire up when backend exists
  }

  return (
    <aside
      id="tour-booking"
      className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)] sm:p-6 lg:sticky lg:top-6"
    >
      <div className="flex items-start gap-2">
        <span className="mt-1 text-brand" aria-hidden>
          📍
        </span>
        <div>
          <p className="m-0 font-sans text-sm text-gray-500">{t("tourPage.booking.from")}</p>
          <p className="m-0 font-sans text-3xl font-bold text-emerald-600 sm:text-4xl">
            {t("tourPage.booking.price")}
          </p>
        </div>
      </div>

      <div className="my-5 flex items-center gap-2">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-brand" aria-hidden>
          ✈
        </span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="mb-5 flex justify-center gap-6 border-b border-gray-200">
        {["booking", "request"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFormTab(tab)}
            className={`pb-2 font-sans text-sm font-semibold ${
              formTab === tab
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-gray-400"
            }`}
          >
            {t(`tourPage.booking.${tab}Tab`)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formTab === "booking" ? (
          <>
            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.chooseTime")} <span className="text-brand">*</span>
              </span>
              <select className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 font-sans text-sm text-gray-800">
                <option>{t("tourPage.booking.timeOption")}</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.checkIn")} <span className="text-brand">*</span>
              </span>
              <input
                type="text"
                defaultValue={t("tourPage.booking.checkInValue")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.checkOut")} <span className="text-brand">*</span>
              </span>
              <input
                type="text"
                defaultValue={t("tourPage.booking.checkOutValue")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>

            <div>
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.guests")} <span className="text-brand">*</span>
              </span>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
                <span className="font-sans text-sm text-gray-700">
                  {t("tourPage.booking.adult")}{" "}
                  <strong>{t("tourPage.booking.price")}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests((n) => Math.max(1, n - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100"
                    aria-label={t("tourPage.booking.decreaseGuests")}
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-sans text-sm font-semibold">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((n) => n + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100"
                    aria-label={t("tourPage.booking.increaseGuests")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="m-0 mb-2 font-sans text-sm font-semibold text-gray-700">
                {t("tourPage.booking.addonsTitle")}
              </p>
              <ul className="list-none space-y-2 p-0">
                {addonItems.map((addon) => (
                  <li key={addon.id}>
                    <label className="flex cursor-pointer gap-2 font-sans text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={addons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-0.5"
                      />
                      <span>{addon.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.name")} <span className="text-brand">*</span>
              </span>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.email")} <span className="text-brand">*</span>
              </span>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.message")}
              </span>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>
          </>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="font-sans text-sm font-semibold text-gray-700">
            {t("tourPage.booking.total")}
          </span>
          <span className="font-sans text-lg font-bold text-black">
            {t("tourPage.booking.price")}
          </span>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-2xl bg-brand py-3.5 font-sans text-base font-semibold text-white"
        >
          {formTab === "booking" ? t("tourPage.booking.submit") : t("tourPage.booking.sendRequest")}
        </button>
      </form>
    </aside>
  );
}

export default function TourDetails() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

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

          {activeTab === "overview" && <OverviewPanel />}
          {activeTab === "itinerary" && <ItineraryPanel />}
          {activeTab === "included" && <IncludedPanel />}
          {activeTab === "reviews" && <ReviewsPanel />}
        </div>

        <BookingCard />
      </div>
    </section>
  );
}
