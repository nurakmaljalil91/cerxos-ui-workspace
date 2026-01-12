import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { CxsBreadcrumbComponent, CxsBreadcrumbItem } from './breadcrumb.component';

const items: CxsBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Data' }
];

const meta: Meta<CxsBreadcrumbComponent> = {
  title: 'Cerxos UI/Breadcrumb',
  component: CxsBreadcrumbComponent,
  args: {
    items,
    separator: '/',
    ariaLabel: 'Breadcrumb',
    size: 'md',
    variant: 'default',
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `
      <cxs-breadcrumb
        [items]="items"
        [separator]="separator"
        [ariaLabel]="ariaLabel"
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
      ></cxs-breadcrumb>
    `
  })
};

export default meta;
type Story = StoryObj<CxsBreadcrumbComponent>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: 'muted' }
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="grid gap-3">
        <cxs-breadcrumb [items]="items" size="sm"></cxs-breadcrumb>
        <cxs-breadcrumb [items]="items" size="md"></cxs-breadcrumb>
        <cxs-breadcrumb [items]="items" size="lg"></cxs-breadcrumb>
      </div>
    `,
    props: { items }
  })
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const CustomSeparator: Story = {
  args: { separator: '>' }
};

@Component({
  selector: 'cxs-breadcrumb-focus-story',
  standalone: true,
  imports: [CxsBreadcrumbComponent],
  template: `
    <cxs-breadcrumb [items]="items"></cxs-breadcrumb>
  `
})
class BreadcrumbFocusStoryComponent implements AfterViewInit {
  items = items;

  @ViewChild(CxsBreadcrumbComponent, { read: ElementRef })
  breadcrumb?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const link = this.breadcrumb?.nativeElement.querySelector('a') as HTMLAnchorElement | null;
    link?.focus();
  }
}

export const Focus: Story = {
  render: () => ({
    component: BreadcrumbFocusStoryComponent
  })
};

export const ThemeOverride: Story = {
  render: () => ({
    template: `
      <div
        class="max-w-lg"
        style="
          --cxs-color-primary: #0ea5e9;
          --cxs-color-primary-hover: #0284c7;
          --cxs-color-on-surface: #0c4a6e;
          --cxs-color-on-surface-muted: #64748b;
          --cxs-color-focus: #f97316;
          --cxs-radius-md: 6px;
        "
      >
        <cxs-breadcrumb [items]="items"></cxs-breadcrumb>
      </div>
    `,
    props: { items }
  })
};
