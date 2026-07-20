import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

export default function VideoModal({ youtubeId, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative aspect-video w-full max-w-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("tourPage.closeVideo")}
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white"
        >
          ×
        </button>
        <iframe
          className="h-full w-full rounded-xl"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>,
    document.body,
  );
}
