import { useTranslation } from "react-i18next";

function SectionTitle({ children }) {
  return (
    <h2 className="font-serif text-section-title font-semibold capitalize text-black">{children}</h2>
  );
}

function Paragraphs({ items }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {items.map((paragraph) => (
        <p key={paragraph} className="font-sans text-base leading-relaxed text-black/70">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function CancellationTable({ subtitle, headers, rows }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-xl font-semibold text-black">{subtitle}</h3>
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-black/10 py-3">
          <span className="font-sans text-base font-semibold text-black">{headers.period}</span>
          <span className="font-sans text-base font-medium text-black">{headers.fee}</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.period}
            className="flex items-center justify-between border-b border-black/10 py-3"
          >
            <span className="font-sans text-sm text-black/70 sm:text-base">{row.period}</span>
            <span className="font-sans text-base font-medium text-black">{row.fee}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TermsContent() {
  const { t } = useTranslation();

  const packageTravelParagraphs = t("termsPage.packageTravelParagraphs", { returnObjects: true });
  const travellerRightsList = t("termsPage.travellerRightsList", { returnObjects: true });
  const cancellationHeaders = t("termsPage.cancellationHeaders", { returnObjects: true });
  const cancellationFlightsRows = t("termsPage.cancellationFlightsRows", { returnObjects: true });
  const cancellationCruiseRows = t("termsPage.cancellationCruiseRows", { returnObjects: true });
  const insolvencyParagraphs = t("termsPage.insolvencyParagraphs", { returnObjects: true });
  const liabilityContentParagraphs = t("termsPage.liabilityContentParagraphs", { returnObjects: true });
  const liabilityLinksParagraphs = t("termsPage.liabilityLinksParagraphs", { returnObjects: true });
  const copyrightParagraphs = t("termsPage.copyrightParagraphs", { returnObjects: true });
  const applicableLawParagraphs = t("termsPage.applicableLawParagraphs", { returnObjects: true });

  return (
    <section className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1074px] flex-col gap-16">
        <div>
          <SectionTitle>{t("termsPage.packageTravelTitle")}</SectionTitle>
          <Paragraphs items={packageTravelParagraphs} />
        </div>

        <div>
          <SectionTitle>{t("termsPage.travellerRightsTitle")}</SectionTitle>
          <p className="mt-4 font-sans text-base leading-relaxed text-black/70">
            {t("termsPage.travellerRightsIntro")}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {travellerRightsList.map((item) => (
              <li key={item} className="font-sans text-base leading-relaxed text-black/70">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-base leading-relaxed text-black/70">
            {t("termsPage.travellerRightsFooter")}
          </p>
        </div>

        <div>
          <SectionTitle>{t("termsPage.cancellationTitle")}</SectionTitle>
          <div className="mt-8 flex flex-col gap-10">
            <CancellationTable
              subtitle={t("termsPage.cancellationFlightsSubtitle")}
              headers={cancellationHeaders}
              rows={cancellationFlightsRows}
            />
            <CancellationTable
              subtitle={t("termsPage.cancellationCruiseSubtitle")}
              headers={cancellationHeaders}
              rows={cancellationCruiseRows}
            />
          </div>
          <p className="mt-6 font-sans text-base font-extrabold text-[#cc1608]">
            {t("termsPage.cancellationNote")}
          </p>
        </div>

        <div>
          <SectionTitle>{t("termsPage.insolvencyTitle")}</SectionTitle>
          <Paragraphs items={insolvencyParagraphs} />
        </div>

        <div>
          <SectionTitle>{t("termsPage.liabilityTitle")}</SectionTitle>
          <div className="mt-8 flex flex-col gap-8">
            <div>
              <h3 className="font-serif text-xl font-semibold text-black">
                {t("termsPage.liabilityContentTitle")}
              </h3>
              <Paragraphs items={liabilityContentParagraphs} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-black">
                {t("termsPage.liabilityLinksTitle")}
              </h3>
              <Paragraphs items={liabilityLinksParagraphs} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-black">{t("termsPage.copyrightTitle")}</h3>
              <Paragraphs items={copyrightParagraphs} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-black">
                {t("termsPage.applicableLawTitle")}
              </h3>
              <Paragraphs items={applicableLawParagraphs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
