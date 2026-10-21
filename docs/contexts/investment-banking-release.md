# Investment Banking — State A release validation

Pre-publication checks completed on 20 October 2026 (Mexico City).

## Scope and factual review

- New canonical profile `/investment-banking/`, professional English and existing visual language.
- DXANDI ownership, scope and deliverable types foregrounded; financial coursework and degree-in-progress clearly identified.
- USD/MXN remains independent research with empirical analysis/validation in development; Carbon Oh-No! remains a proof of concept.
- No live banking mandates, corporate DCF/comparables or integrated corporate model claimed; no future case route, placeholder or valuation output published.
- Approved IB PDF copied without modification. SHA-256: `65e42817b96190d50e6d2e8793328faf26b2da9a97fdd414aaea0bbe139f40a0`.
- Cover letter and independent assessment not published. Public research main content and general portfolio PDF verified unchanged against the base commit.

## Checks performed

| Check | Result |
| --- | --- |
| `npm run build` | Pass; 8 generated portfolio files |
| `npm run check:investment-banking` | Pass; metadata/CV, State A/B gating, session navigation and blocked-storage fallback |
| JavaScript syntax and `git diff --check` | Pass |
| Local link, asset, ID and anchor validation | Pass; 81 local references across all 6 HTML pages, no missing destination or duplicate ID |
| Approved and general PDF integrity | IB source byte-identical; general CV unchanged |
| Public page content regression | All five public `<main>` blocks byte-identical to base |
| Browser QA over supervised HTTP preview | Desktop 1440px, tablet 768px, mobile 390px and narrow 320px rendered and inspected |
| Overflow | At 768/390/320px, document scroll width equals client width (753/375/305px with scrollbar) |
| Mobile navigation | Menu opens, Work/About anchors navigate and close menu; CV remains a real PDF link |
| Context journey | IB → canonical USD/MXN → public home → Return to Investment Banking Profile succeeds; return persists beyond origin query |
| Ordinary public entry | Fresh tab without context keeps return bar hidden and original identity/CV |
| Basic accessibility review | Semantic landmarks/headings, labeled navigation, focus styling, alt text, contrast and reduced-motion rule reviewed; no claim of comprehensive accessibility certification |
| SEO | Self-canonical; `noindex, follow`; excluded from public sitemap; public portfolio SEO retained |

Preview manifests, responsive QA wrapper and copied preview directory are local-only and excluded from Git. The supervised preview serves static generated output; no production hosting configuration is added.

## Deployment checkpoint

The existing workflow is GitHub Pages' dynamic `pages build and deployment`, serving tracked static output from `master`. No custom CI workflow existed at baseline. Use the feature PR and merge without bypassing checks. Actual merge/deployment references and production verification belong in the PR's final deployment record, after the live page is checked; this document does not pre-certify publication.

## Remaining evidence and integration

The page demonstrates professional analytical execution and a credible financial learning trajectory. Corporate modeling, company valuation, transaction materials and live execution remain unproven. A separately reviewed flagship will become the primary functional evidence and CTA, ahead of professional execution; supporting research is compressed, the CV remains separately maintained, and the context URL stays stable.

Consult `docs/contexts/investment-banking.md`, `scripts/contexts/investment-banking.mjs`, `scripts/build.mjs`, `assets/css/styles.css`, `assets/js/main.js`, and `assets/docs/Luis_Canales_Investment_Banking_CV.pdf` before integration.

Session return navigation requires JavaScript. When browser storage is unavailable, origin parameters preserve the journey; with JavaScript disabled, direct links and the browser Back action remain usable. Browser checks used controlled iframe viewport widths, not physical mobile devices.

## Follow-up — professional engagement and section hierarchy

- Added the approved anonymized PASS narrative after the DXANDI deliverable categories, inside Professional Execution. Only the short public account is included; the internal brief, clinical data and private deliverables are not copied into this repository.
- Understanding the Function is now section 03, before Selected Work (04). Their text and IDs are preserved. The hero, all five public pages, navigation JavaScript and both CV PDFs are byte-identical to the preceding release.
- Normal build and existing IB checks pass. Placement, six section numbers, unchanged source paragraphs, local references and evidence boundaries were reviewed.
- Rendered HTTP preview inspected at 1440px, 768px and 390px; no horizontal overflow. The case occupies about 411px vertically on desktop and 865px on mobile. Menu/Work navigation, the project card and the return journey remain usable.
- State A remains active; PASS stays supporting professional evidence when a future verified flagship is integrated. Production confirmation is recorded in the follow-up PR after deployment.
