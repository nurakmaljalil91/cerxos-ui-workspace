import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CxsBarChartComponent,
  CxsBarChartOrientation,
  CxsBarChartSelection,
  CxsBarChartSeries
} from './bar-chart.component';
import { barPath, computeBarChartLayout, isEmptyChart, truncateLabel } from './bar-chart-layout';

describe('CxsBarChartComponent', () => {
  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsBarChartComponent],
    template: `
      <div style="width: 640px">
        <cxs-bar-chart
          [categories]="categories"
          [series]="series"
          [orientation]="orientation"
          [valueFormat]="valueFormat"
          [selectable]="selectable"
          [emptyMessage]="emptyMessage"
          ariaLabel="Monthly income and spending"
          (barSelect)="selected.push($event)"
        ></cxs-bar-chart>
      </div>
    `
  })
  class TestHostComponent {
    categories: string[] = ['Jan', 'Feb'];
    series: CxsBarChartSeries[] = [
      { name: 'Income', values: [100, 120] },
      { name: 'Spending', values: [80, 90] }
    ];
    orientation: CxsBarChartOrientation = 'vertical';
    valueFormat: ((v: number) => string) | undefined = undefined;
    selectable = false;
    emptyMessage = 'No data';
    selected: CxsBarChartSelection[] = [];
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  const el = (): HTMLElement => fixture.nativeElement as HTMLElement;
  const all = (testId: string): Element[] => Array.from(el().querySelectorAll(`[data-testid="${testId}"]`));
  const one = (testId: string): Element | null => el().querySelector(`[data-testid="${testId}"]`);

  /** Bar length along the value axis, read back from the rendered path's bounding box. */
  const barLength = (bar: Element, vertical = true): number => {
    const box = (bar as SVGGraphicsElement).getBBox();
    return vertical ? box.height : box.width;
  };

  const render = async (): Promise<void> => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    document.body.appendChild(fixture.nativeElement);
  });

  afterEach(() => {
    (fixture.nativeElement as HTMLElement).remove();
  });

  describe('rendering (task 3.3)', () => {
    it('draws one bar per series in each category, sized to the values', async () => {
      await render();

      const bars = all('bar');
      expect(bars.length).toBe(4);
      const byKey = (category: string, series: string) =>
        bars.find((b) => b.getAttribute('data-category') === category && b.getAttribute('data-series') === series)!;

      const janIncome = barLength(byKey('Jan', 'Income'));
      const janSpending = barLength(byKey('Jan', 'Spending'));
      const febIncome = barLength(byKey('Feb', 'Income'));
      expect(janSpending / janIncome).toBeCloseTo(0.8, 1);
      expect(febIncome / janIncome).toBeCloseTo(1.2, 1);
    });

    it('groups a category\'s series bars side by side', async () => {
      await render();

      const [janIncome, janSpending] = all('bar').slice(0, 2) as SVGGraphicsElement[];
      const a = janIncome.getBBox();
      const b = janSpending.getBBox();
      expect(b.x).toBeGreaterThan(a.x + a.width - 0.5);
      expect(b.x - (a.x + a.width)).toBeLessThan(4);
    });

    it('fills the width of its container', async () => {
      await render();

      const svg = el().querySelector('svg') as SVGSVGElement;
      expect(svg.getBoundingClientRect().width).toBeCloseTo(640, 0);
    });

    it('renders horizontal rows with labels on the left and bars extending right', async () => {
      host.orientation = 'horizontal';
      host.categories = ['Food', 'Transport', 'Housing', 'Health', 'Shopping'];
      host.series = [{ name: 'Spending', values: [500, 400, 300, 200, 100] }];
      await render();

      const labels = all('category-label');
      expect(labels.length).toBe(5);
      expect(labels.every((l) => l.getAttribute('text-anchor') === 'end')).toBeTrue();

      const bars = all('bar') as SVGGraphicsElement[];
      const firstLabelX = Number(labels[0].getAttribute('x'));
      expect(bars[0].getBBox().x).toBeGreaterThan(firstLabelX);
      expect(bars[0].getBBox().width).toBeGreaterThan(bars[4].getBBox().width);
    });

    it('truncates long labels with an ellipsis and keeps the full label', async () => {
      host.orientation = 'horizontal';
      host.categories = ['A very long category name that will not fit in the available label space at all'];
      host.series = [{ name: 'Spending', values: [10] }];
      await render();

      const label = one('category-label')!;
      expect(label.textContent).toContain('…');
      expect(label.querySelector('title')!.textContent).toBe(host.categories[0]);
      expect(one('data-table')!.textContent).toContain(host.categories[0]);
    });

    it('starts the value axis at zero with rounded ticks covering the largest value', async () => {
      host.series = [{ name: 'Spending', values: [1234, 50] }];
      await render();

      const ticks = all('tick').map((t) => Number(t.textContent!.replace(/[^\d.-]/g, '')));
      expect(ticks[0]).toBe(0);
      expect(Math.max(...ticks)).toBeGreaterThanOrEqual(1234);
      const steps = ticks.slice(1).map((t, i) => t - ticks[i]);
      expect(new Set(steps).size).toBe(1);
      expect([1, 2, 5].some((m) => (steps[0] / m) % 10 ** Math.floor(Math.log10(steps[0] / m)) === 0)).toBeTrue();
      expect(all('gridline').length).toBe(ticks.length);
    });

    it('uses the supplied formatter for ticks', async () => {
      host.series = [{ name: 'Spending', values: [1200] }];
      host.valueFormat = (v) => `RM ${(v / 1000).toFixed(1)}k`;
      await render();

      expect(all('tick').map((t) => t.textContent)).toContain('RM 1.2k');
    });

    it('extends negative bars from zero in the opposite direction', async () => {
      host.categories = ['A', 'B'];
      host.series = [{ name: 'Net', values: [100, -50] }];
      await render();

      const [positive, negative] = all('bar') as SVGGraphicsElement[];
      const zeroY = Number(one('baseline')!.getAttribute('y1'));
      expect(positive.getBBox().y + positive.getBBox().height).toBeCloseTo(zeroY, 0);
      expect(negative.getBBox().y).toBeCloseTo(zeroY, 0);
      expect(all('tick').some((t) => Number(t.textContent!.replace(/[^\d.-]/g, '')) < 0)).toBeTrue();
    });

    it('shows a legend for two series with their colors', async () => {
      await render();

      const legend = one('legend')!;
      expect(legend.textContent).toContain('Income');
      expect(legend.textContent).toContain('Spending');
      const swatches = all('legend-swatch') as HTMLElement[];
      expect(swatches[0].style.backgroundColor).toContain('var(--cxs-chart-series-1');
      expect(swatches[1].style.backgroundColor).toContain('var(--cxs-chart-series-2');
    });

    it('hides the legend for a single series', async () => {
      host.series = [{ name: 'Spending', values: [1, 2] }];
      await render();

      expect(one('legend')).toBeNull();
    });

    it('takes series colors from CSS variables so themes can override them', async () => {
      el().style.setProperty('--cxs-chart-series-1', 'rgb(1, 2, 3)');
      await render();

      const bar = all('bar')[0];
      expect(bar.getAttribute('fill')).toBe('var(--cxs-chart-series-1, #2a78d6)');
      expect(getComputedStyle(bar).fill).toBe('rgb(1, 2, 3)');
      const swatch = all('legend-swatch')[0] as HTMLElement;
      expect(getComputedStyle(swatch).backgroundColor).toBe('rgb(1, 2, 3)');
    });

    it('falls back to built-in colors when the theme does not define chart tokens', async () => {
      await render();

      // The test host loads no theme CSS, so the series token is undefined here.
      expect(getComputedStyle(all('bar')[0]).fill).toBe('rgb(42, 120, 214)');
      expect(getComputedStyle(all('legend-swatch')[1] as HTMLElement).backgroundColor).toBe('rgb(235, 104, 52)');
      expect(getComputedStyle(one('gridline')!).stroke).toBe('rgb(226, 232, 240)');
    });

    it('thins horizontal ticks so wide labels do not overlap', async () => {
      host.orientation = 'horizontal';
      host.categories = ['Other', 'Food'];
      host.series = [{ name: 'Spending', values: [-14329.5, 57800] }];
      host.valueFormat = (v) => `RM ${v.toLocaleString('en-MY', { minimumFractionDigits: 2 })}`;
      await render();

      const ticks = (all('tick') as SVGTextElement[]).map((t) => t.getBBox());
      for (let i = 1; i < ticks.length; i++) {
        expect(ticks[i].x).toBeGreaterThanOrEqual(ticks[i - 1].x + ticks[i - 1].width);
      }
    });

    it('exposes its data to assistive technology as a named table', async () => {
      host.valueFormat = (v) => `RM ${v}`;
      await render();

      const figure = el().querySelector('figure')!;
      expect(figure.getAttribute('aria-label')).toBe('Monthly income and spending');
      expect(el().querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');

      const table = one('data-table') as HTMLTableElement;
      expect(table.caption!.textContent).toContain('Monthly income and spending');
      const rows = Array.from(table.tBodies[0].rows).map((r) => Array.from(r.cells).map((c) => c.textContent!.trim()));
      expect(rows).toEqual([
        ['Jan', 'RM 100', 'RM 80'],
        ['Feb', 'RM 120', 'RM 90']
      ]);
    });

    it('shows the empty message when there are no categories', async () => {
      host.categories = [];
      host.series = [];
      await render();

      expect(one('empty')!.textContent!.trim()).toBe('No data');
      expect(all('bar').length).toBe(0);
      expect(el().querySelector('svg')).toBeNull();
    });

    it('shows a custom empty message when every value is zero', async () => {
      host.series = [{ name: 'Spending', values: [0, 0] }];
      host.emptyMessage = 'Nothing spent';
      await render();

      expect(one('empty')!.textContent!.trim()).toBe('Nothing spent');
    });
  });

  describe('tooltip and selection (task 3.4)', () => {
    const hitFor = (category: string, series: string): SVGRectElement => {
      const bars = all('bar');
      const index = bars.findIndex(
        (b) => b.getAttribute('data-category') === category && b.getAttribute('data-series') === series
      );
      return all('bar-hit')[index] as SVGRectElement;
    };

    it('shows a tooltip with category, series and value on hover, and hides it on leave', async () => {
      host.valueFormat = (v) => `RM ${v}`;
      await render();

      const hit = hitFor('Feb', 'Spending');
      hit.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      const tooltip = one('tooltip')!;
      expect(tooltip.textContent).toContain('Feb');
      expect(tooltip.textContent).toContain('Spending');
      expect(tooltip.textContent).toContain('RM 90');

      hit.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(one('tooltip')).toBeNull();
    });

    it('shows the full label in the tooltip when the axis label is truncated', async () => {
      host.orientation = 'horizontal';
      host.categories = ['A very long category name that will not fit in the available label space at all'];
      host.series = [{ name: 'Spending', values: [10] }];
      await render();

      all('bar-hit')[0].dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(one('tooltip')!.textContent).toContain(host.categories[0]);
    });

    it('shows the tooltip on focus and hides it when focus moves', async () => {
      host.selectable = true;
      await render();

      const [first, second] = all('bar-hit') as SVGRectElement[];
      first.focus();
      fixture.detectChanges();
      expect(one('tooltip')!.textContent).toContain('Jan');

      second.focus();
      fixture.detectChanges();
      expect(one('tooltip')!.textContent).toContain('Spending');
      second.blur();
      fixture.detectChanges();
      expect(one('tooltip')).toBeNull();
    });

    it('makes bars tabbable in reading order and selectable with Enter, Space and click', async () => {
      host.orientation = 'horizontal';
      host.categories = ['Food', 'Transport'];
      host.series = [{ name: 'Spending', values: [600, 400] }];
      host.selectable = true;
      await render();

      const hits = all('bar-hit') as SVGRectElement[];
      expect(hits.every((h) => h.getAttribute('tabindex') === '0' && h.getAttribute('role') === 'button')).toBeTrue();
      expect(hits.map((h) => h.getAttribute('aria-label'))).toEqual(['Food, 600', 'Transport, 400']);

      hits[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      hits[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      hits[0].dispatchEvent(new MouseEvent('click'));

      expect(host.selected).toEqual([
        { categoryIndex: 0, category: 'Food', seriesIndex: 0 },
        { categoryIndex: 1, category: 'Transport', seriesIndex: 0 },
        { categoryIndex: 0, category: 'Food', seriesIndex: 0 }
      ]);
    });

    it('announces label, series and value on grouped selectable bars', async () => {
      host.selectable = true;
      await render();

      expect(all('bar-hit')[1].getAttribute('aria-label')).toBe('Jan, Spending, 80');
      const svg = el().querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).toBeNull();
      expect(svg.getAttribute('aria-label')).toBe('Monthly income and spending');
    });

    it('clears the tooltip when the data changes', async () => {
      host.selectable = true;
      await render();
      all('bar-hit')[0].dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(one('tooltip')).not.toBeNull();

      host.categories = ['Dining Out', 'Groceries'];
      host.series = [{ name: 'Spending', values: [400, 200] }];
      await render();

      expect(one('tooltip')).toBeNull();
    });

    it('keeps bars out of the tab order and emits nothing when not selectable', async () => {
      host.selectable = false;
      await render();

      const hits = all('bar-hit');
      expect(hits.every((h) => !h.hasAttribute('tabindex') && !h.hasAttribute('role'))).toBeTrue();
      hits[0].dispatchEvent(new MouseEvent('click'));
      hits[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(host.selected).toEqual([]);
    });
  });

  describe('layout helpers', () => {
    it('truncates to the pixel budget', () => {
      expect(truncateLabel('Groceries', 200)).toBe('Groceries');
      expect(truncateLabel('Groceries and household', 70)).toBe('Groceries…');
    });

    it('detects empty input', () => {
      expect(isEmptyChart({ categories: [], series: [] })).toBeTrue();
      expect(isEmptyChart({ categories: ['a'], series: [{ name: 's', values: [0] }] })).toBeTrue();
      expect(isEmptyChart({ categories: ['a'], series: [{ name: 's', values: [3] }] })).toBeFalse();
    });

    it('rounds only the data end of a bar', () => {
      const up = barPath(0, 0, 20, 50, 'top');
      expect(up.startsWith('M0,50V4')).toBeTrue();
      const right = barPath(0, 0, 50, 20, 'right');
      expect(right.startsWith('M0,0H46')).toBeTrue();
    });

    it('includes zero in the value domain for all-positive data', () => {
      const layout = computeBarChartLayout({
        categories: ['a'],
        series: [{ name: 's', values: [50] }],
        orientation: 'vertical',
        width: 400,
        height: 200,
        format: String
      });
      expect(layout.ticks[0].value).toBe(0);
      expect(layout.zero).toBeCloseTo(layout.plot.y + layout.plot.height, 5);
    });
  });
});
