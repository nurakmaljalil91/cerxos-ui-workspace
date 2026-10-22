import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CxsTextareaComponent } from './textarea.component';

const meta: Meta<CxsTextareaComponent> = {
  title: 'Cerxos UI/Textarea',
  component: CxsTextareaComponent,
  args: {
    value: '',
    label: 'Description',
    placeholder: 'Write a few lines',
    variant: 'outline',
    size: 'md',
    rows: 3,
    resize: 'vertical',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-sm">
        <cxs-textarea
          [value]="value"
          (valueChange)="value = $event"
          [label]="label"
          [placeholder]="placeholder"
          [variant]="variant"
          [size]="size"
          [rows]="rows"
          [resize]="resize"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [invalid]="invalid"
        ></cxs-textarea>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsTextareaComponent>;

export const Outline: Story = {};

export const Filled: Story = {
  args: { variant: 'filled' }
};

export const Rows: Story = {
  args: { rows: 6, value: 'Line one\nLine two\nLine three' }
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled textarea' }
};

export const WithError: Story = {
  render: () => ({
    template: `
      <div class="max-w-sm">
        <cxs-textarea label="Bio" value="Too long..." [invalid]="true">
          <span cxsTextareaError>Bio must be under 500 characters.</span>
        </cxs-textarea>
      </div>
    `
  })
};

export const ReactiveForm: Story = {
  decorators: [moduleMetadata({ imports: [ReactiveFormsModule] })],
  render: () => ({
    props: { control: new FormControl('Line one\nLine two', { nonNullable: true }) },
    template: `
      <div class="grid max-w-sm gap-2">
        <cxs-textarea label="Notes" [formControl]="control"></cxs-textarea>
        <pre class="text-xs">{{ control.value }}</pre>
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
        <cxs-textarea label="Branded textarea"></cxs-textarea>
      </div>
    `
  })
};
