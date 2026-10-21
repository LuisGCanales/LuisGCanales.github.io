// State A has no flagship. Enabling State B requires reviewed evidence and a
// separate implementation request; see docs/contexts/investment-banking.md.
export const investmentBankingContext = {
  id: 'investment-banking',
  path: '/investment-banking/',
  label: 'Investment Banking',
  returnLabel: 'Return to Investment Banking Profile',
  cv: '/assets/docs/Luis_Canales_Investment_Banking_CV.pdf',
  flagship: null,
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export function renderInvestmentBanking({ layout, linkedin, email, projectCards, context = investmentBankingContext }) {
  const flagship = context.flagship;
  if (flagship && (flagship.status !== 'verified' ||
      ['title', 'summary', 'href', 'ctaLabel'].some((key) => typeof flagship[key] !== 'string' || !flagship[key].trim()) ||
      !flagship.href.startsWith(`${context.path}corporate-valuation-case/`) || /[?#]/.test(flagship.href))) {
    throw new Error('Investment Banking flagship requires reviewed, complete evidence and a local case route.');
  }
  const cvLink = `<a class="button${flagship ? ' button-secondary' : ''}" href="${context.cv}" target="_blank" rel="noopener">View Investment Banking CV</a>`;
  const researchHref = '/work/usdmxn/?from=investment-banking';
  const featuredCase = flagship ? `<section class="section" id="applied-case">
    <div class="shell"><div class="section-head">
      <div><p class="section-index">Applied case</p><h2>${escapeHtml(flagship.title)}</h2></div>
      <div><p>${escapeHtml(flagship.summary)}</p><div class="inline-actions"><a class="button" href="${escapeHtml(flagship.href)}">${escapeHtml(flagship.ctaLabel)}</a></div></div>
    </div></div></section>` : '';

  return layout({
    title: 'Investment Banking — Luis Canales',
    description: 'Professional analytical execution, client-facing deliverables and sustained financial preparation. Explore Luis Canales’ background and Investment Banking CV.',
    path: context.path,
    image: '/assets/images/og-home.jpg',
    robots: 'noindex, follow',
    socialSiteName: 'Luis Canales — Investment Banking',
  }, 'home', `<div class="ib-page">
  <section class="hero ib-hero" aria-labelledby="ib-title">
    <div class="shell ib-hero-grid">
      <div>
        <p class="eyebrow">Luis Canales · Professional profile</p>
        <h1 id="ib-title">Investment<br>Banking</h1>
        <p class="positioning">Financial analysis. Professional execution.<br>A sustained commitment to corporate finance.</p>
        <p class="hero-summary">Over two years across approximately 20 international analytical consulting engagements: developing methodologies, validating models, and delivering practical tools, reports and presentations for stakeholders.</p>
        <div class="hero-actions">
          ${flagship ? `<a class="button" href="${escapeHtml(flagship.href)}">${escapeHtml(flagship.ctaLabel)}</a>` : ''}
          ${cvLink}
          ${flagship ? '' : '<a class="button button-secondary" href="#professional-execution">Explore professional experience</a>'}
        </div>
        <p class="ib-foundation">Financial statement &amp; ratio analysis <span aria-hidden="true">·</span> Corporate finance fundamentals <span aria-hidden="true">·</span> Capital markets</p>
      </div>
      <aside class="ib-profile" aria-label="Education and professional background">
        <figure class="portrait-frame"><img class="hero-portrait" src="/assets/images/luis-canales.jpg" alt="Portrait of Luis Canales" width="800" height="800" fetchpriority="high"></figure>
        <dl class="ib-profile-facts">
          <div><dt>Professional experience</dt><dd>DXANDI · Apr 2024–Jun 2026</dd></div>
          <div><dt>Education in progress</dt><dd>B.Sc. Mathematics · UNAM<br>Expected May 2027</dd></div>
        </dl>
      </aside>
    </div>
  </section>
  ${featuredCase}
  <section class="section" id="professional-execution" aria-labelledby="execution-title">
    <div class="shell">
      <div class="section-head">
        <div><p class="section-index">01 / Professional execution</p><h2 id="execution-title">From an open question to a usable deliverable.</h2></div>
        <div class="ib-copy">
          <p class="ib-role">Quantitative Research Consultant · DXANDI<br><span>International applied research consulting · Apr 2024–Jun 2026</span></p>
          <p>I took responsibility for methodology, modeling, validation and delivery across approximately 20 international engagements. The work began with understanding stakeholder needs and structuring a question that could be answered with the information available.</p>
          <p>I investigated inconsistencies in data and models, challenged assumptions and refined methods when the evidence called for it. Findings, limitations and validation steps had to remain clear through to delivery.</p>
          <p>The outputs included decision-support frameworks, practical analytical tools, client-facing reports and presentations for multidisciplinary stakeholders. For Investment Banking, this experience offers a foundation in research, analytical quality, information handling and clear communication under review.</p>
        </div>
      </div>
      <div class="ib-deliverables" aria-label="Professional deliverables">
        <div><span class="kicker">Frameworks &amp; tools</span><p>Structure the problem and make the analysis usable.</p></div>
        <div><span class="kicker">Validation &amp; documentation</span><p>Investigate discrepancies and make assumptions traceable.</p></div>
        <div><span class="kicker">Reports &amp; presentations</span><p>Connect findings and limitations to the stakeholder’s decision.</p></div>
      </div>
    </div>
  </section>
  <section class="section" id="financial-preparation" aria-labelledby="preparation-title">
    <div class="shell">
      <div class="section-head">
        <div><p class="section-index">02 / Financial preparation</p><h2 id="preparation-title">A foundation built over time.</h2></div>
        <p>Prior accounting studies, Mathematics coursework at UNAM and independent financial work have shaped my preparation for corporate finance. Each contributes a different part of the foundation.</p>
      </div>
      <div class="ib-preparation-grid">
        <article><p class="kicker">Accounting coursework</p><h3>Read the financial position.</h3><p>Financial statement and ratio analysis to assess profitability, liquidity, leverage and operating performance in an academic context.</p></article>
        <article><p class="kicker">Financial training</p><h3>Connect business and financing.</h3><p>Corporate finance fundamentals and capital markets, complemented by training in fixed income, derivatives valuation, portfolio optimization and market risk.</p></article>
        <article><p class="kicker">Analytical tools</p><h3>Support careful analysis.</h3><p>Excel and PowerPoint, supported by quantitative modeling, scenario analysis and programming. My applied valuation work to date concerns financial instruments.</p></article>
      </div>
      <p class="ib-education"><strong>B.Sc. Mathematics · Faculty of Sciences, UNAM</strong><span>In progress · Expected May 2027 · Full-time work availability, with remaining coursework outside working hours.</span></p>
    </div>
  </section>
  <section class="section" id="selected-work" aria-labelledby="evidence-title">
    <div class="shell">
      <div class="section-head">
        <div><p class="section-index">03 / Selected work</p><h2 id="evidence-title">Financial questions in context.</h2></div>
        <p>${flagship ? 'Broader research complements the applied case with a framework for organizing macro-financial uncertainty.' : 'Independent research and interdisciplinary project work provide supporting evidence of how I organize uncertainty and connect analysis with practical constraints.'}</p>
      </div>
      ${flagship ? `<p><a class="ib-text-link" href="${researchHref}">Explore USD/MXN research — empirical analysis in development →</a></p>` : `${projectCards([{
        number: '01',
        title: 'USD/MXN Macro-Financial Decision Framework',
        href: researchHref,
        paragraphs: [
          'How do monetary incentives, global conditions and Mexico-specific information interact in exchange-rate dynamics? This research organizes those channels to support financial scenarios and the assessment of cross-border uncertainty.',
          'The research design and data methodology are defined; empirical analysis and validation remain in development. Its current evidence is the analytical framework and research plan.',
        ],
        tags: ['Markets', 'FX', 'Macro-Finance'],
        status: 'Independent research · In development',
      }])}
      <article class="ib-secondary-project">
        <p class="kicker">Additional perspective · 2020–2022</p>
        <h3>Carbon Oh-No! · Climate-finance proof of concept</h3>
        <p>As quantitative modeling lead in a nine-person team, I connected the proof of concept with carbon-credit regulation, financing considerations and implementation planning. The experience reinforced the need to test an analytical idea against requirements beyond the model itself.</p>
      </article>`}
    </div>
  </section>
  <section class="section" id="understanding-the-function" aria-labelledby="workflow-title">
    <div class="shell">
      <div class="section-head">
        <div><p class="section-index">04 / Understanding the function</p><h2 id="workflow-title">Analysis in service of the client’s decision.</h2></div>
        <div class="ib-copy"><p>What attracts me to Investment Banking is the connection between understanding a business, evaluating financial alternatives and helping develop a solution that can be executed. This is how I understand the workflow I want to learn within an experienced team.</p>
          <p>The analyst’s contribution includes detailed research, updating models, preparing materials, checking figures, incorporating feedback and keeping deliverables consistent under deadlines. I want to learn that daily work and its standards.</p></div>
      </div>
      <ol class="ib-workflow">
        <li><h3>Understand the objective.</h3><p>Clarify the client’s business, priorities, constraints and decision context.</p></li>
        <li><h3>Build the financial picture.</h3><p>Analyze performance, cash generation, capital structure, the industry and relevant market conditions.</p></li>
        <li><h3>Evaluate alternatives.</h3><p>Develop and test assumptions, valuation approaches and scenarios for strategic or financing decisions.</p></li>
        <li><h3>Assess execution requirements.</h3><p>Consider transaction economics, feasibility, due diligence, documentation and coordination with legal, regulatory and other specialists.</p></li>
        <li><h3>Support communication and execution.</h3><p>Prepare and refine materials, respond to review and support the solution through the institutional process.</p></li>
      </ol>
    </div>
  </section>
  <section class="section" aria-labelledby="approach-title">
    <div class="shell">
      <div class="section-head">
        <div><p class="section-index">05 / Analytical approach</p><h2 id="approach-title">Make the reasoning clear.</h2></div>
        <p>A working discipline that complements financial fundamentals: choose the method the question requires, make the assumptions explicit and communicate what the evidence can support.</p>
      </div>
      <div class="ib-approach">
        <article><p class="kicker">01 / Frame</p><h3>Define the decision.</h3><p>Clarify the objective, horizon, constraints and what a useful answer would change.</p></article>
        <article><p class="kicker">02 / Structure</p><h3>Separate evidence and assumptions.</h3><p>Identify drivers, uncertainty, competing explanations and the evidence required.</p></article>
        <article><p class="kicker">03 / Test</p><h3>Use an appropriate method.</h3><p>Match data, analysis and validation to the problem and its practical context.</p></article>
        <article><p class="kicker">04 / Translate</p><h3>Explain the implications.</h3><p>Connect findings, remaining uncertainties and next steps to the decision.</p></article>
      </div>
    </div>
  </section>
  <section class="section" id="about" aria-labelledby="direction-title">
    <div class="shell section-head ib-closing">
      <div><p class="section-index">06 / Professional direction</p><h2 id="direction-title">Contribute reliably.<br>Develop judgment.</h2></div>
      <div class="ib-copy">
        <p>I want to build a long-term career in Investment Banking, working on corporate finance, client advisory, M&amp;A and capital-markets transactions. The appeal is understanding a client’s problem and helping develop a financially sound, implementable solution.</p>
        <p>I would bring responsibility for analytical quality, careful documentation and stakeholder-oriented delivery while learning from experienced bankers. Institutional judgment, conventions and execution discipline are central to the expertise I want to develop.</p>
        <p>As I learn the workflow, my quantitative and technical background can also help improve consistency, traceability and the analysis of scenarios where those tools are useful.</p>
        <div class="inline-actions">${cvLink}<a class="button button-secondary" href="mailto:${email}">Get in touch</a></div>
        <div class="ib-contact"><a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="mailto:${email}">${email}</a><a href="/?from=investment-banking">Explore Full Portfolio <span aria-hidden="true">→</span></a></div>
      </div>
    </div>
  </section>
  </div>`.replace(/[\t ]+$/gm, ''), context);
}
