# Global Markets State A release validation

Prepared on 23 November 2026 (Mexico City). The feature branch contains the generator changes and tracked static output for GitHub Pages.

## Review scope

- `/markets/` uses the existing portfolio design system, a Markets-specific CV, and a real curve-recovery preview. It is self-canonical and marked `noindex, follow`. The context is excluded from the public sitemap.
- `/implementations/yield-curve/` is discoverable through the sitemap and presents the rates figures and financial interpretation, all 15 cubic repricing rows, downloadable evidence and a six-sheet workbook.
- Content highlights applied curves, fixed-income pricing in development, simulated futures experience, ongoing independent research, professional consulting delivery and coursework. Source and publication boundaries are in the [claim register](markets-evidence.md).
- The supplied PDF was copied byte for byte. Its existing portfolio annotation and the attached DOCX hyperlink target `https://luisgcanales.github.io/markets/`. Approved PDF SHA-256 is `33cb3e00b45d1ecf385254a83ba11bb5140fe8c1ec0d115296dff68fb5752855`.

## Checks performed

| Check | Result |
| --- | --- |
| Site generation | `npm run build` passed, generating 10 files. |
| Context automation | `npm run check:markets` and `npm run check:investment-banking` passed. Tests exercise the generated allowlist, blocked storage, a cross-page fragment, switching context and context-free visits. |
| Local routes, IDs and files | 8 HTML files and 41 unique local destinations or fragments checked. Ten pinned upstream destinations checked against the source checkout. |
| Portfolio regression | All six existing HTML main blocks are byte-identical to the base of the branch. The two previously published CVs are unchanged. |
| Financial evidence | Nine published files match the upstream bytes and documented SHA-256 hashes. Source joins, method RMSEs, repricing PASS counts and quote-shock coverage checked. Both exhibit images were visually inspected against captions. |
| Excel | Six sheets rendered. The exported workbook was reopened and checked for data sizes, numeric control totals, cached formula results, absence of error cells and the embedded rate chart. |
| CV | The one-page PDF was rendered and visually reviewed. Its portfolio annotation and the source DOCX hyperlink were confirmed. |
| Responsive browser review | Pending. The local Chromium renderer could not start in the execution environment, and the managed browser could not reach the local preview. Responsive rules and static accessibility markup were reviewed. This does not verify the rendered desktop, tablet and mobile layouts, focus order or clipping. |

## Release gate

Review the two generated pages in a connected static preview at desktop, tablet and phone widths before approving the PR. Confirm the Market CV and workbook links, figure readability, keyboard focus, navigation return paths, narrow-screen repricing-table scroll and ordinary context-free entry. The existing GitHub Pages workflow serves tracked output from `master`. The new paths were unavailable on the live site at review time. Check both production paths and the CV round trip after the authorised merge and deployment.

[State B](markets.md#state-b) specifies the evidence required to add an integrated structuring case. State A is the scope of this release.
