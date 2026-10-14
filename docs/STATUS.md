# Project Status

> Where Glass UI actually stands, measured rather than assumed.
>
> **Archival pass: 14 October 2026** · Prior audit: 11 September 2026 · Branch: `dev`

---

## Archival pass — 14 October 2026

The project was archived in this pass. [`../README.md`](../README.md) carries the
reasoning; this section records what was found and fixed on the way out, so the
tree left behind is accurate.

### Three defects the September audit's own "fixed" table had wrong

All three were invisible to CI, for one shared reason: **CI never installs and
loads what it publishes**, and the playground aliases `glass-ui` to `src/`, so
neither path ever exercised the built package.

| # | Defect | Evidence |
|---|---|---|
| 1 | **The CommonJS entry point could not be loaded at all.** `package.json` sets `"type": "module"` and the build emitted the CJS bundle as `index.js`, so Node parsed genuine CJS as ESM | `require('glass-ui')` → `ReferenceError: exports is not defined in ES module scope`. Fixed by emitting `index.cjs`; `require()` now resolves 33 exports |
| 2 | **Every dev-mode warning was compiled out of every build.** The fix for the old `process is not defined` crash replaced `process.env.NODE_ENV` with the literal `'production'` at build time, turning both warning guards into `if (false)` | `grep process dist/*` → 0 hits. The README advertised a blur-clamp warning that could never fire. Fixed with a runtime guard (`src/utils/env.ts`) that is safe where `process` is undefined; the warning now fires in tests |
| 3 | **`clampDepth` was a type hole that crashed on any non-integer depth.** `return depth as GlassDepth` let `2.5` through into a `Record<1 \| 2 \| 3, …>` lookup | `attenuateForDepth(2.5, …)` → `TypeError: Cannot read properties of undefined`. A plain-JS consumer writing `layer={2.5}`, or any computed value, hit it. Now rounds, with `NaN` falling back to depth 1 |

### A silent behavioural bug, and the test that could not catch it

`AnimatedContainer`'s `enableHover` spread the whole hover preset over the
chosen one. The hover preset carries `variants` but no `initial`/`animate`, so
`preset="fadeIn" enableHover` kept fadeIn's `initial: 'hidden'` while replacing
the variant map with hover's — which has no `hidden` label to resolve. **The
entrance animation silently stopped happening.**

The only test covering that combination asserted
`expect(container.firstChild).toBeInTheDocument()` — a tautology that passes
whatever the merge produces. This is the September audit's own diagnosis still
live in the tree: the suite asserted the implementation, not the contract. The
merge now combines variant maps and applies hover through
`whileHover`/`whileTap`; the tautology was replaced with three contract tests.

### Coverage, measured for the first time

`vitest.config.ts` named the `v8` provider while `@vitest/coverage-v8` was
absent from `devDependencies`, so `npm run test:coverage` had **always** failed
with `MISSING DEPENDENCY`. With the provider installed and the report scoped to
`src/`:

```
94.22% statements · 84.78% branches · 89.47% functions · 74 tests
```

`decisions.md` §12's 70% floor was met comfortably. Nobody had ever been able
to see it.

### Accessibility gaps closed

- **`forced-colors: active` did not remove the material.** That mode overrides
  `background-color` and `border-color` with system colours but **does not reset
  `backdrop-filter`** — leaving a system-coloured panel still blurring its
  backdrop, i.e. low-contrast mush in exactly the mode a user enables to avoid
  it. The material is now dropped outright for a flat system-coloured surface.
- **`prefers-reduced-transparency` is now honoured** where the browser reports
  it. Noted in the stylesheet as a Chromium-only bonus rather than a guarantee:
  Firefox keeps it behind a flag and WebKit holds a standards position against
  exposing it at all, on fingerprinting grounds.

### The token layer was decorative; it is now wired

`README.md` claimed "depth, light direction and motion are decided once, in
tokens, and every component reads from them." **For motion that was false.**
`animation/presets.ts` re-declared `[0.4, 0.0, 0.2, 1]` as a literal and
`Button.tsx` hardcoded both its curves and its durations, so nothing read
`tokens/easing.ts` or `tokens/duration.ts`. The control points are now the
single source of truth, with the CSS `cubic-bezier()` strings derived from them,
and both consumers read from the tokens.

### Dead code removed

| Removed | Why |
|---|---|
| `isLowEndDevice()` | Unreachable — `utils.ts` is never re-exported, so it was not even a package export. Confirmed absent from `dist`. |
| `createVariants` / `VariantConfig` (`src/utils/variants.ts`) | Publicly exported, zero callers, documented only by its own example comment |
| `blurMobile`, `durationMobile`, `durationDesktop`, `getDuration()` | The never-implemented responsive strategy from `decisions.md` §5, now formally withdrawn there. `durationMobile` was a byte-identical copy of `duration` |
| `playground/StaticTests.tsx` | 214 orphaned lines with no importer, typechecked and linted on every CI run |
| 3 × `.gitkeep` | Stale markers beside populated directories |
| `.cursorrules` | 443 lines of superseded Cursor config that nothing reads, pointing at three paths that do not exist, and carrying a fictional team roster |

`playfulHover` was also added to the `AnimationPreset` union — it existed in
`animationPresets` but was unreachable through the typed API.

### Still open, deliberately

The toolchain rot (vitest 4 majors behind with two criticals, vite 3 behind,
`framer-motion` 3 behind, ESLint 8 EOL, Tailwind 4 a CSS-first rewrite) was left
in place. `npm audit` reports 43 vulnerabilities and **`npm audit --omit=dev`
reports 0** — every one is in the dev toolchain, so a consumer inherits nothing.
A simultaneous multi-major migration is not work an archived project should
carry. The 14.3 MB of lossless playground PNGs were likewise left: they are
already in history, so re-encoding them would only help new clones if history
were rewritten.

`Button` is still absent from its own showcase, and the visual-language and
contrast gaps described below are unchanged.

---

## Summary

The project is a **well-documented foundation with a thin implementation**. Ten
commits, ~3,500 lines, one shipped component.

The documentation was ahead of the code in an unusual way: `docs/decisions.md`
described behaviour (responsive blur, concurrent-element limits, WCAG
enforcement) that was never built. Meanwhile every check was green — 46 tests
passing, zero lint warnings, clean typecheck, successful build — while six
consumer-visible defects sat in the rendered output. **The test suite asserted
the implementation, not the contract**, so it could not see them.

Everything below was reproduced in headless Chromium. Numbers are measured, not
estimated.

---

## What exists

| Area | State |
|---|---|
| Design tokens | Complete — blur, opacity, colour, easing, duration, radius, shadow |
| `GlassContainer` primitive | Working |
| Context presets | 6 presets (`modal`, `button`, `card`, `nav`, `stats`, `background`) |
| Animation layer | Thin Framer Motion wrapper, 5 presets |
| `Button` | Working — 4 variants, 4 sizes, icons, loading, fullWidth |
| Playground | Two pages: Animation Lab, Interactive |
| CI / deployment | **Was absent.** Added in this pass |
| Published site | **Was absent.** Added in this pass |

**One component exists.** `docs/decisions.md` §8.5 defers animation decisions
"until three components" — that gate has not been reached. Card and Input are
the next two.

---

## Defects found

All six were **invisible to the test suite and to typecheck**, because they live
in CSS cascade behaviour that jsdom does not evaluate.

### Root cause

`GlassContainer` wrote every visual property into the element's `style`
attribute. Inline styles outrank any class rule, so a consumer's `className`
could never override anything — which silently broke the escape-hatch promise in
`docs/philosophy.md` §7, and took several features down with it.

### Measured, before → after

| # | Defect | Before | After |
|---|---|---|---|
| 1 | Two adjacent `<Button>`s stacked into a column | `false` | `true` |
| 2 | `fullWidth` never reached the button | 107px in a 920px row | 920px |
| 3 | `className="rounded-full"` ignored | `12px` | `9999px` |
| 4 | Keyboard focus ring invisible | absent | 2px offset + 4px ring |
| 5 | `ghost` hover state inert | no change on hover | `rgba(255,255,255,0.1)` |
| 6 | `outline` border indistinguishable | `0.08` alpha (glass rim) | `0.30` alpha (its own) |

**#1, #2** came from a second cause: `Button` wrapped itself in a block-level
`motion.div`. **#4 is a WCAG 2.4.7 failure** — directly against
`docs/decisions.md` §9, which makes accessibility non-negotiable.

### Nested glass compounded into mud

Found by stacking three glass surfaces and measuring the composited result.

Glass composites twice over: three surfaces at 0.25 opacity do not read as
0.25, they read as `1 - 0.75³ = 0.58`. Each `backdrop-filter` also re-blurs a
backdrop its parent already blurred.

The `layer` prop existed to manage exactly this, and went the wrong way — it
**raised** opacity `0.20 → 0.35 → 0.50` and blur `10px → 16px → 16px` with
depth, amplifying what nesting was already amplifying.

| Three-deep stack, composited tint | Before | After |
|---|---|---|
| `layer={1,2,3}` | **0.74** (opaque) | **0.385** |
| `card` preset nested three times | 0.386 | **0.241** |

`layer` also replaced the caller's whole config, so `layer={2} glass="modal"`
silently discarded the modal preset and its border glow.

Depth is now detected through React context and each level contributes a
fraction of full strength; `layer` overrides the detected depth instead of
hijacking the config. A surface that is not nested is unchanged — **depth 1 is
×1**, so existing single-surface appearance is preserved exactly.

One deliberate behaviour change: an explicit `layer={1}` used to force opacity
`0.20` from the old lookup table. It now means "depth 1" and the surface keeps
whatever `glass` resolves to (default `0.25`).

### Packaging

| Defect | Impact |
|---|---|
| `package.json#types` pointed at a `.d.ts` the build never emitted | Package installs with **no types at all** |
| `exports["./tailwind"]` pointed at a file that does not exist | Import throws |
| `process.env.NODE_ENV` survived into the ESM bundle | `ReferenceError: process is not defined` on CDN / native ESM |
| `framer-motion` declared a `dependency` but externalised by the build | Resolution failure for consumers |
| `clsx`, `tailwind-merge` bundled *and* declared dependencies | Two copies shipped |
| `dist/style.css` emitted at 0 bytes | Consumers imported nothing |

All fixed. **ESM bundle: 100 kB → 17 kB.**

---

## Decisions documented but not implemented

These are recorded in `docs/decisions.md` as settled. They are not in the code.
Listing them so the gap is visible rather than assumed closed.

| ADR | Claim | Reality |
|---|---|---|
| §5 Mobile strategy | Reduced blur on mobile | `blurMobile` and `durationDesktop` tokens exist; **nothing reads them**. No responsive resolution at all |
| §4 / philosophy | "Max 4 concurrent glass elements" | No counting, no dev warning, no enforcement |
| §9 Accessibility | "Automated contrast checking in dev mode" | Does not exist |
| §6 Interactive effects | Mouse-tracking glow | Not implemented |
| §12 Testing | "Minimum 70% coverage" | Never measured — no coverage gate in CI |
| philosophy §3 | `prefers-reduced-motion` support | **Now implemented** (was absent) |

Dead exports: `isLowEndDevice()` is exported and never called. `blurMobile`,
`durationDesktop`, `durationMobile`, `getDuration()` likewise.

Type gap: `playfulHover` exists in `animationPresets` but is missing from the
`AnimationPreset` union, so it is unreachable through the typed API.

---

## The visual-language problem

This is the honest finding, and it is a design issue rather than a bug.

Every glass surface tints toward `hsl(240, 5%, 15%)` — a near-black grey. In the
playground the result reads as **muddy** regardless of what sits behind it. The
screenshots show panels that could belong to any glassmorphism template.

Real glass does things this system does not yet do:

- **Refracts** — edges bend and displace what is behind them
- **Catches light directionally** — a specular rim on the lit edge, not a uniform border
- **Carries chromatic character** — subtle dispersion at high-contrast edges
- **Varies with depth** — nearer surfaces blur less, not more

The rim light added in this pass is a first step. It is not yet a visual
language. Closing this gap is what separates the project from the mockups it
means to improve on, and it is the substance of Phase 2 in
[`ROADMAP.md`](./ROADMAP.md).

There is also **no light-mode story**. The system assumes a dark backdrop
everywhere; on a light background the dark tint inverts the intended effect.

---

## Verification

```
lint       0 warnings
typecheck  clean
tests      68 passed (was 46; +22 regression tests for the defects above)
build      dist/index.mjs 17 kB · index.js 10 kB · index.d.ts 18 kB · style.css 1.3 kB
site       builds and serves correctly from a /<repo>/ sub-path
```

**CI passes on GitHub.** The Pages deploy job builds successfully but has never
published, because Pages is set to **Deploy from a branch** rather than GitHub
Actions. That branch is `main`, which is seven commits behind `dev` and contains
no source at all — so Jekyll renders its old `README.md`, and that README is
what the published URL serves.

Fix: **Settings → Pages → Source → _GitHub Actions_**. A workflow cannot do this
itself — creating a Pages site needs a token with `repo` scope, and
`GITHUB_TOKEN` is refused with "Resource not accessible by integration".

Note that `workflow_dispatch` will not offer a "Run workflow" button until the
workflow file exists on the default branch; until then, a push to `dev` is what
triggers a deploy.

The added tests assert the **contract** — which classes apply, which custom
properties carry which values, that the button is its own root element — rather
than concrete inline CSS. That is what makes them able to catch this class of
regression at all.
