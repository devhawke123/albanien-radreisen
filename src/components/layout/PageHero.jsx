import Header from "./Header";

export default function PageHero({ image, title, body, overlayClassName = "bg-black/40" }) {
  return (
    <section className="relative flex min-h-[420px] flex-col px-hero-x py-hero-y text-white xs:min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
      <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className={`absolute inset-0 ${overlayClassName}`} />

      <Header />

      <div className="relative z-10 mx-auto flex w-full max-w-hero flex-1 flex-col justify-end pb-10 sm:pb-14 lg:pb-16">
        <h1 className="m-0 max-w-[924px] font-sans text-[clamp(2.5rem,6vw,5rem)] font-medium capitalize leading-[0.92] tracking-[-0.03em] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-[655px] font-sans text-[clamp(1rem,1.8vw,1.25rem)] font-medium capitalize leading-[1.37] tracking-wide text-white">
          {body}
        </p>
      </div>
    </section>
  );
}
