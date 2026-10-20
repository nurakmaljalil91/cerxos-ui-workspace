import { FormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CxsRadioChipGroupComponent, type CxsRadioChipOption } from './radio-chip-group.component';

const options: CxsRadioChipOption[] = [
  { label: 'Credit', value: 'Credit', tone: 'primary' },
  { label: 'Debit', value: 'Debit', tone: 'danger' }
];

const meta: Meta<CxsRadioChipGroupComponent> = {
  title: 'Cerxos UI/Radio Chip Group',
  component: CxsRadioChipGroupComponent,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  args: { label: 'Type', options },
  render: (args) => ({
    props: args,
    template: '<cxs-radio-chip-group [label]="label" [options]="options" [size]="size" [disabled]="disabled" [invalid]="invalid" />'
  })
};

export default meta;
type Story = StoryObj<CxsRadioChipGroupComponent>;

export const Unselected: Story = {};
export const Selected: Story = {
  render: () => ({
    props: { options, value: 'Debit' },
    template: '<cxs-radio-chip-group label="Type" [options]="options" [(ngModel)]="value" />'
  })
};
export const Sizes: Story = {
  render: () => ({
    props: { options },
    template: `
      <div class="grid gap-4">
        <cxs-radio-chip-group label="Small" size="sm" [options]="options" />
        <cxs-radio-chip-group label="Medium" size="md" [options]="options" />
        <cxs-radio-chip-group label="Large" size="lg" [options]="options" />
      </div>
    `
  })
};
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { invalid: true } };
export const ThemeOverride: Story = {
  render: () => ({
    props: { options },
    template: `
      <div style="--cxs-color-primary: #15803d; --cxs-color-primary-ghost: #dcfce7; --cxs-color-danger: #b91c1c; --cxs-color-danger-surface: #fee2e2;">
        <cxs-radio-chip-group label="Type" [options]="options" />
      </div>
    `
  })
};
