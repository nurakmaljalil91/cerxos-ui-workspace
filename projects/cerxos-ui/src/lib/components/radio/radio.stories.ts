import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { CxsRadioComponent } from './radio.component';

const meta: Meta<CxsRadioComponent> = {
  title: 'Cerxos UI/Radio',
  component: CxsRadioComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CxsRadioComponent]
    })
  ],
  args: {
    value: 'basic',
    name: 'plan',
    variant: 'primary',
    size: 'md',
    disabled: false,
    required: false,
    invalid: false
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="grid gap-2">
        <cxs-radio
          [(ngModel)]="value"
          [name]="name"
          value="basic"
          [variant]="variant"
          [size]="size"
          [disabled]="disabled"
          [required]="required"
          [invalid]="invalid"
        >
          Basic
        </cxs-radio>
        <cxs-radio
          [(ngModel)]="value"
          [name]="name"
          value="pro"
          [variant]="variant"
          [size]="size"
          [disabled]="disabled"
          [required]="required"
          [invalid]="invalid"
        >
          Pro
        </cxs-radio>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsRadioComponent>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' }
};

export const Sizes: Story = {
  render: () => ({
    props: {
      sizeValue: 'sm'
    },
    template: `
      <div class="grid gap-2">
        <cxs-radio [(ngModel)]="sizeValue" name="size" value="sm" size="sm">Small</cxs-radio>
        <cxs-radio [(ngModel)]="sizeValue" name="size" value="md" size="md">Medium</cxs-radio>
        <cxs-radio [(ngModel)]="sizeValue" name="size" value="lg" size="lg">Large</cxs-radio>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Focus: Story = {
  render: () => ({
    props: {
      focusValue: 'first'
    },
    template: `
      <div class="grid gap-2">
        <cxs-radio [(ngModel)]="focusValue" name="focus" value="first" [autofocus]="true">
          Focused on load
        </cxs-radio>
        <cxs-radio [(ngModel)]="focusValue" name="focus" value="second">Second option</cxs-radio>
      </div>
    `
  })
};

export const Invalid: Story = {
  args: { invalid: true }
};

export const ThemeOverride: Story = {
  render: () => ({
    props: {
      themeValue: 'one'
    },
    template: `
      <div
        class="max-w-sm"
        style="
          --cxs-color-surface: #fff7ed;
          --cxs-color-border: #f97316;
          --cxs-color-focus: #ea580c;
          --cxs-color-on-surface: #9a3412;
          --cxs-color-on-surface-muted: #c2410c;
          --cxs-color-primary: #ea580c;
          --cxs-color-danger: #b91c1c;
        "
      >
        <div class="grid gap-2">
          <cxs-radio [(ngModel)]="themeValue" name="theme" value="one">Branded option</cxs-radio>
          <cxs-radio [(ngModel)]="themeValue" name="theme" value="two">Alternate option</cxs-radio>
        </div>
      </div>
    `
  })
};
