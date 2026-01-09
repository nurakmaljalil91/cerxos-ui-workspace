import type { Meta, StoryObj } from '@storybook/angular';

import { CxsSelectComponent } from './select.component';

const meta: Meta<CxsSelectComponent> = {
  title: 'Cerxos UI/Select',
  component: CxsSelectComponent,
  args: {
    value: '',
    placeholder: 'Select an option',
    variant: 'outline',
    size: 'md',
    disabled: false,
    required: false,
    invalid: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-select
        [value]="value"
        (valueChange)="value = $event"
        [placeholder]="placeholder"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [required]="required"
        [invalid]="invalid"
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </cxs-select>
    `
  })
};

export default meta;
type Story = StoryObj<CxsSelectComponent>;

export const Outline: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-3 max-w-sm">
        <cxs-select size="sm">
          <option value="one">Small</option>
        </cxs-select>
        <cxs-select size="md">
          <option value="one">Medium</option>
        </cxs-select>
        <cxs-select size="lg">
          <option value="one">Large</option>
        </cxs-select>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: { disabled: true, value: 'admin' }
};

export const Invalid: Story = {
  args: { invalid: true, value: 'admin' }
};

export const Placeholder: Story = {
  args: { value: '', placeholder: 'Choose a role' }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-sm"
        style="
          --cxs-color-surface: #fef3c7;
          --cxs-color-surface-hover: #fde68a;
          --cxs-color-border: #f59e0b;
          --cxs-color-focus: #d97706;
          --cxs-color-on-surface: #92400e;
          --cxs-color-on-surface-muted: #b45309;
          --cxs-color-danger: #b91c1c;
        "
      >
        <cxs-select>
          <option value="one">Branded option</option>
        </cxs-select>
      </div>
    `
  })
};
