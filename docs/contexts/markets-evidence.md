# Markets evidence and claim register

Financial source checked at [financial-implementations d417418](https://github.com/LuisGCanales/financial-implementations/tree/d417418bb8f36f3b8df6d167a8aa08ee4d172556/fixed-income/yield-curves). The archived financial execution identified in the published exhibits used `bee31fd0883660f171ebe84817b98641239eae5b`. The portfolio uses the current public copies, including the approved full-range heatmap rendering. The [upstream evidence index](https://github.com/LuisGCanales/financial-implementations/blob/d417418bb8f36f3b8df6d167a8aa08ee4d172556/fixed-income/yield-curves/evidence/c03/index.json) binds the valuation, methodology/risk and replay transport manifests.

| Public claim | Source and identity | Scope |
| --- | --- | --- |
| 15 synthetic 1M–30Y MXN F-TIIE OIS quotes, trade date 2026-09-15 and effective/reference date 2026-09-18. The last final-payment pillar is 2056-09-20. | C01, C07; S03 and S05. `docs/conventions.md`, `docs/methodology.md`, `docs/assumptions_limitations.md`. | Known synthetic reference used only after the fit; single curve, projected MXMC 2026–2057, ACT/360, final payment pillars. |
| Selected natural cubic zero-rate baseline uses simultaneous nodal calibration; the sequential bootstrap is available for compatible local methods. | C05, C07; methodology, integration contract. | B02 sequential diagnostics are distinct from baseline acceptance and the simultaneous three-method study. |
| Cubic baseline reprices 15 of 15 within 0.01 bp; maximum absolute mismatch 4.3853809472693683e-11 bp. | C01; S06 and published validation policy. | Repricing independently reconstructs instruments and recalculates par rates within the codebase, separate from optimizer residuals. No vendor benchmark or observed-market validation. |
| Three simultaneous calibrations fit within 1e-10 bp. Forward recovery RMSE in source order is 3.811009931078169, 5.23459080351771 and 0.24931760566157052 bp. | C06, C08; M02/M05. | 28-day simple ACT/360 forwards, sampled weekly against a smooth synthetic reference. This does not establish a ranking for other scenarios. |
| Central ±1 bp shocks can affect forward rates beyond the input tenor. Full cubic heatmap uses ±20.04398642012309 bp/bp with zero clipping. | C11–C13; G01/H01/H04. | 15 shocks by method, three methods, 1,562 sampled forward starts. H04 uses the approved presentation bytes. The 30Y response row is present; its marker falls outside the forward-start range. |
| For the 30Y quote shock the cubic ±2Y absolute sensitivity mass is 29.0342%, versus 19.0515% log-linear and 24.1776% linear continuous zero. | C14; L01. | Normalised absolute sampled rate response, which discards sign. Locality varies by shock, method, metric and domain. It is neither monetary DV01 nor a hedge-performance measure. |
| MexDer Challenge 2026, fourth among 1,500+ registered participants. USD/MXN and S&P/BMV IPC futures across maturities. | Supplied Global Markets CV. | Simulated futures competition organised by Grupo BMV. No live desk, client execution or desk P&L inference. |
| USD/MXN and Mexican derivatives regulation are independent research projects. | Public canonical pages on portfolio base `cccb1fb3b6f75c6134afac05446068a549eff82a`. | USD/MXN empirical analysis is in development. Derivatives research has a defined institutional framework and working hypotheses; quantitative testing is pending. The private macro workspace corroborates the stage. The portfolio presents the defined research framework and its purpose. |
| DXANDI engagement delivery, scope and dates; education, finance preparation and academic options work. | Supplied Global Markets CV and consistent public portfolio facts. | International applied-research consulting, April 2024–June 2026. Options models and Greeks are coursework. Desk experience and production options capability are outside the evidence. |
| The supplied CV mentions fixed-income valuation and risk calculations. | Supplied Global Markets CV. Private development repository methodology and validation documentation reviewed. | The website names pricing and selected calculations already in the CV and identifies the project as in development. The private evidence does not support publishing a complete flagship, pricing workflow, workbook or validation results. No private artifacts or links are reproduced. |

## Published exhibit copies

Paths below are relative to upstream `evidence/c03/`. The website uses their original basenames and bytes. Exact values remain available in the CSVs. The Excel workbook is a locally generated presentation of these data.

| ID | Upstream path | SHA-256 of public copy |
| --- | --- | --- |
| S03 | `valuation/input_quotes.csv` | `bf0041e27bd82be352cadc3b9b02257368583fe5b28cdd0fa9bd74b2c11e13a4` |
| S05 | `valuation/curve_nodes.csv` | `53f4e23d682cce947d722030345a118736ca06db7d77611fa53c367b99f92972` |
| S06 | `valuation/quote_repricing.csv` | `b5419630d2d4513713fed2a173c6ad7910cdf0294e4ed742796d7fe8812a3f93` |
| M02 | `methodology/three_method_global_recovery.csv` | `5a948bca410d6653dac8ef4fd7d54673ecf2f756b61b85d385e5bc6e9ab1e8cb` |
| M05 | `methodology/forward_28d_recovery_three_methods.png` | `50b2b01fa4e45832d731a9f0eba120cdd22a7a2627cbdf9e495fe1652a13b195` |
| G01 | `global/global_sensitivity_summary.csv` | `42e571ff3c58cf3a87cbeac3573818dab1329136722d38bc88ea53b899416bb9` |
| H01 | `heatmaps/forward_sensitivity_heatmap_scale_diagnostics.csv` | `39315d80286b50ced878b07f24b44c97213a285c4b2f72d7a3d94424dbc2a307` |
| H04 | `heatmaps/forward_sensitivity_heatmap_cubic_continuous_zero_full_common_scale.png` | `d83abfd9abb197eba45c5dad8d102a2c14ff4fed063ea3464da3abab850c1a04` |
| L01 | `locality/forward_sensitivity_locality.csv` | `de59820c13e5cbcf21d36e4ad86184eb43709192c8a7c2a14c466a18918db340` |

The two scope documents, the public claim registers, the exhibits, the integration contract and the available reproduction guide define the technical reading path. Archived or withheld execution records remain outside the portfolio. The published computational replay dependencies are available upstream according to the transport manifest. This website does not rerun the financial model.

## Workbook contract

The workbook shows inputs, curve nodes, repricing, simultaneous interpolation comparisons and shock/locality metrics. It imports numbers from the selected CSVs and matches sensitivity rows by method and tenor. The overview uses three formulas for input count, saved PASS count and maximum absolute signed repricing error. The line chart uses the imported annualised zero rates and equal category spacing by tenor. The downloaded XLSX does not perform pricing, calibration or quote-shock revaluation. Review the panel showing the financial rates and the separate risk units before reusing these tables.
