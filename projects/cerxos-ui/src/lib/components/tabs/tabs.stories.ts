import type { Meta, StoryObj } from '@storybook/angular';

import { CxsBadgeComponent } from '../badge/badge.component';
import { CxsTabLabelDirective } from './tab-label.directive';
import { CxsTabPanelComponent } from './tab-panel.component';
import { CxsTabsComponent } from './tabs.component';

const meta: Meta<CxsTabsComponent> = {
  title: 'Cerxos UI/Tabs',
  component: CxsTabsComponent,
  args: {
    activeId: 'customers'
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CxsTabPanelComponent, CxsTabLabelDirective, CxsBadgeComponent]
    },
    template: `
      <cxs-tabs [activeId]="activeId" (activeIdChange)="activeId = $event">
        <cxs-tab-panel id="overview" label="Overview">
          <h3 class="text-base font-semibold">Overview</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            High-level metrics and account status.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="notification" label="Notification">
          <h3 class="text-base font-semibold">Notification</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Review alerts and email preferences.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="analytics" label="Analytics">
          <h3 class="text-base font-semibold">Analytics</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Monitor trends and performance.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="customers" label="Customers">
          <h3 class="text-base font-semibold">Customers</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat.
          </p>
        </cxs-tab-panel>
      </cxs-tabs>
    `
  })
};

export default meta;
type Story = StoryObj<CxsTabsComponent>;

export const Default: Story = {};

export const WithIcons: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [CxsTabPanelComponent, CxsTabLabelDirective]
    },
    template: `
      <cxs-tabs>
        <cxs-tab-panel id="overview">
          <ng-template cxsTabLabel>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="4" y="4" width="7" height="7" rx="1"></rect>
              <rect x="13" y="4" width="7" height="7" rx="1"></rect>
              <rect x="4" y="13" width="7" height="7" rx="1"></rect>
              <rect x="13" y="13" width="7" height="7" rx="1"></rect>
            </svg>
            <span>Overview</span>
          </ng-template>
          <h3 class="text-base font-semibold">Overview</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Quick glance at the workspace.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="notification">
          <ng-template cxsTabLabel>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"></path>
              <path d="M9 17a3 3 0 0 0 6 0"></path>
            </svg>
            <span>Notification</span>
          </ng-template>
          <h3 class="text-base font-semibold">Notification</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Alerts and preferences.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="analytics">
          <ng-template cxsTabLabel>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 19h16"></path>
              <path d="M6 16V8"></path>
              <path d="M12 16V5"></path>
              <path d="M18 16v-7"></path>
            </svg>
            <span>Analytics</span>
          </ng-template>
          <h3 class="text-base font-semibold">Analytics</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Performance trends and KPIs.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="customers">
          <ng-template cxsTabLabel>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="7" r="3"></circle>
              <circle cx="17" cy="7" r="3"></circle>
              <path d="M4 19c0-3 2.5-5 5-5"></path>
              <path d="M14 19c0-3 2.5-5 5-5"></path>
            </svg>
            <span>Customers</span>
          </ng-template>
          <h3 class="text-base font-semibold">Customers</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Customer details and profiles.
          </p>
        </cxs-tab-panel>
      </cxs-tabs>
    `
  })
};

export const WithBadges: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [CxsTabPanelComponent, CxsTabLabelDirective, CxsBadgeComponent]
    },
    template: `
      <cxs-tabs>
        <cxs-tab-panel id="overview">
          <ng-template cxsTabLabel>
            <span>Overview</span>
            <cxs-badge variant="neutral" size="sm">8</cxs-badge>
          </ng-template>
          <h3 class="text-base font-semibold">Overview</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Account summary and tasks.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="notification">
          <ng-template cxsTabLabel>
            <span>Notification</span>
            <cxs-badge variant="neutral" size="sm">3</cxs-badge>
          </ng-template>
          <h3 class="text-base font-semibold">Notification</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Alert history and rules.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="analytics">
          <ng-template cxsTabLabel>
            <span>Analytics</span>
            <cxs-badge variant="neutral" size="sm">4</cxs-badge>
          </ng-template>
          <h3 class="text-base font-semibold">Analytics</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            KPIs and conversion metrics.
          </p>
        </cxs-tab-panel>
        <cxs-tab-panel id="customers">
          <ng-template cxsTabLabel>
            <span>Customers</span>
            <cxs-badge variant="neutral" size="sm">12</cxs-badge>
          </ng-template>
          <h3 class="text-base font-semibold">Customers</h3>
          <p class="mt-1 text-sm text-(--cxs-color-on-surface-muted)">
            Customer list and segments.
          </p>
        </cxs-tab-panel>
      </cxs-tabs>
    `
  })
};
