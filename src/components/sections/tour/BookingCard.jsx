import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { submitBooking } from "../../../services/bookingSubmit";
import { addCartItem } from "../../../utils/cartStore";
import {
  calculateBookingTotal,
  formatDepartureLabel,
  formatDisplayDate,
  formatEuro,
} from "../../../utils/bookingPricing";
import { useTour } from "../../../hooks/useTour";

function QuantityStepper({ value, min, onDecrease, onIncrease, decreaseLabel, increaseLabel }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={decreaseLabel}
      >
        −
      </button>
      <span className="w-6 text-center font-sans text-sm font-semibold">{value}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100"
        aria-label={increaseLabel}
      >
        +
      </button>
    </div>
  );
}

function addonLabel(t, addon) {
  return t(`tourPage.booking.addons.${addon.id}.label`, { price: addon.price });
}

export default function BookingCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tour, content, slug, locale } = useTour();

  const departures = tour?.departures ?? [];
  const addons = tour?.addons ?? [];

  const [formTab, setFormTab] = useState("booking");
  const [selectedDepartureId, setSelectedDepartureId] = useState(departures[0]?.id ?? "");
  const [guests, setGuests] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addonQuantities, setAddonQuantities] = useState({ bike: 1, ebike: 1, single: 1 });
  const [requestForm, setRequestForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedDeparture =
    departures.find((d) => d.id === selectedDepartureId) ?? departures[0];

  const activeAddonQuantities = useMemo(() => {
    const quantities = {};
    for (const id of selectedAddons) {
      quantities[id] = addonQuantities[id] ?? 1;
    }
    return quantities;
  }, [selectedAddons, addonQuantities]);

  const total = calculateBookingTotal(guests, activeAddonQuantities, tour);

  if (!tour || !selectedDeparture) return <Navigate to="/tours" replace />;

  function toggleAddon(id) {
    setSelectedAddons((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function updateAddonQuantity(id, delta) {
    setAddonQuantities((current) => ({
      ...current,
      [id]: Math.max(1, (current[id] ?? 1) + delta),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
      if (formTab === "booking" && guests < 2) {
        throw new Error(t("tourPage.booking.minGuestsError"));
      }

      if (formTab === "booking") {
        addCartItem({
          id: `${slug}-${selectedDeparture.id}`,
          tourId: slug,
          departureId: selectedDeparture.id,
          checkIn: selectedDeparture.checkIn,
          checkOut: selectedDeparture.checkOut,
          guests,
          addons: selectedAddons.map((id) => {
            const addon = addons.find((item) => item.id === id);
            return {
              id,
              quantity: addonQuantities[id] ?? 1,
              unitPrice: addon.price,
            };
          }),
          total,
        });
        navigate("/cart");
        return;
      }

      setStatus("submitting");
      const departureLabel = formatDepartureLabel(
        selectedDeparture.checkIn,
        selectedDeparture.checkOut,
        locale,
      );

      const selectedAddonLines = selectedAddons.map((id) => {
        const addon = addons.find((item) => item.id === id);
        const qty = addonQuantities[id] ?? 1;
        return `${addonLabel(t, addon)} × ${qty} (${formatEuro(addon.price * qty)})`;
      });

      const fields = {
        Type: "Tour Request",
        Tour: content.title,
        PreferredDeparture: departureLabel,
        "Additional services": selectedAddonLines.length ? selectedAddonLines.join("; ") : "None",
        Name: requestForm.name,
        Email: requestForm.email,
        Message: requestForm.message || "—",
      };

      await submitBooking({
        subject: `New tour request: ${content.title}`,
        replyTo: requestForm.email,
        fields,
      });

      setStatus("success");
      setRequestForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("tourPage.booking.error"));
    }
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
            {formatEuro(tour.basePrice)}
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
            onClick={() => {
              setFormTab(tab);
              setStatus("idle");
              setErrorMessage("");
            }}
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
              <select
                required
                value={selectedDepartureId}
                onChange={(event) => setSelectedDepartureId(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 font-sans text-sm text-gray-800"
              >
                {departures.map((departure) => (
                  <option key={departure.id} value={departure.id}>
                    {formatDepartureLabel(departure.checkIn, departure.checkOut, locale)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.checkIn")} <span className="text-brand">*</span>
              </span>
              <input
                type="text"
                readOnly
                value={formatDisplayDate(selectedDeparture.checkIn)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm text-gray-800"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.checkOut")} <span className="text-brand">*</span>
              </span>
              <input
                type="text"
                readOnly
                value={formatDisplayDate(selectedDeparture.checkOut)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm text-gray-800"
              />
            </label>

            <div>
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.guests")} <span className="text-brand">*</span>
              </span>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
                <span className="font-sans text-sm text-gray-700">
                  {t("tourPage.booking.adult")}{" "}
                  <strong>{formatEuro(tour.basePrice)}</strong>
                </span>
                <QuantityStepper
                  value={guests}
                  min={1}
                  onDecrease={() => setGuests((n) => Math.max(1, n - 1))}
                  onIncrease={() => setGuests((n) => n + 1)}
                  decreaseLabel={t("tourPage.booking.decreaseGuests")}
                  increaseLabel={t("tourPage.booking.increaseGuests")}
                />
              </div>
            </div>

            <div>
              <p className="m-0 mb-2 font-sans text-sm font-semibold text-gray-700">
                {t("tourPage.booking.addonsTitle")}
              </p>
              <ul className="list-none space-y-3 p-0">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <li key={addon.id}>
                      <label className="flex cursor-pointer gap-2 font-sans text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-0.5"
                        />
                        <span>{addonLabel(t, addon)}</span>
                      </label>
                      {isSelected && (
                        <div className="mt-2 flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2 pl-6">
                          <span className="font-sans text-sm text-gray-700">
                            {t("tourPage.booking.adult")}{" "}
                            <strong>{formatEuro(addon.price)}</strong>
                            <span className="text-gray-400"> {t("tourPage.booking.perPerson")}</span>
                          </span>
                          <QuantityStepper
                            value={addonQuantities[addon.id] ?? 1}
                            min={1}
                            onDecrease={() => updateAddonQuantity(addon.id, -1)}
                            onIncrease={() => updateAddonQuantity(addon.id, 1)}
                            decreaseLabel={t("tourPage.booking.decreaseAddon")}
                            increaseLabel={t("tourPage.booking.increaseAddon")}
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
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
                value={requestForm.name}
                onChange={(event) =>
                  setRequestForm((current) => ({ ...current, name: event.target.value }))
                }
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
                value={requestForm.email}
                onChange={(event) =>
                  setRequestForm((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-sans text-sm text-gray-600">
                {t("tourPage.booking.message")}
              </span>
              <textarea
                rows={4}
                value={requestForm.message}
                onChange={(event) =>
                  setRequestForm((current) => ({ ...current, message: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 font-sans text-sm"
              />
            </label>
          </>
        )}

        {status === "success" && (
          <p className="m-0 rounded-xl bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">
            {t("tourPage.booking.successRequest")}
          </p>
        )}

        {status === "error" && errorMessage && (
          <p className="m-0 rounded-xl bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {formTab === "booking" && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="font-sans text-sm font-semibold text-gray-700">
              {t("tourPage.booking.total")}
            </span>
            <span className="font-sans text-lg font-bold text-black">{formatEuro(total)}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full cursor-pointer rounded-2xl bg-brand py-3.5 font-sans text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting"
            ? t("tourPage.booking.submitting")
            : formTab === "booking"
              ? t("tourPage.booking.submit")
              : t("tourPage.booking.sendRequest")}
        </button>
      </form>
    </aside>
  );
}
