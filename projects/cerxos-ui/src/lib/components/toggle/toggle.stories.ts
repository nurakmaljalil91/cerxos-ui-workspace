import type { Meta, StoryObj } from '@storybook/angular';

import { CxsToggleComponent } from './toggle.component';

const meta: Meta<CxsToggleComponent> = {
  title: 'Cerxos UI/Toggle',
  component: CxsToggleComponent,
  args: {
    checked: false,
    disabled: false,
    size: 'md',
    label: 'Email alerts'
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-toggle
        [checked]="checked"
        [disabled]="disabled"
        [size]="size"
        [label]="label"
        (checkedChange)="checked = $event"
      ></cxs-toggle>
    `
  })
};

export default meta;
type Story = StoryObj<CxsToggleComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-3">
        <cxs-toggle size="sm" label="Small"></cxs-toggle>
        <cxs-toggle size="md" label="Medium"></cxs-toggle>
        <cxs-toggle size="lg" label="Large"></cxs-toggle>
      </div>
    `
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        style="
          --cxs-color-primary: #2563eb;
          --cxs-color-on-primary: #ffffff;
          --cxs-color-surface: #f8fafc;
          --cxs-color-on-surface: #0f172a;
          --cxs-color-on-surface-muted: #475569;
          --cxs-color-border: #cbd5e1;
          --cxs-color-focus: #f97316;
        "
      >
        <cxs-toggle label="Custom theme"></cxs-toggle>
      </div>
    `
  })
};
