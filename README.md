# Solar Load Sizing Calculator

A single-page web app (React + Vite, no backend) for sizing an off-grid
photovoltaic system from an appliance load list.

**Live demo:** https://hasan-992.github.io/solar-sizing-web/

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
against the deployed GitHub Pages URL. See `.claude/skills/testsprite-verify`.
