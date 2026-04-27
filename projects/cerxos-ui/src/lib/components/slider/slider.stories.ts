import type { Meta, StoryObj } from '@storybook/angular';

import { CxsSliderComponent } from './slider.component';

const meta: Meta<CxsSliderComponent> = {
  title: 'Cerxos UI/Slider',
  component: CxsSliderComponent,
  args: {
    value: 40,
    min: 0,
    max: 100,
    step: 5,
    variant: 'primary',
    size: 'md',
    label: 'Volume',
    showValue: true,
    ariaLabel: 'Volume'
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-md">
        <cxs-slider
          [value]="value"
          [min]="min"
          [max]="max"
          [step]="step"
          [variant]="variant"
          [size]="size"
          [label]="label"
          [showValue]="showValue"
          [ariaLabel]="ariaLabel"
        ></cxs-slider>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsSliderComponent>;

export const Primary: Story = {};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Risk threshold'
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex max-w-md flex-col gap-4">
        <cxs-slider size="sm" [value]="20" label="Small" [showValue]="true"></cxs-slider>
        <cxs-slider size="md" [value]="45" label="Medium" [showValue]="true"></cxs-slider>
        <cxs-slider size="lg" [value]="70" label="Large" [showValue]="true"></cxs-slider>
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
          --cxs-color-danger: #b91c1c;
          --cxs-color-surface-hover: #e0f2fe;
          --cxs-color-surface: #ffffff;
          --cxs-color-focus: #f97316;
        "
      >
        <div class="flex flex-col gap-4">
          <cxs-slider [value]="35" label="Primary theme" [showValue]="true"></cxs-slider>
          <cxs-slider
            variant="danger"
            [value]="62"
            label="Danger theme"
            [showValue]="true"
          ></cxs-slider>
        </div>
      </div>
    `
  })
};
