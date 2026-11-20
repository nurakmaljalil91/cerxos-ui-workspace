import { scaleBand, scaleLinear } from 'd3-scale';

/**
 * Internal geometry for `cxs-bar-chart`. Pure functions only: d3 is used for scale maths and
 * never touches the DOM. Not exported from the public API.
 */

export type BarChartOrientation = 'vertical' | 'horizontal';

export interface BarChartLayoutInput {
  categories: readonly string[];
  series: readonly { name: string; values: readonly number[] }[];
  orientation: BarChartOrientation;
  width: number;
  /** Plot height for vertical charts; ignored for horizontal charts (height follows row count). */
  height: number;
  format: (value: number) => string;
}

export interface BarChartTick {
  value: number;
  /** Pixel position along the value axis (y for vertical, x for horizontal). */
  pos: number;
  label: string;
}

export interface BarChartBar {
  key: string;
  categoryIndex: number;
  seriesIndex: number;
  category: string;
  seriesName: string;
  value: number;
  formattedValue: string;
  /** SVG path of the bar, rounded only at its data end. */
  path: string;
  /** Larger transparent hit target covering the bar's slot. */
  hit: { x: number; y: number; width: number; height: number };
  /** Anchor for the tooltip, in chart pixels. */
  anchor: { x: number; y: number };
}

export interface BarChartCategoryLabel {
  x: number;
  y: number;
  text: string;
  full: string;
  anchor: 'middle' | 'end';
}

export interface BarChartLayout {
  width: number;
  height: number;
  plot: { x: number; y: number; width: number; height: number };
  ticks: BarChartTick[];
  /** Pixel position of the zero line along the value axis. */
  zero: number;
  bars: BarChartBar[];
  labels: BarChartCategoryLabel[];
}

/** Approximate width of one character of 12px label text, used for truncation budgets. */
export const CHAR_WIDTH = 7;
const BAR_RADIUS = 4;
const SERIES_GAP = 2;
const HORIZONTAL_ROW_PER_SERIES = 18;
const HORIZONTAL_ROW_PADDING = 14;

/** True when there is nothing to draw: no categories, or every value is zero. */
export function isEmptyChart(input: Pick<BarChartLayoutInput, 'categories' | 'series'>): boolean {
  if (input.categories.length === 0 || input.series.length === 0) {
    return true;
  }

  return input.series.every((s) => input.categories.every((_, i) => !(s.values[i] ?? 0)));
}

/** Truncates text to fit a pixel budget, adding an ellipsis when shortened. */
export function truncateLabel(text: string, maxWidth: number): string {
  const maxChars = Math.max(1, Math.floor(maxWidth / CHAR_WIDTH));
  if (text.length <= maxChars) {
    return text;
  }

  return maxChars <= 1 ? '…' : `${text.slice(0, maxChars - 1).trimEnd()}…`;
}

/** Height a horizontal chart needs for its rows. */
export function horizontalChartHeight(categoryCount: number, seriesCount: number): number {
  const row = Math.max(1, seriesCount) * HORIZONTAL_ROW_PER_SERIES + HORIZONTAL_ROW_PADDING;
  return 8 + categoryCount * row + 24;
}

/**
 * Builds an SVG path for a bar whose data end (away from zero) has rounded corners and whose
 * baseline end is square.
 */
export function barPath(
  x: number,
  y: number,
  width: number,
  height: number,
  dataEnd: 'top' | 'bottom' | 'right' | 'left'
): string {
  const w = Math.max(0, width);
  const h = Math.max(0, height);
  const r = Math.min(BAR_RADIUS, w / 2, h / 2);
  const right = x + w;
  const bottom = y + h;

  switch (dataEnd) {
    case 'top':
      return `M${x},${bottom}V${y + r}Q${x},${y} ${x + r},${y}H${right - r}Q${right},${y} ${right},${y + r}V${bottom}Z`;
    case 'bottom':
      return `M${x},${y}H${right}V${bottom - r}Q${right},${bottom} ${right - r},${bottom}H${x + r}Q${x},${bottom} ${x},${bottom - r}Z`;
    case 'right':
      return `M${x},${y}H${right - r}Q${right},${y} ${right},${y + r}V${bottom - r}Q${right},${bottom} ${right - r},${bottom}H${x}Z`;
    case 'left':
      return `M${right},${y}V${bottom}H${x + r}Q${x},${bottom} ${x},${bottom - r}V${y + r}Q${x},${y} ${x + r},${y}Z`;
  }
}

function valueDomain(input: BarChartLayoutInput): [number, number] {
  let min = 0;
  let max = 0;
  for (const s of input.series) {
    for (let i = 0; i < input.categories.length; i++) {
      const v = s.values[i] ?? 0;
      if (Number.isFinite(v)) {
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
    }
  }

  return [min, max];
}

/** Computes all geometry for the chart. */
export function computeBarChartLayout(input: BarChartLayoutInput): BarChartLayout {
  const vertical = input.orientation === 'vertical';
  const width = Math.max(0, input.width);
  const seriesIndices = input.series.map((_, i) => i);
  const categoryIndices = input.categories.map((_, i) => i);
  const [min, max] = valueDomain(input);

  // First pass at tick labels to size the value-axis margin (vertical charts).
  const roughTicks = scaleLinear().domain([min, max]).nice(5).ticks(5);
  const tickLabelWidth = Math.max(...roughTicks.map((t) => input.format(t).length), 1) * CHAR_WIDTH;

  const margin = vertical
    ? { top: 8, right: 8, bottom: 28, left: Math.max(32, tickLabelWidth + 10) }
    : {
        top: 8,
        right: 16,
        bottom: 24,
        left: Math.min(
          Math.max(48, Math.max(...input.categories.map((c) => c.length), 1) * CHAR_WIDTH + 12),
          Math.max(48, width * 0.4)
        )
      };

  const height = vertical
    ? Math.max(margin.top + margin.bottom + 40, input.height)
    : horizontalChartHeight(input.categories.length, input.series.length);

  const plot = {
    x: margin.left,
    y: margin.top,
    width: Math.max(0, width - margin.left - margin.right),
    height: Math.max(0, height - margin.top - margin.bottom)
  };

  const valueLength = vertical ? plot.height : plot.width;
  const tickCount = Math.max(2, Math.floor(valueLength / (vertical ? 56 : 80)));
  const valueScale = scaleLinear()
    .domain([min, max])
    .nice(tickCount)
    .range(vertical ? [plot.y + plot.height, plot.y] : [plot.x, plot.x + plot.width]);

  const categoryScale = scaleBand<number>()
    .domain(categoryIndices)
    .range(vertical ? [plot.x, plot.x + plot.width] : [plot.y, plot.y + plot.height])
    .paddingInner(vertical ? 0.24 : 0.28)
    .paddingOuter(vertical ? 0.12 : 0.14);

  const seriesScale = scaleBand<number>()
    .domain(seriesIndices)
    .range([0, categoryScale.bandwidth()])
    .paddingInner(0);

  const zero = valueScale(0);
  const ticks = valueScale.ticks(tickCount).map((value) => ({
    value,
    pos: valueScale(value),
    label: input.format(value)
  }));

  const gap = input.series.length > 1 ? SERIES_GAP : 0;
  const bars: BarChartBar[] = [];
  for (const c of categoryIndices) {
    const bandStart = categoryScale(c) ?? 0;
    for (const s of seriesIndices) {
      const value = input.series[s].values[c] ?? 0;
      const safe = Number.isFinite(value) ? value : 0;
      const slotStart = bandStart + (seriesScale(s) ?? 0);
      const slotSize = seriesScale.bandwidth();
      const thickness = Math.max(1, slotSize - gap);
      const end = valueScale(safe);
      const formattedValue = input.format(safe);
      const base = {
        key: `${c}-${s}`,
        categoryIndex: c,
        seriesIndex: s,
        category: input.categories[c],
        seriesName: input.series[s].name,
        value: safe,
        formattedValue
      };

      if (vertical) {
        const top = Math.min(zero, end);
        const length = Math.abs(zero - end);
        bars.push({
          ...base,
          path: barPath(slotStart, top, thickness, length, safe >= 0 ? 'top' : 'bottom'),
          hit: { x: slotStart, y: plot.y, width: slotSize, height: plot.height },
          anchor: { x: slotStart + thickness / 2, y: safe >= 0 ? top : top + length }
        });
      } else {
        const left = Math.min(zero, end);
        const length = Math.abs(zero - end);
        bars.push({
          ...base,
          path: barPath(left, slotStart, length, thickness, safe >= 0 ? 'right' : 'left'),
          hit: { x: plot.x, y: slotStart, width: plot.width, height: slotSize },
          anchor: { x: safe >= 0 ? left + length : left, y: slotStart + thickness / 2 }
        });
      }
    }
  }

  const labels: BarChartCategoryLabel[] = categoryIndices.map((c) => {
    const full = input.categories[c];
    const center = (categoryScale(c) ?? 0) + categoryScale.bandwidth() / 2;
    if (vertical) {
      const budget = categoryScale.step();
      return { x: center, y: plot.y + plot.height + 18, text: truncateLabel(full, budget), full, anchor: 'middle' };
    }

    return { x: plot.x - 8, y: center, text: truncateLabel(full, margin.left - 12), full, anchor: 'end' };
  });

  return { width, height, plot, ticks, zero, bars, labels };
}
