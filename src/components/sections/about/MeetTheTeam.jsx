import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  teamPhoto,
  teamPhoto2,
  teamPhoto3,
  iconFacebookFill,
  iconWhatsapp,
  iconInstagramFill,
} from "../../../assets/aboutPage";
import { iconCarouselArrowLeft, iconCarouselArrowRight } from "../../../assets/sections";

const socialIcons = [
  { src: iconFacebookFill, alt: "Facebook" },
  { src: iconWhatsapp, alt: "WhatsApp" },
  { src: iconInstagramFill, alt: "Instagram" },
];

const teamPhotos = [teamPhoto, teamPhoto2, teamPhoto3];

function TeamCard({ name, role, photo }) {
  return (
    <article className="flex w-full flex-col items-center gap-4 bg-[#fff9f9] pb-5 shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
      <img src={photo} alt={name} className="h-[220px] w-full object-cover xs:h-[260px] sm:h-[300px]" />
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="font-sans text-[clamp(1.125rem,2vw,1.75rem)] font-bold text-black">{name}</p>
        <p className="font-sans text-[clamp(1rem,1.6vw,1.625rem)] font-semibold text-[#6a7282]">{role}</p>
      </div>
      <div className="flex items-center gap-3">
        {socialIcons.map((icon) => (
          <img key={icon.alt} src={icon.src} alt={icon.alt} className="h-9 w-9 sm:h-11 sm:w-11" />
        ))}
      </div>
    </article>
  );
}

export default function MeetTheTeam() {
  const { t } = useTranslation();
  const members = t("team.members", { returnObjects: true });
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pageCount = Math.ceil(members.length / perPage);
  const visible = members.slice(page * perPage, page * perPage + perPage);

  function goTo(index) {
    setPage((index + pageCount) % pageCount);
  }

  return (
    <section id="team" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-hero flex-col items-center gap-10 sm:gap-14">
        <div className="max-w-[727px] text-center">
          <p className="font-sans text-section-label font-semibold text-brand">{t("team.label")}</p>
          <h2 className="mt-4 font-serif text-section-title font-semibold capitalize text-black">
            {t("team.title")}
          </h2>
          <p className="mt-4 font-sans text-body-lead text-text-muted">{t("team.body")}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, index) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              photo={teamPhotos[(page * perPage + index) % teamPhotos.length]}
            />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              aria-label={t("testimonials.previous")}
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-brand/30 bg-white sm:h-[58px] sm:w-[58px]"
            >
              <img src={iconCarouselArrowLeft} alt="" aria-hidden className="h-6 w-5 sm:h-8 sm:w-[30px]" />
            </button>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              aria-label={t("testimonials.next")}
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[rgba(217,79,61,0.3)] bg-brand sm:h-[58px] sm:w-[58px]"
            >
              <img src={iconCarouselArrowRight} alt="" aria-hidden className="h-[18px] w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
