import type { Meta, StoryObj } from '@storybook/angular';

import { CxsInputComponent } from './input.component';

const meta: Meta<CxsInputComponent> = {
  title: 'Cerxos UI/Input',
  component: CxsInputComponent,
  args: {
    value: '',
    label: '',
    placeholder: 'Enter text',
    variant: 'outline',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    type: 'text',
    autofocus: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-input
        [value]="value"
        (valueChange)="value = $event"
        [label]="label"
        [placeholder]="placeholder"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [invalid]="invalid"
        [type]="type"
        [autofocus]="autofocus"
      ></cxs-input>
    `
  })
};

export default meta;
type Story = StoryObj<CxsInputComponent>;

export const Outline: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-3 max-w-sm">
        <cxs-input size="sm" placeholder="Small"></cxs-input>
        <cxs-input size="md" placeholder="Medium"></cxs-input>
        <cxs-input size="lg" placeholder="Large"></cxs-input>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled input' }
};

export const Invalid: Story = {
  args: { invalid: true, value: 'Invalid value' }
};

export const Focus: Story = {
  args: { autofocus: true, placeholder: 'Focused on load' }
};

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'Enter your email' }
};

export const WithError: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm">
        <cxs-input
          label="Email address"
          placeholder="name@company.com"
          [invalid]="true"
        >
          <span cxsInputError>Enter a valid email address.</span>
        </cxs-input>
      </div>
    `
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-sm"
        style="
          --cxs-color-surface: #fff7ed;
          --cxs-color-surface-hover: #ffedd5;
          --cxs-color-border: #f97316;
          --cxs-color-focus: #ea580c;
          --cxs-color-on-surface: #9a3412;
          --cxs-color-on-surface-muted: #c2410c;
          --cxs-color-danger: #b91c1c;
        "
      >
        <cxs-input placeholder="Branded input"></cxs-input>
      </div>
    `
  })
};
