import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsIconName =
  | 'banknotes'  
  | 'bell'
  | 'calendar'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'eye'
  | 'eye-off'
  | 'filter'
  | 'folder'
  | 'home'
  | 'pencil'
  | 'plus'
  | 'search'
  | 'trash'
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
  banknotes: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
    ]
  },
  bell: {
    viewBox: '0 0 24 24',
    paths: [
      'M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5',
      'M10.3 20a2 2 0 0 0 3.4 0'
    ]
  },
  calendar: {
    viewBox: '0 0 24 24',
    paths: [
      'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z'
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
  eye: {
    viewBox: '0 0 24 24',
    paths: [
      'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
      'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z'
    ]
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    paths: [
      'M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 0 1 4.167-4.827M6.633 6.633A10.081 10.081 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.081 10.081 0 0 1-4.167 4.827M6.633 6.633L3 3m3.633 3L9.75 9m3.617-3L21 3m-33L17.25 9M3 3l18 18'
    ]
  },
  filter: {
    viewBox: '0 0 24 24',
    paths: ['M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707L14.414 12l6.293 6.293A1 1 0 0 1 21 19V21a1 1 0 0 1-1-1H4a1 1 0 0 1-1-1V4Z']
  },
  folder: {
    viewBox: '0 0 24 24',
    paths: [
      'M3 6h5l2 2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z',
      'M10 6V4a2 2 0 0 1 2-2h4'
    ]
  },
  home: {
    viewBox: '0 0 24 24',
    paths: ['M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 001 1h3m-13 0h8']
  },
  pencil: {
    viewBox: '0 0 24 24',
    paths: ['M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z', 'm15 5 4 4']
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
  trash: {
    viewBox: '0 0 24 24',
    paths: [
      'M3 6h18',
      'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6',
      'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2',
      'M10 11v6',
      'M14 11v6'
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
