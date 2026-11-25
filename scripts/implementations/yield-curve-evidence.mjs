import { readFileSync } from 'node:fs';

export const curvePath = '/implementations/yield-curve/';
export const assetPath = '/assets/implementations/yield-curve/';
export const source = 'https://github.com/LuisGCanales/financial-implementations/tree/d417418bb8f36f3b8df6d167a8aa08ee4d172556/fixed-income/yield-curves';
export const docs = source.replace('/tree/', '/blob/') + '/docs/';
export const recoveryFigure = 'forward_28d_recovery_three_methods.png';
export const riskFigure = 'forward_sensitivity_heatmap_cubic_continuous_zero_full_common_scale.png';

export const methods = {
  LOG_LINEAR_DF: 'Log-linear discount factors',
  LINEAR_CONTINUOUS_ZERO: 'Linear continuous zero rates',
  CUBIC_CONTINUOUS_ZERO: 'Natural cubic continuous zero rates',
};

// The selected upstream exhibits have plain, unquoted fields.
export function readEvidence(file) {
  const content = readFileSync(new URL('../../' + assetPath.slice(1) + file + '.csv', import.meta.url), 'utf8').trim();
  const [header, ...lines] = content.split(/\r?\n/);
  const keys = header.split(',');
  return lines.map((line) => {
    const values = line.split(',');
    if (values.length !== keys.length || line.includes('"')) {
      throw new Error('Unexpected evidence CSV format: ' + file);
    }
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
  });
}

export const methodology = readEvidence('three_method_global_recovery');
export const quotes = readEvidence('input_quotes');
export const nodes = readEvidence('curve_nodes');
export const repricing = readEvidence('quote_repricing');
export const risk = readEvidence('global_sensitivity_summary');
export const scales = readEvidence('forward_sensitivity_heatmap_scale_diagnostics');
export const locality = readEvidence('forward_sensitivity_locality');
export const maxError = Math.max(...repricing.map((row) => Math.abs(Number(row.error_bp))));
export const passCount = repricing.filter((row) => row.status === 'PASS').length;
