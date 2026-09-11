# Roadmap

> What we build next, and why in that order.
>
> Companion to [`STATUS.md`](./STATUS.md) (where we are) and
> [`philosophy.md`](./philosophy.md) (what we believe).

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

## Phase 2 — A visual language of our own

*The differentiator. Everything here targets the "muddy grey" finding.*

**2.1 Surface model.** Replace the single dark tint with a layered surface:
base tint, specular rim keyed to a light direction, and depth-dependent blur.
One `--glass-light-angle` token drives every rim in the interface, so highlights
agree with each other the way they would under one light source.

**2.2 Light and dark.** The system currently assumes a dark backdrop. Introduce
surface tokens that resolve against the backdrop's luminance, so the same
`<Card>` reads correctly on both — the single largest gap for real adoption.

**2.3 Edge refraction.** Real glass displaces what is behind its edges. A thin
displacement at the rim, gated behind a capability check and off by default,
is the highest-impact "this is not a mockup" signal available to us.

**2.4 Elevation as physics.** Today `shadow` and `blur` are set independently,
which lets a caller build a surface that could not exist. Derive both from a
single `elevation` token so depth is coherent by construction.

**Open question for the product lead** — see the bottom of this file.

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

## Open questions for the product lead

These change what gets built, so they are worth answering before Phase 2
starts rather than during it.

1. **Light mode — Phase 2 or later?** It is the biggest adoption blocker and
   also the biggest single piece of work in Phase 2. *Recommendation: yes,
   in Phase 2. A dark-only design system has a much smaller audience.*
2. **How far do we push refraction?** A real displacement effect is what would
   make the project unmistakably not-a-mockup, but it carries GPU cost and
   browser-support caveats. Opt-in and off by default, or a core part of the
   look? *Recommendation: build it, ship it opt-in, decide after measuring.*
3. **Who is the primary user?** "Developer adding glass to an existing app"
   and "developer building an entire UI in this language" want different APIs.
   The docs currently address both. *Recommendation: the second — it is what
   the vision describes, and it is the harder, more defensible target.*
4. **npm publish, and under what name?** `glass-ui` is taken on npm — an
   unrelated `0.0.1` placeholder published as "prototype glas user interface".
   A scoped name (`@erendenizk/glass-ui`) is free and needs no repo rename.
   *Recommendation: scoped. Chasing the unscoped name is not worth the effort.*
