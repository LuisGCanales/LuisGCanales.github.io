import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const siteUrl = 'https://luisgcanales.github.io';
const linkedin = 'https://www.linkedin.com/in/luiscanalesmx/';
const github = 'https://github.com/luisgcanales';
const email = 'luis.canales.oc@gmail.com';
const cv = '/assets/docs/Luis_Canales_Portfolio_CV.pdf';

const projects = [
  {
    number: '01',
    title: 'USD/MXN Macro-Financial Decision Framework',
    href: '/work/usdmxn/',
    description:
      'A structured framework for evaluating how global conditions, relative monetary incentives, and Mexico-specific information relate to USD/MXN—designed for market interpretation, risk assessment, and scenario analysis.',
    tags: ['Markets', 'FX', 'Macro-Finance'],
    status: 'Analysis in development',
  },
  {
    number: '02',
    title: 'Mexican Derivatives Market &amp; Regulation',
    href: '/work/mexican-derivatives-regulation/',
    description:
      'An institutional and market-structure study of how regulation, infrastructure, participant constraints, and offshore competition interact with the development of Mexico’s derivatives market.',
    tags: ['Derivatives', 'Regulation', 'Market Structure'],
    status: 'Research framework defined',
  },
];

function head({ title, description, path, image }) {
  const canonical = `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${image}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="Luis Canales">
  <meta name="theme-color" content="#f7f5ef">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Luis Canales — Financial Markets Portfolio">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luis Canales',
    url: siteUrl,
    email: `mailto:${email}`,
    sameAs: [linkedin, github],
    jobTitle: 'Financial Markets and Quantitative Analysis Professional',
  })}</script>
</head>`;
}

function header(active = '') {
  const current = (key) => (active === key ? ' aria-current="page"' : '');
  return `<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell nav-wrap">
      <a class="wordmark" href="/" aria-label="Luis Canales home">
        <span class="wordmark-mark" aria-hidden="true">LC</span>
        <span>Luis Canales</span>
      </a>
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-menu">Menu</button>
      <nav class="site-nav" id="site-menu" data-nav-menu data-open="false" aria-label="Primary navigation">
        <a href="/"${current('home')}>Home</a>
        <a href="/work/"${current('work')}>Work</a>
        <a href="/about/"${current('about')}>About</a>
        <a class="nav-cv" href="${cv}" target="_blank" rel="noopener">Portfolio CV</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <div>
          <p class="footer-name">Luis Canales</p>
          <p class="footer-copy">Financial markets, quantitative analysis, risk, market structure, and decision support.</p>
        </div>
        <nav class="footer-links" aria-label="Contact links">
          <a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${github}" target="_blank" rel="noopener">GitHub</a>
          <a href="mailto:${email}">Email</a>
          <a href="${cv}" target="_blank" rel="noopener">Portfolio CV</a>
        </nav>
      </div>
      <div class="footer-meta">Independent research portfolio · Mexico City</div>
    </div>
  </footer>
  <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

function layout(meta, active, body) {
  return `${head(meta)}${header(active)}<main id="main">${body}</main>${footer()}`;
}

function tags(items) {
  return `<div class="tags">${items.map((item) => `<span class="tag">${item}</span>`).join('')}</div>`;
}

function projectCards() {
  return `<div class="project-list">
    ${projects
      .map(
        (project) => `<a class="project-card" href="${project.href}">
      <span class="project-number">${project.number}</span>
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-meta">
        ${tags(project.tags)}
        <span class="status">${project.status}</span>
      </div>
    </a>`,
      )
      .join('')}
  </div>`;
}

const home = layout(
  {
    title: 'Luis Canales — Financial Markets, Quantitative Analysis &amp; Strategy',
    description:
      'Independent research and analytical work focused on financial markets, derivatives, risk, and market structure.',
    path: '/',
    image: '/assets/images/og-home.jpg',
  },
  'home',
  `<section class="hero">
    <div class="shell hero-grid">
      <div>
        <p class="eyebrow">Independent research portfolio</p>
        <h1>Luis<br>Canales</h1>
        <p class="positioning">Financial Markets · Quantitative Analysis · Strategy</p>
        <p class="hero-summary">I work at the intersection of financial markets, quantitative analysis, risk, and market structure—translating complex problems into decision-relevant insights.</p>
        <div class="hero-actions">
          <a class="button" href="#selected-work">View selected work</a>
          <a class="button button-secondary" href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a class="button button-secondary" href="${cv}" target="_blank" rel="noopener">Portfolio CV</a>
        </div>
      </div>
      <aside class="hero-folio" aria-label="Analytical approach">
        <p class="kicker">Analytical sequence</p>
        <div class="folio-row"><strong>01</strong><span>Frame the financial question</span></div>
        <div class="folio-row"><strong>02</strong><span>Structure uncertainty and evidence</span></div>
        <div class="folio-row"><strong>03</strong><span>Translate analysis into implications</span></div>
      </aside>
    </div>
  </section>
  <section class="section" id="selected-work">
    <div class="shell">
      <div class="section-head">
        <div>
          <p class="section-index">01 / Selected work</p>
          <h2>Questions worth structuring.</h2>
        </div>
        <p>Current work examines how macro-financial forces shape USD/MXN and how institutional design influences Mexico’s derivatives market. Both projects are active research frameworks with evidence standards defined before public findings are claimed.</p>
      </div>
      ${projectCards()}
    </div>
  </section>`,
);

const work = layout(
  {
    title: 'Selected Work — Luis Canales',
    description:
      'Independent research on USD/MXN, derivatives, risk, regulation, and financial market structure.',
    path: '/work/',
    image: '/assets/images/og-home.jpg',
  },
  'work',
  `<section class="page-hero">
    <div class="shell">
      <p class="eyebrow">Selected work</p>
      <h1>Financial questions, structured for decisions.</h1>
      <p class="page-intro">Research organized around the question, its institutional relevance, the strength of the available evidence, and the limits of what can responsibly be concluded.</p>
    </div>
  </section>
  <section class="section">
    <div class="shell">${projectCards()}</div>
  </section>`,
);

const about = layout(
  {
    title: 'About — Luis Canales',
    description:
      'Quantitative background applied to financial markets, derivatives, risk, market structure, and strategy.',
    path: '/about/',
    image: '/assets/images/og-home.jpg',
  },
  'about',
  `<section class="page-hero">
    <div class="shell">
      <p class="eyebrow">About</p>
      <h1>Quantitative rigor in service of financial judgment.</h1>
    </div>
  </section>
  <section class="section">
    <div class="shell about-grid">
      <div class="about-copy">
        <p>I am a quantitative professional focused on financial markets. My background combines mathematics, statistics, and programming with applied experience in quantitative methodology, modeling, validation, and multidisciplinary research.</p>
        <p>My current work concentrates on derivatives, market risk, macro-financial analysis, and market structure. I use technical tools to clarify financial questions, test evidence, make uncertainty explicit, and produce conclusions that are useful to decision-makers.</p>
        <p>This portfolio is the public research layer of that work: concise enough for an executive reader, with methodological depth available when the question requires it.</p>
        <div class="inline-actions">
          <a class="button" href="${cv}" target="_blank" rel="noopener">View portfolio CV</a>
          <a class="button button-secondary" href="mailto:${email}">Contact</a>
        </div>
      </div>
      <aside class="fact-list" aria-label="Selected background">
        <div class="fact-row"><span>Current focus</span><strong>Markets · Derivatives · Risk · Market Structure</strong></div>
        <div class="fact-row"><span>Research orientation</span><strong>Decision support with explicit evidence boundaries</strong></div>
        <div class="fact-row"><span>Selected markets activity</span><strong>4th place · MexDer Challenge 2026</strong></div>
        <div class="fact-row"><span>Education</span><strong>B.Sc. Mathematics · UNAM · Expected May 2027</strong></div>
        <div class="fact-row"><span>Location</span><strong>Mexico City</strong></div>
      </aside>
    </div>
  </section>
  <section class="section">
    <div class="shell">
      <div class="section-head">
        <div><p class="section-index">Approach</p><h2>How I structure problems.</h2></div>
        <p>The common thread across projects is not a single model. It is a disciplined sequence for moving from ambiguity to a decision-relevant analytical frame.</p>
      </div>
      <div class="cards-grid">
        <article class="info-card"><p class="card-label">01 · Frame</p><h3>Identify the real financial question</h3><p>Clarify the objective, decision, horizon, constraints, and what a useful answer would actually change.</p></article>
        <article class="info-card"><p class="card-label">02 · Structure</p><h3>Separate evidence from assumptions</h3><p>Organize drivers, competing explanations, uncertainty, and the standards required for stronger claims.</p></article>
        <article class="info-card"><p class="card-label">03 · Test</p><h3>Use the appropriate analytical layer</h3><p>Match data, transformations, models, and institutional context to the question rather than forcing one method across horizons.</p></article>
        <article class="info-card"><p class="card-label">04 · Translate</p><h3>Connect results to implications</h3><p>Communicate what the evidence supports, what remains unresolved, and how the framework can improve judgment.</p></article>
      </div>
    </div>
  </section>`,
);

const usdmxn = layout(
  {
    title: 'USD/MXN Macro-Financial Decision Framework — Luis Canales',
    description:
      'A research framework for separating global, relative monetary, and Mexico-specific information in USD/MXN analysis.',
    path: '/work/usdmxn/',
    image: '/assets/images/og-usdmxn.jpg',
  },
  'work',
  `<section class="project-hero">
    <div class="shell project-hero-grid">
      <div>
        <p class="eyebrow">Markets · FX · Macro-Finance</p>
        <h1>USD/MXN Macro-Financial Decision Framework</h1>
        <p class="project-deck">Separating global market forces, relative monetary conditions, Mexico-specific information, and residual FX risk to support more disciplined institutional judgment.</p>
      </div>
      <div class="project-side">
        <span class="status">Research design complete</span>
        <dl>
          <div><dt>Stage</dt><dd>Analysis in development</dd></div>
          <div><dt>Primary role</dt><dd>Decision support, not a trading signal</dd></div>
          <div><dt>Analytical horizons</dt><dd>Short run · Regimes · Medium run</dd></div>
        </dl>
      </div>
    </div>
  </section>
  <div class="project-note">
    <div class="shell"><strong>Current public scope</strong><p>The research question, analytical architecture, decision-support framework, and data methodology are defined. Empirical findings will be added only after the analysis has been rebuilt and validated under the current research design.</p></div>
  </div>
  <div class="article-shell">
    <section class="content-section">
      <div><p class="section-index">01</p><h2>The question</h2></div>
      <div><p class="lead-question">Within a pre-specified set of economically plausible factors, how can global market conditions, relative monetary incentives, and Mexico-specific information help characterize USD/MXN—and when does the peso materially depart from those broader relationships?</p></div>
    </section>
    <section class="content-section">
      <div><p class="section-index">02</p><h2>Why it matters</h2></div>
      <div>
        <p>The same USD/MXN move can imply very different things depending on whether it reflects broad dollar strength, global risk conditions, relative rates, or information specific to Mexico.</p>
        <p>Distinguishing those channels can improve market interpretation, FX scenario design, exposure monitoring, and the context surrounding structuring, portfolio, risk, treasury, or corporate decisions. The objective is to organize the information set—not to force the exchange rate into a single narrative.</p>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">03</p><h2>Decision framework</h2></div>
      <div>
        <div class="framework" role="img" aria-label="USD/MXN analytical architecture">
          <div class="framework-flow">
            <div class="flow-stack">
              <div class="flow-node">Global market factors</div>
              <div class="flow-node">Comparable currencies</div>
            </div>
            <div class="flow-arrow" aria-hidden="true">→</div>
            <div class="flow-node primary">Synthetic MXN benchmark</div>
            <div class="flow-arrow" aria-hidden="true">→</div>
            <div class="flow-stack">
              <div class="flow-node accent">Observed vs benchmark</div>
              <div class="flow-node">Residual for further analysis</div>
            </div>
          </div>
          <p class="framework-caption">The residual is movement not captured by the current benchmark—not automatically a Mexico-specific causal shock.</p>
        </div>
        <div class="cards-grid space-top">
          <article class="info-card"><p class="card-label">Market dependence</p><p>Map contemporaneous, lagged, and changing relationships across market factors.</p></article>
          <article class="info-card"><p class="card-label">Incremental factors</p><p>Test whether relative-rate and Mexico-specific blocks add information beyond the global benchmark.</p></article>
          <article class="info-card"><p class="card-label">Event layer</p><p>Examine abnormal behavior around pre-defined events while controlling retrospective narrative bias.</p></article>
          <article class="info-card"><p class="card-label">Medium-term context</p><p>Assess whether levels remain broadly consistent with selected macro-financial relationships.</p></article>
        </div>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">04</p><h2>Information set</h2></div>
      <div class="cards-grid">
        <article class="info-card"><p class="card-label">Global</p><h3>Common financial conditions</h3><p>Broad dollar conditions, equity risk, volatility, Treasury yields, commodities, and comparable currencies.</p></article>
        <article class="info-card"><p class="card-label">Relative</p><h3>Mexico–U.S. incentives</h3><p>Policy-rate differentials, expected paths, real-rate measures, curve conditions, and carry proxies.</p></article>
        <article class="info-card"><p class="card-label">Mexico-specific</p><h3>Domestic information</h3><p>Sovereign risk, positioning, flows, trade, fiscal conditions, activity, and institutional developments.</p></article>
        <article class="info-card"><p class="card-label">Events</p><h3>Discrete information</h3><p>Monetary, macroeconomic, trade, fiscal, credit, and institutional events with documented timing.</p></article>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">05</p><h2>Questions under investigation</h2></div>
      <ul class="question-list">
        <li>How much of USD/MXN movement is common to broader global conditions?</li>
        <li>When does MXN materially depart from a global and peer-currency benchmark?</li>
        <li>Do relative monetary conditions add information beyond global factors?</li>
        <li>Do Mexico-specific factors add incremental and out-of-sample information?</li>
        <li>Does MXN sensitivity change across risk, carry, volatility, or dollar regimes?</li>
        <li>Are observed levels consistent with medium-term macro-financial relationships?</li>
      </ul>
    </section>
    <section class="content-section">
      <div><p class="section-index">06</p><h2>Decision relevance</h2></div>
      <div class="cards-grid">
        <article class="info-card"><p class="card-label">Markets &amp; research</p><p>Structure move attribution, factor sensitivity, regime monitoring, and the interpretation of dislocations.</p></article>
        <article class="info-card"><p class="card-label">Structuring &amp; treasury</p><p>Improve the context used to define scenarios, discuss hedges, and evaluate FX-linked exposures.</p></article>
        <article class="info-card"><p class="card-label">Risk &amp; portfolios</p><p>Map factor exposure, stress combinations, correlation breakdown, and residual risk.</p></article>
        <article class="info-card"><p class="card-label">Corporate banking</p><p>Connect plausible FX scenarios with debt service, liquidity, imported inputs, exports, and hedge discussions.</p></article>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">07</p><h2>Current analytical approach</h2></div>
      <div>
        <p>Variables are selected using economic rationale before the principal analysis. The data design treats temporal alignment as part of the methodology: market returns are calculated over common intervals, policy rates are treated as state variables, and low-frequency macro data are not converted into artificial daily observations.</p>
        <p>The planned model hierarchy combines a parsimonious baseline with robustness specifications, expanding-window out-of-sample evaluation, nested factor blocks, regime analysis, structured event research, and a separate lower-frequency equilibrium layer.</p>
        <div class="principle-box"><strong>Evidence boundary</strong><p>Association, incremental explanatory information, predictive performance, equilibrium relationships, and causal effects are treated as different forms of evidence. Causal language is reserved for modules with a defensible identification strategy.</p></div>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">08</p><h2>Current development</h2></div>
      <div>
        <ul class="clean-list">
          <li>Research questions, scope, factor taxonomy, and inferential hierarchy defined.</li>
          <li>Decision-support architecture and institutional use cases structured.</li>
          <li>Calendar-aware alignment and variable-transformation rules specified.</li>
          <li>Initial data universe and future factor families documented.</li>
          <li>Reusable data, transformation, visualization, and repository infrastructure established.</li>
        </ul>
        <p class="space-top-lg">An earlier exploration helped originate the project and build part of that infrastructure, but it preceded the current methodology. Its statistics are therefore not presented as findings.</p>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">09</p><h2>Limitations</h2></div>
      <div>
        <p>The framework is intended for empirical decision support rather than deterministic forecasting. Results will remain conditional on the selected variables, transformations, sample, and model specification.</p>
        <p>Unexplained movement may reflect omitted variables, positioning, liquidity, market microstructure, asynchronous observations, private information, measurement error, or irreducible noise. A benchmark residual will not be converted automatically into a causal narrative.</p>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">10</p><h2>Next milestone</h2></div>
      <ol class="number-list">
        <li>Complete and validate the calendar-aware data layer.</li>
        <li>Rebuild dependence analysis under the current design.</li>
        <li>Implement and evaluate the out-of-sample Synthetic MXN Benchmark.</li>
        <li>Test the first incremental factor block and its stability.</li>
        <li>Produce reproducible figures directly from the current pipeline.</li>
        <li>Review every public claim against the resulting evidence.</li>
      </ol>
    </section>
  </div>`,
);

const derivatives = layout(
  {
    title: 'Mexican Derivatives Market &amp; Regulation — Luis Canales',
    description:
      'A research framework examining how regulation, infrastructure, and institutional incentives shape Mexico’s derivatives market.',
    path: '/work/mexican-derivatives-regulation/',
    image: '/assets/images/og-derivatives.jpg',
  },
  'work',
  `<section class="project-hero">
    <div class="shell project-hero-grid">
      <div>
        <p class="eyebrow">Derivatives · Regulation · Market Structure</p>
        <h1>Mexican Derivatives Market &amp; Regulation</h1>
        <p class="project-deck">Examining how regulation, institutional structure, market infrastructure, participant incentives, and offshore competition interact with the depth and localization of Mexico’s derivatives market.</p>
      </div>
      <div class="project-side">
        <span class="status">Research framework defined</span>
        <dl>
          <div><dt>Stage</dt><dd>Investigation in development</dd></div>
          <div><dt>Current output</dt><dd>Institutional and empirical research architecture</dd></div>
          <div><dt>Evidence status</dt><dd>Working hypotheses—not findings</dd></div>
        </dl>
      </div>
    </div>
  </section>
  <div class="project-note">
    <div class="shell"><strong>Current public scope</strong><p>The question, institutional scope, international comparison set, working hypotheses, and proposed empirical framework are defined. Quantitative testing and evidence validation are the next stages.</p></div>
  </div>
  <div class="article-shell">
    <section class="content-section">
      <div><p class="section-index">01</p><h2>The question</h2></div>
      <div><p class="lead-question">To what extent do Mexico’s regulatory and institutional arrangements influence derivatives-market depth, liquidity, and local participation—relative to scale, infrastructure, investor composition, and offshore competition?</p></div>
    </section>
    <section class="content-section">
      <div><p class="section-index">02</p><h2>Why it matters</h2></div>
      <div>
        <p>Mexico combines a globally significant underlying—particularly through the Mexican peso—with a comparatively limited domestic derivatives-market footprint. A large share of MXN-related FX activity takes place outside Mexico.</p>
        <p>The relevant question is not whether the market is simply “overregulated” or “underregulated.” It is how prudential safeguards, access, compliance costs, collateral, institutional demand, infrastructure, standardization, and cross-border interoperability interact.</p>
        <p>Those conditions can affect where risk is transferred, how hedges are implemented, which counterparties participate, which products become liquid, and where price discovery occurs.</p>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">03</p><h2>Mexican market context</h2></div>
      <div>
        <div class="principle-box"><strong>Institutional problem</strong><p>How can a derivatives ecosystem preserve resilience and prudent risk management while supporting sufficient participation, liquidity, infrastructure, and economic incentives to deepen locally?</p></div>
        <ul class="clean-list space-top">
          <li>Mexico has a multi-layer framework involving several authorities and participant-specific prudential regimes.</li>
          <li>The architecture includes central clearing for certain standardized transactions, reporting and risk-mitigation mechanisms, and margin rules for relevant OTC activity.</li>
          <li>Recognized foreign CCPs make cross-border interoperability part of the domestic market-structure question.</li>
          <li>Documented market and institutional conditions motivate the research; they do not establish what causes observed market depth.</li>
        </ul>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">04</p><h2>Market ecosystem</h2></div>
      <div class="ecosystem" role="img" aria-label="Mexican derivatives market ecosystem">
        <article class="ecosystem-card"><span>Regulatory authorities</span><p>Banco de México · CNBV · CONSAR · CNSF</p></article>
        <article class="ecosystem-card"><span>Intermediaries &amp; users</span><p>Banks · Dealers · Pension entities · Insurers · Funds · Corporates</p></article>
        <article class="ecosystem-card"><span>Trading &amp; post-trade</span><p>MexDer · Asigna · OTC infrastructure · Recognized foreign CCPs</p></article>
        <article class="ecosystem-card"><span>International markets</span><p>Offshore dealers · Global liquidity · Cross-border clearing · Foreign regulators</p></article>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">05</p><h2>Research framework</h2></div>
      <div class="cards-grid">
        <article class="info-card"><p class="card-label">Regulation</p><p>Map authority, participant, product, obligation, clearing, margin, reporting, and prudential limits.</p></article>
        <article class="info-card"><p class="card-label">Market structure</p><p>Study listed versus OTC, onshore versus offshore, product concentration, and accessibility.</p></article>
        <article class="info-card"><p class="card-label">Participant incentives</p><p>Separate permissions, constraints, operational burden, collateral, and economic motives by institution type.</p></article>
        <article class="info-card"><p class="card-label">Infrastructure</p><p>Examine trading, reporting, clearing, data visibility, standardization, and post-trade architecture.</p></article>
        <article class="info-card"><p class="card-label">Comparison</p><p>Use international cases to isolate mechanisms rather than create a generic ranking.</p></article>
        <article class="info-card"><p class="card-label">Empirical evaluation</p><p>Translate the institutional map into measurable indicators, explicit tests, and scenario analysis.</p></article>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">06</p><h2>Working hypotheses</h2></div>
      <div>
        <div class="callout"><strong>Not findings</strong><p>Each proposition below is an analytical starting point that may be supported, modified, or rejected as evidence is assembled.</p></div>
        <div class="cards-grid space-top">
          <article class="info-card"><p class="card-label">Complexity</p><p>Multi-layer requirements may create fixed compliance and operational costs that affect some participants disproportionately.</p></article>
          <article class="info-card"><p class="card-label">Institutional demand</p><p>Participant-specific restrictions may influence the breadth or recurrence of domestic buy-side derivatives activity.</p></article>
          <article class="info-card"><p class="card-label">Offshore equilibrium</p><p>Global network effects, client concentration, liquidity, infrastructure, and regulatory differences may jointly shape offshore activity.</p></article>
          <article class="info-card"><p class="card-label">Infrastructure &amp; information</p><p>Integrated post-trade infrastructure and greater data visibility may reduce operational and informational frictions.</p></article>
          <article class="info-card"><p class="card-label">Standardization</p><p>Concentrating activity in viable contracts and maturities may support liquidity more than a broad but thin product set.</p></article>
          <article class="info-card"><p class="card-label">Interoperability</p><p>Cross-border access may lower some frictions while introducing concentration and resilience trade-offs.</p></article>
        </div>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">07</p><h2>Evidence being examined</h2></div>
      <div class="cards-grid">
        <article class="info-card"><p class="card-label">Regulatory</p><p>Rules, circulars, participant-specific prudential frameworks, approvals, and documented obligations.</p></article>
        <article class="info-card"><p class="card-label">Market</p><p>Volume, open interest, spreads, product and maturity concentration, and onshore/offshore activity.</p></article>
        <article class="info-card"><p class="card-label">Institutional</p><p>Permissions, risk limits, clearing architecture, collateral, operational burden, and participant incentives.</p></article>
        <article class="info-card"><p class="card-label">Primary &amp; comparative</p><p>International cases and future interviews with dealers, investors, infrastructure professionals, and hedgers.</p></article>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">08</p><h2>International reference cases</h2></div>
      <div>
        <table class="comparison-table">
          <tbody>
            <tr><th scope="row">Brazil</th><td>Infrastructure integration, OTC registration, standardized data, and domestic derivatives-market scale.</td></tr>
            <tr><th scope="row">United States</th><td>How extensive regulation can coexist with deep markets when clearing, data, and institutional infrastructure are developed.</td></tr>
            <tr><th scope="row">European Union</th><td>Cross-border clearing, transparency, risk mitigation, and resilience concerns around third-country CCP concentration.</td></tr>
            <tr><th scope="row">India</th><td>Product standardization, market accessibility, and active prudential calibration in a high-activity market.</td></tr>
          </tbody>
        </table>
        <p class="space-top">These are mechanisms under comparison—not templates to transplant directly into Mexico.</p>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">09</p><h2>Questions under investigation</h2></div>
      <ul class="question-list">
        <li>How much of the observed market structure is plausibly associated with regulation rather than scale, participant composition, or offshore network effects?</li>
        <li>Which restrictions materially affect institutional derivatives demand?</li>
        <li>Does infrastructure fragmentation create measurable participation costs?</li>
        <li>Which aspects of foreign market design are actually comparable and transferable?</li>
        <li>What market-development gains, if any, could be achieved without weakening prudential safeguards?</li>
      </ul>
    </section>
    <section class="content-section">
      <div><p class="section-index">10</p><h2>Decision relevance</h2></div>
      <div class="cards-grid">
        <article class="info-card"><p class="card-label">Banks &amp; dealers</p><p>Client demand, market making, balance-sheet use, clearing strategy, collateral, and product development.</p></article>
        <article class="info-card"><p class="card-label">Institutional investors</p><p>Hedging capability, implementation constraints, counterparty access, and collateral management.</p></article>
        <article class="info-card"><p class="card-label">Market infrastructure</p><p>Data architecture, contract design, standardization, clearing, and concentration of liquidity.</p></article>
        <article class="info-card"><p class="card-label">Policy institutions</p><p>Trade-offs among development, investor protection, systemic risk, competition, interoperability, and resilience.</p></article>
      </div>
    </section>
    <section class="content-section">
      <div><p class="section-index">11</p><h2>Next research steps</h2></div>
      <ol class="number-list">
        <li>Freeze operational definitions for development, depth, liquidity, local participation, regulatory intensity, and infrastructure integration.</li>
        <li>Convert the institutional framework into a rule-to-participant-to-product matrix with explicit transmission channels.</li>
        <li>Build the first comparable dataset across Mexican, onshore/offshore, and international indicators.</li>
        <li>Define observable implications, alternatives, methods, and rejection criteria for every working hypothesis.</li>
        <li>Test the evidence before introducing any public section labeled “Preliminary Findings.”</li>
      </ol>
    </section>
  </div>`,
);

const pages = new Map([
  ['index.html', home],
  ['work/index.html', work],
  ['about/index.html', about],
  ['work/usdmxn/index.html', usdmxn],
  ['work/mexican-derivatives-regulation/index.html', derivatives],
  [
    'robots.txt',
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  ],
  [
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
      '/',
      '/work/',
      '/work/usdmxn/',
      '/work/mexican-derivatives-regulation/',
      '/about/',
    ]
      .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
      .join('\n')}\n</urlset>\n`,
  ],
]);

for (const [relativePath, content] of pages) {
  const output = join(root, relativePath);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, content);
}

console.log(`Built ${pages.size} portfolio files.`);
