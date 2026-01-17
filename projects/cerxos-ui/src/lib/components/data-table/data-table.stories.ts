import type { Meta, StoryObj } from '@storybook/angular';

import { CxsDataTableColumn, CxsDataTableComponent } from './data-table.component';

const columns: CxsDataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated', align: 'right', sortable: true }
];

const data = [
  { name: 'Alpha', status: 'Active', updated: '2h ago' },
  { name: 'Beta', status: 'Paused', updated: 'Yesterday' },
  { name: 'Gamma', status: 'Active', updated: 'Just now' },
  { name: 'Delta', status: 'Active', updated: '2d ago' },
  { name: 'Omega', status: 'Paused', updated: 'Last week' }
];

const meta: Meta<CxsDataTableComponent> = {
  title: 'Cerxos UI/Data Table',
  component: CxsDataTableComponent,
  args: {
    columns,
    data,
    caption: 'Project status table',
    striped: true,
    bordered: true,
    compact: false,
    pageSize: 3,
    pageIndex: 1
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-data-table
        [columns]="columns"
        [data]="data"
        [caption]="caption"
        [striped]="striped"
        [bordered]="bordered"
        [compact]="compact"
        [pageSize]="pageSize"
        [pageIndex]="pageIndex"
      ></cxs-data-table>
    `
  })
};

export default meta;
type Story = StoryObj<CxsDataTableComponent>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true }
};

export const ManualPagination: Story = {
  args: {
    manualPagination: true,
    total: 42,
    data: data.slice(0, 3)
  }
};

export const ThemeOverride: Story = {
  render: () => ({
    props: { columns, data },
    template: `
      <div
        style="
          --cxs-color-surface: #ffffff;
          --cxs-color-surface-hover: #f1f5f9;
          --cxs-color-on-surface: #0f172a;
          --cxs-color-on-surface-muted: #475569;
          --cxs-color-border: #cbd5e1;
          --cxs-color-focus: #f97316;
          --cxs-radius-md: 12px;
          --cxs-shadow-sm: 0 10px 24px rgba(15, 23, 42, 0.12);
        "
      >
        <cxs-data-table [columns]="columns" [data]="data" [pageSize]="3"></cxs-data-table>
      </div>
    `
  })
};
