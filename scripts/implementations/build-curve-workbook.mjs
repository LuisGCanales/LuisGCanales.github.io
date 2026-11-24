import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const root = resolve(process.argv[2] || fileURLToPath(new URL('../..', import.meta.url)));
const output = join(root, 'assets/implementations/yield-curve/MXN_Interest_Rate_Curve_Analytics.xlsx');
const { locality, maxError, methodology, methods, nodes, passCount, quotes, repricing, risk } = await import(
  pathToFileURL(join(root, 'scripts/implementations/yield-curve-evidence.mjs')).href
);

const book = Workbook.create();
const overview = book.worksheets.add('Overview');
const inputs = book.worksheets.add('Inputs');
const curve = book.worksheets.add('Curve nodes');
const check = book.worksheets.add('Repricing');
const comparison = book.worksheets.add('Interpolation');
const sensitivity = book.worksheets.add('Quote sensitivity');
const format = { rate: '0.0000%', df: '0.000000', bp: '0.000', tiny: '0.00E+00' };
const number = Number;

function title(sheet, name, note, widths) {
  sheet.showGridLines = false;
  sheet.tabColor = '#17324A';
  widths.forEach((width, column) => { sheet.getRangeByIndexes(0, column, 1, 1).format.columnWidthPx = width; });
  const headline = sheet.getRangeByIndexes(0, 0, 1, widths.length);
  headline.merge();
  sheet.getRange('A1').values = [[name]];
  headline.format.fill = '#17324A';
  headline.format.font = { name: 'Arial', bold: true, color: '#FFFFFF', size: 17 };
  headline.format.rowHeight = 32;
  const context = sheet.getRangeByIndexes(1, 0, 1, widths.length);
  context.merge();
  sheet.getRange('A2').values = [[note]];
  context.format.font = { name: 'Arial', color: '#41566A', italic: true, size: 10 };
  context.format.wrapText = true;
  context.format.rowHeight = 33;
}

function data(sheet, headings, rows, formats = {}) {
  const range = sheet.getRangeByIndexes(3, 0, rows.length + 1, headings.length);
  range.values = [headings, ...rows];
  range.format.font = { name: 'Arial', size: 10, color: '#172B3A' };
  range.format.rowHeight = 20;
  range.format.verticalAlignment = 'center';
  const header = range.getRow(0);
  header.format.fill = '#22435D';
  header.format.font = { name: 'Arial', bold: true, color: '#FFFFFF', size: 10 };
  header.format.wrapText = true;
  header.format.rowHeight = 32;
  rows.forEach((_, index) => {
    if (index % 2 === 0) range.getRow(index + 1).format.fill = '#EEF3F7';
  });
  for (const [column, style] of Object.entries(formats)) {
    sheet.getRangeByIndexes(4, Number(column), rows.length, 1).setNumberFormat(style);
  }
  sheet.freezePanes.freezeRows(4);
}

title(overview, 'MXN Interest Rate Curve Analytics', 'F-TIIE OIS · Controlled synthetic experiment · Effective date 18 September 2026', [250, 160, 150, 145]);
overview.getRange('A4:B8').values = [
  ['Repricing control', 'Result'],
  ['Inputs imported', null], ['Imported PASS entries', null],
  ['Maximum absolute error (bp)', null], ['Project PASS tolerance (bp)', 0.01],
];
overview.getRange('A4:D4').format.fill = '#22435D';
overview.getRange('A4:D4').format.font = { name: 'Arial', bold: true, color: '#FFFFFF' };
overview.getRange('A5:B8').format.fill = '#EEF3F7';
overview.getRange('A4:D8').format.rowHeight = 21;
const last = 4 + repricing.length;
overview.getRange('B5:B7').formulas = [
  [`=COUNT(Inputs!D5:D${4 + quotes.length})`],
  [`=COUNTIF(Repricing!E5:E${last},"PASS")`],
  [`=MAX(MAX(Repricing!D5:D${last}),-MIN(Repricing!D5:D${last}))`],
];
overview.getRange('B7').setNumberFormat(format.tiny);
overview.getRange('B8').setNumberFormat('0.00');

const notes = [
  ['How to read the workbook', 'Input quotes, calibrated nodes, repricing results and experiment metrics are saved Python outputs. The three summary controls above are Excel formulas.'],
  ['Calibration and conventions', 'Selected baseline: simultaneous discount-factor calibration with natural cubic interpolation of continuous zero rates. Final OIS payments define curve pillars.'],
  ['Scope', 'Synthetic quotes, projected MXMC calendar, ACT/360 and one curve for projection and discounting. Repricing is internal; there is no vendor or observed-market benchmark.'],
  ['Risk units', 'Central quote shocks are ±1 bp. Quote-to-curve sensitivities are bp of rate response per bp of input quote change. They do not measure monetary DV01, P&L or hedge effectiveness.'],
  ['Data provenance', 'LuisGCanales/financial-implementations · revision d417418bb8f36f3b8df6d167a8aa08ee4d172556 · fixed-income/yield-curves/evidence/c03'],
  ['Figures and source links', 'https://luisgcanales.github.io/implementations/yield-curve/'],
];
notes.forEach(([label, body], index) => {
  const row = index + 10;
  overview.getRange(`A${row}`).values = [[label]];
  overview.getRange(`A${row}`).format.font = { name: 'Arial', color: '#17324A', bold: true };
  overview.getRange(`B${row}:D${row}`).merge();
  overview.getRange(`B${row}`).values = [[body]];
  overview.getRange(`B${row}:D${row}`).format.wrapText = true;
  overview.getRange(`A${row}:D${row}`).format.rowHeight = 46;
  overview.getRange(`A${row}:D${row}`).format.verticalAlignment = 'center';
  if (index % 2 === 0) overview.getRange(`A${row}:D${row}`).format.fill = '#EEF3F7';
});

title(inputs, 'Synthetic F-TIIE OIS input quotes', 'Source: valuation/input_quotes.csv · Annualised par quotes displayed as percentages.', [90, 130, 165, 155]);
data(inputs, ['Tenor', 'Trade date (ISO)', 'Contractual maturity (ISO)', 'Input par rate'], quotes.map((row) => [
  row.tenor, row.trade_date, row.contractual_maturity_date, number(row.par_rate),
]), { 3: format.rate });

title(curve, 'Calibrated natural cubic curve nodes', 'Source: valuation/curve_nodes.csv · Final payment pillars, dimensionless discount factors and annualised continuous zero rates.', [85, 135, 145, 150, 100, 100, 100, 100, 100, 100, 85, 85]);
data(curve, ['Tenor', 'Final payment (ISO)', 'Discount factor', 'Continuous zero rate'], nodes.map((row) => [
  row.tenor, row.pillar_date, number(row.discount_factor), number(row.continuous_zero_rate),
]), { 2: format.df, 3: format.rate });
const chart = curve.charts.add('line', [curve.getRange(`A4:A${4 + nodes.length}`), curve.getRange(`D4:D${4 + nodes.length}`)]);
chart.title = 'Continuous zero rate at each pillar';
chart.hasLegend = false;
chart.xAxis = { axisType: 'textAxis', textStyle: { typeface: 'Arial', fontSize: 10 } };
chart.xAxis.title.text = 'Tenor (category spacing)';
chart.yAxis = { numberFormatCode: '0.0%', numberFormatSourceLinked: false };
chart.setPosition('F4', 'L18');

title(check, 'Independent OIS repricing', 'Source: valuation/quote_repricing.csv · Signed error is model par rate minus input quote. Repricing uses a separate path within the project.', [90, 145, 145, 130, 110]);
data(check, ['Tenor', 'Input par rate', 'Repriced par rate', 'Signed error (bp)', 'Saved status'], repricing.map((row) => [
  row.tenor, number(row.input_quote), number(row.repriced_quote), number(row.error_bp), row.status,
]), { 1: format.rate, 2: format.rate, 3: format.tiny });

title(comparison, 'Interpolation and forward recovery', 'Source: methodology/three_method_global_recovery.csv · Same quotes and simultaneous calibration for every method. Tested against the smooth synthetic reference.', [248, 145, 125, 135, 135, 145]);
data(comparison, ['Interpolation', 'Max quote error (bp)', 'Zero RMSE (bp)', '28D forward RMSE (bp)', '28D forward MAE (bp)', 'Max 28D forward error (bp)'], methodology.map((row) => [
  methods[row.method], number(row.max_repricing_error_bp), number(row.zero_rmse_bp),
  number(row.forward_28d_rmse_bp), number(row.forward_28d_mae_bp), number(row.forward_28d_max_abs_error_bp),
]), { 1: format.tiny, 2: format.bp, 3: format.bp, 4: format.bp, 5: format.bp });

title(sensitivity, 'Quote shock diagnostics and locality', 'Sources: global/global_sensitivity_summary.csv and locality/forward_sensitivity_locality.csv · Central ±1 bp quote shocks. Locality is the sampled absolute forward-response share within ±2 ACT/360 years of the shock pillar.', [240, 105, 125, 140, 147, 125, 133]);
const localityByShock = new Map(locality.map((row) => [row.method + ':' + row.shock_tenor, row]));
data(sensitivity, ['Interpolation', 'Shocked tenor', 'Quote bump (bp)', '28D forward RMSE (bp/bp)', 'Peak abs. response (bp/bp)', 'Peak date (ISO)', 'Abs. mass within ±2Y'], risk.map((row) => [
  methods[row.method], row.shock_tenor, number(row.bump_bp), number(row.forward_sensitivity_rmse_bp_per_bp),
  number(row.forward_max_abs_sensitivity_bp_per_bp), row.forward_max_abs_sensitivity_date,
  number(localityByShock.get(row.method + ':' + row.shock_tenor).sensitivity_mass_within_2y),
]), { 3: format.bp, 4: format.bp, 6: '0.00%' });

book.recalculate();
if (overview.getRange('B5:B7').values.flat().some((value, index) =>
  value !== [quotes.length, passCount, maxError][index]
)) throw new Error('Workbook control totals differ from saved evidence.');

const previewDir = process.argv[3];
if (previewDir) {
  await mkdir(previewDir, { recursive: true });
  for (const sheet of [overview, inputs, curve, check, comparison, sensitivity]) {
    const preview = await book.render({ sheetName: sheet.name, autoCrop: 'all', scale: 1, format: 'png' });
    await writeFile(join(previewDir, sheet.name + '.png'), new Uint8Array(await preview.arrayBuffer()));
  }
}

const staging = await mkdtemp(join(tmpdir(), 'curve-xlsx-'));
try {
  const stagedWorkbook = join(staging, basename(output));
  const xlsx = await SpreadsheetFile.exportXlsx(book);
  await xlsx.save(stagedWorkbook);
  await copyFile(stagedWorkbook, output);
} finally {
  await rm(staging, { recursive: true, force: true });
}
