# Cxs Bar Chart

Accessible, token-themed bar chart for Cerxos UI. It supports vertical and horizontal orientation, grouped series, negative values, tooltips on hover and focus, and optionally selectable bars.

Angular renders the SVG directly. `d3-scale` is used only for scale and tick maths and never touches the DOM.

## Usage

Grouped vertical bars:

```html
<cxs-bar-chart
  ariaLabel="Monthly income and spending"
  [categories]="['Jan 2026', 'Feb 2026']"
  [series]="[
    { name: 'Income', values: [8600, 8600] },
    { name: 'Spending', values: [5200, 4700] }
  ]"
  [valueFormat]="formatMoney"
></cxs-bar-chart>
```

Horizontal, selectable bars, for drill-down:

```html
<cxs-bar-chart
  ariaLabel="Spending by category"
  orientation="horizontal"
  [selectable]="true"
  [categories]="names"
  [series]="[{ name: 'Spending', values: amounts }]"
  (barSelect)="drillInto($event.categoryIndex)"
></cxs-bar-chart>
```

## Inputs

- `categories`: `string[]`. Category labels in display order.
- `series`: `{ name: string; values: number[] }[]`, with one value per category.
- `orientation`: `vertical` | `horizontal` (default: `vertical`).
- `height`: number. Pixel height of a vertical chart (default: `280`). Horizontal charts size to their rows.
- `valueFormat`: `(value: number) => string`. Used for ticks, tooltips and accessible values. The default is `Intl.NumberFormat`.
- `ariaLabel`: string. **Required.** The chart's accessible name.
- `selectable`: boolean (default: `false`). When true, bars are tabbable and selectable with click, Enter or Space.
- `emptyMessage`: string (default: `No data`). Shown when there are no categories or every value is zero.

## Outputs

- `barSelect`: `{ categoryIndex: number; category: string; seriesIndex: number }`. Emitted only when `selectable` is true.

## Behaviour

- The value axis always includes zero and uses rounded ticks (steps of 1, 2 or 5 × 10ⁿ), with faint gridlines. Negative values extend below or left of zero.
- Bars have rounded data ends and square baselines. Grouped bars are separated by a 2px gap.
- A legend appears only for two or more series. Legend and label text use text tokens, never the series color.
- Long category labels are truncated with an ellipsis. The full label appears in the tooltip, the SVG `<title>`, and the data table.
- The chart fills its container's width and re-lays out on resize.

## Accessibility

- The chart is a `figure` named by `ariaLabel`. It contains a visually hidden table of categories by series with formatted values.
- When not selectable, the SVG is hidden from assistive technology. When selectable, each bar is a `button` announcing "label, series, value", or "label, value" for a single series.
- Focused bars show a `--cxs-color-focus` outline.

## Tokens

- `--cxs-chart-series-1` … `--cxs-chart-series-6`: series colors in this fixed order. A 7th or later series reuses slot 6, so fold extra series into "Other" instead.
- `--cxs-chart-axis`: the zero baseline.
- `--cxs-chart-grid`: gridlines.
- `--cxs-chart-label`: tick, category and legend text.
- `--cxs-color-surface`, `--cxs-color-border`, `--cxs-color-on-surface`, `--cxs-color-on-surface-muted`, `--cxs-radius-md`, `--cxs-shadow-sm`: the tooltip.
- `--cxs-color-focus`: the focus outline.

The default series colors were validated for color-blind separation against `#ffffff` (light) and `#0b0f0e` (dark). In light mode, slots 3–5 are below 3:1 contrast against the surface. Charts using three or more series should keep values readable without hover, for example with a visible table or labels.
