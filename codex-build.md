# Codex build summary

Issue: #94 — Fix opaque no-cors ContactForm submission.

## Changed

- Removed `mode: "no-cors"` from `components/ContactForm.tsx`.
- Treat contact form success as valid only when `fetch` returns a readable, non-opaque `response.ok`.
- Preserve form fields on any failed submit and show the existing email fallback error copy.
- Added `role="status"` and `aria-live="polite"` to visible success and error status messages.
- Added Vercel Analytics events for `contact_form_success` and `contact_form_error`.
- Updated `docs/contact-form-setup.md` to document static export, readable `ok` responses, and the Google Forms CORS limitation.
- Updated `scripts/verify-contact.mjs` to fail if `mode: "no-cors"` returns.

## Commands run

- `npm ci` — pass
- `npm run lint` — pass with two existing warnings in `app/layout.tsx`
- `npm run verify:contact` — pass
- `npm run build` — pass

## Result

Pass.
