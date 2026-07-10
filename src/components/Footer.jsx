import { logo } from "../assets/hero";
import {
  footerBg,
  footerCyclist,
  iconFacebook,
  iconTwitter,
  iconSocialCircleBg,
  iconInstagram,
  iconLinkedin,
  iconPhone,
  iconMail,
  iconPin,
} from "../assets/shared";

const generalLinks = ["Home", "Tours", "Services", "Testimonials"];
const aboutLinks = ["About Us", "Gallery", "Contact us", "Privacy policy"];
const socialIcons = [
  { src: iconFacebook, alt: "Facebook" },
  { src: iconTwitter, alt: "Twitter" },
  { src: iconInstagram, alt: "Instagram" },
  { src: iconLinkedin, alt: "LinkedIn" },
];

const contactDetails = [
  { icon: iconPhone, text: "+355 (0) 68 381 6275" },
  { icon: iconMail, text: "alba.reisen@yahoo.de" },
  { icon: iconPin, text: "ADA - Travel Agency Tarko Rr.Qemal Stafa P.17 Ap.1 AL-1005 Tirana, Albania." },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-hero-x pb-10 pt-16 md:pt-20">
      <img
        src={footerBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-auto w-full opacity-[0.73] sm:block"
      />
      <img
        src={footerCyclist}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-4 hidden h-40 w-auto scale-y-[-1] rotate-180 opacity-[0.66] lg:right-12 lg:h-56 xl:block"
      />

      <div className="relative mx-auto grid max-w-hero gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="flex max-w-[661px] flex-col items-start gap-10">
          <img src={logo} alt="Albanien Radreisen" className="h-auto w-[140px]" />
          <p className="font-sans text-footer-body font-medium capitalize text-black">
            Creating unforgettable cycling adventures across Albania with expertly guided tours and authentic
            travel experiences.
          </p>
          <div className="flex flex-col items-start gap-6">
            <p className="font-serif text-footer-heading font-medium capitalize text-black">Social Media</p>
            <div className="flex items-center gap-5">
              <img src={socialIcons[0].src} alt={socialIcons[0].alt} className="h-12 w-12" />
              <img src={socialIcons[1].src} alt={socialIcons[1].alt} className="h-12 w-12" />
              {socialIcons.slice(2).map((icon) => (
                <span key={icon.alt} className="relative inline-flex h-12 w-12 items-center justify-center">
                  <img src={iconSocialCircleBg} alt="" aria-hidden className="absolute inset-0 h-full w-full" />
                  <img src={icon.src} alt={icon.alt} className="relative h-6 w-6" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-10 sm:flex-row sm:gap-16 lg:gap-20">
          <div className="flex flex-col items-start gap-5">
            <h3 className="font-serif text-footer-heading font-medium text-black">General</h3>
            <ul className="flex flex-col items-start gap-3">
              {generalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="font-sans text-footer-link text-black">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h3 className="font-serif text-footer-heading font-medium text-black">About</h3>
            <ul className="flex flex-col items-start gap-3">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="font-sans text-footer-link text-black">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex max-w-[348px] flex-col items-start gap-4">
            <h3 className="font-serif text-footer-heading font-medium text-black">Contact</h3>
            {contactDetails.map((item) => (
              <div key={item.text} className="flex items-center gap-[6px]">
                <span className="flex h-[53px] w-[53px] shrink-0 items-center justify-center rounded-full bg-brand-soft">
                  <img src={item.icon} alt="" aria-hidden className="h-6 w-6" />
                </span>
                <p className="font-sans text-footer-link text-black">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative mx-auto mt-16 max-w-hero font-sans text-base text-black">
        © 2026 Albanien Radreisen. Design and Developed bY Blue Hawke.
      </p>
    </footer>
  );
}
