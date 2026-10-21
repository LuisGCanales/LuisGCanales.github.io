import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { investmentBankingContext as context, renderInvestmentBanking } from './contexts/investment-banking.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const page = read('investment-banking/index.html');
assert.match(page, /name="robots" content="noindex, follow"/);
assert.match(page, /rel="canonical" href="https:\/\/luisgcanales.github.io\/investment-banking\/"/);
assert.equal((page.match(/<h1\b/g) || []).length, 1);
assert.ok(page.includes(`href="${context.cv}"`));
assert.ok(!page.includes('Luis_Canales_Portfolio_CV.pdf'));
assert.ok(!page.includes('corporate-valuation-case'));
assert.ok(!read('sitemap.xml').includes('/investment-banking/'));

const render = (flagship) => renderInvestmentBanking({
  layout: (_meta, _active, html) => html, linkedin: 'https://www.linkedin.com/',
  email: 'test@example.com', context: { ...context, flagship },
});
assert.throws(() => render({ status: 'draft' }), /requires reviewed/);
const verified = { status: 'verified', title: 'Reviewed case', summary: 'Completed, inspectable evidence.', href: '/investment-banking/corporate-valuation-case/', ctaLabel: 'View applied case' };
assert.throws(() => render({ ...verified, summary: '' }), /requires reviewed/);
assert.throws(() => render({ ...verified, href: 'https://example.com/' }), /requires reviewed/);
const future = render(verified);
assert.ok(future.indexOf('id="applied-case"') < future.indexOf('id="professional-execution"'));
assert.ok(!future.includes('Carbon Oh-No!'));
assert.ok(future.includes(context.cv));

// Exercise the actual browser script in a small DOM/storage harness. Browser QA
// separately checks real menu, links and rendered responsive behavior.
const script = read('assets/js/main.js');
function journey({ query = '', stored = null, blocked = false, ownContext } = {}) {
  const returnLink = { dataset: { entryLink: context.id }, hidden: false };
  const bar = { hidden: true };
  const publicLink = { href: 'https://example.test/work/', dataset: {} };
  const pdfLink = { href: `https://example.test${context.cv}`, dataset: {} };
  let sessionValue = stored;
  runInNewContext(script, {
    URL, URLSearchParams,
    window: { location: { search: query, origin: 'https://example.test', href: `https://example.test/${query}` } },
    document: {
      body: { dataset: { entryContext: ownContext } },
      querySelector: (selector) => selector === '[data-context-return]' ? (ownContext ? null : bar) : null,
      querySelectorAll: (selector) => selector === '[data-entry-link]' ? (ownContext ? [] : [returnLink]) : [publicLink, pdfLink],
    },
    sessionStorage: {
      getItem: () => { if (blocked) throw new Error('Storage unavailable'); return sessionValue; },
      setItem: (_key, value) => { if (blocked) throw new Error('Storage unavailable'); sessionValue = value; },
    },
  });
  return { bar, sessionValue, publicLink, pdfLink };
}
assert.equal(journey().bar.hidden, true);
assert.equal(journey({ query: '?from=untrusted' }).bar.hidden, true);
assert.equal(journey({ stored: 'untrusted' }).bar.hidden, true);
assert.equal(journey({ query: '?from=investment-banking' }).bar.hidden, false);
assert.equal(journey({ stored: context.id }).bar.hidden, false);
assert.equal(journey({ ownContext: context.id }).sessionValue, context.id);
const fallback = journey({ query: '?from=investment-banking', blocked: true });
assert.equal(fallback.bar.hidden, false);
assert.equal(fallback.publicLink.href, '/work/?from=investment-banking');
assert.equal(fallback.pdfLink.href, `https://example.test${context.cv}`);
assert.equal(journey({ blocked: true }).bar.hidden, true);
console.log('Investment Banking checks passed: metadata, CV, State A/B, session navigation and storage fallback.');
