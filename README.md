# Glass UI

A glassmorphism **design system** for React — one physical model shared by every
surface, from buttons to modals to motion.

Built with TypeScript, Tailwind CSS and Framer Motion.

> **Status: pre-v1.0.** One component (`Button`) is shipped and stable. The
> token system, glass primitive and animation layer are in place. See
> [`docs/STATUS.md`](docs/STATUS.md) for an honest account of what works and
> what does not, and [`docs/ROADMAP.md`](docs/ROADMAP.md) for what comes next.

---

## Live playground

The playground is published from `main` and `dev` on every push:

**https://erendenizk.github.io/glass-ui/**

Published from `dev` on every push. The deploy workflow enables Pages itself, so
no repository setting needs changing by hand.

Run it locally:

```bash
npm install
npm run playground   # http://localhost:3000
```

---

## What makes it a system, not an effect

Most glassmorphism libraries are a `backdrop-filter` wrapper. The point here is
that depth, light direction and motion are decided **once, in tokens**, and
every component reads from them — so an interface built from these parts feels
like one material.

Three properties follow:

- **Glass is optional.** `<Button glass={false}>` is a first-class solid button.
  The colour system, motion curves and layout primitives work without any blur.
- **Your classes win.** Presentation lives in `@layer glass-ui`; unlayered CSS —
  which is what Tailwind utilities are — always outranks it. So
  `className="rounded-full"` does what you expect, and so does your focus ring.
- **It degrades instead of breaking.** No `backdrop-filter` support falls back to
  a higher-opacity tint via `@supports`; `prefers-reduced-motion` is honoured.

---

## Quick start

> Not published to npm yet — install from the repository for now. The unscoped
> `glass-ui` name is taken by an unrelated package; the release will be scoped.
> See [`docs/ROADMAP.md`](docs/ROADMAP.md).

```bash
npm install github:ErenDenizK/glass-ui framer-motion
```

```tsx
import { Button, GlassContainer } from 'glass-ui'
import 'glass-ui/styles.css'

export function Example() {
  return (
    <GlassContainer glass="card" className="p-6">
      <h2 className="text-white text-xl font-semibold">Frosted</h2>

      <Button variant="primary" color="primary">
        Continue
      </Button>
    </GlassContainer>
  )
}
```

### Presets over configuration

Six context presets cover the common cases, and every one is overridable:

```tsx
<GlassContainer glass="modal">…</GlassContainer>   {/* blur lg, opacity 0.7, rim glow */}
<GlassContainer glass="nav">…</GlassContainer>     {/* blur md, opacity 0.5 */}
<GlassContainer glass="stats">…</GlassContainer>   {/* blur xs, opacity 0.08 */}

{/* Escape hatch: full control */}
<GlassContainer glass={{ blur: 'lg', opacity: 0.4, borderGlow: true }}>…</GlassContainer>
```

Presets: `modal` · `button` · `card` · `nav` · `stats` · `background`

---

## Performance rules

These are hard limits, not suggestions — see
[`docs/decisions.md`](docs/decisions.md) §4.

- **Blur caps at 20px.** `backdrop-filter` cost grows sharply beyond it. Values
  above the cap are clamped, with a dev-mode warning.
- **Keep concurrent glass surfaces low.** Each one is a separate GPU pass.
- **60fps on mid-range hardware**, or the feature does not ship.

---

## Development

```bash
npm run playground    # dev server with the playground
npm run test          # vitest, watch mode
npm run test:ci       # single run
npm run lint          # eslint, zero warnings allowed
npm run typecheck     # tsc --noEmit
npm run build         # library -> dist/
npm run build:site    # playground -> site-dist/
```

CI runs lint, typecheck, tests and both builds on every push to `main` and `dev`.

---

## Documentation

| Document | What it covers |
|---|---|
| [`docs/STATUS.md`](docs/STATUS.md) | Current state, measured. Known gaps |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | What we build next, and why in that order |
| [`docs/philosophy.md`](docs/philosophy.md) | Design principles |
| [`docs/decisions.md`](docs/decisions.md) | Architecture decision records |
| [`docs/contributing`](docs/contributing) | Contribution guidelines |

---

## License

MIT © [Eren Deniz Kuyucaklıoğlu](https://github.com/ErenDenizK)
