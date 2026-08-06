import { useTranslation } from "react-i18next";
import {
  teamAdion,
  teamAlgert,
  teamArdi,
  teamBaci,
  teamDenis,
  teamEla,
  teamElia,
  teamGezimTarko,
  teamTarko,
  teamViola,
} from "../../../assets/teamPage";

const memberImages = {
  denis: teamDenis,
  adion: teamAdion,
  algert: teamAlgert,
  elia: teamElia,
  tarko: teamTarko,
  ardi: teamArdi,
  baci: teamBaci,
  gezimTarko: teamGezimTarko,
  ela: teamEla,
  viola: teamViola,
};

// Portrait/square photos need a top-biased crop so faces stay in frame
const memberImagePositions = {
  ardi: "center 13%",
  baci: "center 20%",
  gezimTarko: "center 0%",
  ela: "center 12%",
  viola: "center 12%",
};

function TeamCard({ name, role, imageKey }) {
  const { t } = useTranslation();
  const image = memberImages[imageKey];
  const objectPosition = memberImagePositions[imageKey] ?? "center";

  return (
    <article className="flex w-full flex-col items-center bg-[#fff9f9] px-6 py-8 shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
      <div className="flex w-full max-w-[485px] flex-col items-center gap-[26px]">
        <div className="aspect-[485/351] w-full overflow-hidden rounded-[19px]">
          <img
            src={image}
            alt={t("team.memberPhotoAlt", { name })}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
          />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-bold leading-tight text-black">{name}</p>
          <p className="font-sans text-[clamp(1rem,1.6vw,1.625rem)] font-semibold leading-tight text-[#6a7282]">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function MeetTheTeam() {
  const { t } = useTranslation();
  const members = t("team.members", { returnObjects: true });

  return (
    <section id="team" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="max-w-[924px]">
          <p className="font-sans text-section-label font-semibold text-brand">{t("team.label")}</p>
          <h2 className="mt-2 font-serif text-section-title font-medium capitalize leading-[0.92] tracking-[-0.03em] text-black">
            {t("team.title")}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-[41px]">
          {members.map((member) => (
            <TeamCard key={member.imageKey} name={member.name} role={member.role} imageKey={member.imageKey} />
          ))}
        </div>
      </div>
    </section>
  );
}
