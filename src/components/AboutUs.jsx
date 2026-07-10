import { aboutUsImage } from "../assets/about";

export default function AboutUs() {
  return (
    <section id="about" className="bg-white px-hero-x py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-hero">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-[30px]">
          <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-[100px]">
            <h2 className="shrink-0 font-sans text-section-label font-semibold text-brand lg:w-[148px]">
              About Us
            </h2>
            <blockquote className="m-0 max-w-[941px] text-pretty text-black">
              <span className="font-sans text-section-quote font-semibold">
                &ldquo;At Albanien Radreisen, we believe the best way to experience Albania is on two wheels. Our
                expertly guided cycling tours take you through breathtaking landscapes
              </span>
              <span className="text-[clamp(1.25rem,2vw,2rem)] leading-[1.74]">,</span>
              <span className="text-[clamp(1.3rem,2.1vw,2.125rem)] leading-[1.74]">
                {" "}
                historic towns, and authentic local communities, creating unforgettable adventures with comfort, safety,
                and local expertise&rdquo;
              </span>
            </blockquote>
          </div>

          <img
            src={aboutUsImage}
            alt="Cyclists exploring the Albanian countryside"
            className="h-[220px] w-full shrink-0 rounded-2xl object-cover sm:h-[280px] lg:h-[331px] lg:w-[537px]"
          />
        </div>

        <button
          type="button"
          className="mt-10 h-btn-sm cursor-pointer rounded-[11px] bg-brand px-10 text-btn leading-none text-white lg:ml-[248px]"
        >
          Explore More
        </button>
      </div>
    </section>
  );
}
