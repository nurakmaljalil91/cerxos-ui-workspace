import { Component } from '@angular/core';
// @ts-ignore
import type { Meta, StoryObj } from '@storybook/angular';
// @ts-ignore
import { moduleMetadata } from '@storybook/angular';

import { CxsToastComponent } from './toast.component';

const meta: Meta<CxsToastComponent> = {
  title: 'Cerxos UI/Toast',
  component: CxsToastComponent,
  args: {
    open: true,
    title: 'Saved',
    message: 'Changes were saved.',
    variant: 'info',
    dismissible: true,
    duration: 0,
    position: 'bottom-right',
    maxWidth: 'sm'
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <cxs-toast
        [open]="open"
        [title]="title"
        [message]="message"
        [variant]="variant"
        [dismissible]="dismissible"
        [duration]="duration"
        [position]="position"
        [maxWidth]="maxWidth"
        (openChange)="open = $event"
      >
        <button cxsToastAction type="button" class="text-sm underline">Undo</button>
      </cxs-toast>
    `
  })
};

export default meta;
type Story = StoryObj<CxsToastComponent>;

export const Default: Story = {};

export const Neutral: Story = {
  args: { variant: 'neutral' }
};

export const Danger: Story = {
  args: {
    title: 'Payment failed',
    message: 'Update your card details to restore access.',
    variant: 'danger'
  }
};

export const AutoDismiss: Story = {
  args: {
    message: 'This toast will close automatically.',
    duration: 2000
  }
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div class="relative min-h-[320px]">
        <cxs-toast open="" title="Top left" message="Pinned" position="top-left"></cxs-toast>
        <cxs-toast open title="Top" message="Pinned" position="top"></cxs-toast>
        <cxs-toast open title="Top right" message="Pinned" position="top-right"></cxs-toast>
        <cxs-toast open title="Left" message="Pinned" position="left"></cxs-toast>
        <cxs-toast open title="Center" message="Pinned" position="center"></cxs-toast>
        <cxs-toast open title="Right" message="Pinned" position="right"></cxs-toast>
        <cxs-toast open title="Bottom left" message="Pinned" position="bottom-left"></cxs-toast>
        <cxs-toast open title="Bottom" message="Pinned" position="bottom"></cxs-toast>
        <cxs-toast open title="Bottom right" message="Pinned" position="bottom-right"></cxs-toast>
      </div>
    `
  })
};

@Component({
  selector: 'cxs-toast-theme-story',
  standalone: true,
  imports: [CxsToastComponent],
  template: `
    <div
      style="
        --cxs-color-primary: #2563eb;
        --cxs-color-primary-ghost: rgba(37, 99, 235, 0.12);
        --cxs-color-surface: #f8fafc;
        --cxs-color-surface-hover: #e2e8f0;
        --cxs-color-on-surface: #0f172a;
        --cxs-color-on-surface-muted: #475569;
        --cxs-color-border: #cbd5e1;
        --cxs-color-focus: #f97316;
        --cxs-shadow-sm: 0 10px 24px rgba(15, 23, 42, 0.16);
      "
    >
      <cxs-toast
        [open]="true"
        title="Custom theme"
        message="Tokens can change the tone."
        position="bottom-right"
      >
        <button cxsToastAction type="button" class="text-sm underline">Review</button>
      </cxs-toast>
    </div>
  `
})
class ToastThemeStoryComponent {}

export const ThemeOverride: Story = {
  decorators: [
    moduleMetadata({
      imports: [ToastThemeStoryComponent]
    })
  ],
  render: () => ({
    template: `<cxs-toast-theme-story></cxs-toast-theme-story>`
  })
};
