# Solar Load Sizing Calculator

A single-page web app (React + Vite, no backend) for sizing an off-grid
photovoltaic system from an appliance load list.

**Live demo:** https://hasan-992.github.io/solar-sizing-web/

> **⚠️ TestSprite dashboard note:** the dashboard shows **3/7 Pass**, but the
> four `blocked` tests are **not failures** — each blocked run's own failure
> bundle records the testing agent concluding **"Result: PASS … Success =
> true"** with the exact expected value observed on the page (a
> verdict-classification quirk of the testing agent, reproduced across four
> assertion styles). See the note at the top of [`LOOP.md`](LOOP.md) and the
> proof bundles under [`.testsprite/runs/`](.testsprite/runs), e.g.
> [`inverter-v2/failure.json`](.testsprite/runs/inverter-v2/failure.json).

## Features

- **Appliance table** — add, edit, and delete rows with appliance name, power
  (W), quantity, and hours of use per day.
- **Live totals** — total connected load (W) and total daily energy (Wh/day)
  recompute as you type.
- **System sizing results** — recommended PV array size (W), battery bank
  capacity (Ah), and inverter rating (W).
- **Configurable assumptions** — peak sun hours, system losses, system voltage,
  depth of discharge, days of autonomy, and inverter margin.

## Sizing formulas

| Result | Formula |
| --- | --- |
| PV array (W) | daily energy ÷ (sun hours × (1 − losses)) |
| Battery bank (Ah) | (daily energy × autonomy days) ÷ (voltage × depth of discharge) |
| Inverter rating (W) | total connected load × inverter margin |

Defaults: 5 peak sun hours, 20% losses, 48 V, 50% DoD, 1 day autonomy, 125%
inverter margin.

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
```

Pushes to `main` deploy the static build to GitHub Pages via GitHub Actions
(`.github/workflows/deploy.yml`).

## Testing

The app is verified end-to-end with [TestSprite](https://www.testsprite.com/)
against the deployed GitHub Pages URL. Seven frontend tests cover adding,
editing, and deleting appliances; live totals; and the PV / battery / inverter
sizing calculations (including exact-value checks such as
`4400 / (5 × 0.8) = 1,100 W`). Three tests report `passed` on the dashboard;
the other four terminate as `blocked` even though the testing agent's own
failure bundles conclude "Result: PASS … Success = true" with the correct
values — see the note at the top of this file and of [`LOOP.md`](LOOP.md).

Every verification iteration is logged in [`LOOP.md`](LOOP.md) — one row per
test run — and the failure bundles (result, steps, video, root-cause) are
committed under [`.testsprite/runs/`](.testsprite/runs). Regenerate the log with:

```bash
npm run test:loop     # rebuilds LOOP.md from TestSprite run history
```
