import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { CxsTabPanelComponent } from './tab-panel.component';

const WRAPPER_CLASSES = 'w-full';
const TAB_LIST_CLASSES =
  'flex flex-wrap items-center gap-6 border-b border-[var(--cxs-color-border)]';
const TAB_BUTTON_BASE_CLASSES =
  'inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors';
const TAB_BUTTON_INACTIVE_CLASSES =
  'border-transparent text-[var(--cxs-color-on-surface-muted)] hover:text-[var(--cxs-color-on-surface)]';
const TAB_BUTTON_ACTIVE_CLASSES =
  'border-[var(--cxs-color-primary)] text-[var(--cxs-color-primary)]';
const TAB_BUTTON_DISABLED_CLASSES = 'cursor-not-allowed opacity-50';
const PANEL_WRAPPER_CLASSES = 'pt-4';
const PANEL_CLASSES =
  'rounded-[var(--cxs-radius-md)] border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-surface)] p-4 text-sm text-[var(--cxs-color-on-surface)]';

@Component({
  selector: 'cxs-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsTabsComponent implements AfterContentInit {
  @Input() ariaLabel = 'Tabs';
  @Input() activeId?: string;

  @Output() activeIdChange = new EventEmitter<string>();

  @ContentChildren(CxsTabPanelComponent)
  private readonly panels?: QueryList<CxsTabPanelComponent>;

  get wrapperClass(): string {
    return WRAPPER_CLASSES;
  }

  get tabListClass(): string {
    return TAB_LIST_CLASSES;
  }

  get tabButtonBaseClass(): string {
    return TAB_BUTTON_BASE_CLASSES;
  }

  get tabButtonInactiveClass(): string {
    return TAB_BUTTON_INACTIVE_CLASSES;
  }

  get tabButtonActiveClass(): string {
    return TAB_BUTTON_ACTIVE_CLASSES;
  }

  get tabButtonDisabledClass(): string {
    return TAB_BUTTON_DISABLED_CLASSES;
  }

  get panelWrapperClass(): string {
    return PANEL_WRAPPER_CLASSES;
  }

  get panelClass(): string {
    return PANEL_CLASSES;
  }

  get panelList(): CxsTabPanelComponent[] {
    return this.panels?.toArray() ?? [];
  }

  get activePanel(): CxsTabPanelComponent | null {
    return this.resolveActivePanel();
  }

  ngAfterContentInit(): void {
    this.ensureActiveTab();
    this.panels?.changes.subscribe(() => this.ensureActiveTab());
  }

  isActive(panel: CxsTabPanelComponent): boolean {
    return this.activeId === panel.resolvedId;
  }

  tabButtonClass(panel: CxsTabPanelComponent): string {
    return [
      TAB_BUTTON_BASE_CLASSES,
      this.isActive(panel) ? TAB_BUTTON_ACTIVE_CLASSES : TAB_BUTTON_INACTIVE_CLASSES,
      panel.disabled ? TAB_BUTTON_DISABLED_CLASSES : ''
    ]
      .filter(Boolean)
      .join(' ');
  }

  selectTab(panel: CxsTabPanelComponent): void {
    if (panel.disabled) {
      return;
    }

    this.activeId = panel.resolvedId;
    this.activeIdChange.emit(panel.resolvedId);
  }

  panelLabel(panel: CxsTabPanelComponent): string {
    return panel.label ?? panel.resolvedId;
  }

  private ensureActiveTab(): void {
    const nextActive = this.resolveActivePanel();
    if (!nextActive) {
      return;
    }

    if (this.activeId !== nextActive.resolvedId) {
      this.activeId = nextActive.resolvedId;
      this.activeIdChange.emit(nextActive.resolvedId);
    }
  }

  private resolveActivePanel(): CxsTabPanelComponent | null {
    const panels = this.panelList;
    if (!panels.length) {
      return null;
    }

    if (this.activeId) {
      const active = panels.find((panel) => panel.resolvedId === this.activeId);
      if (active && !active.disabled) {
        return active;
      }
    }

    return panels.find((panel) => !panel.disabled) ?? panels[0];
  }
}
