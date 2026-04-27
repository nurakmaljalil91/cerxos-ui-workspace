import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type CxsSkeletonVariant = 'line' | 'block' | 'circle';
export type CxsSkeletonSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES = 'cxs-skeleton block overflow-hidden bg-[var(--cxs-color-skeleton-base)]';

const VARIANT_CLASSES: Record<CxsSkeletonVariant, string> = {
  line: 'rounded-[var(--cxs-radius-md)]',
  block: 'rounded-[var(--cxs-radius-md)]',
  circle: 'rounded-full'
};

const SIZE_DIMENSIONS: Record<CxsSkeletonVariant, Record<CxsSkeletonSize, { width: string; height: string }>> =
  {
    line: {
      sm: { width: '100%', height: '0.75rem' },
      md: { width: '100%', height: '1rem' },
      lg: { width: '100%', height: '1.25rem' }
    },
    block: {
      sm: { width: '100%', height: '3rem' },
      md: { width: '100%', height: '4rem' },
      lg: { width: '100%', height: '5rem' }
    },
    circle: {
      sm: { width: '2rem', height: '2rem' },
      md: { width: '3rem', height: '3rem' },
      lg: { width: '4rem', height: '4rem' }
    }
  };

@Component({
  selector: 'cxs-skeleton',
  standalone: true,
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsSkeletonComponent {
  @Input() variant: CxsSkeletonVariant = 'line';
  @Input() size: CxsSkeletonSize = 'md';
  @Input() animated = true;
  @Input() width?: string;
  @Input() height?: string;
  @Input() ariaLabel?: string;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  get skeletonClass(): string {
    return [
      BASE_CLASSES,
      VARIANT_CLASSES[this.variant],
      this.animated ? 'cxs-skeleton--animated' : '',
      this.hostClass
    ]
      .filter(Boolean)
      .join(' ');
  }

  get resolvedWidth(): string {
    return this.width ?? SIZE_DIMENSIONS[this.variant][this.size].width;
  }

  get resolvedHeight(): string {
    return this.height ?? SIZE_DIMENSIONS[this.variant][this.size].height;
  }

  get role(): 'status' | null {
    return this.ariaLabel ? 'status' : null;
  }

  get ariaLabelValue(): string | null {
    return this.ariaLabel ?? null;
  }
}
