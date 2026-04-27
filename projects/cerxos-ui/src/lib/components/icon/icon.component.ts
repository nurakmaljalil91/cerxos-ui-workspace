import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsIconName =
  | 'bell'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'plus'
  | 'search'
  | 'user'
  | 'x';

export type CxsIconSize = 'sm' | 'md' | 'lg';

type CxsIconDefinition = {
  readonly paths: readonly string[];
  readonly viewBox: string;
};

const BASE_CLASSES = 'inline-block shrink-0';

const SIZE_CLASSES: Record<CxsIconSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

const ICONS: Record<CxsIconName, CxsIconDefinition> = {
  bell: {
    viewBox: '0 0 24 24',
    paths: [
      'M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5',
      'M10.3 20a2 2 0 0 0 3.4 0'
    ]
  },
  'chevron-down': {
    viewBox: '0 0 24 24',
    paths: ['m6 9 6 6 6-6']
  },
  'chevron-left': {
    viewBox: '0 0 24 24',
    paths: ['m15 18-6-6 6-6']
  },
  'chevron-right': {
    viewBox: '0 0 24 24',
    paths: ['m9 18 6-6-6-6']
  },
  'chevron-up': {
    viewBox: '0 0 24 24',
    paths: ['m18 15-6-6-6 6']
  },
  plus: {
    viewBox: '0 0 24 24',
    paths: ['M12 5v14', 'M5 12h14']
  },
  search: {
    viewBox: '0 0 24 24',
    paths: ['m21 21-4.34-4.34', 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z']
  },
  user: {
    viewBox: '0 0 24 24',
    paths: [
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'
    ]
  },
  x: {
    viewBox: '0 0 24 24',
    paths: ['M18 6 6 18', 'M6 6l12 12']
  }
};

@Component({
  selector: 'cxs-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex shrink-0'
  }
})
export class CxsIconComponent {
  private static nextId = 0;

  @Input({ required: true }) name!: CxsIconName;
  @Input() size: CxsIconSize = 'md';
  @Input() label?: string;

  readonly instanceId = ++CxsIconComponent.nextId;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get icon(): CxsIconDefinition {
    const icon = ICONS[this.name];

    if (!icon) {
      throw new Error(`Unsupported cxs icon: ${this.name}`);
    }

    return icon;
  }

  get iconClass(): string {
    return [BASE_CLASSES, SIZE_CLASSES[this.size], this.hostClass].filter(Boolean).join(' ');
  }

  get titleId(): string | null {
    return this.label ? `cxs-icon-title-${this.instanceId}` : null;
  }
}
