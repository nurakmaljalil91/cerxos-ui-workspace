import type { Meta, StoryObj } from '@storybook/angular';

import { CxsThemeDirective } from '../../directives/theme/theme.directive';
import { CxsBarChartComponent } from './bar-chart.component';

const money = (v: number) =>
  `RM ${v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const meta: Meta<CxsBarChartComponent> = {
  title: 'Cerxos UI/Bar Chart',
  component: CxsBarChartComponent,
  args: {
    categories: ['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026'],
    series: [
      { name: 'Income', values: [8600, 8600, 9100, 8600, 12400, 8600] },
      { name: 'Spending', values: [5200, 4700, 6100, 5300, 7900, 4800] }
    ],
    orientation: 'vertical',
    selectable: false,
    ariaLabel: 'Monthly income and spending',
    emptyMessage: 'No data'
  },
  render: (args) => ({
    props: { ...args, money },
    template: `
      <div class="max-w-3xl">
        <cxs-bar-chart
          [categories]="categories"
          [series]="series"
          [orientation]="orientation"
          [selectable]="selectable"
          [valueFormat]="money"
          [ariaLabel]="ariaLabel"
          [emptyMessage]="emptyMessage"
        ></cxs-bar-chart>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsBarChartComponent>;

export const VerticalGrouped: Story = {};

export const HorizontalSelectable: Story = {
  args: {
    orientation: 'horizontal',
    selectable: true,
    ariaLabel: 'Spending by category',
    categories: ['Food', 'Transportation', 'Housing', 'Health', 'Shopping', 'Subscriptions'],
    series: [{ name: 'Spending', values: [7200, 3100, 2900, 2400, 2100, 1300] }]
  },
  render: (args) => ({
    props: { ...args, money, last: '' },
    template: `
      <div class="max-w-xl">
        <cxs-bar-chart
          [categories]="categories"
          [series]="series"
          orientation="horizontal"
          [selectable]="true"
          [valueFormat]="money"
          [ariaLabel]="ariaLabel"
          (barSelect)="last = $event.category"
        ></cxs-bar-chart>
        <p class="mt-2 text-sm text-[var(--cxs-color-on-surface-muted)]">Selected: {{ last || 'none' }}</p>
      </div>
    `
  })
};

export const NegativeValues: Story = {
  args: {
    ariaLabel: 'Monthly net',
    series: [{ name: 'Net', values: [3400, 3900, -800, 3300, 4500, -1200] }]
  }
};

export const Empty: Story = {
  args: {
    categories: [],
    series: [],
    emptyMessage: 'No income or spending in this period'
  }
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: { ...args, money },
    moduleMetadata: { imports: [CxsThemeDirective] },
    template: `
      <div cxsTheme="dark" class="max-w-3xl rounded-[var(--cxs-radius-md)] bg-[var(--cxs-color-surface)] p-4">
        <cxs-bar-chart
          [categories]="categories"
          [series]="series"
          [valueFormat]="money"
          [ariaLabel]="ariaLabel"
        ></cxs-bar-chart>
      </div>
    `
  })
};
