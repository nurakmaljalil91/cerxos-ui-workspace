import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  afterNextRender,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  BarChartBar,
  BarChartOrientation,
  computeBarChartLayout,
  isEmptyChart
} from './bar-chart-layout';

/** Orientation of a `cxs-bar-chart`. */
export type CxsBarChartOrientation = BarChartOrientation;

/** One named series: one value per category, in category order. */
export interface CxsBarChartSeries {
  name: string;
  values: readonly number[];
}

/** Emitted when the user selects a bar. */
export interface CxsBarChartSelection {
  categoryIndex: number;
  category: string;
  seriesIndex: number;
}

/**
 * Light-theme defaults for the series tokens, used as CSS `var()` fallbacks so the chart keeps
 * its colors when the host's theme CSS predates the chart tokens. Further series reuse slot 6.
 */
const SERIES_FALLBACKS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300'];

/** Chrome colors with fallbacks, for the same reason. */
export const CXS_BAR_CHART_COLORS = {
  axis: 'var(--cxs-chart-axis, #94a3b8)',
  grid: 'var(--cxs-chart-grid, #e2e8f0)',
  label: 'var(--cxs-chart-label, #64748b)'
} as const;
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 280;

const defaultNumberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

/**
 * Accessible, themeable bar chart. Supports vertical and horizontal orientation, grouped
 * series, negative values, tooltips on hover and focus, and optional keyboard-selectable bars.
 * Data is exposed to assistive technology as a visually hidden table.
 */
@Component({
  selector: 'cxs-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  host: { class: 'block w-full' },
  styles: [
    `
      /* Layout-critical rules live here, not only in Tailwind classes, so the chart sizes and
         the data table stays hidden even when a host's Tailwind build omits these utilities. */
      :host {
        display: block;
        width: 100%;
      }

      .cxs-bar-chart__figure {
        position: relative;
        margin: 0;
      }

      .cxs-bar-chart__plot {
        position: relative;
        width: 100%;
      }

      .cxs-bar-chart__tooltip {
        position: absolute;
        pointer-events: none;
        transform: translate(-50%, -100%);
      }

      .cxs-bar-chart__svg {
        display: block;
        width: 100%;
        overflow: visible;
      }

      .cxs-bar-chart__sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .cxs-bar-chart__hit:focus {
        outline: none;
      }

      .cxs-bar-chart__hit:focus-visible {
        outline: 2px solid var(--cxs-color-focus);
        outline-offset: -2px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsBarChartComponent {
  private static nextId = 0;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly categoriesSig = signal<readonly string[]>([]);
  private readonly seriesSig = signal<readonly CxsBarChartSeries[]>([]);
  private readonly orientationSig = signal<CxsBarChartOrientation>('vertical');
  private readonly heightSig = signal(DEFAULT_HEIGHT);
  private readonly formatSig = signal<(value: number) => string>((v) => defaultNumberFormat.format(v));
  private readonly widthSig = signal(0);

  /** Category labels, in display order. */
  @Input() set categories(value: readonly string[] | null | undefined) {
    this.categoriesSig.set(value ?? []);
    // New data invalidates any tooltip for the previous data.
    this.activeBar.set(null);
  }
  get categories(): readonly string[] {
    return this.categoriesSig();
  }

  /** Series to draw; each has one value per category. */
  @Input() set series(value: readonly CxsBarChartSeries[] | null | undefined) {
    this.seriesSig.set(value ?? []);
    this.activeBar.set(null);
  }
  get series(): readonly CxsBarChartSeries[] {
    return this.seriesSig();
  }

  /** `vertical` (default): bars rise from the bottom. `horizontal`: bars extend to the right. */
  @Input() set orientation(value: CxsBarChartOrientation) {
    this.orientationSig.set(value === 'horizontal' ? 'horizontal' : 'vertical');
  }
  get orientation(): CxsBarChartOrientation {
    return this.orientationSig();
  }

  /** Height in pixels of a vertical chart. Horizontal charts size to their rows. */
  @Input() set height(value: number) {
    this.heightSig.set(Number.isFinite(value) && value > 0 ? value : DEFAULT_HEIGHT);
  }
  get height(): number {
    return this.heightSig();
  }

  /** Formats values for ticks, tooltips and accessible text. */
  @Input() set valueFormat(value: ((value: number) => string) | null | undefined) {
    this.formatSig.set(value ?? ((v) => defaultNumberFormat.format(v)));
  }

  /** Accessible name describing what the chart shows. Required. */
  @Input({ required: true }) ariaLabel!: string;

  /** When true, bars are focusable and selectable with click, Enter or Space. */
  @Input() selectable = false;

  /** Message shown instead of the chart when there is no data. */
  @Input() emptyMessage = 'No data';

  /** Emits when a bar is selected (only when `selectable`). */
  @Output() readonly barSelect = new EventEmitter<CxsBarChartSelection>();

  readonly chartId = `cxs-bar-chart-${CxsBarChartComponent.nextId++}`;

  /** The bar whose tooltip is showing. */
  readonly activeBar = signal<BarChartBar | null>(null);

  readonly empty = computed(() =>
    isEmptyChart({ categories: this.categoriesSig(), series: this.seriesSig() })
  );

  readonly layout = computed(() =>
    computeBarChartLayout({
      categories: this.categoriesSig(),
      series: this.seriesSig(),
      orientation: this.orientationSig(),
      width: this.widthSig() || DEFAULT_WIDTH,
      height: this.heightSig(),
      format: this.formatSig()
    })
  );

  readonly showLegend = computed(() => this.seriesSig().length > 1);

  readonly vertical = computed(() => this.orientationSig() === 'vertical');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const element = this.host.nativeElement;
      this.widthSig.set(element.clientWidth);
      if (typeof ResizeObserver === 'undefined') {
        return;
      }

      const observer = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width ?? element.clientWidth;
        if (Math.abs(width - this.widthSig()) >= 1) {
          this.widthSig.set(width);
        }
      });
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** CSS color for a series, from the chart tokens. */
  seriesColor(index: number): string {
    const slot = Math.min(index, SERIES_FALLBACKS.length - 1);
    return `var(--cxs-chart-series-${slot + 1}, ${SERIES_FALLBACKS[slot]})`;
  }

  readonly colors = CXS_BAR_CHART_COLORS;

  /** Formats a value with the configured formatter. */
  format(value: number): string {
    return this.formatSig()(value);
  }

  /** Value for the hidden table cell. */
  cellValue(series: CxsBarChartSeries, categoryIndex: number): string {
    return this.format(series.values[categoryIndex] ?? 0);
  }

  barLabel(bar: BarChartBar): string {
    return this.showLegend()
      ? `${bar.category}, ${bar.seriesName}, ${bar.formattedValue}`
      : `${bar.category}, ${bar.formattedValue}`;
  }

  showTooltip(bar: BarChartBar): void {
    this.activeBar.set(bar);
  }

  hideTooltip(bar: BarChartBar): void {
    if (this.activeBar()?.key === bar.key) {
      this.activeBar.set(null);
    }
  }

  select(bar: BarChartBar, event?: Event): void {
    if (!this.selectable) {
      return;
    }

    event?.preventDefault();
    this.barSelect.emit({
      categoryIndex: bar.categoryIndex,
      category: bar.category,
      seriesIndex: bar.seriesIndex
    });
  }

  /** Tooltip position in percent of the chart box, so it scales with the SVG viewBox. */
  tooltipLeft(bar: BarChartBar): number {
    const width = this.layout().width || 1;
    return (bar.anchor.x / width) * 100;
  }

  tooltipTop(bar: BarChartBar): number {
    const height = this.layout().height || 1;
    return (bar.anchor.y / height) * 100;
  }

}
