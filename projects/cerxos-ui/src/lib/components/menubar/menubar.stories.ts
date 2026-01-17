import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// @ts-ignore
import type { Meta, StoryObj } from '@storybook/angular';
// @ts-ignore
import { moduleMetadata } from '@storybook/angular';

import { CxsMenubarComponent, CxsMenubarItem } from './menubar.component';

const items: CxsMenubarItem[] = [
  { label: 'Overview', href: '/', active: true },
  { label: 'People', href: '/people' },
  { label: 'Billing', href: '/billing' },
  { label: 'Create' },
  { label: 'Disabled', href: '/disabled', disabled: true }
];

const meta: Meta<CxsMenubarComponent> = {
  title: 'Cerxos UI/Menubar',
  component: CxsMenubarComponent,
  args: {
    items,
    ariaLabel: 'Primary navigation',
    size: 'md',
    variant: 'default',
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-menubar
        [items]="items"
        [ariaLabel]="ariaLabel"
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
      ></cxs-menubar>
    `
  })
};

export default meta;
type Story = StoryObj<CxsMenubarComponent>;

export const Default: Story = {};

export const Surface: Story = {
  args: { variant: 'surface' }
};

export const Sizes: Story = {
  render: () => ({
    props: { items },
    template: `
      <div class="grid gap-3">
        <cxs-menubar [items]="items" size="sm"></cxs-menubar>
        <cxs-menubar [items]="items" size="md"></cxs-menubar>
        <cxs-menubar [items]="items" size="lg"></cxs-menubar>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: { disabled: true }
};

@Component({
  selector: 'cxs-menubar-focus-story',
  standalone: true,
  imports: [CxsMenubarComponent],
  template: `
    <cxs-menubar [items]="items"></cxs-menubar>
  `
})
class MenubarFocusStoryComponent implements AfterViewInit {
  items = items;

  @ViewChild(CxsMenubarComponent, { read: ElementRef })
  menubar?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const firstItem = this.menubar?.nativeElement.querySelector('[role="menuitem"]') as
      | HTMLElement
      | null;
    firstItem?.focus();
  }
}

export const Focus: Story = {
  decorators: [
    moduleMetadata({
      imports: [MenubarFocusStoryComponent]
    })
  ],
  render: () => ({
    template: `<cxs-menubar-focus-story></cxs-menubar-focus-story>`
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    props: { items },
    template: `
      <div
        class="max-w-lg"
        style="
          --cxs-color-primary: #0ea5e9;
          --cxs-color-primary-ghost: rgba(14, 165, 233, 0.15);
          --cxs-color-surface: #f8fafc;
          --cxs-color-surface-hover: #e2e8f0;
          --cxs-color-on-surface: #0f172a;
          --cxs-color-on-surface-muted: #64748b;
          --cxs-color-border: #cbd5e1;
          --cxs-color-focus: #f97316;
          --cxs-radius-md: 10px;
          --cxs-shadow-sm: 0 6px 18px rgba(15, 23, 42, 0.12);
        "
      >
        <cxs-menubar [items]="items" variant="surface"></cxs-menubar>
      </div>
    `
  })
};
