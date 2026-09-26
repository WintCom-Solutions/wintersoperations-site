# Improvement Proposals — 2026-09-24

This is a fallback proposal. No actionable `stage:build` or `stage:review` work
was queued at sync time. The four open `ai-task` issues (`#121` social media
presence, `#113` service-launch plan, `#112` positioning Task Force products,
`#70` 2026-09-05 weakness review) are all `stage:plan` business/product
discussions, which the dispatcher ignores. `#125` is the machine-managed
state-store. The six open PRs (`#129`, `#130`, `#132`, `#133`, `#135`, `#136`)
are Dependabot bumps, all `blocked` + `needs:karl`.

All three items below are grounded in `main` at `cc7cc32`. They were checked
against all nine prior rounds in `docs/proposals/` (2026-08-29 through
2026-09-23) and do not repeat any of them. Two items come straight from failed
CI logs on open Dependabot PRs, so they are confirmed, not guessed.

**A note on the backlog.** Karl has merged every earlier proposal doc, but most
of the items in them are still unfixed on `main`. The 2026-09-14, 2026-09-15,
2026-09-22 and 2026-09-23 items are all still open. So for this round the bar
was "confirmed by evidence and blocking something today", not "nice to have".
Items 1 and 2 are why three of the six open Dependabot PRs can never go green.
If Karl wants to cut down the proposal volume, converting the older items into
`stage:build` issues (or closing them as `not_planned`) would help more than
adding new rounds.

---

## 1. CI runs on Node 20, which reached end of life on 2026-04-30. That is why the jsdom bump (`#135`) fails, and the pin already conflicts with installed dependencies

**Idea:** Change `node-version: 20` to `22` (or `24`, the current Active LTS)
in `.github/workflows/ci.yml` (line 15). Also add
`"engines": { "node": ">=22.12" }` to `package.json` (it has no `engines`
field today), so a local or Vercel build on an unsupported runtime fails early
and clearly. Karl should also confirm that the Vercel project's Node.js version
setting (Project Settings → Build and Deployment) matches, because an agent
cannot see or change that setting.

**Evidence:**

- The CI run for `#135` (jsdom `26.1.0` → `30.1.0`, run `35807431219`, job
  `107011272828`) installs Node `v20.20.2`. It then fails `npm test` with
  `TypeError: webidl.util.markAsUncloneable is not a function`, thrown from
  `node_modules/undici/lib/web/cache/cachestorage.js`, which
  `jsdom/lib/api.js` loads. All three test files fail to start. That API does
  not exist in Node 20, so the failure comes from the runtime and not from
  jsdom itself. On Node 22 or later this bump is very likely routine.
- `npm ci` in that same job prints `EBADENGINE` warnings for packages that
  are already on `main`. `vitest@5.0.0` requires
  `^22.12.0 || ^24.0.0 || >=26.0.0`, and `@testing-library/jest-dom@7.0.1`
  requires `>=22`. `vite@8.3.0` and `@vitejs/plugin-react` also declare
  `^20.19.0 || >=22.12.0`. CI passes today only because npm treats engine
  mismatches as warnings, so the next dependency that actually uses a
  Node 22 API will break CI with no warning, as jsdom 30 just did.
- Node 20 left maintenance on 2026-04-30 and no longer gets security fixes.

**Scope:** 1 line in `ci.yml` plus 3 lines in `package.json`. There is no
application code change. **Flag:** `ci.yml` is under `.github/workflows/`.
`docs/AI_TASK_FORCE.md` lists `.github/workflows/*` as protected only "in the
coordinator repo", and this workflow only builds and tests, so it probably is
not governance. Following the rule "where it is genuinely unclear … treat it as
governance and say so", this item should wait for Karl's go-ahead before anyone
builds it.

## 2. Dependabot splits `react` and `react-dom` into separate PRs, so neither can ever pass CI (`#132`, `#136`)

**Idea:** Add a `groups:` block to the npm entry in `.github/dependabot.yml`
so the React runtime pair and its type packages always move together.
For example:

```yaml
    groups:
      react:
        patterns:
          - "react"
          - "react-dom"
          - "@types/react"
          - "@types/react-dom"
```

Then close `#132` and `#136`. Dependabot will reopen them as one grouped PR.

**Evidence:**

- `package.json` pins both packages to the same exact version
  (`"react": "19.2.8"`, `"react-dom": "19.2.8"`), and React refuses to run
  when they differ.
- `#132` bumps only `react` (plus `@types/react`). Its CI run
  (`35807634295`, job `107011880151`) fails all three test files with
  `Incompatible React versions: … react: 19.3.0, react-dom: 19.2.8`.
- `#136` bumps only `react-dom` (plus `@types/react-dom`). Its CI run
  (`35807487475`) fails even earlier, at `npm ci`, with
  `ERESOLVE … peer react@"^19.3.0" from react-dom@19.3.0 … Found: react@19.2.8`.
- Each PR can only pass after the other one has merged, so neither can ever go
  green by itself. This also affects the 2026-09-23 proposal to turn on
  repository auto-merge: `19.2.8` → `19.3.0` is a
  `version-update:semver-minor` bump, which is inside
  `dependabot-auto-merge.yml`'s auto-merge scope (lines 41, 52). Even after
  that setting is on, these two PRs would stay stuck on red CI indefinitely.
  Grouping them fixes this permanently for every future React release.
- `.github/dependabot.yml` has no `groups:` today (lines 1–25). It already
  holds one hand-maintained exception (`ignore` for TypeScript majors, from
  `#128`), so this is the same kind of narrow config change.

**Scope:** About 7 lines of YAML in `.github/dependabot.yml`. This file only
configures the Dependabot bot and does not tell agents what they may do, so it
is not governance under the protected-file test.

## 3. The Inter font loads from Google's servers at runtime instead of through `next/font`, which adds a render-blocking third-party request on every page

**Idea:** Replace the three manual `<link>` tags in `app/layout.tsx`
(lines 51–56: two `preconnect`s and the `fonts.googleapis.com/css2?family=Inter…`
stylesheet) with `next/font/google`'s `Inter` (weights 400/500/600/700,
`display: "swap"`, exposed as a CSS variable). Then point
`tailwind.config.ts` `fontFamily.sans` (line 43, currently
`["Inter", "system-ui", "sans-serif"]`) at that variable. Per `AGENTS.md`,
the builder should first check `node_modules/next/dist/docs/` for this Next
version's `next/font` guidance.

**Rationale:**

- **Performance:** the stylesheet link blocks rendering, and it needs two
  cross-origin connections (`fonts.googleapis.com` for CSS, then
  `fonts.gstatic.com` for the font files) before text renders in Inter.
  `next/font` downloads the font at build time, which works with this repo's
  `output: 'export'` (`next.config.mjs`). It then serves the font from the
  site's own origin with a size-adjusted fallback, which also avoids layout
  shift when the font swaps in.
- **Privacy:** every page view currently sends the visitor's IP address to
  Google. The site already cares about data consent (the contact form requires
  an explicit consent checkbox, `lib/site.ts` lines 30–32), so a
  third-party request that needs no consent is inconsistent with that stance.
  Self-hosting removes it at no cost.
- It is the idiomatic Next.js approach. A repo-wide search finds no other
  third-party font or CSS dependency, so this is the only place to change.

**Scope:** `app/layout.tsx` and `tailwind.config.ts` only. There is no content
or visual design change, and the same typeface and weights stay.

---

## Explicitly out of scope

- None of these touch the business and product discussions in `#121`, `#113`,
  `#112` or `#70`.
- These items do not repeat anything already on file: the 2026-09-23
  auto-merge-setting item is a different problem from item 2, and item 2
  explains why that fix alone is not enough.
- This round does not propose a privacy-policy page, even though the site
  collects contact details and runs Vercel Analytics. That is a legal and
  content decision that fits better under `#113`'s compliance work package
  than a code proposal.

This is proposal-only. It contains no code changes, and the proposing agent
will not approve or merge it. It waits for Task Force/Karl review under the
normal `stage:plan` flow.
