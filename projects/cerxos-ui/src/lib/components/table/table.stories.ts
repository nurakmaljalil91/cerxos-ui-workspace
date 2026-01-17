import type { Meta, StoryObj } from '@storybook/angular';

import { CxsTableComponent, CxsTableColumn } from './table.component';

const columns: CxsTableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Updated', align: 'right' }
];

const data = [
  { name: 'Alpha', status: 'Active', updated: '2h ago' },
  { name: 'Beta', status: 'Paused', updated: 'Yesterday' },
  { name: 'Gamma', status: 'Active', updated: 'Just now' }
];

const meta: Meta<CxsTableComponent> = {
  title: 'Cerxos UI/Table',
  component: CxsTableComponent,
  args: {
    columns,
    data,
    caption: 'Team status table',
    striped: false,
    bordered: false,
    compact: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-table
        [columns]="columns"
        [data]="data"
        [caption]="caption"
        [striped]="striped"
        [bordered]="bordered"
        [compact]="compact"
      ></cxs-table>
    `
  })
};

export default meta;
type Story = StoryObj<CxsTableComponent>;

export const Default: Story = {};

export const Striped: Story = {
  args: { striped: true }
};

export const Bordered: Story = {
  args: { bordered: true }
};

export const Compact: Story = {
  args: { compact: true }
};

export const Empty: Story = {
  args: { data: [] }
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
          --cxs-radius-md: 12px;
          --cxs-shadow-sm: 0 10px 24px rgba(15, 23, 42, 0.12);
        "
      >
        <cxs-table [columns]="columns" [data]="data" striped bordered></cxs-table>
      </div>
    `
  })
};
