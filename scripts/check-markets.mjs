import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { marketsContext as context } from './contexts/markets.mjs';
import { curvePath, locality, maxError, methodology, nodes, passCount, quotes, repricing, risk, scales } from './implementations/yield-curve-evidence.mjs';

const local = (path) => new URL('../' + path, import.meta.url);
const read = (path) => readFileSync(local(path), 'utf8');
const markets = read('markets/index.html');
const curve = read('implementations/yield-curve/index.html');
const sitemap = read('sitemap.xml');

assert.match(markets, /name="robots" content="noindex, follow"/);
assert.match(markets, /rel="canonical" href="https:\/\/luisgcanales.github.io\/markets\/"/);
assert.match(curve, /rel="canonical" href="https:\/\/luisgcanales.github.io\/implementations\/yield-curve\/"/);
assert.doesNotMatch(markets, /investment-banking|Luis_Canales_Portfolio_CV\.pdf|JPMorgan/i);
assert.doesNotMatch(curve, /noindex/);
assert.ok(!sitemap.includes(context.path));
assert.ok(sitemap.includes(curvePath));
assert.ok(markets.includes('href="' + context.cv + '"'));
assert.ok(markets.includes('href="' + curvePath + '?from=markets"'));
assert.ok(markets.includes('href="/?from=markets"'));
for (const page of [read('index.html'), read('work/usdmxn/index.html'), read('work/mexican-derivatives-regulation/index.html'), curve]) {
  assert.match(page, /data-entry-link="markets" href="\/markets\/" hidden/);
  assert.match(page, /data-entry-link="investment-banking" href="\/investment-banking\/" hidden/);
}
for (const page of [markets, curve]) {
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  for (const [, path] of page.matchAll(/(?:href|src)="(\/[^#?"]*)(?:[#?][^"]*)?"/g)) {
    assert.ok(existsSync(local(path.slice(1) + (path.endsWith('/') ? 'index.html' : ''))), path);
  }
}

assert.equal(quotes.length, 15);
assert.equal(quotes[0].tenor, '1M');
assert.equal(quotes.at(-1).tenor, '30Y');
assert.deepEqual(quotes.map((row) => row.tenor), nodes.map((row) => row.tenor));
assert.deepEqual(quotes.map((row) => row.tenor), repricing.map((row) => row.tenor));
assert.deepEqual(quotes.map((row) => Number(row.par_rate)), repricing.map((row) => Number(row.input_quote)));
assert.equal(passCount, quotes.length);
assert.ok(maxError < 0.01);
assert.deepEqual(methodology.map((row) => Number(row.forward_28d_rmse_bp).toFixed(3)), ['3.811', '5.235', '0.249']);
assert.ok(methodology.every((row) => row.calibration_success === 'True' && Number(row.max_repricing_error_bp) < 1e-10));
assert.equal(risk.length, 45);
assert.ok(risk.every((row) => Number(row.bump_bp) === 1 &&
  row.plus_calibration_success === 'True' && row.minus_calibration_success === 'True'));
assert.equal(locality.length, risk.length);
assert.equal(Number(scales.find((row) => row.method === 'CUBIC_CONTINUOUS_ZERO').common_full_cap_bp_per_bp).toFixed(2), '20.04');

const script = read('assets/js/main.js');

function navigate({ query = '', saved = null, blocked = false, ownContext } = {}) {
  const origin = 'https://example.com';
  const returnLinks = ['investment-banking', 'markets'].map((id) => ({ dataset: { entryLink: id }, hidden: true }));
  const target = { dataset: {}, href: origin + curvePath + '#quote-sensitivity' };
  const anchor = { dataset: {}, href: origin + '/' + query + '#main' };
  const bar = { hidden: true };
  runInNewContext(script, {
    URL, URLSearchParams,
    window: { location: { pathname: '/', origin, search: query, href: origin + '/' + query } },
    document: {
      body: { dataset: { entryContext: ownContext } },
      querySelector: (selector) => selector === '[data-context-return]' && !ownContext ? bar : null,
      querySelectorAll: (selector) => selector === '[data-entry-link]' ? (ownContext ? [] : returnLinks) : [target, anchor],
    },
    sessionStorage: {
      getItem: () => { if (blocked) throw new Error('Storage blocked'); return saved; },
      setItem: (_, value) => { if (blocked) throw new Error('Storage blocked'); saved = value; },
    },
  });
  return { visible: returnLinks.filter((link) => !link.hidden).map((link) => link.dataset.entryLink), bar, target, anchor, saved };
}

assert.equal(navigate().bar.hidden, true);
assert.deepEqual(navigate({ query: '?from=markets', saved: 'investment-banking' }).visible, ['markets']);
assert.deepEqual(navigate({ query: '?from=investment-banking', saved: 'markets' }).visible, ['investment-banking']);
assert.deepEqual(navigate({ saved: 'markets' }).visible, ['markets']);
assert.deepEqual(navigate({ query: '?from=unknown' }).visible, []);
assert.equal(navigate({ ownContext: 'markets' }).saved, 'markets');
const fallback = navigate({ query: '?from=markets', blocked: true });
assert.deepEqual(fallback.visible, ['markets']);
assert.equal(fallback.target.href, curvePath + '?from=markets#quote-sensitivity');
assert.match(fallback.anchor.href, /^https:\/\/example\.com\/\?from=markets#main$/);
console.log('Markets checks passed: metadata, destinations, saved curve evidence and context navigation.');
