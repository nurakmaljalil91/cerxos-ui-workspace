import type { Meta, StoryObj } from '@storybook/angular';

import { CxsButtonComponent } from './button.component';

const meta: Meta<CxsButtonComponent> = {
  title: 'Cerxos UI/Button',
  component: CxsButtonComponent,
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  },
  render: (args) => ({
    props: args,
    template: `<cxs-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">
      Button
    </cxs-button>`
  })
};

export default meta;
type Story = StoryObj<CxsButtonComponent>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' }
};

export const Ghost: Story = {
  args: { variant: 'ghost' }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-3">
        <cxs-button size="sm">Small</cxs-button>
        <cxs-button size="md">Medium</cxs-button>
        <cxs-button size="lg">Large</cxs-button>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Loading: Story = {
  args: { loading: true }
};
