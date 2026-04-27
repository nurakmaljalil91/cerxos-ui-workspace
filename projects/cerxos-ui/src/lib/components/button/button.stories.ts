import type { Meta, StoryObj } from '@storybook/angular';

import { CxsButtonComponent } from './button.component';

const meta: Meta<CxsButtonComponent> = {
  title: 'Cerxos UI/Button',
  component: CxsButtonComponent,
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    icon: undefined,
    iconPosition: 'start',
    iconOnly: false,
    ariaLabel: undefined
  },
  render: (args) => ({
    props: args,
    template: `<cxs-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [icon]="icon"
      [iconPosition]="iconPosition"
      [iconOnly]="iconOnly"
      [ariaLabel]="ariaLabel"
    >
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

export const Danger: Story = {
  args: { variant: 'danger' }
};

export const Outline: Story = {
  args: { variant: 'outline' }
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

export const WithNamedIcon: Story = {
  args: {
    variant: 'secondary',
    icon: 'user'
  }
};

export const TrailingIcon: Story = {
  args: {
    icon: 'chevron-right',
    iconPosition: 'end'
  }
};

export const CircleIcon: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-3">
        <cxs-button variant="outline" icon="search" [iconOnly]="true" ariaLabel="Search"></cxs-button>
        <cxs-button variant="secondary" icon="user" [iconOnly]="true" ariaLabel="Open profile"></cxs-button>
        <cxs-button variant="ghost" icon="search" [iconOnly]="true" ariaLabel="Search"></cxs-button>
        <cxs-button icon="plus" [iconOnly]="true" ariaLabel="Create item"></cxs-button>
      </div>
    `
  })
};

export const WithProjectedIcon: Story = {
  render: () => ({
    template: `
      <cxs-button variant="secondary">
        <svg cxsButtonIcon aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="currentColor"></circle>
        </svg>
        Continue
      </cxs-button>
    `
  })
};
