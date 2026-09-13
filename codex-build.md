Branch: taskforce/issue-92

Changed:
- Updated `.github/workflows/ci.yml` so CI runs `npm run lint`, `npm run verify:contact`, `npm run build`, and `npm run verify:metadata` after `npm ci`, with metadata verification after the static export build.
- Updated the lint script for Next 16 by replacing removed `next lint` with `eslint .`, adding the minimal ESLint flat config/dependencies, and pinning TypeScript to the TS 6 line supported by the current TypeScript ESLint stack.
- Fixed one lint error by escaping an apostrophe in `app/itops-console/page.tsx`.

Validation:
- `npm ci` passed.
- `npm run lint` passed with two warnings in `app/layout.tsx`.
- `npm run verify:contact` passed.
- `npm run build` passed.
- `npm run verify:metadata` passed.
