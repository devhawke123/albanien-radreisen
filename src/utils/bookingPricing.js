export function formatEuro(amount) {
  return `€ ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDisplayDate(isoDate, locale = "en") {
  const [year, month, day] = isoDate.split("-");
  if (locale === "de") {
    return `${day}.${month}.${year}`;
  }
  return `${day}-${month}-${year}`;
}

export function formatDepartureLabel(checkIn, checkOut, locale) {
  const from = formatDisplayDate(checkIn, locale);
  const to = formatDisplayDate(checkOut, locale);
  if (locale === "de") {
    return `Von ${from} bis ${to}`;
  }
  return `From ${from} to ${to}`;
}

export function calculateBookingTotal(guests, addonQuantities, tour) {
  const basePrice = tour?.basePrice ?? 1290;
  let total = guests * basePrice;

  const addons = tour?.addons ?? [];
  for (const addon of addons) {
    const qty = addonQuantities[addon.id] ?? 0;
    if (qty > 0) {
      total += addon.price * qty;
    }
  }

  return total;
}
