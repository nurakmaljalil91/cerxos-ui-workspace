import type { Meta, StoryObj } from '@storybook/angular';

import {
  CxsHoverCardComponent,
  CxsHoverCardContentDirective,
  CxsHoverCardTriggerDirective
} from './hover-card.component';

const meta: Meta<CxsHoverCardComponent> = {
  title: 'Cerxos UI/Hover Card',
  component: CxsHoverCardComponent,
  args: { openDelay: 200, closeDelay: 200 },
  render: (args) => ({
    props: args,
    imports: [CxsHoverCardContentDirective, CxsHoverCardTriggerDirective],
    template: `
      <div class="p-16">
        <cxs-hover-card [openDelay]="openDelay" [closeDelay]="closeDelay">
          <a cxsHoverCardTrigger href="#profile" class="text-[var(--cxs-color-primary)] underline">
            &#64;cerxos
          </a>
          <div cxsHoverCardContent ariaLabel="Cerxos profile preview">
            <h3 class="font-semibold">Cerxos UI</h3>
            <p class="mt-1 text-[var(--cxs-color-on-surface-muted)]">
              Reusable components for the Cerxos ecosystem.
            </p>
            <a href="#components" class="mt-3 inline-block text-[var(--cxs-color-primary)] underline">
              Explore components
            </a>
          </div>
        </cxs-hover-card>
      </div>
    `
  })
};

export default meta;
type Story = StoryObj<CxsHoverCardComponent>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => ({
    imports: [CxsHoverCardContentDirective, CxsHoverCardTriggerDirective],
    template: `
      <div class="flex flex-wrap gap-24 p-24">
        <cxs-hover-card>
          <button cxsHoverCardTrigger type="button">Top</button>
          <div cxsHoverCardContent side="top" align="start" ariaLabel="Top preview">Top, start</div>
        </cxs-hover-card>
        <cxs-hover-card>
          <button cxsHoverCardTrigger type="button">Right</button>
          <div cxsHoverCardContent side="right" ariaLabel="Right preview">Right, center</div>
        </cxs-hover-card>
        <cxs-hover-card>
          <button cxsHoverCardTrigger type="button">Bottom</button>
          <div cxsHoverCardContent side="bottom" align="end" ariaLabel="Bottom preview">Bottom, end</div>
        </cxs-hover-card>
        <cxs-hover-card>
          <button cxsHoverCardTrigger type="button">Left</button>
          <div cxsHoverCardContent side="left" ariaLabel="Left preview">Left, center</div>
        </cxs-hover-card>
      </div>
    `
  })
};

export const Delays: Story = {
  args: { openDelay: 500, closeDelay: 500 }
};

export const ThemeOverride: Story = {
  render: () => ({
    imports: [CxsHoverCardContentDirective, CxsHoverCardTriggerDirective],
    template: `
      <div class="p-16" style="--cxs-color-surface: #0f172a; --cxs-color-on-surface: #f8fafc; --cxs-color-border: #334155; --cxs-color-primary: #38bdf8; --cxs-radius-md: 14px; --cxs-shadow-sm: 0 8px 20px rgba(15, 23, 42, 0.3)">
        <cxs-hover-card>
          <a cxsHoverCardTrigger href="#theme" class="text-[var(--cxs-color-primary)] underline">Theme preview</a>
          <div cxsHoverCardContent ariaLabel="Themed preview">
            Colors, radius, and shadow follow the host theme tokens.
          </div>
        </cxs-hover-card>
      </div>
    `
  })
};
