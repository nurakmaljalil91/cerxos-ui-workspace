import type { Meta, StoryObj } from '@storybook/angular';

import { CxsProgressBarComponent } from './progress-bar.component';

const meta: Meta<CxsProgressBarComponent> = {
  title: 'Cerxos UI/Progress Bar',
  component: CxsProgressBarComponent,
  args: {
    value: 64,
    max: 100,
    variant: 'primary',
    size: 'md',
    label: 'Workspace adoption',
    showValue: true,
    indeterminate: false,
    ariaLabel: 'Workspace adoption progress'
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md">
        <cxs-progress-bar
          [value]="value"
          [max]="max"
          [variant]="variant"
          [size]="size"
          [label]="label"
          [showValue]="showValue"
          [indeterminate]="indeterminate"
          [ariaLabel]="ariaLabel"
        ></cxs-progress-bar>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsProgressBarComponent>;

export const Primary: Story = {};

export const Neutral: Story = {
  args: {
    variant: 'neutral'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Migration risk'
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex max-w-md flex-col gap-4">
        <cxs-progress-bar size="sm" [value]="32" label="Small" [showValue]="true"></cxs-progress-bar>
        <cxs-progress-bar size="md" [value]="58" label="Medium" [showValue]="true"></cxs-progress-bar>
        <cxs-progress-bar size="lg" [value]="81" label="Large" [showValue]="true"></cxs-progress-bar>
      </div>
    `
  })
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    showValue: true,
    label: 'Syncing workspace'
  }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-md"
        style="
          --cxs-color-primary: #0ea5e9;
          --cxs-color-danger: #b91c1c;
          --cxs-color-surface-hover: #e0f2fe;
          --cxs-color-on-surface: #0c4a6e;
          --cxs-color-on-surface-muted: #0369a1;
        "
      >
        <div class="flex flex-col gap-4">
          <cxs-progress-bar [value]="72" label="Primary theme" [showValue]="true"></cxs-progress-bar>
          <cxs-progress-bar
            variant="danger"
            [value]="41"
            label="Danger theme"
            [showValue]="true"
          ></cxs-progress-bar>
        </div>
      </div>
    `
  })
};
