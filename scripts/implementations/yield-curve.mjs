import {
  assetPath, curvePath, docs, locality, maxError, methodology, methods, nodes, passCount,
  quotes, recoveryFigure, repricing, riskFigure, scales, source,
} from './yield-curve-evidence.mjs';

const study = methodology[0];
const cubicScale = scales.find((row) => row.method === 'CUBIC_CONTINUOUS_ZERO');
const cubicLongEnd = locality.find((row) => row.method === 'CUBIC_CONTINUOUS_ZERO' && row.shock_tenor === '30Y');
const percent = (rate) => (100 * Number(rate)).toFixed(4) + '%';
const scientific = (value) => Number(value).toExponential(2);
const workbook = 'MXN_Interest_Rate_Curve_Analytics.xlsx';

function table(caption, headings, rows, className = '') {
  return `<div class="curve-table-wrap ${className}" role="region" aria-label="${caption}" tabindex="0">
    <table class="curve-table">
      <caption>${caption}</caption>
      <thead><tr>${headings.map((heading) => `<th scope="col">${heading}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>`;
}

function figure(file, width, height, alt, caption) {
  const url = assetPath + file;
  return `<figure class="curve-figure">
    <a href="${url}" aria-label="Open full-size figure. ${alt}"><img src="${url}" width="${width}" height="${height}" loading="lazy" alt="${alt}"></a>
    <figcaption>${caption}</figcaption>
  </figure>`;
}

function files(items) {
  return items.map(([file, label]) => `<a href="${assetPath + file}" download>${label}</a>`).join('\n      ');
}

export const curveRequiredAssets = [recoveryFigure, riskFigure, workbook].map((file) => assetPath + file);

export function renderYieldCurve({ layout }) {
  const curveRows = quotes.map((quote, index) => [
    quote.tenor, nodes[index].pillar_date, percent(quote.par_rate),
    Number(nodes[index].discount_factor).toFixed(6), percent(nodes[index].continuous_zero_rate),
    scientific(repricing[index].error_bp), repricing[index].status,
  ]);
  const comparison = methodology.map((row) => [
    methods[row.method], scientific(row.max_repricing_error_bp),
    Number(row.forward_28d_rmse_bp).toFixed(3), Number(row.forward_28d_max_abs_error_bp).toFixed(3),
  ]);

  return layout({
    title: 'MXN Interest-Rate Curve Construction — Luis Canales',
    description: 'A synthetic F-TIIE OIS curve study on calibration, independent repricing, 28-day forward recovery and quote sensitivity.',
    path: curvePath,
    image: '/assets/images/og-home.jpg',
  }, '', `<div class="curve-page">
  <section class="project-hero" aria-labelledby="curve-title">
    <div class="shell project-hero-grid">
      <div>
        <p class="eyebrow">Financial implementation · MXN F-TIIE OIS</p>
        <h1 id="curve-title">MXN Interest-Rate Curve Construction</h1>
        <p class="project-deck">The same swap quotes can imply different forward rates between calibration pillars. This study compares what each interpolation method does to forwards and how a quote shock travels along the curve.</p>
        <div class="hero-actions">
          <a class="button" href="#forward-recovery">Compare the curves</a>
          <a class="button button-secondary" href="#artifacts">Inspect the data</a>
        </div>
      </div>
      <div class="project-side">
        <span class="status">Controlled synthetic experiment</span>
        <dl>
          <div><dt>Calibration instruments</dt><dd>${quotes.length} F-TIIE OIS par quotes · ${quotes[0].tenor}–${quotes.at(-1).tenor}</dd></div>
          <div><dt>Curve reference date</dt><dd><time datetime="${study.reference_date}">18 September 2026</time></dd></div>
          <div><dt>Curve outputs</dt><dd>Discount factors, zero rates and forward rates</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <div class="article-shell">
    <section class="content-section" aria-labelledby="inputs-title">
      <h2 id="inputs-title">From swap quotes to curve nodes</h2>
      <div>
        <p>Swap par rates pin down the prices of the calibration instruments. A valuation engine also needs discount factors and forwards on cash-flow dates between those instruments. Projected floating payments and the distribution of risk across tenors can therefore depend on how the curve is constructed.</p>
        <p>The study uses a smooth synthetic reference curve to generate ${quotes.length} par quotes. Calibration sees the quotes and conventions. The reference curve is used afterward to measure the accuracy of the recovered forwards.</p>
        <ol class="curve-steps">
          <li><strong>Build the cash flows.</strong> Apply the Mexico City calendar, T+2 business-day effective dates, ACT/360 accrual, 28-day coupon periods, compounded overnight F-TIIE and a two-business-day payment lag.</li>
          <li><strong>Solve for discount factors.</strong> Set the pillars at final payment dates and use the same curve for projection and discounting. The local log-linear representation supports a sequential bootstrap. The selected natural cubic zero-rate baseline solves for all nodes together.</li>
          <li><strong>Check the result.</strong> Verify input coverage and curve structure, then rebuild the instruments and recalculate par rates separately from the solver residuals.</li>
        </ol>
        <p class="curve-links"><a href="${docs}conventions.md">Financial conventions</a><a href="${docs}methodology.md">Calibration methodology</a></p>
      </div>
    </section>

    <section class="content-section" id="repricing" aria-labelledby="repricing-title">
      <h2 id="repricing-title">Repricing &amp; validation</h2>
      <div>
        <p>In the selected cubic baseline, ${passCount} of ${repricing.length} independently reconstructed swaps passed the project’s 0.01 bp tolerance. The maximum absolute error was ${scientific(maxError)} bp. This is an internal numerical fit check using a separate repricing path in the same codebase.</p>
        <details class="curve-details">
          <summary>Inspect all ${quotes.length} inputs, nodes and repricing results</summary>
          ${table('Simultaneous natural cubic calibration', ['Tenor', 'Final payment', 'Input par rate', 'Discount factor', 'Continuous zero', 'Error (bp)', 'Status'], curveRows, 'curve-table-wide')}
          <p>Rates are annualised. Discount factors are dimensionless. Signed error is model par rate minus input quote.</p>
        </details>
        <p class="curve-links"><a href="${docs}validation.md">Validation and acceptance policy</a></p>
      </div>
    </section>

    <section class="content-section curve-full" id="forward-recovery" aria-labelledby="forward-title">
      <div class="curve-section-intro">
        <h2 id="forward-title">Same quote fit, different forwards</h2>
        <p>With simultaneous calibration for all three methods, maximum absolute quote errors were below 10<sup>−10</sup> bp. The natural cubic method recovered the smooth synthetic 28-day forwards more closely in this experiment. The comparison measures recovery against this scenario’s known reference.</p>
      </div>
      ${figure(recoveryFigure, 1980, 1078, 'Three recovered 28-day forward curves across maturities. The cubic curve tracks the smooth synthetic reference most closely.', '28-day simple ACT/360 forwards (annualised %), sampled every seven calendar days. The lines compare the synthetic reference with three curves calibrated to the same quotes. Source: published three-method recovery exhibit.')}
      ${table('Quote fit and 28-day forward recovery', ['Interpolation', 'Max. quote error (bp)', 'Forward RMSE (bp)', 'Max. forward error (bp)'], comparison)}
      <p class="curve-links"><a href="${docs}evidence/methodology.md">Forward-recovery experiment</a></p>
    </section>

    <section class="content-section curve-full" id="quote-sensitivity" aria-labelledby="sensitivity-title">
      <div class="curve-section-intro">
        <h2 id="sensitivity-title">How a quote shock travels</h2>
        <p>Move one OIS input quote up and down by 1 bp and recalibrate for each move. The central difference estimates how many basis points a 28-day forward changes per basis point of input quote change. The cubic example shows effects beyond the shocked tenor and includes both positive and negative responses.</p>
      </div>
      ${figure(riskFigure, 2384, 1471, 'Signed heatmap of 28-day forward sensitivities for fifteen input tenors, showing positive and negative responses across maturities.', `Rows are shocked quote tenors. Columns locate forward starts in ACT/360 years. Black marks identify payment pillars within the plotted domain. Signed sensitivities use the common full colour range of ±${Number(cubicScale.common_full_cap_bp_per_bp).toFixed(2)} bp/bp, with no clipping. Source: published cubic quote-sensitivity exhibit.`)}
      <p>For the 30Y quote shock, ${(100 * Number(cubicLongEnd.sensitivity_mass_within_2y)).toFixed(1)}% of the sampled absolute cubic forward response falls within two ACT/360 years of its pillar. On this measure it is more local than the two alternatives for that shock. Locality depends on the tenor, the measure and the sampling range. For hedge analysis, the exhibit illustrates why a single labelled maturity bucket can miss part of the curve response.</p>
      <p class="curve-links"><a href="${docs}evidence/risk.md">Sensitivity and locality experiment</a></p>
    </section>

    <section class="content-section" aria-labelledby="limits-title">
      <h2 id="limits-title">Scope &amp; limitations</h2>
      <div>
        <ul class="clean-list">
          <li>The quotes are synthetic. The smooth reference can favour smooth methods. Later years of the Mexico City holiday calendar are projected.</li>
          <li>The same curve projects floating payments and discounts cash flows. Extrapolation outside the calibrated range is unsupported.</li>
          <li>Repricing establishes fit within the project’s model. External vendor benchmarking and observed-market validation are outside the study.</li>
          <li>Quote-to-curve sensitivities measure changes in rates. Monetary DV01, portfolio P&amp;L and hedge effectiveness would require separate valuation and exposure analysis.</li>
          <li>The public exhibits are a curated selection from a research implementation. The full execution snapshot and production controls are outside this release.</li>
        </ul>
        <p class="curve-links"><a href="${docs}assumptions_limitations.md">Assumptions and limitations</a><a href="${docs}integration_contract.md">Downstream integration contract</a></p>
      </div>
    </section>

    <section class="content-section" id="artifacts" aria-labelledby="artifacts-title">
      <h2 id="artifacts-title">Data &amp; reproducibility</h2>
      <div>
        <p>The workbook presents the saved synthetic results and links to the published evidence. The downloadable CSVs retain their original precision. Quotes and zero rates are annual decimals in the source files.</p>
        <div class="inline-actions"><a class="button" href="${assetPath + workbook}" download>Download Excel workbook</a></div>
        <p class="curve-links curve-downloads">
          ${files([
            ['input_quotes.csv', 'Input quotes (CSV)'], ['curve_nodes.csv', 'Curve nodes (CSV)'],
            ['quote_repricing.csv', 'Independent repricing (CSV)'],
            ['three_method_global_recovery.csv', 'Forward recovery (CSV)'],
            ['global_sensitivity_summary.csv', 'Quote sensitivity (CSV)'],
            ['forward_sensitivity_locality.csv', 'Sensitivity locality (CSV)'],
            ['forward_sensitivity_heatmap_scale_diagnostics.csv', 'Heatmap scale (CSV)'],
          ])}
        </p>
        <p class="curve-links"><a href="${docs}evidence/index.md">Evidence index and claims</a><a href="${docs}evidence/reproduce.md">Reproduction guide</a><a href="${source}">Python implementation on GitHub</a></p>
      </div>
    </section>
  </div>
</div>`);
}
