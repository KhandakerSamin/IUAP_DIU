# IUAP_DIU — Claude project guide

Marketing + registration site for the **IAUP Semi-Annual Meeting 2026**, hosted by Daffodil International University (DIU) in Dhaka. Treat copy, sections, and UX as an academic conference site (not a generic web app).

## Stack

- **Next.js 16.2.2** (App Router) + **React 19.2** + **Tailwind v4**
- **JavaScript, not TypeScript** — `tsconfig.json` exists but source files are `.js`/`.jsx`
- **better-sqlite3** for registration persistence
- **@react-pdf/renderer** for invoice PDFs, **nodemailer** for email on payment success

## Critical rule (from AGENTS.md)

**This is not the Next.js you know.** Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. APIs, conventions, and file structure may differ from training data. Heed deprecation notices.

## Layout

```
src/
  app/
    page.js, layout.js, globals.css
    registration/        page.js, online-payment/, payment-result/
    admin/               page.js, login/, registrations/, AdminShell.js
    api/
      payment/initiate/  POST → 1Card /isbsp/pay
      payment/ipn/       POST ← 1Card webhook
      registration/      registration form submit
      invoice/[reffId]/  on-demand PDF invoice
      admin/             login, logout, files
  components/
    global/              nev.js (intentional typo — do NOT rename), footer.js
    homepage/            section components + sections.js aggregator
    registration/        registrationForm.js, onlinePaymentConfirmation.js
  lib/
    db.js, fileStorage.js, adminAuth.js
    payment.js, paymentFinalize.js, pricing.js
    invoice.js, mailer.js
```

- Homepage is composed via `src/components/homepage/sections.js`.
- Global chrome (nav, footer) lives in `src/components/global/`.

## Payment flow (1Card / SSLCommerz)

- 1Card endpoints live at `api.1card.com.bd` (proxies SSLCommerz).
- **Auth convention:** token goes in the **request body** as `token: ...`, NOT as `Authorization: Bearer ...`. A commented-out Bearer header in `initiate/route.js` is kept in case 1Card switches.
- **Field name quirk:** the IPN payload uses `ref_id`; the rest of the API uses `reff_id`. Both spellings are intentional.
- **Always re-verify** via `/isbsp/validationserverapi` and only treat status `VALIDATED` as paid — never trust the IPN body alone.
- **IPN cannot reach localhost.** `APP_BASE_URL` must be public in production.
- On successful validation, `paymentFinalize.js` persists the registration, generates the PDF invoice (`lib/invoice.js`), and emails it (`lib/mailer.js`).

### Pricing (USD, server-side in `src/lib/pricing.js`)

| Tier | Member | Non-member | Window |
|---|---|---|---|
| Early Bird | $400 | $500 | on/before 30 Sep 2026 |
| General | $500 | $600 | 1 – 30 Oct 2026 |
| Late | $600 | $700 | 31 Oct – 10 Nov 2026 |

Family member: **+$400 each**. Tier is decided server-side from the current date — never trust a client-supplied price.

## Env vars (`.env.local` locally, `/var/www/IUAP_DIU/.env.local` on VPS)

- `ONECARD_USER_ID`, `ONECARD_TOKEN` — credentials
- `ONECARD_INITIATE_URL` = `https://api.1card.com.bd/isbsp/pay`
- `ONECARD_VERIFY_URL` = `https://api.1card.com.bd/isbsp/validationserverapi`
- `APP_BASE_URL` — used for IPN `success` + `redirect` URLs (must be public in prod)
- `IAUP_REGISTRATION_AMOUNT`, `IAUP_CURRENCY` — fallback defaults
- SMTP creds for `nodemailer` (see `lib/mailer.js`)
- `NEXT_PUBLIC_IAUP_FLAT_FEE_USD` (optional) — **test mode override.** When set, `calculatePricing()` returns this flat USD amount for everyone regardless of tier/membership/family count, and a sticky amber "TEST MODE" banner appears site-wide. Must be `NEXT_PUBLIC_*` so server (charge) and client (displayed price) stay in sync. Requires a rebuild to toggle — unset and redeploy to return to tiered pricing.

## Scripts

- `npm run dev` — Next dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — eslint

## Conventions

- Section components are independently importable; add new ones via `homepage/sections.js`.
- Keep client/server boundaries explicit (`"use client"` only where needed).
- Reff IDs look like `iaup-<base36-ts>-<rand>` and are generated in `payment/initiate`.
