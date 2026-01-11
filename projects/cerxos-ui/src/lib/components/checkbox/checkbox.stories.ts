import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';

import { CxsCheckboxComponent } from './checkbox.component';

const meta: Meta<CxsCheckboxComponent> = {
  title: 'Cerxos UI/Checkbox',
  component: CxsCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CxsCheckboxComponent]
    })
  ],
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'md',
    label: 'Remember me'
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-checkbox
        [(ngModel)]="checked"
        [indeterminate]="indeterminate"
        [disabled]="disabled"
        [size]="size"
        [label]="label"
      ></cxs-checkbox>
    `
  })
};

export default meta;
type Story = StoryObj<CxsCheckboxComponent>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true }
};

export const Indeterminate: Story = {
  args: { indeterminate: true }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Sizes: Story = {
  render: () => ({
    props: {
      sizeValue: false
    },
    template: `
      <div class="grid gap-2">
        <cxs-checkbox [(ngModel)]="sizeValue" size="sm" label="Small"></cxs-checkbox>
        <cxs-checkbox [(ngModel)]="sizeValue" size="md" label="Medium"></cxs-checkbox>
        <cxs-checkbox [(ngModel)]="sizeValue" size="lg" label="Large"></cxs-checkbox>
      </div>
    `
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    props: {
      themedValue: true
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
          --cxs-color-on-primary: #fff7ed;
        "
      >
        <div class="grid gap-2">
          <cxs-checkbox [(ngModel)]="themedValue" label="Branded checkbox"></cxs-checkbox>
          <cxs-checkbox [indeterminate]="true" label="Indeterminate option"></cxs-checkbox>
        </div>
      </div>
    `
  })
};
