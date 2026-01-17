import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

export type CxsAvatarSize = 'sm' | 'md' | 'lg';
export type CxsAvatarShape = 'circle' | 'square';

const BASE_CLASSES =
  'inline-flex items-center justify-center overflow-hidden border border-[var(--cxs-color-border)] ' +
  'bg-[var(--cxs-color-primary-ghost)] text-[var(--cxs-color-primary)] font-semibold uppercase ' +
  'select-none';

const SIZE_CLASSES: Record<CxsAvatarSize, string> = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-14 w-14 text-sm'
};

const SHAPE_CLASSES: Record<CxsAvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-[var(--cxs-radius-md)]'
};

const FALLBACK_CLASSES = 'leading-none';

@Component({
  selector: 'cxs-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsAvatarComponent {
  private _src?: string;

  @Input()
  set src(value: string | undefined) {
    if (value !== this._src) {
      this._src = value;
      this.imageError = false;
    }
  }

  get src(): string | undefined {
    return this._src;
  }
  @Input() name?: string;
  @Input() alt?: string;
  @Input() size: CxsAvatarSize = 'md';
  @Input() shape: CxsAvatarShape = 'circle';

  imageError = false;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get avatarClass(): string {
    return [BASE_CLASSES, SIZE_CLASSES[this.size], SHAPE_CLASSES[this.shape], this.hostClass]
      .filter(Boolean)
      .join(' ');
  }

  get fallbackClass(): string {
    return FALLBACK_CLASSES;
  }

  get altText(): string {
    if (this.alt !== undefined) {
      return this.alt;
    }

    if (this.name) {
      return this.name;
    }

    return 'Avatar';
  }

  get fallbackLabel(): string {
    if (this.name) {
      return this.name;
    }

    if (this.alt && this.alt.trim().length > 0) {
      return this.alt;
    }

    return 'Avatar';
  }

  get fallbackText(): string {
    if (!this.name) {
      return '?';
    }

    return this.getInitials(this.name);
  }

  get showImage(): boolean {
    return !!this.src && !this.imageError;
  }

  onImageError(): void {
    this.imageError = true;
  }

  private getInitials(value: string): string {
    const parts = value
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    const word = parts[0] ?? '';
    return word.slice(0, 2).toUpperCase() || '?';
  }
}
