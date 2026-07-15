import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6a7282]">{label}</span>
      <div className="font-sans text-base text-black">{children}</div>
    </div>
  );
}

function DisclaimerBlock({ title, body }) {
  return (
    <div>
      <h3 className="font-serif text-xl font-semibold text-black">{title}</h3>
      <p className="mt-2 font-sans text-base leading-relaxed text-black/70">{body}</p>
    </div>
  );
}

export default function ImprintContent() {
  const { t } = useTranslation();
  const emails = t("imprintPage.emails", { returnObjects: true });

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1074px] flex-col gap-16">
        <div>
          <h2 className="font-serif text-section-title font-semibold capitalize text-black">
            {t("imprintPage.companyInfoTitle")}
          </h2>
          <p className="mt-4 font-sans text-lg font-semibold text-black">{t("imprintPage.companyName")}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field label={t("imprintPage.addressLabel")}>{t("imprintPage.address")}</Field>
            <Field label={t("imprintPage.telephoneLabel")}>{t("imprintPage.telephone")}</Field>
            <Field label={t("imprintPage.mobileLabel")}>{t("imprintPage.mobile")}</Field>
            <Field label={t("imprintPage.emailLabel")}>
              {emails.map((email) => (
                <p key={email}>{email}</p>
              ))}
            </Field>
            <Field label={t("imprintPage.websiteLabel")}>{t("imprintPage.website")}</Field>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Field label={t("imprintPage.legalRepTitle")}>
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6a7282]">
                {t("imprintPage.legalRepLabel")}
              </span>
              <p>{t("imprintPage.legalRep")}</p>
            </Field>
            <Field label={t("imprintPage.registrationTitle")}>
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6a7282]">
                {t("imprintPage.registrationLabel")}
              </span>
              <p>{t("imprintPage.registration")}</p>
            </Field>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-section-title font-semibold capitalize text-black">
            {t("imprintPage.disclaimerTitle")}
          </h2>
          <div className="mt-8 flex flex-col gap-8">
            <DisclaimerBlock title={t("imprintPage.liabilityContentTitle")} body={t("imprintPage.liabilityContentBody")} />
            <DisclaimerBlock title={t("imprintPage.liabilityLinksTitle")} body={t("imprintPage.liabilityLinksBody")} />
            <DisclaimerBlock title={t("imprintPage.copyrightTitle")} body={t("imprintPage.copyrightBody")} />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-[24px] bg-brand-pale/60 p-6 sm:p-8">
          <h3 className="font-serif text-xl font-semibold text-black">{t("imprintPage.contactTitle")}</h3>
          <p className="font-sans text-base text-black/70">{emails[0]}</p>
          <p className="font-sans text-base text-black/70">{t("imprintPage.mobile")}</p>
          <Link
            to="/contact"
            className="h-btn-sm inline-flex cursor-pointer items-center justify-center rounded-[11px] bg-brand px-10 text-btn leading-none text-white no-underline"
          >
            {t("imprintPage.contactCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
