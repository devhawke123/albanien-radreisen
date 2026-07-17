import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useCart from "../hooks/useCart";
import { clearCart } from "../utils/cartStore";
import { getTourBySlug } from "../data/toursCatalog";
import { formatDisplayDate, formatEuro } from "../utils/bookingPricing";
import { submitOrder } from "../services/submitOrder";

const COUNTRIES = [
  "Germany",
  "Austria",
  "Switzerland",
  "Albania",
  "Italy",
  "France",
  "Netherlands",
  "Belgium",
  "United Kingdom",
  "United States",
  "Other",
];

const EMPTY_FORM = {
  email: "",
  country: "",
  firstName: "",
  lastName: "",
  company: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
  note: "",
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-sans text-sm text-gray-700">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-3 font-sans text-sm text-gray-800 outline-none focus:border-brand";

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const locale = i18n.language?.startsWith("de") ? "de" : "en";
  const cartItems = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [showApartment, setShowApartment] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const items = cartItems.map((item) => ({
        tourId: item.tourId,
        tourTitle: t(`toursContent.${item.tourId}.title`),
        departureId: item.departureId,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
        guests: item.guests,
        addons: item.addons,
        total: item.total,
      }));
      const result = await submitOrder({ form, items, subtotal, locale });
      clearCart();
      setOrderNumber(result.orderNumber);
      setSubmitted(true);
    } catch {
      setSubmitError(t("checkoutPage.submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  if (!submitted && cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <div className="border-b border-gray-100 px-hero-x py-4 shadow-sm">
          <Header light />
        </div>
        <main className="px-hero-x py-16 sm:py-20">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="m-0 font-serif text-4xl font-semibold text-black">
              {t("checkoutPage.successTitle")}
            </h1>
            <p className="mt-4 font-sans text-base text-gray-600">{t("checkoutPage.successBody")}</p>
            <p className="mt-2 font-sans text-sm font-semibold text-black">{orderNumber}</p>
            <button
              type="button"
              onClick={() => navigate("/tours")}
              className="mt-8 inline-flex cursor-pointer rounded-xl bg-brand px-6 py-3 font-sans font-semibold text-white"
            >
              {t("checkoutPage.backToTours")}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="border-b border-gray-100 px-hero-x py-4 shadow-sm">
        <Header light />
      </div>

      <main className="px-hero-x py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-hero">
          <h1 className="m-0 font-serif text-4xl font-semibold text-black sm:text-5xl">
            {t("checkoutPage.title")}
          </h1>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,420px)] lg:items-start xl:gap-14">
            <form onSubmit={handleSubmit} className="space-y-10">
              <section>
                <h2 className="m-0 font-sans text-xl font-semibold text-black">
                  {t("checkoutPage.contactTitle")}
                </h2>
                <div className="mt-5">
                  <Field label={t("checkoutPage.email")}>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <p className="m-0 mt-2 font-sans text-sm text-gray-500">
                    {t("checkoutPage.guestNote")}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="m-0 font-sans text-xl font-semibold text-black">
                  {t("checkoutPage.billingTitle")}
                </h2>
                <div className="mt-5 space-y-4">
                  <Field label={t("checkoutPage.country")}>
                    <select
                      required
                      value={form.country}
                      onChange={(event) => updateField("country", event.target.value)}
                      className={inputClass}
                    >
                      <option value="">{t("checkoutPage.countryPlaceholder")}</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {t(`checkoutPage.countries.${country}`, { defaultValue: country })}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("checkoutPage.firstName")}>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(event) => updateField("firstName", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label={t("checkoutPage.lastName")}>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(event) => updateField("lastName", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label={t("checkoutPage.company")}>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(event) => updateField("company", event.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label={t("checkoutPage.address")}>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(event) => updateField("address", event.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  {!showApartment ? (
                    <button
                      type="button"
                      onClick={() => setShowApartment(true)}
                      className="cursor-pointer border-0 bg-transparent p-0 font-sans text-sm text-brand"
                    >
                      {t("checkoutPage.addApartment")}
                    </button>
                  ) : (
                    <Field label={t("checkoutPage.apartment")}>
                      <input
                        type="text"
                        value={form.apartment}
                        onChange={(event) => updateField("apartment", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("checkoutPage.city")}>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(event) => updateField("city", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label={t("checkoutPage.state")}>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(event) => updateField("state", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("checkoutPage.postalCode")}>
                      <input
                        type="text"
                        required
                        value={form.postalCode}
                        onChange={(event) => updateField("postalCode", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label={t("checkoutPage.phone")}>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(event) => updateField("phone", event.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="m-0 font-sans text-xl font-semibold text-black">
                  {t("checkoutPage.paymentTitle")}
                </h2>
                <div className="mt-5 rounded-xl border border-gray-200 p-4">
                  <label className="flex cursor-pointer gap-3">
                    <input type="radio" checked readOnly className="mt-1 accent-brand" />
                    <span>
                      <span className="block font-sans text-sm font-semibold text-black">
                        {t("checkoutPage.cashOnDelivery")}
                      </span>
                      <span className="mt-1 block font-sans text-sm text-gray-500">
                        {t("checkoutPage.cashOnDeliveryHint")}
                      </span>
                    </span>
                  </label>
                </div>

                <label className="mt-4 flex cursor-pointer items-center gap-2 font-sans text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={showNote}
                    onChange={(event) => setShowNote(event.target.checked)}
                  />
                  {t("checkoutPage.addNote")}
                </label>

                {showNote && (
                  <textarea
                    rows={4}
                    value={form.note}
                    onChange={(event) => updateField("note", event.target.value)}
                    className={`mt-3 ${inputClass}`}
                    placeholder={t("checkoutPage.notePlaceholder")}
                  />
                )}
              </section>

              <p className="m-0 font-sans text-sm text-gray-500">
                {t("checkoutPage.termsPrefix")}{" "}
                <Link to="/imprint" className="text-brand no-underline hover:underline">
                  {t("checkoutPage.termsLink")}
                </Link>{" "}
                {t("checkoutPage.termsAnd")}{" "}
                <Link to="/imprint" className="text-brand no-underline hover:underline">
                  {t("checkoutPage.privacyLink")}
                </Link>
              </p>

              {submitError && (
                <p className="m-0 font-sans text-sm text-brand">{submitError}</p>
              )}

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/cart"
                  className="font-sans text-sm font-medium text-brand no-underline hover:underline"
                >
                  ← {t("checkoutPage.backToCart")}
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer rounded-md bg-brand px-6 py-3.5 font-sans text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 sm:max-w-md"
                >
                  {submitting ? t("checkoutPage.placingOrder") : t("checkoutPage.placeOrder")}
                </button>
              </div>
            </form>

            <aside className="rounded-2xl border border-gray-200 p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="m-0 font-sans text-lg font-semibold text-black">
                {t("checkoutPage.orderOverview")}
              </h2>

              <ul className="mt-5 list-none space-y-5 p-0">
                {cartItems.map((item) => {
                  const tour = getTourBySlug(item.tourId);
                  const content = t(`toursContent.${item.tourId}`, { returnObjects: true });
                  return (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={tour?.cardImage}
                        alt=""
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-700 px-1 text-[10px] font-bold text-white">
                        {item.guests}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="m-0 font-sans text-sm font-semibold uppercase leading-snug text-black">
                          {content.title}
                        </p>
                        <p className="m-0 shrink-0 font-sans text-sm font-semibold text-black">
                          {formatEuro(item.total)}
                        </p>
                      </div>
                      <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-gray-500">
                        {content.quickDescription}
                      </p>
                      <p className="m-0 mt-2 font-sans text-xs text-gray-600">
                        {t("cartPage.checkIn")}: {formatDisplayDate(item.checkIn, locale)} /{" "}
                        {t("cartPage.checkOut")}: {formatDisplayDate(item.checkOut, locale)} /{" "}
                        {t("cartPage.adults")}: {item.guests}
                      </p>
                    </div>
                  </li>
                  );
                })}
              </ul>

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-4 font-sans">
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span>{t("checkoutPage.subtotal")}</span>
                  <span>{formatEuro(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-black">
                  <span>{t("checkoutPage.total")}</span>
                  <span>{formatEuro(subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
