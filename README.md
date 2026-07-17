# Albanien Radreisen

A bilingual React website for **TARKO / Albanien Radreisen**, an Albanian cycling-tour operator. The application presents guided tours, supports detailed itineraries and optional services, includes a browser-based cart and checkout flow, and contains a protected admin area prepared for future booking management.

## What the project includes

- Responsive public marketing website
- English and German localization
- Dynamic tour listing and tour-detail pages
- Tour overview, itinerary, inclusions, reviews, pricing, and booking UI
- Optional bicycle, e-bike, and single-room supplements
- Persistent browser cart with calculated totals
- Checkout UI and order summary
- Tour-request delivery through FormSubmit
- Supabase Edge Function clients for order submission and admin authentication
- Protected admin login and dashboard shell

## Technology stack

- **React 19** — component-based user interface
- **React Router 7** — client-side routing
- **Vite 8** — development server and production bundling
- **Tailwind CSS 4** — utility-first styling
- **i18next / react-i18next** — English and German translations
- **Supabase Edge Functions** — order and admin API endpoints, called with `fetch`
- **FormSubmit** — current tour-request email delivery
- **ESLint 10** and **Prettier 3** — code quality and formatting
- **Node test runner** — cart-store unit tests

There is no separate Node server in this repository. The frontend calls hosted services directly.

## Requirements

- A current Node.js LTS release compatible with Vite 8
- npm
- A Supabase project if order submission or admin authentication is enabled

## Getting started

1. Clone the repository and enter it:

   ```bash
   git clone <repository-url>
   cd albanienRedreisen
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
   ```

   Only use a browser-safe Supabase anonymous/publishable key. Never place a service-role key in a Vite environment variable because every `VITE_*` value is included in the client bundle.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite.

The existing `.env` file is ignored by Git.

## Available commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint across the repository
npm run format    # Format the repository with Prettier
```

Run the cart-store tests directly:

```bash
node --test src/utils/cartStore.test.js
```

## Application routes

Routes are defined in `src/App.jsx`.

Currently active public routes:

- `/` — landing page
- `/about` — company information and team
- `/gallery` — standalone gallery
- `/tours` — tour catalogue
- `/tours/:slug` — dynamic tour-detail page
- `/cart` — persistent shopping cart
- `/checkout` — billing details, order summary, and order submission
- `/testimonials` — standalone traveler reviews
- `/faq` — frequently asked questions
- `/contact` — contact form and location
- `/imprint` — legal/company information

Admin routes:

- `/admin` — admin login
- `/admin/dashboard` — protected dashboard

## Page composition

### Home page

`src/pages/HomePage.jsx` composes the main landing page from:

1. Hero
2. About section
3. Statistics banner
4. Featured tours
5. Why choose us
6. How it works
7. FAQ preview
8. Testimonials
9. Gallery
10. Journey overview
11. CTA and footer

### Tours page

`src/pages/ToursPage.jsx` combines the tours hero and tours grid. Cards are rendered from the catalogue in `src/data/toursCatalog.js`.

### Dynamic tour page

`src/pages/TourPage.jsx` is reused for every tour slug. It contains:

- `TourHero` — tour image, title, rating, duration, group size, and season
- `TourDetails` — tabbed product information
- `BookingCard` — departure, guest, and add-on selection
- `RelatedTours` — every catalogue tour except the current one
- Shared CTA and footer

The detail tabs are:

- **Overview** — summary, tour information, highlights, pricing, notes, and photos
- **Itinerary** — expandable day-by-day schedule
- **Included** — included services, exclusions, and feature tags
- **Reviews** — localized tour reviews

## Tour data model

Tour configuration is split between JavaScript and translation JSON.

### Operational tour data

`src/data/toursCatalog.js` stores values needed by application logic:

- `id` and `slug`
- base price
- card, hero, and gallery images
- available departure windows
- add-on identifiers and prices

The catalogue currently includes:

- `8-day-cycling`
- `8-day-albania-montenegro`

`getTourBySlug()` resolves a product for the tour, cart, and checkout pages. `getRelatedTours()` returns the other available products.

### Localized tour content

Localized copy is stored in:

- `src/i18n/locales/en.json`
- `src/i18n/locales/de.json`

Tour-specific content lives under:

```text
toursContent.<tour-slug>
```

Each tour entry contains:

- Hero metadata and statistics
- Quick description and overview
- Tour-information rows
- Highlights
- Base package, supplements, and bike rental
- Important notes
- Itinerary days
- Included and excluded services
- Feature tags
- Reviews
- Card labels and image alternative text

Shared labels live under `tourPage`, `tourCard`, and the other page-level translation keys.

### Adding another tour

1. Add a catalogue object to `TOURS` in `src/data/toursCatalog.js`.
2. Give it a unique `id` and `slug`.
3. Import and assign its images.
4. Configure its base price, departures, and add-ons.
5. Add matching `toursContent.<slug>` objects to both locale files.
6. Visit `/tours/<slug>` and verify every detail tab.
7. Test adding it to the cart and review its calculated total.

No new route is required because `/tours/:slug` is dynamic.

## Localization

Internationalization is initialized in `src/i18n/config.js`.

- Default language: English
- Fallback language: English
- Available languages: `en`, `de`
- Language control: `src/components/ui/LanguageSwitcher.jsx`

Components use `useTranslation()` for shared labels. `src/hooks/useTour.js` combines the current route slug with localized tour content.

When adding copy:

1. Add the same key structure to both locale JSON files.
2. Keep arrays and objects structurally identical.
3. Avoid hard-coding customer-facing text in components where practical.

## Booking flow

`src/components/sections/tour/BookingCard.jsx` supports two modes.

### Booking mode

The visitor:

1. Chooses a departure.
2. Selects the number of guests.
3. Adds optional services and quantities.
4. Reviews the calculated total.
5. Adds the configured tour to the cart.

Pricing is calculated by `src/utils/bookingPricing.js` from:

```text
guest count × tour base price
+ selected add-on quantities × add-on unit prices
```

Individual bookings require at least two guests.

### Request mode

The visitor supplies a name, email address, and message. `src/services/bookingSubmit.js` sends the request through the FormSubmit AJAX API.

FormSubmit may require one-time activation of the destination email address before requests are delivered.
The destination address is embedded in the client code and FormSubmit CAPTCHA is explicitly disabled. Add rate limiting, CAPTCHA, or another anti-spam control before treating this as a production-ready public endpoint.

## Cart

Cart state is implemented in:

- `src/utils/cartStore.js`
- `src/hooks/useCart.js`
- `src/pages/CartPage.jsx`

The cart:

- Uses the browser's `localStorage`
- Persists across page refreshes
- Synchronizes between browser tabs through the `storage` event
- Replaces an existing item when the same tour and departure are added again
- Allows different tours or departure dates to coexist
- Supports removal and clearing
- Recalculates the estimated total from all items

Storage key:

```text
albanien-radreisen-cart
```

Because the cart is client-side, it is not a durable order record and must not be treated as authoritative payment data.

## Checkout and orders

`src/pages/CheckoutPage.jsx` contains:

- Guest email
- Billing name and address
- Optional company and apartment fields
- City, state, postal code, and phone
- Cash-on-delivery option
- Optional order note
- Terms/privacy links
- Localized order overview

The checkout calls `submitOrder()` from `src/services/submitOrder.js`. It sends:

- Customer form data
- Cart items
- Subtotal
- Current locale

to this Supabase Edge Function:

```text
POST /functions/v1/submit-order
```

The page displays a loading state, reports submission failures, clears the cart only after a successful response, and displays the returned `orderNumber`.

Both the “Terms and Conditions” and “Privacy Policy” links currently point to `/imprint`; separate legal pages have not been implemented.

## Supabase integration

The frontend expects these Edge Functions:

- `submit-order`
- `admin-login`
- `admin-verify`
- `admin-logout`

Their implementation is not stored in this repository. The frontend calls them using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### Order endpoint

`src/services/submitOrder.js` sends a JSON request to `submit-order`.

Expected success response:

```json
{
  "orderNumber": "ORDER-REFERENCE"
}
```

Cart items and totals originate in browser `localStorage` and are fully client-controlled. The Edge Function must:

- Resolve products and departures from trusted server-side data
- Validate quantities, add-ons, availability, and capacity
- Recalculate every price and the final total
- Reject unavailable, malformed, or manipulated items
- Persist the order before returning success
- Apply suitable abuse protection and rate limiting

Never trust the submitted `subtotal` or item `total` values as authoritative.

### Admin authentication

Admin authentication is implemented by:

- `src/services/adminAuth.js`
- `src/hooks/useAdminAuth.jsx`
- `src/components/admin/AdminProtectedRoute.jsx`

The flow is:

1. `admin-login` validates credentials and returns a session token.
2. The browser stores the token in `localStorage`.
3. `admin-verify` validates the stored session on load.
4. Protected routes redirect anonymous visitors to `/admin`.
5. `admin-logout` invalidates the session and removes the local token.

Expected response fields:

- `admin-login` — `session_token`
- `admin-verify` — `authenticated` and, when authenticated, `username`

Authenticated admin requests send the token in the `x-admin-session` header. All Edge Functions must allow the deployed frontend origin through CORS and handle browser preflight requests.

Admin session storage key:

```text
albanien-radreisen-admin-session
```

The Edge Functions must enforce authentication and authorization. Client-side route protection alone is not a security boundary.

## Admin area

`src/pages/admin/AdminLoginPage.jsx` provides the sign-in form.

`src/pages/admin/AdminDashboardPage.jsx` currently contains placeholder metrics:

- Total bookings
- Upcoming departures
- Active tours
- Monthly revenue

Booking management, departure management, reporting, and live dashboard data are marked as future work.

## Contact, newsletter, and other forms

The project contains several independent forms:

- Tour request form — connected to FormSubmit
- Checkout form — local success state only
- Contact form — UI exists, submission endpoint is not wired
- Homepage CTA/newsletter form — UI exists, submission endpoint is not wired

Search for `ponytail:` comments to find deliberately deferred integrations.

## Styling and design system

Global styles are loaded from `src/index.css`, which:

- Imports Manrope and Playfair Display from Google Fonts
- Loads Tailwind CSS
- Applies the global body font and background

`tailwind.config.js` defines:

- Responsive breakpoints from `xs` through `3xl`
- Height-based breakpoints
- Brand colors
- Manrope and Playfair font families
- Responsive typography tokens
- Shared page widths and spacing
- Tour-card, hero, CTA, footer, FAQ, and testimonial scales

Important design tokens include:

- `brand`: `#cc1608`
- `brand-light`: `#f41b0a`
- `brand-pale`: `#fff2f2`
- `max-w-hero`: `1735px`
- `px-hero-x`: responsive horizontal page padding

Use existing tokens and components before adding one-off styles.

## Assets

Assets live in `src/assets/`.

- `images/` — page photography, backgrounds, logos, maps, and illustrations
- `icons/` — SVG icons
- `video/` — hero video files
- Barrel modules such as `hero.js`, `shared.js`, `tourPage.js`, and `tours.js` — grouped exports for components

Vite and `jsconfig.json` define this alias:

```js
@assets/* -> src/assets/*
```

Large source images and videos have a significant impact on bundle and page weight. Optimize new media before adding it.

## Project structure

```text
.
├── src/
│   ├── assets/                 Images, icons, videos, and export barrels
│   ├── components/
│   │   ├── admin/              Admin layout, guards, and icons
│   │   ├── layout/             Header, footer, and reusable page layout
│   │   ├── sections/           Page-specific and homepage sections
│   │   └── ui/                 Reusable cards, accordions, and controls
│   ├── data/
│   │   ├── toursCatalog.js     Tour prices, media, dates, and add-ons
│   │   └── tourDepartures.js   Legacy-compatible departure exports
│   ├── hooks/
│   │   ├── useAdminAuth.jsx    Admin authentication context
│   │   ├── useCart.js          Reactive cart hook
│   │   └── useTour.js          Current tour/content resolver
│   ├── i18n/
│   │   ├── config.js           i18next setup
│   │   └── locales/            English and German JSON
│   ├── pages/                  Public, commerce, and admin pages
│   ├── services/               FormSubmit and Supabase HTTP clients
│   ├── utils/                  Cart storage and booking calculations
│   ├── App.jsx                 Router configuration
│   ├── index.css               Tailwind and global CSS
│   └── main.jsx                React entry point
├── eslint.config.js
├── jsconfig.json
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Testing and quality checks

Before opening a pull request or deploying:

```bash
node --test src/utils/cartStore.test.js
npm run lint
npm run build
```

The cart tests cover:

- Replacing an identical tour/departure booking
- Keeping bookings for different departures
- Removing only the selected item

The project does not currently include component, browser, or end-to-end tests.

## Production deployment

The production build is written to `dist/`:

```bash
npm run build
```

Deployment requirements:

1. Serve the files in `dist/`.
2. Configure SPA fallback so unknown paths return `index.html`.
3. Add the two `VITE_SUPABASE_*` variables at build time.
4. Deploy and secure the expected Supabase Edge Functions.
5. Confirm FormSubmit activation and delivery if the request form remains enabled.
6. Test direct navigation to dynamic routes such as `/tours/8-day-cycling`.
7. Verify that `submit-order` recalculates prices server-side and returns an `orderNumber`.
8. Configure CORS for the deployed frontend origin.

Without SPA fallback, refreshing a client-side route may return a server 404.

## Current limitations

- Admin dashboard data is static placeholder content.
- Supabase Edge Function source is not included.
- Contact and newsletter forms do not submit anywhere yet.
- Tour inventory and availability are static frontend data.
- Departure windows are shared between the two tours.
- The cart and admin session use `localStorage`.
- Checkout submits client-controlled cart data, so secure server-side validation is essential.
- Terms and privacy links both lead to the imprint page.
- FormSubmit CAPTCHA is disabled for tour requests.
- There are no component or end-to-end tests.
- Some large image/video assets increase the production bundle size.

## Recommended next steps

1. Add the Supabase Edge Function source and database migrations to version control.
2. Enforce trusted server-side price, inventory, and capacity validation in `submit-order`.
3. Build admin booking management against real order data.
4. Add dedicated terms, privacy, and order-confirmation pages.
5. Add anti-spam protection to the tour-request form.
6. Wire contact and newsletter forms.
7. Add React component and Playwright end-to-end tests.
8. Optimize large media and introduce route-level code splitting.

