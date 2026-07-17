import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  mountainIllustration,
  footerLogo,
  footerCyclist,
  iconFacebook,
  iconTwitter,
  iconSocialCircleBg,
  iconInstagram,
  iconLinkedin,
  iconPhone,
  iconMail,
  iconPin,
} from "../../assets/shared";

const socialIcons = [
  { src: iconFacebook, alt: "Facebook" },
  { src: iconTwitter, alt: "Twitter" },
  { src: iconInstagram, alt: "Instagram" },
  { src: iconLinkedin, alt: "LinkedIn" },
];

const contactDetails = [
  { icon: iconPhone, text: "+355 (0) 68 381 6275", href: "tel:+355683816275" },
  { icon: iconMail, text: "alba.reisen@yahoo.de", href: "mailto:alba.reisen@yahoo.de" },
  {
    icon: iconPin,
    text: "ADA - Travel Agency Tarko Rr.Qemal Stafa P.17 Ap.1 AL-1005 Tirana, Albania.",
    href: "https://maps.google.com/?q=ADA+Travel+Agency+Tarko+Tirana",
  },
];

const GENERAL_LINKS = [
  { key: "home", to: "/" },
  { key: "tours", to: "/tours" },
  { key: "services", to: "/#how-it-works" },
  { key: "testimonials", to: "/testimonials" },
];

const ABOUT_LINKS = [
  { key: "aboutUs", to: "/about" },
  { key: "gallery", to: "/gallery" },
  { key: "contact", to: "/contact" },
  { key: "privacy", to: "/imprint" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden px-hero-x pb-8 pt-12 sm:pb-10 sm:pt-16 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[37.3vw] max-h-[715.965px] w-full overflow-hidden opacity-[0.73]"
      >
        <img
          src={mountainIllustration}
          alt=""
          className="absolute left-0 top-[-0.13%] h-[129.43%] w-full max-w-none"
        />
      </div>
      <img
        src={footerCyclist}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-4 hidden h-40 w-auto scale-y-[-1] rotate-180 opacity-[0.66] lg:right-12 lg:h-56 xl:block"
      />

      <div className="relative mx-auto grid max-w-hero gap-10 sm:gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="flex max-w-[661px] flex-col items-start gap-6 sm:gap-10">
          <Link to="/">
            <img src={footerLogo} alt="Albanien Radreisen" className="h-auto w-[120px] sm:w-[140px]" />
          </Link>
          <p className="font-sans text-footer-body font-medium capitalize text-black">
            {t("footer.description")}
          </p>
          <div className="flex flex-col items-start gap-6">
            <p className="font-serif text-footer-heading font-medium capitalize text-black">
              {t("footer.socialMedia")}
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <img src={socialIcons[0].src} alt={socialIcons[0].alt} className="h-10 w-10 sm:h-12 sm:w-12" />
              <img src={socialIcons[1].src} alt={socialIcons[1].alt} className="h-10 w-10 sm:h-12 sm:w-12" />
              {socialIcons.slice(2).map((icon) => (
                <span
                  key={icon.alt}
                  className="relative inline-flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12"
                >
                  <img
                    src={iconSocialCircleBg}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full"
                  />
                  <img src={icon.src} alt={icon.alt} className="relative h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-16 lg:gap-20">
          <div className="flex flex-col items-start gap-5">
            <h3 className="font-serif text-footer-heading font-medium text-black">{t("footer.general")}</h3>
            <ul className="flex flex-col items-start gap-3">
              {GENERAL_LINKS.map((link) => (
                <li key={link.key}>
                  <Link to={link.to} className="font-sans text-footer-link text-black no-underline hover:text-brand">
                    {t(`footer.generalLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h3 className="font-serif text-footer-heading font-medium text-black">{t("footer.about")}</h3>
            <ul className="flex flex-col items-start gap-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.key}>
                  <Link to={link.to} className="font-sans text-footer-link text-black no-underline hover:text-brand">
                    {t(`footer.aboutLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex max-w-full flex-col items-start gap-4 sm:max-w-[348px]">
            <h3 className="font-serif text-footer-heading font-medium text-black">{t("footer.contact")}</h3>
            {contactDetails.map((item) => (
              <a
                key={item.text}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-[6px] text-black no-underline hover:text-brand sm:items-center"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft sm:h-[53px] sm:w-[53px]">
                  <img src={item.icon} alt="" aria-hidden className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <p className="min-w-0 font-sans text-sm sm:text-footer-link">{item.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="relative mx-auto mt-10 max-w-hero text-center font-sans text-sm text-black sm:mt-16 sm:text-left sm:text-base">
        {t("footer.copyright")}
      </p>
    </footer>
  );
}
