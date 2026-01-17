import type { Meta, StoryObj } from '@storybook/angular';

import { CxsDataTableColumn, CxsDataTableComponent } from './data-table.component';

const columns: CxsDataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, filterable: true, minWidth: 160, pinned: 'left' },
  {
    key: 'status',
    label: 'Status',
    filterable: true,
    filterType: 'select',
    filterOptions: [
      { label: 'Active', value: 'Active' },
      { label: 'Paused', value: 'Paused' }
    ]
  },
  { key: 'updated', label: 'Updated', align: 'right', sortable: true, filterable: true }
];

const data = [
  { id: 1, name: 'Alpha', status: 'Active', updated: '2h ago' },
  { id: 2, name: 'Beta', status: 'Paused', updated: 'Yesterday' },
  { id: 3, name: 'Gamma', status: 'Active', updated: 'Just now' },
  { id: 4, name: 'Delta', status: 'Active', updated: '2d ago' },
  { id: 5, name: 'Omega', status: 'Paused', updated: 'Last week' }
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
    pageIndex: 1,
    selectable: true,
    rowKey: 'id',
    bulkActions: [{ id: 'archive', label: 'Archive' }]
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
        [selectable]="selectable"
        [rowKey]="rowKey"
        [bulkActions]="bulkActions"
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

export const ColumnVisibility: Story = {
  args: {
    showColumnVisibility: true
  }
};

export const Filters: Story = {
  args: {
    showFilters: true,
    showGlobalSearch: true
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
