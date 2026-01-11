import type { Meta, StoryObj } from '@storybook/angular';

import { CxsBadgeComponent } from './badge.component';

const meta: Meta<CxsBadgeComponent> = {
  title: 'Cerxos UI/Badge',
  component: CxsBadgeComponent,
  args: {
    variant: 'primary',
    size: 'md'
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-badge [variant]="variant" [size]="size">Beta</cxs-badge>
    `
  })
};

export default meta;
type Story = StoryObj<CxsBadgeComponent>;

export const Primary: Story = {};

export const Neutral: Story = {
  args: { variant: 'neutral' }
};

export const Danger: Story = {
  args: { variant: 'danger' }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <cxs-badge size="sm">Small</cxs-badge>
        <cxs-badge size="md">Medium</cxs-badge>
      </div>
    `
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-md"
        style="
          --cxs-color-primary: #0ea5e9;
          --cxs-color-primary-ghost: rgba(14, 165, 233, 0.12);
          --cxs-color-border: #bae6fd;
          --cxs-color-on-surface: #0c4a6e;
          --cxs-color-danger: #b91c1c;
        "
      >
        <div class="flex flex-wrap items-center gap-2">
          <cxs-badge>Release</cxs-badge>
          <cxs-badge variant="neutral">Neutral</cxs-badge>
          <cxs-badge variant="danger">Blocked</cxs-badge>
        </div>
      </div>
    `
  })
};
