import { useState } from "react";
import { ctaBackground, iconEnvelope } from "../assets/shared";

export default function ExploreCta() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // ponytail: no submit handler wired up yet, add when the newsletter endpoint exists
  }

  return (
    <section className="relative overflow-hidden px-hero-x py-16 md:py-20 lg:py-24">
      {/* ponytail: static image stand-in for the background video the user will import */}
      <img
        src={ctaBackground}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto flex max-w-content flex-col items-center gap-[22px] text-center">
        <h2 className="font-serif text-cta-title font-semibold capitalize text-white">
          Ready to Explore Albania on Two Wheels?
        </h2>
        <p className="font-sans text-cta-body font-medium text-white">
          Join us for an unforgettable cycling adventure through breathtaking landscapes, charming villages, and
          historic routes—guided by local experts every step of the way.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[461px] items-center justify-between gap-4 rounded-[20px] border border-white bg-white/[0.08] py-1 pl-3 pr-1"
        >
          <div className="flex items-center gap-4">
            <img src={iconEnvelope} alt="" aria-hidden className="h-6 w-6" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent font-sans text-base capitalize text-white placeholder:text-white/80 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer whitespace-nowrap rounded-2xl bg-white px-8 py-3 font-sans text-lg font-medium capitalize text-black"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
