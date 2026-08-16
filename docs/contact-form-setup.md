# Contact form setup

By default the contact form (`components/ContactForm.tsx`) submits nowhere —
it falls back to opening a pre-filled `mailto:` link to `contactEmail` in
`lib/site.ts`. No configuration is required for that fallback to work.

To collect submissions somewhere instead, pick one of the options below and
fill in the matching values in `lib/site.ts`.

## Option A — Google Forms (recommended, free)

1. Create a Google Form with three short-answer fields: Name, Email, Message.
2. Open the live form, right-click and "Inspect" (or view page source), and
   find each field's `entry.XXXXXXXXXX` id from the `name` attribute on its
   `<input>`/`<textarea>`.
3. Copy the form's ID from its URL:
   `https://docs.google.com/forms/d/<formId>/edit`.
4. In `lib/site.ts`, set:

   ```ts
   export const googleForm = {
     formId: "<formId>",
     entryName: "entry.111111111",
     entryEmail: "entry.222222222",
     entryMessage: "entry.333333333",
   } as const;
   ```

5. Responses land in the form's linked Google Sheet.

## Option B — Formspree (or any form-POST endpoint)

1. Create a form endpoint at [formspree.io](https://formspree.io) (or a
   similar service) and copy its POST URL.
2. In `lib/site.ts`, set:

   ```ts
   export const contactEndpoint = "https://formspree.io/f/xxxxxxxx";
   ```

   Leave `googleForm.formId` empty — the form prefers Google Forms when both
   are set.

## Notes

- The submit request uses `mode: "no-cors"`, so the browser can't read the
  response body; success is assumed once the request doesn't throw. Verify
  submissions are arriving by checking the Sheet or the form provider's
  dashboard after a test send.
- Because the site is a static export (`output: 'export'`), there is no
  server-side route to relay the submission through — the client posts
  directly to Google Forms or the configured endpoint.
