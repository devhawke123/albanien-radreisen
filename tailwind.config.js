/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "30rem", // 480px
      sm: "40rem", // 640px
      md: "48rem", // 768px
      lg: "64rem", // 1024px
      xl: "80rem", // 1280px
      "2xl": "96rem", // 1536px
      "3xl": "120rem", // 1920px — Figma design width
    },
    extend: {
      screens: {
        short: { raw: "(max-height: 750px)" },
        medium: { raw: "(min-height: 751px) and (max-height: 899px)" },
        tall: { raw: "(min-height: 900px)" },
      },
      colors: {
        brand: "#cc1608",
        "brand-light": "#f41b0a",
        "brand-pale": "#fff2f2",
        "brand-soft": "#f6cfcf",
        stat: "#364153",
        "text-muted": "rgba(0, 0, 0, 0.58)",
        "text-subtle": "rgba(0, 0, 0, 0.7)",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      maxWidth: {
        hero: "1735px",
        content: "910px",
        search: "808px",
      },
      spacing: {
        "hero-x": "clamp(1rem, 4vw, 5rem)",
        "hero-y": "clamp(0.5rem, 2vh, 2.5rem)",
      },
      fontSize: {
        // Hero — Manrope body + Playfair accent line
        "hero-title": ["clamp(1.75rem, 5.5vh, 5rem)", { lineHeight: "0.92" }],
        "hero-title-accent": ["clamp(2rem, 6vh, 5.625rem)", { lineHeight: "0.92" }],
        "hero-body": ["clamp(0.875rem, 2vh, 1.5rem)", { lineHeight: "1.5" }],

        // Navigation & buttons — Manrope
        nav: ["clamp(0.875rem, 1.6vh, 1.25rem)", { lineHeight: "1.3" }],
        btn: ["clamp(1rem, 2vh, 1.5rem)", { lineHeight: "1" }],

        // Section headers — Manrope label, Playfair title
        "section-label": ["clamp(1.25rem, 2vw, 1.875rem)", { lineHeight: "0.87" }],
        "section-title": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],

        // About — Manrope quote
        "section-quote": ["clamp(1.5rem, 2.5vw, 2.1875rem)", { lineHeight: "1.74" }],

        // Stats banner — Manrope
        "stat-value": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.15" }],
        "stat-label": ["clamp(0.875rem, 1.5vw, 1.5rem)", { lineHeight: "1.4" }],

        // Featured tours showcase — Playfair title, Manrope body
        "card-feature-title": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.3" }],
        "card-feature-body": ["clamp(1rem, 2vw, 1.875rem)", { lineHeight: "1.5" }],

        // Why choose us — Manrope lead, Playfair card titles
        "body-lead": ["clamp(1rem, 2vw, 1.5rem)", { lineHeight: "1.5" }],
        "feature-title": ["clamp(1.125rem, 2vw, 1.75rem)", { lineHeight: "1.3" }],
        "feature-body": ["clamp(0.875rem, 1.5vw, 1.375rem)", { lineHeight: "1.4" }],

        // CTA banner — Playfair title, Manrope body
        "cta-title": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "cta-body": ["clamp(0.875rem, 1.8vw, 1.125rem)", { lineHeight: "1.5" }],

        // Footer — Playfair column headings, Manrope links/body
        "footer-heading": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "footer-link": ["clamp(1rem, 1.6vw, 1.5rem)", { lineHeight: "1.4" }],
        "footer-body": ["clamp(1rem, 1.8vw, 1.75rem)", { lineHeight: "1.5" }],

        // Testimonials — Playfair italic quote, Inter name/role
        "testimonial-quote": ["clamp(1.125rem, 2vw, 1.875rem)", { lineHeight: "1.4" }],
      },
      height: {
        "btn-sm": "clamp(2.75rem, 6.5vh, 3.9375rem)",
        "btn-lg": "clamp(3rem, 7.5vh, 4.4375rem)",
        "search-bar": "clamp(3.5rem, 8vh, 5.625rem)",
      },
    },
  },
};
