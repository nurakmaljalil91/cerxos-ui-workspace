import type { Meta, StoryObj } from '@storybook/angular';

import { CxsButtonComponent } from '../button/button.component';
import { CxsTooltipComponent } from './tooltip.component';

const meta: Meta<CxsTooltipComponent> = {
  title: 'Cerxos UI/Tooltip',
  component: CxsTooltipComponent,
  args: {
    text: 'View profile',
    position: 'top',
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-tooltip [text]="text" [position]="position" [disabled]="disabled">
        <cxs-button size="sm" variant="ghost">Profile</cxs-button>
      </cxs-tooltip>
    `,
    imports: [CxsButtonComponent]
  })
};

export default meta;
type Story = StoryObj<CxsTooltipComponent>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-6">
        <cxs-tooltip text="Top" position="top">
          <button class="rounded-[var(--cxs-radius-md)] border px-3 py-2">Top</button>
        </cxs-tooltip>
        <cxs-tooltip text="Right" position="right">
          <button class="rounded-[var(--cxs-radius-md)] border px-3 py-2">Right</button>
        </cxs-tooltip>
        <cxs-tooltip text="Bottom" position="bottom">
          <button class="rounded-[var(--cxs-radius-md)] border px-3 py-2">Bottom</button>
        </cxs-tooltip>
        <cxs-tooltip text="Left" position="left">
          <button class="rounded-[var(--cxs-radius-md)] border px-3 py-2">Left</button>
        </cxs-tooltip>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        style="
          --cxs-color-on-primary: #ffffff;
          --cxs-color-on-surface: #0f172a;
          --cxs-radius-md: 10px;
          --cxs-shadow-sm: 0 10px 20px rgba(15, 23, 42, 0.2);
        "
      >
        <cxs-tooltip text="Token override" position="top">
          <button class="rounded-[var(--cxs-radius-md)] border px-3 py-2">Hover me</button>
        </cxs-tooltip>
      </div>
    `
  })
};
