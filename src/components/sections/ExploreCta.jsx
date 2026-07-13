import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { iconEnvelope } from "../../assets/shared";
import { heroPoster, heroVideoMp4, heroVideoWebm, heroVideoMobileMp4 } from "../../assets/video";

function shouldSkipVideo() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = navigator.connection;
  const isSlowConnection = connection?.saveData || /2g/.test(connection?.effectiveType ?? "");
  return prefersReducedMotion || isSlowConnection;
}

export default function ExploreCta() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoEnabled] = useState(() => !shouldSkipVideo());

  useEffect(() => {
    if (!videoEnabled) return;
    const section = sectionRef.current;
    const video = videoRef.current;

    // This section sits below the fold, so — unlike a hero video — there's no
    // reason to fetch it until the user has actually scrolled near it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.load();
        video.play().catch(() => {
          // Autoplay can be blocked by the browser — the poster stays visible either way.
        });
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [videoEnabled]);

  function handleSubmit(event) {
    event.preventDefault();
    // ponytail: no submit handler wired up yet, add when the newsletter endpoint exists
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-hero-x py-16 md:py-50 lg:py-60">
      <img src={heroPoster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />

      {videoEnabled && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        >
          <source src={heroVideoMobileMp4} media="(max-width: 640px)" type="video/mp4" />
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto flex max-w-content flex-col items-center gap-4 px-2 text-center sm:gap-[22px]">
        <h2 className="font-serif text-cta-title font-semibold capitalize text-white">{t("cta.title")}</h2>
        <p className="max-w-[640px] font-sans text-cta-body font-medium text-white">{t("cta.body")}</p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[461px] flex-col gap-3 rounded-[20px] border border-white bg-white/[0.08] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-1 sm:pl-3 sm:pr-1"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <img src={iconEnvelope} alt="" aria-hidden className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("cta.emailPlaceholder")}
              className="w-full min-w-0 bg-transparent font-sans text-sm capitalize text-white placeholder:text-white/80 focus:outline-none sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer whitespace-nowrap rounded-2xl bg-white px-6 py-2.5 font-sans text-base font-medium capitalize text-black sm:w-auto sm:px-8 sm:py-3 sm:text-lg"
          >
            {t("cta.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
