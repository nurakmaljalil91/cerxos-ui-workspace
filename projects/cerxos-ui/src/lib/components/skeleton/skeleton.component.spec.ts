import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsSkeletonComponent, CxsSkeletonVariant } from './skeleton.component';

describe('CxsSkeletonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsSkeletonComponent],
    template: `
      <cxs-skeleton
        class="max-w-sm"
        [variant]="variant"
        [size]="size"
        [animated]="animated"
        [width]="width"
        [height]="height"
        [ariaLabel]="ariaLabel"
      ></cxs-skeleton>
    `
  })
  class TestHostComponent {
    variant: CxsSkeletonVariant = 'line';
    size: 'sm' | 'md' | 'lg' = 'md';
    animated = true;
    width?: string;
    height?: string;
    ariaLabel?: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('renders as decorative by default', () => {
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(skeleton.getAttribute('aria-hidden')).toBe('true');
    expect(skeleton.getAttribute('role')).toBeNull();
  });

  it('announces itself when an aria label is provided', () => {
    host.ariaLabel = 'Loading account summary';
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(skeleton.getAttribute('role')).toBe('status');
    expect(skeleton.getAttribute('aria-label')).toBe('Loading account summary');
    expect(skeleton.getAttribute('aria-live')).toBe('polite');
  });

  it('renders circle skeletons with equal default dimensions', () => {
    host.variant = 'circle';
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(skeleton.classList.contains('rounded-full')).toBeTrue();
    expect(skeleton.style.width).toBe('3rem');
    expect(skeleton.style.height).toBe('3rem');
  });

  it('applies custom dimensions when provided', () => {
    host.variant = 'block';
    host.width = '12rem';
    host.height = '6rem';
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(skeleton.style.width).toBe('12rem');
    expect(skeleton.style.height).toBe('6rem');
  });

  it('can disable shimmer animation', () => {
    host.animated = false;
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(skeleton.className).not.toContain('cxs-skeleton--animated');
  });

  it('forwards host classes to the rendered skeleton', () => {
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(skeleton.classList.contains('max-w-sm')).toBeTrue();
  });
});
