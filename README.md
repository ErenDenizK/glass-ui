# Glass UI

A glassmorphism **design system** for React — one physical model shared by every
surface, from buttons to modals to motion.

TypeScript · Tailwind CSS · Framer Motion.

> ## Archived, October 2026
>
> This project is finished, not paused. It was archived at pre-v1.0 after a
> deliberate review, and the reason is written down below rather than left to be
> guessed at.
>
> It is kept as a **reference**, not a product. Nothing is published to npm,
> `package.json` is marked `private`, and there is no roadmap under way. What is
> here builds, passes its checks, and is accurate about its own limits — which
> is the most useful state an abandoned repository can be left in.
>
> Everything below describes what exists. [Why it stopped](#why-it-stopped) and
> [what a future version would have to do differently](#if-anyone-picks-this-up)
> are further down.

---

## How it started

Built in **eight days, 13–20 December 2025**, in ten commits — AI-assisted, with
Cursor doing most of the typing against a hand-written architecture.

That matters to the story. At the end of 2025, assembling a coherent UI from
scratch for every new project was real work, and a personal toolkit that held
your own depth, colour and motion decisions in one place genuinely saved time.
The project was built to be that toolkit.

Then it sat untouched for nine months.

On **11 September 2026** it got one rescue day: an audit that found six
consumer-visible rendering defects behind a fully green test suite, a packaging
repair, CI, and a fix for nested glass compounding into mud. That work is
recorded in [`docs/STATUS.md`](docs/STATUS.md) and is the best thing in the
repository.

Then it sat untouched again, until this archival pass on **14 October 2026**.

---

## What it actually is

The idea was that a design system is not an effect. Most glassmorphism
libraries ship a `backdrop-filter` wrapper; the intent here was that depth,
light and motion get decided **once, in tokens**, so an interface built from the
parts feels like one material.

Three properties follow from that, and all three are real in the code:

- **Glass is optional.** `<Button glass={false}>` is a first-class solid button.
  The colour system, motion curves and layout primitives work without any blur.
- **Your classes win.** Presentation lives in `@layer glass-ui`; unlayered CSS —
  which is what Tailwind utilities are — always outranks it. So
  `className="rounded-full"` does what you expect, and so does your focus ring.
  Only *values* travel inline, as custom properties.
- **It degrades instead of breaking.** No `backdrop-filter` support falls back to
  a higher-opacity tint via `@supports`. `prefers-reduced-motion`,
  `forced-colors` and `prefers-reduced-transparency` are all honoured.

### What is built

| Area | State |
|---|---|
| Design tokens | Complete — blur, opacity, colour, easing, duration, radius, shadow |
| `GlassContainer` primitive | Working, with automatic nesting attenuation |
| Context presets | 6 (`modal`, `button`, `card`, `nav`, `stats`, `background`) |
| Animation layer | Thin Framer Motion wrapper, 5 presets |
| `Button` | Working — 4 variants, 4 sizes, icons, loading, `fullWidth` |
| Playground | Two pages: Animation Lab, Interactive |
| CI | Lint, typecheck, test, build on every push |

**One component.** That is the honest headline. `docs/decisions.md` §8.5 defers
the animation review "until three components exist"; that gate was never
reached, so the motion layer was never validated against real usage.

### Verified, 14 October 2026

```
lint        0 warnings, 48 files
typecheck   clean
tests       74 passed
coverage    94.22% statements · 84.78% branches · 89.47% functions
build       index.mjs 17.5 kB · index.cjs 11.1 kB · index.d.ts 19.1 kB · style.css 1.8 kB
site        builds and serves from a /<repo>/ sub-path
```

Coverage had **never been measured before this pass** — `vitest.config.ts` named
the `v8` provider while `@vitest/coverage-v8` was missing from
`devDependencies`, so `npm run test:coverage` had always failed outright. The
70% floor in `docs/decisions.md` §12 turns out to have been met comfortably all
along; nobody could see it.

---

## Running it

```bash
npm install
npm run playground   # http://localhost:3000
```

The playground is the only way to see the system. It aliases `glass-ui` to
`./src`, so it exercises the source rather than the built package.

A GitHub Pages workflow exists (`.github/workflows/deploy-pages.yml`, publishing
from `dev`), but it depends on a one-time manual step that was never completed:
**Settings → Pages → Source → _GitHub Actions_**. A workflow cannot do this
itself — creating a Pages site needs a token with `repo` scope, which
`GITHUB_TOKEN` is not. Until that is switched, the deploy job builds and then
fails at `configure-pages`. **There is no confirmed published site.**

### If you lift the code into a project

Two things the package does not do for you, both load-bearing:

1. **The component CSS is not in `dist/style.css`.** That file carries only the
   `@layer glass-ui` rules — about 1.8 kB. `Button` builds its entire appearance
   out of Tailwind utilities (`inline-flex`, `px-4 py-2`, `focus-visible:ring-2`,
   `animate-spin`…), and those are compiled by *your* Tailwind, not shipped. You
   must add the source to your own `content` globs or the button arrives as a
   correctly-tinted glass surface wrapping a completely unstyled `<button>`.
2. **Text contrast is yours to guarantee.** Nothing in the system checks it. See
   the limits below.

---

## Known limits

These are real and were measured, not guessed. They are listed because a
reference that hides its failures is worth nothing.

**The visual language is generic.** Every glass surface tints toward
`hsl(240, 5%, 15%)` — a near-black grey — and reads as muddy regardless of
backdrop. Real glass refracts, catches light directionally, carries chromatic
character, and blurs *less* when nearer. This system does none of that. The rim
light is a first step and not a language. There is also **no light mode**: the
whole thing assumes a dark backdrop, and inverts badly on a light one.

**Contrast on glass is unsolved here, and unsolved in principle.** WCAG
contrast is computed between two known colours; a translucent surface has no
known background colour. `docs/decisions.md` §9 promises automated contrast
checking in dev mode. It does not exist. Worse, `ColorToken.text` is defined for
all six colours and read by nothing — `Button` hardcodes `text-white` for every
variant, so `color="warning"` renders white on `hsl(38, 92%, 55%)` by design.

**The blur cap optimises the wrong variable.** `MAX_BLUR = 20` with its
performance reasoning is the system's headline rule. A 2026 measurement of
`backdrop-filter` cost found it is dominated by **how often the blurred region
is invalidated, not by the radius** — a static blur over static content is
cached and nearly free, while a modest blur over *moving* content re-runs
snapshot → blur → composite every frame. The right constraint would have been
"never transition the blur radius, and keep large glass surfaces off moving
backdrops." See the amendment in `docs/decisions.md` §5.

**Documented-but-absent features.** The "max 4 concurrent glass elements" rule
in §4 is not enforced anywhere. Mouse-tracking glow (§6) was never built. The
responsive blur strategy (§5) was never built and has now been formally
withdrawn, with its dead tokens removed.

**`Button` is absent from its own showcase.** Neither playground page imports
it. The one shipped component is not demonstrated.

**The toolchain has rotted a full generation.** Vitest is 4 majors behind with
two critical advisories, Vite 3 behind, `framer-motion` 3 behind (the package
was renamed to `motion` and is at 14.x), ESLint 8 is EOL on legacy `.eslintrc`,
and Tailwind 4 is a CSS-first rewrite. `npm audit` reports 43 vulnerabilities —
**all 43 in the dev toolchain. `npm audit --omit=dev` reports 0**, so the two
runtime dependencies and both peers are clean. The rot was left in place
deliberately: a simultaneous multi-major migration is not work an archived
project should carry.

---

## Why it stopped

Not for lack of interest, and not because it was broken. Two reasons, and the
first is the real one.

### The need it was built for went away

The toolkit existed because assembling a coherent UI from scratch was expensive.
By late 2026 it is not. The author can now build the whole structure on demand,
which means the thing this repository provides — a cache of pre-made decisions —
is a cache for a computation that has become cheap. You do not maintain a cache
for free work.

That is the author's own conclusion, and reviewing it honestly did not overturn
it. It is a conclusion, not a premise to build on.

### And the surrounding market closed

Checked in October 2026, with first-party GitHub and npm data:

- **The distribution format changed.** The shadcn registry model won
  decisively — consumers expect to own the source, and the tooling (CLI, MCP
  servers, coding agents) reads registries, not `node_modules`. An npm component
  package is now the wrong shape. Worse, Vercel's v0 documentation states it is
  "specifically trained on the default implementations of the shadcn/ui
  components and may struggle with any customizations" — so a novel API surface
  has become a *liability*, actively making the dominant codegen tools worse at
  using your library.
- **The surrounding layers got absorbed.** Tailwind v4 took the
  tokens-to-CSS-variables pipeline (`@theme`, native cascade layers, `@property`,
  OKLCH). The platform took positioning, transitions, scroll animation and
  conditionals. `motion` took animation — MIT, free, and shipping releases
  constantly.
- **The hard part is unreachable.** Genuine refraction needs
  `backdrop-filter: url(#svg-filter)`. It is **Chromium-only**: WebKit silently
  drops reference backdrop filters, and Firefox *parses* `url()` as valid — so it
  passes an `@supports` check — and then paints nothing. The W3C issue asking for
  an interoperable primitive (`w3c/svgwg#1142`, opened June 2026) has no
  assignee, no milestone and no spec text, and the substantive reply argues
  usage is too low to pursue. It is **not in Interop 2026**. A WebKit
  implementation PR exists but is `merging-blocked` with the rounded-corner case
  unsolved.
- **The historical record is unambiguous.** A GitHub search for liquid-glass
  repositories with 100+ stars returns 41 results with **no maintained 1.x
  package among them**. The 6,390-star leader has not been touched since June
  2025. Fresh entrants keep appearing and dying within days. The space has had
  many good implementations; what it lacks is demand that outlives the news
  cycle.

One qualification worth keeping: the framing "depth, light and motion decided
once, in tokens" **is** a real differentiator against 41 one-file
`backdrop-filter` wrappers, and `depth.ts` contains knowledge those wrappers
lack. That is genuine work. It is just not a component library, and it is
trapped in the wrong product form on a stack three majors behind.

---

## What is worth taking from it

The asset here is not 3,670 lines of TypeScript with one component in it. It is
the reasoning, and reasoning does not rot:

- **[`depth.ts`](src/glass-system/primitives/GlassContainer/depth.ts)** — the
  best thing in the repository. Stacked glass composites twice over: three
  surfaces at 0.25 read as `1 − 0.75³ = 0.58`, not 0.25, and each
  `backdrop-filter` re-blurs a backdrop its parent already blurred. The `layer`
  prop was built to manage this and did the exact opposite, *raising* opacity
  with depth and landing a three-deep stack at an effective 0.74 — opaque mud.
  Depth is now detected through React context and each level contributes a
  fraction of full strength. The wider web arrived at "don't nest glass layers"
  as folklore; this file has the arithmetic and a model that lets you nest
  anyway.
- **[`styles.css`](src/glass-system/primitives/GlassContainer/styles.css)** — why
  presentation belongs in a cascade layer, why the tint lives on `::before` and
  the rim on `::after` (so Tailwind's preflight reset cannot erase either), and
  why feature detection belongs in `@supports` rather than JS so the first
  server and client renders agree.
- **[`docs/decisions.md`](docs/decisions.md)** — the architecture decisions,
  including the two now carrying amendments recording that they were wrong.
- **[`docs/STATUS.md`](docs/STATUS.md)** — an audit that catches its own project
  lying. Its one-line diagnosis is the most portable thing here: *"the test
  suite asserted the implementation, not the contract."*

---

## If anyone picks this up

**Do not resume this tree.** Carry the four ideas above into a current
toolchain. "Rebuild" means a port, not a polish — and the component library is
the part to leave behind.

If the goal is something defensible rather than another glass wrapper, the
research done for this archival pass pointed at one thing repeatedly, from two
independent directions: **generation is solved, verification is not.** Coding
agents produce UI competently and cannot check their own work; the measured
failure is confident self-report, not incompetence. The open space is the
constraint and the check, not the component.

And if it is glass specifically, three things are now non-negotiable and were
not understood when this was built:

1. **Guarantee contrast structurally, not by measuring it.** You cannot measure
   contrast against an unknown backdrop. Put an opaque-enough scrim between
   backdrop and text, sized so the worst case — pure white and pure black —
   still passes. Apple's own split is the pattern to copy: make the opaque
   variant the default, and make the clear variant *require* a dimming layer as
   part of its definition rather than as an option.
2. **Ship your own transparency control.** `prefers-reduced-transparency` is
   Chromium-only in practice; Firefox keeps it behind a flag and WebKit holds a
   standards position against exposing it at all, on fingerprinting grounds. The
   vendor that shipped Liquid Glass does not expose its own decade-old Reduce
   Transparency setting to the web. Use `prefers-contrast: more` and
   `forced-colors: active` as the cross-engine proxies, and own the rest.
3. **Budget invalidation, not blur radius.** See the limits above.

Worth knowing before planning anything: Apple spent three releases de-tuning
Liquid Glass for legibility — a frosted compromise in an iOS 26 beta, a
Clear/Tinted control in 26.1, a Glass/Solid option for the Lock Screen clock in
26.2 — and reporting around WWDC 2026 describes a system-wide transparency
slider and reduced default transparency in iOS 27. Apple did not abandon glass;
it turned the dial down and handed it to the user. The direction of travel is
*less* transparency by default.

---

## Repository map

```
src/
  glass-system/
    tokens/        blur, opacity, colors, easing, duration, radius, shadows
    presets/       six context presets
    primitives/    GlassContainer + the depth model
  animation/       thin Framer Motion wrapper, 5 presets
  components/      Button
  utils/           cn, dev-environment guard
playground/        two pages, Vite-served, aliased to src
docs/
  STATUS.md        measured audit — read this first
  ROADMAP.md       what was planned, and why it was not built
  decisions.md     architecture decisions, with amendments
  philosophy.md    the principles, including the ones not upheld
```

Note that `main` holds only the first three commits and **no source code at
all** — every line of the project lives on `dev`.

---

## License

MIT — see [`LICENSE`](LICENSE). Lift anything you find useful; no attribution
needed beyond the license.

**Author:** [Eren Deniz Kuyucaklıoğlu](https://github.com/ErenDenizK)
