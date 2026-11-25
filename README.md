# Luis Canales — Financial Markets Portfolio

Static portfolio for GitHub Pages.

## Local workflow

```bash
npm run build
npm run serve
```

The site is generated from `scripts/build.mjs`. Shared visual styles live in
`assets/css/styles.css`; publication-ready files are written to the repository
root so GitHub Pages can serve them directly.

## Investment Banking context

The direct-access profile is generated at `/investment-banking/`. Its governing
brief and State A/State B evidence contract are in
`docs/contexts/investment-banking.md`; content and the optional verified flagship
are configured in `scripts/contexts/investment-banking.mjs`.

After building, run `npm run check:investment-banking` to check metadata, the
role-specific CV, flagship gating, and session navigation (including unavailable
storage). Keep generated pages in the same commit as their source changes.

## Global Markets context

The direct-access profile lives at `/markets/`. Its [design brief](docs/contexts/markets.md),
[evidence register](docs/contexts/markets-evidence.md) and
[release validation](docs/contexts/markets-release.md) describe its public scope.
The reusable curve study is at `/implementations/yield-curve/`.

Run `npm run build`, `npm run check:markets` and
`npm run check:investment-banking` before committing generated files.
The build reads selected CSV exhibits in `assets/implementations/yield-curve/`.
The Excel workbook is checked in separately. To regenerate it, run
`node scripts/implementations/build-curve-workbook.mjs` in a Node environment
with `@oai/artifact-tool` installed. Its optional arguments are the portfolio
root and a directory for workbook sheet previews.
