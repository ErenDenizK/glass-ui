# Roadmap

> **This roadmap is closed. The project was archived on 14 October 2026.**
>
> Nothing below is being worked on. It is kept because *what was planned and
> deliberately not built* is part of an honest record — and because the
> ordering argument in "The thesis" is the part of this document still worth
> reading. See [`../README.md`](../README.md) for why the project stopped, and
> [`STATUS.md`](./STATUS.md) for what was true at the end.
>
> Phases 2.2 onward were never started.

---

## The thesis

Most glassmorphism libraries ship a `backdrop-filter` wrapper and call it a
design system. The thing that makes a design system is not the effect — it is
that **buttons, menus, modals and motion all obey one physical model**, so an
interface built from them feels like one material rather than a collection of
parts.

That model is what we are building. The glass effect is its most visible
consequence, not its point.

**Three commitments follow from that, and they order everything below.**

1. **One physical model, applied everywhere.** Depth, light direction and
   motion are decided once, in tokens, and every component reads from them.
   A component that invents its own shadow is a bug.
2. **The system degrades, it does not break.** Old browser, low-end GPU,
   reduced-motion, forced-colors, light backdrop — each gets a coherent
   result, never a broken one.
3. **Measured, not asserted.** Performance and accessibility claims in our
   docs must have a number behind them in CI. §5 of `decisions.md` claimed
   responsive blur for nine months without a line of code implementing it.

---

## Phase 1 — Foundation is trustworthy ✅

*Done in this pass. Detail in [`STATUS.md`](./STATUS.md).*

- Six consumer-visible rendering defects fixed, each with a measurement
- Styling re-architected onto CSS layers + custom properties, so `className`
  overrides work as `philosophy.md` §7 always promised
- Packaging repaired — types emitted, exports honest, browser-safe bundle
- CI on every push; playground published to GitHub Pages
- Tests assert the contract instead of the implementation

---

## Phase 2 — Make composition safe

*Direction set by the author: the current look stays. No visual overhaul.
The risk worth engineering against is that stacking many glass surfaces turns
ugly — so that is what this phase fixes, one measurable step at a time.*

**2.1 Nested glass no longer compounds into mud.** ✅ *Done.*
Stacked glass composites twice over: three surfaces at 0.25 read as 0.58, not
0.25. The `layer` prop was meant to manage this and did the opposite — raising
opacity 0.20 → 0.35 → 0.50 with depth. Measured on a three-deep stack, the
innermost surface sat at an effective **0.74** — opaque, not glass.

Depth is now detected automatically through context, and each level contributes
a fraction of full strength. Measured on the same stack: **0.74 → 0.385**, and
nested cards **0.386 → 0.241**. A single surface is untouched, so nothing that
is not nested changes appearance.

**2.2 Depth needs a visible ceiling.** Attenuation stops the mud but does not
stop someone nesting six panels. A dev-mode warning past three levels — paired
with the "max 4 concurrent surfaces" rule from `decisions.md` §4, which is also
unenforced — turns two documented rules into real ones.

**2.3 Contrast has to survive stacking.** Text legibility depends on the
*composited* backdrop, not on any single surface. Now that the composite is
computable, a dev-mode contrast check (ADR §9, still unimplemented) can be real
rather than aspirational.

**2.4 Elevation as one token.** `shadow` and `blur` are set independently today,
so a caller can build a surface that could not physically exist. Deriving both
from a single `elevation` token makes depth coherent by construction — and it
composes with 2.1 rather than fighting it.

**Deferred, deliberately.** Light mode, edge refraction and the surface/specular
model were proposed as Phase 2 and are **on hold at the author's
direction**. They are visual-language changes, and the current language is the
one we want. Revisit once composition is provably safe.

---

## Phase 3 — Enough components to be a system

`decisions.md` §8.5 defers the animation review until three components exist.
We have one.

- **Card** — the composition test. Proves layering and nested surfaces.
- **Input** — the accessibility test. Focus, error states, contrast on glass.
- **Modal / Overlay** — the depth test. Backdrop, focus trap, scroll lock.
- Then: **re-review the animation layer** against real usage, as §8.5 requires.

Menus, navigation and tooltips follow once those three have settled the
patterns. Building them earlier would mean guessing.

---

## Phase 4 — Keep the promises measurable

Each of these turns a documented claim into an enforced one.

- **Responsive resolution.** `blurMobile` and `durationDesktop` exist and are
  read by nothing. Wire them up, or delete them and amend ADR §5 — the current
  state, where the doc claims a feature the code lacks, is the worst option.
- **Performance budget in CI.** Frame timing on a throttled profile, failing the
  build on regression. This is what makes "60fps or rewrite it" real.
- **Contrast checking.** A dev-mode warning when text sits on a surface below
  4.5:1, as ADR §9 already promises.
- **Concurrent-surface warning.** The "max 4 glass elements" rule, enforced in
  dev instead of documented and ignored.
- **Coverage gate.** ADR §12 sets 70%. Nothing measures it today.
- **Visual regression tests.** The six defects in this audit were all invisible
  to unit tests. Screenshot diffing is the only thing that would have caught
  them automatically.

---

## Phase 5 — Release

- `forced-colors` / Windows High Contrast support
- SSR verification (React Server Components, Next.js app router)
- API documentation generated from types
- `CHANGELOG.md`, semver discipline, npm publish

---

## Deliberately not doing yet

Vue/Svelte wrappers, Figma plugin, CLI, theme builder, 3D glass. All are in
`decisions.md` as v2+. They stay there. **One framework, done properly, beats
three done partially** — and we have not yet finished the first.

---

## Open questions — all now closed

These were the questions that would have changed what got built. Recorded with
their final answers, since the project ended before most of them mattered.

1. ~~**Light mode — Phase 2 or later?**~~ **Answered: later.** The current look
   stays; composition safety comes first.
2. ~~**How far do we push refraction?**~~ **Answered: not now.** Same reason.
3. ~~**Who is the primary user?**~~ **Answered: neither, in the end.** The two
   candidates were "developer adding glass to an existing app" and "developer
   building an entire UI in this language". By late 2026 the author could build
   either on demand without a toolkit, which is what removed the need for the
   project at all.
4. ~~**npm publish, and under what name?**~~ **Answered: never published.**
   `glass-ui` is taken on npm by an unrelated `0.0.1` placeholder, and a scoped
   name was free. The question is moot: `package.json` is now marked `private`,
   and the distribution question was settled against npm packages generally —
   the registry model won, and an npm component library is the wrong shape in
   2026. See the README.

---

## What a continuation would actually be

Not this roadmap. The phases below assume the product is a React component
library, and that assumption is what did not survive review.

The three findings that would reorder everything, if anyone restarts:

1. **Generation is solved; verification is not.** The remaining value moved
   from *supplying* UI to *constraining and checking* it. A system that can
   tell an agent "this violates the contract" is a product in a way a
   `<GlassCard>` is not.
2. **Cross-browser refraction is not reachable.** `backdrop-filter: url(#f)` is
   Chromium-only, it is not in Interop 2026, and the W3C issue has no vendor
   traction. Phase 2's deferred "edge refraction" cannot be built as specified.
3. **The performance model here is aimed at the wrong variable.** `backdrop-filter`
   cost is dominated by invalidation frequency, not blur radius — so Phase 4's
   "performance budget in CI" should budget repaints, not pixels of blur. See
   the amendment in `decisions.md` §5.
