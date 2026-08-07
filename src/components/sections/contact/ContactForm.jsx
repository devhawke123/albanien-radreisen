import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  iconContactPhone,
  iconContactMail,
  iconContactPin,
  iconContactGlobe,
  iconContactClock,
} from "../../../assets/shared";
import { submitRequest } from "../../../services/submitRequest";

const TITLE_OPTIONS = ["mr", "mrs", "ms", "divers"];

const inputClass =
  "h-[46px] w-full rounded-md border border-[#99a1af] bg-transparent px-[17px] py-[13px] font-sans text-sm text-black placeholder:text-[#6a7282] focus:outline-none focus:ring-1 focus:ring-brand";

const emptyForm = {
  contactMethod: "email",
  name: "",
  email: "",
  customerType: "",
  title: "",
  phone: "",
  subject: "",
  message: "",
  privacyAccepted: false,
};

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.6px] text-[#6a7282]">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function DetailCard({ icon, children, className = "" }) {
  return (
    <div
      className={`flex items-start gap-5 rounded-[32px] bg-[#f9f5f5] px-7 py-5 shadow-[0_4px_2px_rgba(0,0,0,0.25)] sm:items-center sm:gap-[30px] sm:px-9 sm:py-6 ${className}`}
    >
      <span className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-brand-soft sm:size-[73px]">
        <img src={icon} alt="" aria-hidden className="size-8 sm:size-10" />
      </span>
      <div className="min-w-0 font-sans text-lg leading-snug tracking-tight text-black/70 sm:text-xl lg:text-[26px] lg:leading-normal lg:tracking-[-1.04px]">
        {children}
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-white">
      <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
    </svg>
  );
}

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  function updateField(field) {
    return (event) => {
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.privacyAccepted) return;
    setStatus("submitting");

    const titleLabel = form.title ? t(`contactPage.titleOptions.${form.title}`) : "";
    const contactMethodLabel = t(`contactPage.contactMethods.${form.contactMethod}`);
    const metaLines = [
      `${t("contactPage.contactMethodLabel")}: ${contactMethodLabel}`,
      form.customerType ? `${t("contactPage.customerTypeLabel")}: ${form.customerType}` : null,
      titleLabel ? `${t("contactPage.titleLabel")}: ${titleLabel}` : null,
    ].filter(Boolean);

    try {
      await submitRequest({
        type: "contact",
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: `${metaLines.join("\n")}\n\n${form.message}`,
        preferredContactMethod: form.contactMethod,
        customerType: form.customerType || null,
        title: form.title || null,
        locale: i18n.language?.startsWith("de") ? "de" : "en",
      });
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  }

  const hours = t("contactPage.hoursLines", { returnObjects: true });

  return (
    <section className=" px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-hero gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-[74px]">
        <div className="flex flex-col gap-8 lg:gap-11">
          <DetailCard icon={iconContactPhone}>
            <a href="tel:+355683816275" className="text-inherit no-underline hover:text-brand">
              +355 (0) 68 381 6275
            </a>
          </DetailCard>

          <DetailCard icon={iconContactPin}>
            <p className="m-0">{t("contactPage.companyName")}</p>
            <p className="m-0">{t("contactPage.address")}</p>
          </DetailCard>

          <DetailCard icon={iconContactMail}>
            <a href="mailto:alba.reisen@yahoo.de" className="block text-inherit no-underline hover:text-brand">
              alba.reisen@yahoo.de
            </a>
            <a href="mailto:tarkogezim@gmail.com" className="block text-inherit no-underline hover:text-brand">
              tarkogezim@gmail.com
            </a>
          </DetailCard>

          <DetailCard icon={iconContactGlobe}>
            <a
              href="https://www.albanien-radreisen.de"
              target="_blank"
              rel="noreferrer"
              className="text-inherit no-underline hover:text-brand"
            >
              www.albanien-radreisen.de
            </a>
          </DetailCard>

          <DetailCard icon={iconContactClock} className="!items-start">
            <div>
              <p className="m-0">{t("contactPage.hoursTitle")}</p>
              {Array.isArray(hours) &&
                hours.map((line) => (
                  <p key={line} className="m-0">
                    {line}
                  </p>
                ))}
            </div>
          </DetailCard>
        </div>

        <div className="rounded-[34px] bg-brand-pale p-6 sm:p-8 lg:p-10 xl:p-12">
          <h2 className="font-sans text-section-title font-semibold capitalize tracking-[-0.02em] text-black">
            {t("contactPage.formTitle")}
          </h2>
          <p className="mt-3 max-w-[673px] font-sans text-base leading-7 text-[#99a1af] sm:text-lg lg:text-xl">
            {t("contactPage.formSubtitle")}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 sm:mt-10">
            <fieldset className="flex flex-col gap-2 border-0 p-0">
              <legend className="font-sans text-xs font-semibold uppercase tracking-[0.6px] text-[#6a7282]">
                {t("contactPage.contactMethodLabel")}
                <span className="text-brand"> *</span>
              </legend>
              <div className="flex gap-5 pt-1.5">
                {["email", "phone"].map((method) => (
                  <label key={method} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={form.contactMethod === method}
                      onChange={updateField("contactMethod")}
                      className="size-4 accent-brand"
                      required
                    />
                    <span className="font-sans text-base capitalize text-[#524438]">
                      {t(`contactPage.contactMethods.${method}`)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t("contactPage.nameLabel")} required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder={t("contactPage.namePlaceholder")}
                  className={inputClass}
                />
              </Field>
              <Field label={t("contactPage.emailLabel")} required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={updateField("email")}
                  placeholder={t("contactPage.emailPlaceholder")}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t("contactPage.customerTypeLabel")}>
                <input
                  type="text"
                  value={form.customerType}
                  onChange={updateField("customerType")}
                  placeholder={t("contactPage.customerTypePlaceholder")}
                  className={inputClass}
                />
              </Field>
              <Field label={t("contactPage.titleLabel")} required>
                <select
                  required
                  value={form.title}
                  onChange={updateField("title")}
                  className={`${inputClass} ${form.title ? "text-black" : "text-[#6a7282]"}`}
                >
                  <option value="">{t("contactPage.titlePlaceholder")}</option>
                  {TITLE_OPTIONS.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {t(`contactPage.titleOptions.${option}`)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={t("contactPage.phoneLabel")} required>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={updateField("phone")}
                placeholder={t("contactPage.phonePlaceholder")}
                className={inputClass}
              />
            </Field>

            <Field label={t("contactPage.subjectLabel")} required>
              <input
                type="text"
                required
                value={form.subject}
                onChange={updateField("subject")}
                placeholder={t("contactPage.subjectPlaceholder")}
                className={inputClass}
              />
            </Field>

            <Field label={t("contactPage.messageLabel")} required>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={updateField("message")}
                placeholder={t("contactPage.messagePlaceholder")}
                className="min-h-[151px] w-full resize-none rounded-md border border-[#99a1af] bg-transparent px-[17px] py-4 font-sans text-sm text-black placeholder:text-[#6a7282] focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </Field>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                required
                checked={form.privacyAccepted}
                onChange={updateField("privacyAccepted")}
                className="mt-0.5 size-4 shrink-0 rounded border-2 border-black accent-brand"
              />
              <span className="font-sans text-[15px] leading-[19.5px] text-black">
                {t("contactPage.privacyPrefix")}{" "}
                <Link to="/imprint" className="text-brand underline">
                  {t("contactPage.privacyLink")}
                </Link>
                {t("contactPage.privacySuffix")}
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex h-btn-lg cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand text-btn font-bold leading-none text-white shadow-[0_4px_8px_rgba(204,22,8,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <SendIcon />
              {status === "submitting" ? t("contactPage.submitting") : t("contactPage.submit")}
            </button>

            {status === "success" && (
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-center font-sans text-sm text-emerald-700">
                {t("contactPage.success")}
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-center font-sans text-sm text-red-700">
                {t("contactPage.error")}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
