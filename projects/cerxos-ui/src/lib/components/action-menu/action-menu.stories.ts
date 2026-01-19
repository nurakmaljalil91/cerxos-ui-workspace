import type { Meta, StoryObj } from '@storybook/angular';

import { CxsActionMenuComponent, CxsActionMenuItem } from './action-menu.component';

const menuItems: CxsActionMenuItem[] = [
  { label: 'Edit user', value: 'edit-user' },
  { label: 'Edit roles', value: 'edit-roles' },
  { label: 'Edit groups', value: 'edit-groups' },
  { label: 'Delete user', value: 'delete-user', tone: 'danger' }
];

const meta: Meta<CxsActionMenuComponent> = {
  title: 'Cerxos UI/Action Menu',
  component: CxsActionMenuComponent,
  args: {
    items: menuItems,
    align: 'end'
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-action-menu [items]="items" [align]="align"></cxs-action-menu>
    `
  })
};

export default meta;
type Story = StoryObj<CxsActionMenuComponent>;

export const Default: Story = {};

export const StartAligned: Story = {
  args: {
    align: 'start'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Floating: Story = {
  args: {
    floating: true
  }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        style="
          --cxs-color-primary: #0f766e;
          --cxs-color-primary-ghost: rgba(15, 118, 110, 0.12);
          --cxs-color-border: #99f6e4;
          --cxs-color-on-surface: #0f172a;
          --cxs-color-on-surface-muted: #475569;
          --cxs-color-danger: #b91c1c;
          --cxs-color-surface: #f8fafc;
          --cxs-color-surface-hover: #f1f5f9;
        "
      >
        <cxs-action-menu [items]="items"></cxs-action-menu>
      </div>
    `,
    props: {
      items: menuItems
    }
  })
};
