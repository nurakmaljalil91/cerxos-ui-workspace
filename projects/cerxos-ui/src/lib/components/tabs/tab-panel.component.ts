import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CxsTabLabelDirective } from './tab-label.directive';

@Component({
  selector: 'cxs-tab-panel',
  standalone: true,
  templateUrl: './tab-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsTabPanelComponent {
  private static nextId = 0;

  @Input() id?: string;
  @Input() label?: string;
  @Input() disabled = false;

  @ContentChild(CxsTabLabelDirective) labelTemplate?: CxsTabLabelDirective;
  @ViewChild('content', { static: true }) templateRef!: TemplateRef<unknown>;

  readonly instanceId = `cxs-tab-${CxsTabPanelComponent.nextId++}`;

  get resolvedId(): string {
    return this.id ?? this.instanceId;
  }

  get tabId(): string {
    return `${this.resolvedId}-tab`;
  }

  get panelId(): string {
    return `${this.resolvedId}-panel`;
  }
}
