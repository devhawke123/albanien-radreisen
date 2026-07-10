import {
  heroBackground,
  logo,
  iconCalendar,
  iconLocation,
  iconPeople,
} from "../assets";

export default function Hero() {
  return (
    <section
      className="relative flex h-dvh flex-col overflow-hidden bg-cover bg-center px-hero-x py-hero-y text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.44), rgba(0,0,0,0.44)), url(${heroBackground})`,
      }}
    >
      <header className="mx-auto grid w-full max-w-hero shrink-0 grid-cols-1 items-center justify-items-center gap-3 xs:gap-4 md:grid-cols-[auto_1fr_auto] md:gap-6 lg:gap-8">
        <img
          className="h-auto w-24 xs:w-28 sm:w-32 md:w-36 lg:w-[168px]"
          src={logo}
          alt="Albanien Radreisen"
        />

        <nav className="flex min-h-0 w-full flex-wrap items-center justify-center gap-3 rounded-[21px] border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-sm sm:gap-5 sm:px-5 sm:py-2 md:w-auto lg:gap-7 lg:px-6">
          <a
            href="#"
            className="rounded-[18px] bg-white px-4 py-1 font-sans text-nav leading-snug text-brand-light no-underline sm:px-5 lg:px-[23px]"
          >
            Home
          </a>
          <a href="#about" className="text-nav leading-snug text-white/85 no-underline">
            About
          </a>
          <a href="#tours" className="text-nav leading-snug text-white/85 no-underline">
            Cycling Tours
          </a>
          <a href="#" className="hidden text-nav leading-snug text-white/85 no-underline sm:inline">
            Imprint
          </a>
          <a href="#" className="text-nav leading-snug text-white/85 no-underline">
            Contact
          </a>
        </nav>

        <button
          className="h-btn-lg cursor-pointer rounded-[11px] bg-white/80 px-6 text-btn leading-none text-black sm:px-8 lg:px-[39px]"
          type="button"
        >
          Get Started
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center text-center">
        <h1 className="m-0 leading-[0.92]">
          <span className="block font-sans text-hero-title font-medium">Discover Albania,</span>
          <span className="block font-serif text-hero-title-accent font-medium">One Ride at a Time</span>
        </h1>
        <p className="mx-auto mt-[clamp(0.5rem,1.5vh,1.875rem)] max-w-content font-sans text-hero-body tracking-wide short:leading-tight">
          Explore Albania&apos;s breathtaking mountains, scenic coastlines, and historic villages through expertly
          guided cycling tours designed for unforgettable adventures.
        </p>

        <div className="mt-[clamp(0.5rem,1.5vh,1.5rem)] flex flex-wrap justify-center gap-3 sm:gap-[15px]">
          <button
            className="h-btn-sm cursor-pointer rounded-[11px] bg-brand px-6 text-btn leading-none text-white sm:px-8 lg:px-[39px]"
            type="button"
          >
            Explore Now
          </button>
          <button
            className="h-btn-sm cursor-pointer rounded-[11px] border border-white bg-transparent px-6 text-btn leading-none text-white sm:px-8 lg:px-[39px]"
            type="button"
          >
            Watch Videos
          </button>
        </div>
      </div>

      <div className="mx-auto flex h-search-bar w-[min(100%,808px)] shrink-0 flex-wrap items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-3 py-2 backdrop-blur-sm sm:gap-3 sm:px-4 lg:gap-4">
        <button
          type="button"
          className="inline-flex min-h-0 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-2 text-nav text-white sm:gap-2.5 sm:px-4"
        >
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={iconLocation} alt="" aria-hidden />
          <span>Destination</span>
        </button>
        <button
          type="button"
          className="inline-flex min-h-0 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-2 text-nav text-white sm:gap-2.5 sm:px-4"
        >
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={iconPeople} alt="" aria-hidden />
          <span>2 People</span>
        </button>
        <button
          type="button"
          className="inline-flex min-h-0 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-2 text-nav text-white sm:gap-2.5 sm:px-4"
        >
          <img className="h-5 w-5 sm:h-6 sm:w-6" src={iconCalendar} alt="" aria-hidden />
          <span>Date</span>
        </button>
        <button
          className="h-btn-sm cursor-pointer rounded-[15px] border border-white bg-brand/45 px-4 text-nav text-white sm:px-6"
          type="button"
        >
          Explore Tours
        </button>
      </div>
    </section>
  );
}
