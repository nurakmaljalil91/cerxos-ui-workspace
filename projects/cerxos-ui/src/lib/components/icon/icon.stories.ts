import type { Meta, StoryObj } from '@storybook/angular';

import { CxsIconComponent } from './icon.component';

const meta: Meta<CxsIconComponent> = {
  title: 'Cerxos UI/Icon',
  component: CxsIconComponent,
  args: {
    name: 'user',
    size: 'md',
    label: 'User'
  },
  render: (args) => ({
    props: args,
    template: `<cxs-icon [name]="name" [size]="size" [label]="label"></cxs-icon>`
  })
};

export default meta;
type Story = StoryObj<CxsIconComponent>;

export const Default: Story = {};

export const Decorative: Story = {
  args: {
    label: undefined
  }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-4 text-[var(--cxs-color-primary)]">
        <cxs-icon name="search" size="sm"></cxs-icon>
        <cxs-icon name="search" size="md"></cxs-icon>
        <cxs-icon name="search" size="lg"></cxs-icon>
      </div>
    `
  })
};

export const AllIcons: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div class="flex items-center gap-2"><cxs-icon name="user"></cxs-icon><span>User</span></div>
        <div class="flex items-center gap-2"><cxs-icon name="search"></cxs-icon><span>Search</span></div>
        <div class="flex items-center gap-2"><cxs-icon name="plus"></cxs-icon><span>Plus</span></div>
        <div class="flex items-center gap-2"><cxs-icon name="x"></cxs-icon><span>Close</span></div>
        <div class="flex items-center gap-2"><cxs-icon name="bell"></cxs-icon><span>Bell</span></div>
        <div class="flex items-center gap-2"><cxs-icon name="chevron-right"></cxs-icon><span>Chevron</span></div>
      </div>
    `
  })
};
