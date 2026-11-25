# Markets Context Design Brief

## Audience and evaluation goal

The context serves recruiters, traders, structurers and hiring managers evaluating Luis Canales for entry-level Global Markets roles. The immediate reference is the 2027 London Global Markets off-cycle posting (Job 210802065), a pooled process covering Trading, Structuring & Origination, Systematic Trading and Digital Markets. The attached posting calls out market monitoring, trade ideas, portfolio review, research and preparation for senior colleagues. Structuring & Origination is Luis's first preference, followed by Trading and Systematic Trading. The site should be reusable across firms and should not imply a desk assignment.

The positioning is **Global Markets — FX, Rates & Derivatives**. Lead with how exposures, market conditions, product economics and risk connect. Give the reader the applied rates evidence and the matching CV immediately. Put the financial interpretation ahead of model design and source code.

## Functional baseline and hiring gaps

| Hiring question | Entry-level baseline | Evidence available | Gap to preserve |
| --- | --- | --- | --- |
| Recruiter: why Markets and why this profile? | Recognise the role of client exposures, product choice and market conditions. Communicate clearly and take responsibility within a team. | Simulated futures competition, applied rates work, ongoing FX research, quantitative consulting and relevant coursework. | Desk experience and client mandates have no supporting evidence. |
| Structurer: can he connect a client exposure to a product and defend the economics? | Translate the objective, horizon and constraints into alternatives. Compare cash flows, pricing, scenarios, sensitivities and residual risks. Understand execution, documentation and monitoring. | F-TIIE OIS conventions, par-rate calibration, repricing and forward/risk diagnostics demonstrate a component of the workflow. Derivatives and hedging fundamentals, options and structured products are supported by training. | Client discovery, structuring recommendations, hedge sizing or effectiveness, approvals and end-to-end execution remain open. |
| Trader: can he monitor conditions, reason about trade ideas and keep track of exposures? | Follow market drivers and catalysts, evaluate payoff and adverse scenarios, monitor exposures and know when to escalate. Understand liquidity and execution constraints. | Simulated USD/MXN and S&P/BMV IPC futures across maturities, and a defined macro-financial research framework for USD/MXN. | Live quoting, client enquiry handling, execution, trading P&L and a validated trade idea remain open. |
| Systematic or Digital Markets reviewer: can he use data and tools safely in a workflow? | Check inputs, document assumptions, validate changes, keep analysis reproducible and communicate exceptions. Systematic strategies require testing after costs, with credible execution assumptions. Digital solutions require understanding users and operational controls. | Independently reconstructed repricing, data and model checks in the curve implementation, plus discrepancy investigation and tool/report delivery at DXANDI. | Trading backtests, execution algorithms and client-facing digital distribution remain open. |
| Hiring manager: can he deliver work that others can review and use? | Structure an ambiguous request, verify inputs and outputs, document changes, handle feedback and communicate assumptions and limitations. | DXANDI professional delivery across approximately 20 international applied-research engagements, April 2024–June 2026. | Markets-specific controls, approvals and deadlines are learning goals. |

## State A

1. Hero with the Markets CV and the rates implementation. A compact summary explains the contribution in the language of pricing and risk.
2. Financial workflow connecting exposures and market conditions to alternatives, pricing, stress scenarios, execution support and follow-up.
3. Primary financial implementation with a real forward-recovery preview and a canonical page at `/implementations/yield-curve/`. The page provides inspectable inputs, nodes, repricing, interpretation and quote sensitivities. A compact paragraph from the approved CV describes the independent fixed-income valuation project in development.
4. Simulated futures experience and links to the canonical USD/MXN and Mexican derivatives research pages. Both research links show the current stage.
5. DXANDI professional execution, followed by financial training, contact and the Markets CV.

The rates study is a reusable Financial Implementation. For fixed-income valuation, publish the instruments and calculations already covered by the approved CV and label the project in development. The public rates implementation supplies the inspectable evidence. The canonical public USD/MXN research page governs the research stage and claims.

The curve evidence is tied to the public financial-implementations revision in the [evidence register](markets-evidence.md). The page makes the synthetic data, single-curve architecture, projected holiday calendar and validation scope visible. Supporting data and images retain provenance. The CV link already targets the intended route in both supplied versions.

## State B

Consider an end-to-end corporate rates or FX hedge case. Start from a stated exposure, decision objective and dated cash-flow schedule. Compare at least two feasible alternatives and the unhedged position on the same units and settlement assumptions. Provide reproducible pricing, adverse and favourable scenarios, residual risks and a traceable recommendation. Document liquidity and execution constraints, approval and escalation points, and how exposures and valuation would be monitored after execution. Use synthetic or specifically cleared inputs and disclose assumptions and evidence status.

A case is eligible only once the recommendation, decision materials, controls and inspectable outputs are complete and reviewed. Add it ahead of standalone rates evidence, with the curve page retained as its canonical supporting implementation where relevant. Preserve the existing URL, CV and public navigation contracts.

## Acceptance

- A recruiter can identify the function, evidence and CV on first view. A reviewer can inspect the financial chain from quotes to risk without opening code.
- The public site treats simulation, independent analysis, coursework and professional delivery according to their verified scope.
- `/markets/` is directly accessible, self-canonical, `noindex, follow`, outside the public sitemap and disconnected from other targeted profiles.
- Public content and baseline CVs retain their existing identity. Return navigation supports Markets and Investment Banking, including the query-parameter fallback when session storage is blocked.
- The published implementation has a canonical URL, readable figures and units, inspectable data, visible limits and traceable links. The workbook, if included, consumes public results.
- Build, link, evidence, PDF and responsive checks run before review. Release records distinguish the feature PR from deployment.
