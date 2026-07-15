import { useState } from "react";
import { useTranslation } from "react-i18next";
import { iconPhone, iconMail, iconPin } from "../../../assets/shared";

const contactDetails = [
  { icon: iconPhone, text: "+355 (0) 68 381 6275" },
  { icon: iconPin, text: "ADA - Travel Agency Tarko Rr.Qemal Stafa P.17 Ap.1 AL-1005 Tirana, Albania." },
  { icon: iconMail, text: "alba.reisen@yahoo.de" },
];

const inputClass =
  "h-[46px] w-full rounded-md border border-[#99a1af] bg-transparent px-[17px] py-[13px] font-sans text-sm text-black placeholder:text-[#d1d5dc] focus:outline-none focus:ring-1 focus:ring-brand";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-xs font-semibold uppercase tracking-wide text-[#6a7282]">{label}</span>
      {children}
    </label>
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
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // ponytail: no submit handler wired up yet, add when the contact endpoint exists
  }

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-hero gap-8 lg:grid-cols-[1fr_auto] lg:gap-12 xl:gap-[74px]">
        <div className="rounded-[24px] bg-brand-pale/60 p-6 sm:p-8 lg:p-12">
          <h2 className="font-serif text-section-title font-semibold capitalize text-black">
            {t("contactPage.formTitle")}
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 sm:mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t("contactPage.nameLabel")}>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder={t("contactPage.namePlaceholder")}
                  className={inputClass}
                />
              </Field>
              <Field label={t("contactPage.emailLabel")}>
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

            <Field label={t("contactPage.phoneLabel")}>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={updateField("phone")}
                placeholder={t("contactPage.phonePlaceholder")}
                className={inputClass}
              />
            </Field>

            <Field label={t("contactPage.subjectLabel")}>
              <input
                type="text"
                required
                value={form.subject}
                onChange={updateField("subject")}
                placeholder={t("contactPage.subjectPlaceholder")}
                className={inputClass}
              />
            </Field>

            <Field label={t("contactPage.messageLabel")}>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={updateField("message")}
                placeholder={t("contactPage.messagePlaceholder")}
                className="w-full resize-none rounded-md border border-[#99a1af] bg-transparent px-[17px] py-[16px] font-sans text-sm text-black placeholder:text-[#d1d5dc] focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </Field>

            <button
              type="submit"
              className="mt-2 flex h-btn-lg cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand text-btn font-bold leading-none text-white shadow-[0_4px_8px_rgba(204,22,8,0.3)]"
            >
              <SendIcon />
              {t("contactPage.submit")}
            </button>

            <p className="text-center font-sans text-sm text-[#99a1af]">{t("contactPage.note")}</p>
          </form>
        </div>

        <div className="flex flex-col gap-6 lg:w-[380px]">
          {contactDetails.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-[6px] rounded-[24px] bg-[#f9f5f5] p-6 shadow-[0_4px_2px_rgba(0,0,0,0.25)] sm:gap-3"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft sm:h-[53px] sm:w-[53px]">
                <img src={item.icon} alt="" aria-hidden className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <p className="min-w-0 font-sans text-sm text-black/70 sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
