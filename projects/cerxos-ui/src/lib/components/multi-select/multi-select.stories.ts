import type { Meta, StoryObj } from '@storybook/angular';

import { CxsMultiSelectComponent } from './multi-select.component';

const meta: Meta<CxsMultiSelectComponent> = {
  title: 'Cerxos UI/Multi Select',
  component: CxsMultiSelectComponent,
  args: {
    value: [],
    options: [
      { label: 'Platform', value: 'platform' },
      { label: 'Design', value: 'design' },
      { label: 'Product', value: 'product' },
      { label: 'Sales', value: 'sales' },
      { label: 'Growth', value: 'growth' }
    ],
    placeholder: 'Search teams',
    variant: 'outline',
    size: 'md',
    disabled: false,
    readonly: false,
    invalid: false,
    maxSelections: undefined
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-multi-select
        [value]="value"
        (valueChange)="value = $event"
        [options]="options"
        [placeholder]="placeholder"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [maxSelections]="maxSelections"
        label="Teams"
      ></cxs-multi-select>
    `
  })
};

export default meta;
type Story = StoryObj<CxsMultiSelectComponent>;

export const Outline: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' }
};

export const Sizes: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'Platform', value: 'platform' },
        { label: 'Design', value: 'design' }
      ]
    },
    template: `
      <div class="grid gap-3 max-w-sm">
        <cxs-multi-select size="sm" label="Small" [options]="options"></cxs-multi-select>
        <cxs-multi-select size="md" label="Medium" [options]="options"></cxs-multi-select>
        <cxs-multi-select size="lg" label="Large" [options]="options"></cxs-multi-select>
      </div>
    `
  })
};

export const MaxSelections: Story = {
  args: { maxSelections: 2, value: ['platform'] }
};

export const Disabled: Story = {
  args: { disabled: true, value: ['design', 'product'] }
};

export const Invalid: Story = {
  args: { invalid: true, value: ['sales'] }
};
