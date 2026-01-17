import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';

export interface CxsCarouselItem {
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
}

const WRAPPER_BASE_CLASSES = 'relative overflow-hidden rounded-[var(--cxs-radius-md)]';
const TRACK_CLASSES = 'flex transition-transform duration-500 ease-out';
const SLIDE_BASE_CLASSES = 'w-full flex-shrink-0';
const IMAGE_CLASSES = 'h-56 w-full object-cover';
const CONTENT_CLASSES =
  'absolute inset-x-0 bottom-0 bg-[rgba(15,23,42,0.6)] px-4 py-3 text-sm text-white';

const CONTROL_CLASSES =
  'absolute top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full ' +
  'bg-[rgba(15,23,42,0.7)] text-white transition hover:bg-[rgba(15,23,42,0.85)] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-[var(--cxs-color-focus)]';

const INDICATOR_CONTAINER_CLASSES =
  'absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2';
const INDICATOR_BASE_CLASSES =
  'h-2 w-2 rounded-full bg-white/50 transition-colors';
const INDICATOR_ACTIVE_CLASSES = 'bg-white';

@Component({
  selector: 'cxs-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CxsCarouselComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() items: CxsCarouselItem[] = [];
  @Input() activeIndex = 0;
  @Input() autoplay = false;
  @Input() interval = 4000;
  @Input() loop = true;
  @Input() showControls = true;
  @Input() showIndicators = true;
  @Input() ariaLabel = 'Carousel';

  @Output() activeIndexChange = new EventEmitter<number>();

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(@Attribute('class') private readonly hostClass: string | null) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['autoplay'] || changes['interval']) {
      this.resetAutoplay();
    }
    if (changes['activeIndex']) {
      this.activeIndex = this.clampIndex(this.activeIndex);
    }
  }

  ngAfterViewInit(): void {
    this.resetAutoplay();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  get wrapperClass(): string {
    return [WRAPPER_BASE_CLASSES, this.hostClass].filter(Boolean).join(' ');
  }

  get trackStyle(): string {
    return `translateX(-${this.activeIndex * 100}%)`;
  }

  get trackClass(): string {
    return TRACK_CLASSES;
  }

  get slideClass(): string {
    return SLIDE_BASE_CLASSES;
  }

  get imageClass(): string {
    return IMAGE_CLASSES;
  }

  get contentClass(): string {
    return CONTENT_CLASSES;
  }

  get controlClass(): string {
    return CONTROL_CLASSES;
  }

  get indicatorContainerClass(): string {
    return INDICATOR_CONTAINER_CLASSES;
  }

  indicatorClass(isActive: boolean): string {
    return [INDICATOR_BASE_CLASSES, isActive ? INDICATOR_ACTIVE_CLASSES : '']
      .filter(Boolean)
      .join(' ');
  }

  previous(): void {
    this.goTo(this.activeIndex - 1);
  }

  next(): void {
    this.goTo(this.activeIndex + 1);
  }

  goTo(index: number): void {
    const nextIndex = this.normalizeIndex(index);
    this.activeIndex = nextIndex;
    this.activeIndexChange.emit(nextIndex);
  }

  private normalizeIndex(index: number): number {
    if (!this.items.length) {
      return 0;
    }

    if (this.loop) {
      const total = this.items.length;
      return (index + total) % total;
    }

    return this.clampIndex(index);
  }

  private clampIndex(index: number): number {
    if (!this.items.length) {
      return 0;
    }

    return Math.min(Math.max(0, index), this.items.length - 1);
  }

  private resetAutoplay(): void {
    this.clearAutoplay();

    if (!this.autoplay || this.items.length <= 1) {
      return;
    }

    const intervalMs = Math.max(1000, this.interval);
    this.timerId = setInterval(() => {
      this.next();
    }, intervalMs);
  }

  private clearAutoplay(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
