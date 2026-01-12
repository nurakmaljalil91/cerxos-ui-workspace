import type { Meta, StoryObj } from '@storybook/angular';

import { CxsCardComponent } from './card.component';

const meta: Meta<CxsCardComponent> = {
  title: 'Cerxos UI/Card',
  component: CxsCardComponent,
  args: {
    variant: 'surface',
    size: 'md',
    elevated: true
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-card [variant]="variant" [size]="size" [elevated]="elevated">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-[var(--cxs-color-on-surface)]">Workspace</h3>
          <p class="text-sm text-[var(--cxs-color-on-surface-muted)]">
            Manage members, access policies, and security settings.
          </p>
        </div>
      </cxs-card>
    `
  })
};

export default meta;
type Story = StoryObj<CxsCardComponent>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4">
        <cxs-card variant="surface">
          <p class="text-sm text-[var(--cxs-color-on-surface)]">Surface card</p>
        </cxs-card>
        <cxs-card variant="muted">
          <p class="text-sm text-[var(--cxs-color-on-surface)]">Muted card</p>
        </cxs-card>
        <cxs-card variant="outline" [elevated]="false">
          <p class="text-sm text-[var(--cxs-color-on-surface)]">Outline card</p>
        </cxs-card>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4">
        <cxs-card size="sm">
          <p class="text-sm text-[var(--cxs-color-on-surface)]">Small padding</p>
        </cxs-card>
        <cxs-card size="md">
          <p class="text-sm text-[var(--cxs-color-on-surface)]">Medium padding</p>
        </cxs-card>
        <cxs-card size="lg">
          <p class="text-sm text-[var(--cxs-color-on-surface)]">Large padding</p>
        </cxs-card>
      </div>
    `
  })
};

export const Flat: Story = {
  args: { elevated: false }
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-md"
        style="
          --cxs-color-surface: #0b1120;
          --cxs-color-surface-hover: #111827;
          --cxs-color-on-surface: #e2e8f0;
          --cxs-color-on-surface-muted: #94a3b8;
          --cxs-color-border: #1f2937;
          --cxs-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.5);
        "
      >
        <cxs-card>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-[var(--cxs-color-on-surface)]">Dark card</h3>
            <p class="text-sm text-[var(--cxs-color-on-surface-muted)]">
              Theme overrides update the surface tokens.
            </p>
          </div>
        </cxs-card>
      </div>
    `
  })
};
