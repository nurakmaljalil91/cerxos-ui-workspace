import type { Meta, StoryObj } from '@storybook/angular';

import { CxsAlertComponent } from './alert.component';

const meta: Meta<CxsAlertComponent> = {
  title: 'Cerxos UI/Alert',
  component: CxsAlertComponent,
  args: {
    variant: 'info',
    title: 'Update available',
    dismissible: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-alert [variant]="variant" [title]="title" [dismissible]="dismissible">
        A new version is ready to install. Please refresh the page.
      </cxs-alert>
    `
  })
};

export default meta;
type Story = StoryObj<CxsAlertComponent>;

export const Info: Story = {};

export const Neutral: Story = {
  args: { variant: 'neutral', title: 'Note' }
};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Action required' }
};

export const Dismissible: Story = {
  args: { dismissible: true }
};

export const ThemeOverride: Story = {
  render: () => ({
    props: {
      dismissible: true
    },
    template: `
      <div
        class="max-w-md"
        style="
          --cxs-color-primary: #0f766e;
          --cxs-color-primary-ghost: rgba(15, 118, 110, 0.12);
          --cxs-color-focus: #14b8a6;
          --cxs-color-border: #99f6e4;
          --cxs-color-on-surface: #134e4a;
          --cxs-color-danger: #b91c1c;
        "
      >
        <div class="grid gap-3">
          <cxs-alert title="Team update">New access policy applied.</cxs-alert>
          <cxs-alert variant="danger" title="Access revoked" [dismissible]="dismissible">
            Contact your admin to restore permissions.
          </cxs-alert>
        </div>
      </div>
    `
  })
};
