# Investment Banking Context Design Brief

Status: State A — approved evidence, no published flagship. Initial release: 20 October 2026.

## Purpose and audience

Provide a reusable, English-language evaluation context for Investment Banking internships and entry-level analyst opportunities at `/investment-banking/`. Answer: why does this background merit an interview for corporate finance, client advisory, M&A and capital-markets work? This is a function-specific entry point, never an employer-branded identity or claim of previous banking employment.

The supplied Master Professional Evidence Architecture v0.1 governs the design; its version is unchanged. The supplied independent hiring assessment informs communication priorities, not claims of selection, competence or endorsement.

## Questions and attention hierarchy

- 5–10 seconds: Investment Banking direction; 2+ years of professional analytical consulting; approximately 20 international engagements; financial preparation; direct IB CV.
- 20–40 seconds: DXANDI ownership and actual deliverables; accounting coursework and corporate finance foundation; understandable evidence and its status.
- 1–3 minutes: transfer to research, analytical quality and client materials; realistic workflow and routine execution; contribution while learning institutional standards.
- Deeper review: canonical USD/MXN research and approved CV. Understanding the profile must not require GitHub.

## Functional baseline and evidence boundary

The entry-level baseline includes company/industry research; financial statements, accounting links and cash flow; capital structure; projections; DCF, comparables and enterprise-to-equity reconciliation; scenarios; accurate Excel work; consistent presentations; source tracking; revisions, deadlines and coordination under review. These are design and interview criteria, **not a list of competencies already proven by this page**.

Demonstrated through the candidate's approved professional documents: methodology/modeling/validation ownership, discrepancy investigation, stakeholder communication and delivery. Academic preparation covers financial statements/ratios, corporate finance fundamentals and capital markets. Quantitative methods and instrument valuation complement this foundation.

Still unproven: completed integrated three-statement corporate modeling, corporate DCF/comparables, a transaction case, banking pitchbooks, live M&A execution and institutional performance under transaction deadlines. Neither FX research, instrument pricing nor simulated trading closes those gaps.

## Evidence inventory and source precedence

| Item | Approved source and status | Public use |
| --- | --- | --- |
| DXANDI, Quantitative Research Consultant, Apr 2024–Jun 2026; approximately 20 international engagements | Supplied IB CV and cover letter; candidate-declared professional experience | Hero and early execution narrative; no invented client names, finance mandates or results |
| Reports, presentations, practical analytical tools, methodology and validation | Same documents | Concrete deliverable types; no confidential client materials |
| Financial statements and ratios; corporate finance fundamentals | Approved CV; prior accounting coursework and financial preparation | Explicitly training/coursework, not transaction experience |
| B.Sc. Mathematics, UNAM; expected May 2027; full-time availability | Approved CV | Degree in progress; availability as declared, no eligibility certification |
| USD/MXN Macro-Financial Decision Framework | Current canonical page `/work/usdmxn/`; design complete, empirical analysis in development | Decision-support research relevant to scenarios and cross-border uncertainty; no validated forecasting or advisory claim |
| Carbon Oh-No!, 2020–2022 | Approved CV; quantitative lead in nine-person proof-of-concept team | Compact evidence of interdisciplinary implementation planning; no issued credits or financing claim |
| MexDer Challenge, fourth place | Approved CV; simulated futures competition | CV only in this release; secondary markets material would dilute the page |
| Curve/options implementations and regulation research | Not selected for this release | No borrowed claims of corporate valuation; no additional technical-project audit needed for absent links |
| Future corporate valuation flagship | Hypothetical; absent from current evidence | Internal contract only, no public section, route, output or promise |

Repository and current published materials govern technical state and research maturity. Approved CV/letter govern biographical wording. Narrower wording prevails where sources differ. The assessment describes an older CV hierarchy; the actual supplied CV already foregrounds professional experience and is authoritative. Approximately 10–12 journal submissions are omitted for brevity; never describe these as publications.

## Voice and State A structure

Use direct first-person professional English, precise evidence categories and restrained claims. Lead with useful analytical execution and sustained finance preparation. Avoid mathematical spectacle, defensive apologies, vacancy keywords and generic skill inventories.

1. Hero: Investment Banking; contribution; consulting scope; IB CV and execution CTA; compact preparation/education facts.
2. Professional execution: stakeholder question → method and validation → usable deliverables; explain transfer without inventing transactions.
3. Financial preparation: accounting/coursework, corporate finance, markets/instrument valuation; education and availability.
4. Selected work: canonical USD/MXN research, current status and relevance; compact climate-finance proof of concept.
5. Understanding the function: client objective, financial analysis, valuation/alternatives, feasibility/diligence/coordination, materials and execution support. Explicitly personal understanding, not employment history; include repetitive work and review.
6. Analytical approach: Frame / Structure / Test / Translate, compact editorial sequence rather than another large process diagram.
7. Direction/about and contact: reliable contribution while learning institutional judgment; long-term IB interest; IB CV, LinkedIn, email and broader portfolio.

## Navigation and CV contract

Home and wordmark return to `/investment-banking/`; Work and About use real anchors. CV always points to `/assets/docs/Luis_Canales_Investment_Banking_CV.pdf`, an unchanged copy of the supplied `Morgan_Stanley_Investment_Banking_CV.pdf`. The general portfolio CV remains unchanged. The cover letter and independent assessment are not uploaded to the public repository.

Explore Full Portfolio uses `/?from=investment-banking`; canonical research links use the same origin parameter. Public pages retain their identity and navigation. A discreet return link is enabled only for an allowlisted context, persisted in `sessionStorage.entryContext`. No localStorage, tracking or permanent preference. With storage unavailable, carry the allowlisted origin parameter through public HTML links. With JavaScript disabled, explicit contextual entry links still open and the browser Back action remains available; the session return bar requires JavaScript. Unknown context values cannot create a URL or label.

## Visual, accessibility and production contract

Reuse the existing dark palette, serif display type, copper accents, portrait without filters, thin rules and shared responsive components. Scope new presentation rules to the IB page except the return bar. No stock images, speculative charts or public career selector.

Use semantic landmarks, one H1, ordered headings, labeled navigation, real links, keyboard focus, meaningful image alt text and usable mobile targets. Check 1440px desktop, 768px tablet and 390px mobile rendering, plus narrow-width overflow. Honor reduced-motion preferences in the context. Metadata: descriptive title/description, canonical `https://luisgcanales.github.io/investment-banking/`, `noindex, follow`; omit the context from the public sitemap. This is public access, not access control.

Use the canonical generator and shared assets; commit both source and generated HTML. Do not change existing research copy, portrait settings or the general CV. Use a feature branch and PR, respect checks and verify the deployed page before claiming publication.

## State B: future flagship integration contract

State A is a complete page with `flagship: null` in `scripts/contexts/investment-banking.mjs`. No placeholder, hidden speculative route or disabled CTA is emitted. State B requires a **separate explicit implementation request** and completed, reviewed evidence.

Proposed route: `/investment-banking/corporate-valuation-case/`. It is not generated in State A. A future implementation must build that route through `scripts/build.mjs`, then supply a verified flagship object with `status: 'verified'`, `title`, `summary`, `href` and `ctaLabel`. The renderer rejects incomplete/unverified configurations; the build rejects an absent local destination. Do not use this toggle as a substitute for evidence review.

Before enabling: inspect company/industry research, reconciled historicals, integrated projections, DCF/comparables and EV bridge as actually completed; sources, assumptions, dates/currencies, inspectable workbook/model, checks, sensitivities, memo/presentation and limitations. Any transaction scenario is explicitly hypothetical, with no institutional sponsorship or live mandate implied. Describe only completed scope; a narrower finished case can be considered on its merits under a revised brief.

When enabled, the case CTA becomes primary and a featured case section follows the hero. The CV stays prominent and can be updated independently. DXANDI remains early professional evidence. Compress secondary research/project material (the renderer reduces it to a canonical research link), shorten method/workflow prose if needed, and avoid counting one artifact twice. Keep the canonical context URL, voice, contact details and public portfolio identity stable.

Future implementation must read this brief, `scripts/contexts/investment-banking.mjs` (content, configuration, rendering), `scripts/build.mjs` (layout, metadata, routing, destination validation), `assets/css/styles.css` (scoped styles), `assets/js/main.js` (session navigation), and the current IB CV asset. Review new flagship evidence before edits.

## Acceptance criteria

- Correct direct route and approved PDF; no placeholder/fabricated financial outputs, institutional experience or research findings.
- DXANDI and financial foundation visible early; coherent argument without external clicks.
- Contextual navigation, public exploration, session return, valid links and assets; ordinary public entry unchanged.
- Desktop/tablet/mobile visual inspection and mobile menu check; no clipping or overlap; keyboard/focus and contrast review.
- Successful normal build and relevant structural/behavior checks; generated output reproducible; public research content and general CV unchanged.
- Review diff, feature branch commit and PR; merge only if permitted; confirm deployment and actual production behavior.

Record actual validation and any remaining limitation in `docs/contexts/investment-banking-release.md`.
