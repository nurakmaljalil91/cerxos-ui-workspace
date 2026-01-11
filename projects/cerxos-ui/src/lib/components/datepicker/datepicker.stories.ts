import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { CxsDatepickerComponent } from './datepicker.component';

const meta: Meta<CxsDatepickerComponent> = {
  title: 'Cerxos UI/Datepicker',
  component: CxsDatepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CxsDatepickerComponent]
    })
  ],
  args: {
    value: '2024-04-01',
    variant: 'outline',
    size: 'md',
    useNative: true,
    disabled: false,
    required: false,
    invalid: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-datepicker
        [(ngModel)]="value"
        [variant]="variant"
        [size]="size"
        [useNative]="useNative"
        [disabled]="disabled"
        [required]="required"
        [invalid]="invalid"
      ></cxs-datepicker>
    `
  })
};

export default meta;
type Story = StoryObj<CxsDatepickerComponent>;

export const Outline: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' }
};

export const CustomOverlay: Story = {
  args: { useNative: false, value: '2024-03-10' }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-2 max-w-xs">
        <cxs-datepicker size="sm"></cxs-datepicker>
        <cxs-datepicker size="md"></cxs-datepicker>
        <cxs-datepicker size="lg"></cxs-datepicker>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Invalid: Story = {
  args: { invalid: true }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-xs"
        style="
          --cxs-color-surface: #ecfeff;
          --cxs-color-surface-hover: #cffafe;
          --cxs-color-border: #22d3ee;
          --cxs-color-focus: #0891b2;
          --cxs-color-on-surface: #164e63;
          --cxs-color-on-surface-muted: #0e7490;
          --cxs-color-danger: #b91c1c;
        "
      >
        <cxs-datepicker [useNative]="false"></cxs-datepicker>
      </div>
    `
  })
};
