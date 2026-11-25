# Global Markets State A release validation

Prepared on 23 November 2026 and updated after the production review on 24 November 2026 (Mexico City).

## Review scope

- `/markets/` uses the existing portfolio design system, a Markets-specific CV, and a real curve-recovery preview. It is self-canonical and marked `noindex, follow`. The context is excluded from the public sitemap.
- `/implementations/yield-curve/` is discoverable through the sitemap and presents the rates figures and financial interpretation, all 15 cubic repricing rows, downloadable evidence and a six-sheet workbook.
- Content highlights applied curves, fixed-income pricing in development, simulated futures experience, ongoing independent research, professional consulting delivery and coursework. Source and publication boundaries are in the [claim register](markets-evidence.md).
- The supplied PDF was copied byte for byte. Its existing portfolio annotation and the attached DOCX hyperlink target `https://luisgcanales.github.io/markets/`. Approved PDF SHA-256 is `33cb3e00b45d1ecf385254a83ba11bb5140fe8c1ec0d115296dff68fb5752855`.

## Pre-merge validation

| Check | Result |
| --- | --- |
| Branch and mergeability | On 24 November, `master` at `cccb1fb` was an ancestor of PR #4 head `99dca7b`. A local merge simulation produced the reviewed PR tree without conflicts. The build reproduced tracked output with a clean worktree. |
| Site generation | `npm run build` passed, generating 10 files. |
| Context automation | `npm run check:markets` and `npm run check:investment-banking` passed. Tests exercise the generated allowlist, blocked storage, a cross-page fragment, switching context and context-free visits. |
| Local routes, IDs and files | 8 HTML files and 41 unique local destinations or fragments checked. Ten pinned upstream destinations checked against the source checkout. |
| Portfolio regression | All six existing HTML main blocks are byte-identical to the base of the branch. The two previously published CVs are unchanged. |
| Financial evidence | Nine published files match the upstream bytes and documented SHA-256 hashes. Source joins, method RMSEs, repricing PASS counts and quote-shock coverage checked. Both exhibit images were visually inspected against captions. |
| Excel | Six sheets rendered. The exported workbook was reopened and checked for data sizes, numeric control totals, cached formula results, absence of error cells and the embedded rate chart. |
| CV | The one-page PDF was rendered and visually reviewed. Its portfolio annotation and the source DOCX hyperlink were confirmed. |
| Responsive browser review | The pre-merge review covered responsive rules and accessibility markup. The local preview was unavailable. Rendered visual checks were performed after deployment, as recorded below. |


## Production validation

[PR #4](https://github.com/LuisGCanales/LuisGCanales.github.io/pull/4) was squash-merged into `master` at `cbf63611f44a54f4557dd3ca63e040c880d0189d`. The [GitHub Pages deployment for that commit](https://github.com/LuisGCanales/LuisGCanales.github.io/actions/runs/45537817951) completed successfully on 24 November 2026 (Mexico City).

- [Global Markets](https://luisgcanales.github.io/markets/)
- [MXN Interest-Rate Curve Construction](https://luisgcanales.github.io/implementations/yield-curve/)

| Check | Result |
| --- | --- |
| Live routes and deployment | Both canonical URLs returned HTTP 200 and matched the approved generated HTML byte for byte. Checked all eight HTML pages and 18 asset URLs across the site. Markets retained its canonical and `noindex, follow` metadata. |
| Visual review | Opened both pages in Chromium at effective viewport widths of 1,348 CSS px (desktop), 770 CSS px (tablet layout) and 337 CSS px (narrow mobile layout). Browser zoom was used for the narrower widths. Reviewed the opening hierarchy, navigation, action buttons, figures and tables. Page-level scroll width matched the viewport at each tested width. The figures use small labels inline on narrow screens and link to original-size images. |
| Responsive interactions | At 770 CSS px, the Markets menu opened, navigated to Work and closed. At 337 CSS px, the repricing disclosure opened to all 15 results and its table scrolled horizontally with the arrow keys inside its own container. |
| Workbook and sources | The production “Download Excel workbook” link triggered a browser download. The served file matched the PR asset and reopened with six sheets and the expected repricing controls (15 instruments, 15 PASS, maximum absolute error of 4.3853809472693683e-11 bp). All ten pinned GitHub source links returned HTTP 200. |
| CV | The production Markets CV opened from navigation. The downloaded PDF matched the approved asset, and its embedded portfolio URL points to the live Markets page. |
| Contextual navigation | Verified Markets → curve study → Markets and Markets → public portfolio → Work → USD/MXN → Markets in the same tab. A fresh direct visit to the homepage or curve implementation hid the contextual return bar. |
| Portfolio and Investment Banking | The six existing main content blocks and two existing CVs matched the pre-merge live baseline byte for byte. The Investment Banking profile opened with its own CV link, and its journey to the public portfolio showed only the Investment Banking return link and led back to that profile. |

[State B](markets.md#state-b) specifies the evidence required to add an integrated structuring case. This release covers State A.
