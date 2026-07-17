import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import useCart from "../hooks/useCart";
import { tourPhoto1 } from "../assets/tourPage";
import { removeCartItem } from "../utils/cartStore";
import { formatDisplayDate, formatEuro } from "../utils/bookingPricing";

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith("de") ? "de" : "en";
  const cartItems = useCart();
  const estimatedTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="border-b border-gray-100 px-hero-x py-4 shadow-sm">
        <Header light />
      </div>

      <main className="px-hero-x py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-hero">
          <h1 className="m-0 font-serif text-4xl font-semibold text-black sm:text-5xl">
            {t("cartPage.title")}
          </h1>

          {cartItems.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-gray-200 px-6 py-14 text-center">
              <h2 className="m-0 font-sans text-xl font-semibold text-black">
                {t("cartPage.emptyTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-lg font-sans text-gray-500">
                {t("cartPage.emptyBody")}
              </p>
              <Link
                to="/tours"
                className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-sans font-semibold text-white no-underline"
              >
                {t("cartPage.browseTours")}
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)] lg:items-start xl:gap-16">
              <section aria-labelledby="cart-products">
                <div className="grid grid-cols-[1fr_auto] border-b border-gray-200 pb-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  <h2 id="cart-products" className="m-0 text-xs font-semibold">
                    {t("cartPage.product")}
                  </h2>
                  <span>{t("cartPage.total")}</span>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="grid gap-4 py-6 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:gap-5"
                    >
                      <img
                        src={tourPhoto1}
                        alt={t("tourCard.imageAlt")}
                        className="h-24 w-full rounded-xl object-cover sm:h-24 sm:w-[120px]"
                      />

                      <div className="min-w-0">
                        <Link
                          to="/tours/8-day-cycling"
                          className="font-sans text-base font-semibold leading-snug text-brand no-underline hover:underline sm:text-lg"
                        >
                          {t("tourPage.title")}
                        </Link>
                        <p className="m-0 mt-1 font-sans text-sm font-medium text-gray-500">
                          {formatEuro(1290)} {t("tourCard.priceSuffix")}
                        </p>
                        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-gray-500">
                          {t("tourPage.quickDescription")}
                        </p>
                        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-gray-600 sm:text-sm">
                          <div>
                            <dt className="inline font-semibold">{t("cartPage.checkIn")}:</dt>{" "}
                            <dd className="inline">{formatDisplayDate(item.checkIn, locale)}</dd>
                          </div>
                          <div>
                            <dt className="inline font-semibold">{t("cartPage.checkOut")}:</dt>{" "}
                            <dd className="inline">{formatDisplayDate(item.checkOut, locale)}</dd>
                          </div>
                          <div>
                            <dt className="inline font-semibold">{t("cartPage.adults")}:</dt>{" "}
                            <dd className="inline">{item.guests}</dd>
                          </div>
                        </dl>

                        {item.addons.length > 0 && (
                          <ul className="mt-2 list-none space-y-1 p-0 font-sans text-xs text-gray-500">
                            {item.addons.map((addon) => (
                              <li key={addon.id}>
                                {t(`tourPage.booking.addons.${addon.id}.label`)} × {addon.quantity}
                              </li>
                            ))}
                          </ul>
                        )}

                        <button
                          type="button"
                          onClick={() => removeCartItem(item.id)}
                          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-sans text-sm text-gray-500 hover:text-brand"
                          aria-label={t("cartPage.removeItem")}
                        >
                          <span aria-hidden>⌫</span>
                          {t("cartPage.remove")}
                        </button>
                      </div>

                      <p className="m-0 text-right font-sans text-base font-semibold text-black">
                        {formatEuro(item.total)}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <aside className="border-t-2 border-gray-900 pt-4 lg:sticky lg:top-6">
                <h2 className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-gray-600">
                  {t("cartPage.summaryTitle")}
                </h2>
                <div className="mt-6 flex items-center justify-between border-y border-gray-200 py-4 font-sans">
                  <span className="text-sm text-gray-700">{t("cartPage.estimatedTotal")}</span>
                  <strong className="text-lg text-black">{formatEuro(estimatedTotal)}</strong>
                </div>
                <Link
                  to="/checkout"
                  className="mt-6 block w-full rounded-md bg-brand py-3.5 text-center font-sans text-sm font-semibold text-white no-underline"
                >
                  {t("cartPage.proceedToCheckout")}
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
