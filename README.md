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
