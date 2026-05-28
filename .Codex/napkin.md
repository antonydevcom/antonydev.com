# Napkin Runbook — AntonyDev.com

## Curation Rules
- Re-prioritize on every read. Keep recurring, high-value notes only.
- Max 10 items per category. Each item: date + "Do instead".

---

## Execution & Validation (Highest Priority)

1. **[2026-05-28] Tailwind is v3 via PostCSS — NOT @astrojs/tailwind and NOT v4**
   Do instead: use `postcss.config.mjs`. Never add `@astrojs/tailwind` integration. Never import v4 APIs.

2. **[2026-05-28] Global `tailwind` skill installed globally but does NOT apply here**
   Do instead: do not invoke `tailwind` skill. Use `tailwind-design-system` or raw v3 docs instead.

3. **[2026-05-28] All colors must come from tokens.css — no hardcoded hex except brand/cert colors in data-driven contexts**
   Do instead: use `var(--color-cafe)`, `var(--color-marfil)`, `var(--color-taupe)`, `var(--color-hueso)`, `var(--color-cafe-negro)`. Shadows use `rgba(42, 32, 27, …)`.

4. **[2026-05-28] motion@12 (Framer Motion) already in deps — no install needed**
   Do instead: import `motion` from `motion/react`. React Islands use `client:load`.

---

## Shell & Command Reliability

1. **[2026-05-28] Dev server: `pnpm dev` — runs on localhost:4321 by default**
   Do instead: run `pnpm dev` and open localhost:4321 to verify visual changes.

2. **[2026-05-28] Lint: `pnpm lint` (astro check + eslint)**
   Do instead: always run `pnpm lint` before declaring a task done.

---

## Domain Behavior Guardrails

1. **[2026-05-28] `body.page-home main` has negative top margin to underlap transparent nav**
   Do instead: when adding new pages, do NOT add `page-home` body class unless the hero should overlap the sticky navbar (like `/`).

2. **[2026-05-28] Scoped `<style>` blocks in Astro: `@keyframes` are NOT scoped — they leak globally**
   Do instead: prefix keyframe names per-page to avoid collisions (e.g. `pf-up`, `hero-up`).

3. **[2026-05-28] Nav active state: scroll-spy only runs on `/` (home); other pages use path-match via `data-match-path`**
   Do instead: for non-home pages, set `matchPath` to the exact pathname. `matchSection` is irrelevant and can be omitted.

4. **[2026-05-28] `src/lib/whatsapp.ts` requires ContactContext union update when adding new page contexts**
   Do instead: add new entry to both `ContactContext` type AND `MESSAGES` object.

---

## User Directives

1. **[2026-05-28] P1 must ship before P2 tasks — portafolio is P2**
   Do instead: building portafolio was explicitly requested despite P1 not yet deployed. Accept the override. Don't block on P1.

2. **[2026-05-28] No commit unless explicitly asked**
   Do instead: build and show result. Append git commit suggestion per global CLAUDE.md rule. Never run `git commit`.

3. **[2026-05-28] Spanish UI copy, English code/comments/commits**
   Do instead: all user-visible text in Spanish. Types, variables, component names, comments in English.
