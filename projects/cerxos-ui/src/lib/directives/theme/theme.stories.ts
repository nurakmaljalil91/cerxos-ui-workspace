import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { CxsButtonComponent } from '../../components/button/button.component';
import { CxsBadgeComponent } from '../../components/badge/badge.component';
import { CxsThemeDirective, CxsThemeMode } from './theme.directive';

@Component({
  selector: 'cxs-theme-story',
  standalone: true,
  imports: [CxsThemeDirective, CxsButtonComponent, CxsBadgeComponent],
  template: `
    <div
      class="rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] p-4"
      [cxsTheme]="mode"
    >
      <div class="flex flex-wrap items-center gap-2">
        <cxs-badge>Theme preview</cxs-badge>
        <span class="text-sm text-[var(--cxs-color-on-surface)]">Mode: {{ mode }}</span>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <cxs-button>Primary</cxs-button>
        <cxs-button variant="secondary">Secondary</cxs-button>
      </div>
    </div>
  `
})
class CxsThemeStoryComponent {
  @Input() mode: CxsThemeMode = 'light';
}

const meta: Meta<CxsThemeStoryComponent> = {
  title: 'Cerxos UI/Theme Directive',
  component: CxsThemeStoryComponent,
  args: {
    mode: 'light'
  }
};

export default meta;
type Story = StoryObj<CxsThemeStoryComponent>;

export const Light: Story = {
  args: { mode: 'light' }
};

export const Dark: Story = {
  args: { mode: 'dark' }
};

export const System: Story = {
  args: { mode: 'system' }
};
