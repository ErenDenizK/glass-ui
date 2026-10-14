# Contributing to Glass UI

Thanks for your interest in contributing! 🎉

---

## Current status: archived

**Glass UI is archived at pre-v1.0 and is not under development.**

The repository is kept as a reference rather than a product. It is not
accepting contributions, and there is no roadmap being worked.

See [`README.md`](./README.md) for why it stopped and
[`docs/STATUS.md`](./docs/STATUS.md) for a measured account of what works.

---

## If you want to use it

Nothing here is published to npm and `package.json` is marked `private`, so
there is no install path. The intended use is to read it, or to lift a part of
it into your own project — the MIT license allows that without asking.

The parts most worth lifting are the ones with reasoning attached:

- `src/glass-system/primitives/GlassContainer/depth.ts` — why stacked glass
  compounds, and a measured attenuation model for it
- `src/glass-system/primitives/GlassContainer/styles.css` — why presentation
  lives in a cascade layer so consumer classes win
- `docs/decisions.md` — the architecture decisions, including the ones that
  turned out to be wrong

---

## If you found a bug

Open an issue so it is on the record, but expect no fix. A bug report that
names something `docs/STATUS.md` claims works is genuinely useful, because the
point of that document is to be accurate.

---

**Author:** [Eren Deniz Kuyucaklıoğlu](https://github.com/ErenDenizK)