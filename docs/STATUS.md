# Project Status

> Where Glass UI actually stands, measured rather than assumed.
>
> Audit date: 11 September 2026 · Audited commit: `092e6b6` · Branch: `dev`

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
tests      56 passed (was 46; +10 regression tests for the defects above)
build      dist/index.mjs 17 kB · index.js 10 kB · index.d.ts 18 kB · style.css 1.3 kB
site       builds and serves correctly from a /<repo>/ sub-path
```

**CI passes on GitHub.** The Pages deploy job builds successfully but cannot
publish until Pages is enabled once by hand — **Settings → Pages → Source →
_GitHub Actions_**. A workflow cannot do this itself: creating a Pages site
needs a token with `repo` scope, and `GITHUB_TOKEN` is refused with
"Resource not accessible by integration".

The added tests assert the **contract** — which classes apply, which custom
properties carry which values, that the button is its own root element — rather
than concrete inline CSS. That is what makes them able to catch this class of
regression at all.
