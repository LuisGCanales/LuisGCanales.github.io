import { assetPath, curvePath, recoveryFigure, quotes } from '../implementations/yield-curve-evidence.mjs';

export const marketsContext = {
  id: 'markets',
  path: '/markets/',
  label: 'Global Markets',
  returnLabel: 'Return to Global Markets Profile',
  cv: '/assets/docs/Luis_Canales_Global_Markets_CV.pdf',
  footerCopy: 'FX, rates and derivatives. Applied pricing, risk and market analysis.',
};

const workflow = [
  ['Start with the exposure', 'Identify what the client needs to protect or achieve, the relevant cash flows and maturities, and the market conditions affecting the decision.'],
  ['Compare products and scenarios', 'Assess the economics of feasible alternatives, reprice them under plausible scenarios and identify the sensitivities and exposures that remain.'],
  ['Prepare for execution', 'Check quotes, conventions and liquidity. Summarise the economics, flag execution constraints and prepare materials for review and documentation.'],
  ['Monitor and validate', 'Track market moves and exposures, investigate discrepancies, and document what changed and when it needs review.'],
];

export function renderMarkets({ layout, email, projectCards, projects }, context = marketsContext) {
  const curve = curvePath + '?from=' + context.id;
  const cvLink = `<a class="button button-secondary" href="${context.cv}" target="_blank" rel="noopener">View Global Markets CV</a>`;
  const researchSummaries = {
    '/work/usdmxn/': 'Distinguish broad dollar moves, relative rates and Mexico-specific developments when framing FX scenarios. The research design is defined and empirical analysis is in development.',
    '/work/mexican-derivatives-regulation/': 'Examine how clearing, margin rules and market access shape the conditions under which derivatives can trade and transfer risk. The public work sets out the institutional framework and working hypotheses.',
  };
  const research = projects.map((project) => ({
    ...project,
    href: project.href + '?from=' + context.id,
    description: researchSummaries[project.href],
  }));

  return layout({
    title: 'Global Markets — Luis Canales',
    description: 'FX, rates and derivatives. Explore Luis Canales’ MXN curve construction, simulated futures experience, independent market research and Global Markets CV.',
    path: context.path,
    image: '/assets/images/og-home.jpg',
    robots: 'noindex, follow',
    socialSiteName: 'Luis Canales — Global Markets',
  }, 'home', `<div class="markets-page">
  <section class="hero markets-hero" aria-labelledby="markets-title">
    <div class="shell markets-hero-grid">
      <div>
        <p class="eyebrow">Luis Canales</p>
        <h1 id="markets-title">Global Markets</h1>
        <p class="positioning">FX, rates &amp; derivatives</p>
        <p class="hero-summary">I build and validate rates analytics and study what drives FX moves. I’m drawn to structuring and trading because they connect a client’s exposure to a product, its price and the risk it leaves behind.</p>
        <div class="hero-actions">
          <a class="button" href="${curve}">Explore the F-TIIE curve study</a>
          ${cvLink}
        </div>
      </div>
      <a class="markets-preview" href="${curve}">
        <figure>
          <img src="${assetPath + recoveryFigure}" alt="Comparison of three calibrated 28-day forward curves with a known synthetic reference" width="1980" height="1078" fetchpriority="high">
          <figcaption><span class="kicker">MXN F-TIIE OIS · Synthetic data</span><strong>What can the same swap quotes imply for forwards?</strong></figcaption>
        </figure>
      </a>
    </div>
  </section>

  <section class="section" aria-labelledby="markets-workflow">
    <div class="shell">
      <div class="section-head">
        <h2 id="markets-workflow">From an exposure to a decision</h2>
        <p>In a structuring or trading team, I want to support the work behind those decisions by following markets, checking pricing inputs and preparing analysis that colleagues can review and act on.</p>
      </div>
      <ol class="markets-workflow">
        ${workflow.map(([title, body]) => `<li><h3>${title}</h3><p>${body}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="section" id="selected-work" aria-labelledby="markets-rates">
    <div class="shell">
      <div class="section-head">
        <div><span class="kicker">Financial implementation</span><h2 id="markets-rates">MXN interest-rate curves</h2></div>
        <div class="markets-copy">
          <p>I built an F-TIIE OIS curve from ${quotes.length} synthetic swap quotes, implemented coupon and cash-flow conventions, and verified the fit with a separate instrument repricing pass.</p>
          <p>Three methods fit the quotes almost identically, yet they implied different forward rates between calibration pillars. The study shows how that choice can change projected floating payments and the way quote shocks propagate across maturities.</p>
          <div class="inline-actions"><a class="button button-secondary" href="${curve}">View results and validation</a></div>
        </div>
      </div>
      <article class="markets-related">
        <h3>Fixed-income valuation &amp; risk</h3>
        <p>In an independent project in development, I implemented pricing for CETES, Bonos M and F-TIIE swaps, including bond duration, DV01 and convexity, and swap par-rate calculations. The project uses controlled synthetic and illustrative inputs.</p>
      </article>
    </div>
  </section>

  <section class="section" aria-labelledby="markets-research">
    <div class="shell">
      <div class="section-head">
        <h2 id="markets-research">Futures &amp; market research</h2>
        <div class="markets-copy">
          <p><strong>4th place · MexDer Challenge 2026</strong></p>
          <p>I placed fourth among more than 1,500 registered participants in Grupo BMV’s simulated futures competition. I monitored market conditions and position exposures while managing USD/MXN and S&amp;P/BMV IPC futures across maturities.</p>
        </div>
      </div>
      ${projectCards(research)}
    </div>
  </section>

  <section class="section" id="professional-execution" aria-labelledby="markets-execution">
    <div class="shell section-head">
      <h2 id="markets-execution">Professional execution</h2>
      <div class="markets-copy">
        <p><strong>Quantitative Research Consultant · DXANDI</strong><br><span class="markets-muted">International applied research · Apr 2024–Jun 2026</span></p>
        <p>Across approximately 20 consulting engagements, I took responsibility for methodology, modelling, validation and delivery. When data or model outputs conflicted, I investigated the discrepancies, reviewed assumptions and redesigned the analysis where needed.</p>
        <p>I documented methods and findings in analytical tools, reports and presentations and explained their implications and limitations to multidisciplinary stakeholders. That experience informs how I approach review and handover of pricing and risk analysis.</p>
      </div>
    </div>
  </section>

  <section class="section" id="about" aria-labelledby="markets-about">
    <div class="shell section-head">
      <h2 id="markets-about">About Luis</h2>
      <div class="markets-copy">
        <p>I’m completing my B.Sc. in Mathematics at UNAM, with expected graduation in May 2027. My financial training includes derivatives, risk management and portfolio optimisation. In coursework I implemented option-pricing methods and studied how Greeks and valuations respond to model assumptions.</p>
        <div class="inline-actions">${cvLink}<a class="button button-secondary" href="mailto:${email}">Get in touch</a></div>
      </div>
    </div>
  </section>
</div>`, context);
}
