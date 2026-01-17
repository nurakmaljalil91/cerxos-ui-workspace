import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { CxsDialogComponent } from './dialog.component';

const meta: Meta<CxsDialogComponent> = {
  title: 'Cerxos UI/Dialog',
  component: CxsDialogComponent,
  args: {
    open: true,
    title: 'Invite teammates',
    description: 'Share access with your team.',
    size: 'md',
    dismissible: true,
    closeOnBackdrop: true,
    closeOnEscape: true
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <cxs-dialog
        [(open)]="open"
        [title]="title"
        [description]="description"
        [size]="size"
        [dismissible]="dismissible"
        [closeOnBackdrop]="closeOnBackdrop"
        [closeOnEscape]="closeOnEscape"
      >
        <p>Invite colleagues to collaborate on the current workspace.</p>
        <div cxsDialogActions>
          <button type="button" class="rounded-[var(--cxs-radius-md)] px-3 py-2 text-sm">
            Cancel
          </button>
          <button
            type="button"
            class="rounded-[var(--cxs-radius-md)] bg-[var(--cxs-color-primary)] px-3 py-2 text-sm text-[var(--cxs-color-on-primary)]"
          >
            Send invites
          </button>
        </div>
      </cxs-dialog>
    `
  })
};

export default meta;
type Story = StoryObj<CxsDialogComponent>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4">
        <cxs-dialog open title="Small dialog" size="sm">
          <p>Short content for a small dialog.</p>
        </cxs-dialog>
        <cxs-dialog open title="Medium dialog" size="md">
          <p>Balanced dialog sizing for most flows.</p>
        </cxs-dialog>
        <cxs-dialog open title="Large dialog" size="lg">
          <p>Extra space for forms or tables.</p>
        </cxs-dialog>
      </div>
    `
  })
};

@Component({
  selector: 'cxs-dialog-theme-story',
  standalone: true,
  imports: [CxsDialogComponent],
  template: `
    <div
      style="
        --cxs-color-surface: #f8fafc;
        --cxs-color-border: #e2e8f0;
        --cxs-color-on-surface: #0f172a;
        --cxs-color-on-surface-muted: #475569;
        --cxs-color-focus: #f97316;
        --cxs-radius-md: 14px;
        --cxs-shadow-sm: 0 14px 40px rgba(15, 23, 42, 0.2);
      "
    >
      <cxs-dialog open title="Custom theme">
        <p>Token overrides shift the dialog mood without changing markup.</p>
      </cxs-dialog>
    </div>
  `
})
class DialogThemeStoryComponent {}

export const ThemeOverride: Story = {
  render: () => ({
    component: DialogThemeStoryComponent
  })
};
