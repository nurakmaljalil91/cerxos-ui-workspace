import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsProgressBarComponent, CxsProgressBarVariant } from './progress-bar.component';

describe('CxsProgressBarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsProgressBarComponent],
    template: `
      <cxs-progress-bar
        [value]="value"
        [max]="max"
        [variant]="variant"
        [label]="label"
        [showValue]="showValue"
        [indeterminate]="indeterminate"
        [ariaLabel]="ariaLabel"
      ></cxs-progress-bar>
    `
  })
  class TestHostComponent {
    value = 45;
    max = 100;
    variant: CxsProgressBarVariant = 'primary';
    label?: string;
    showValue = false;
    indeterminate = false;
    ariaLabel = 'Completion progress';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('renders progressbar semantics', () => {
    fixture.detectChanges();

    const progressbar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement;
    expect(progressbar.getAttribute('aria-valuemin')).toBe('0');
    expect(progressbar.getAttribute('aria-valuemax')).toBe('100');
    expect(progressbar.getAttribute('aria-valuenow')).toBe('45');
    expect(progressbar.getAttribute('aria-label')).toBe('Completion progress');
  });

  it('links a visible label to the progressbar', () => {
    host.label = 'Upload progress';
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('span') as HTMLElement;
    const progressbar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement;

    expect(label.textContent?.trim()).toBe('Upload progress');
    expect(progressbar.getAttribute('aria-labelledby')).toBe(label.getAttribute('id'));
    expect(progressbar.getAttribute('aria-label')).toBeNull();
  });

  it('shows a rounded percentage when requested', () => {
    host.value = 33;
    host.max = 60;
    host.showValue = true;
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector('[class*="text-[var(--cxs-color-on-surface-muted)]"]') as HTMLElement;
    const progressbar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement;

    expect(value.textContent?.trim()).toBe('55%');
    expect(progressbar.getAttribute('aria-valuetext')).toBe('55%');
  });

  it('clamps values above the max', () => {
    host.value = 160;
    host.max = 120;
    fixture.detectChanges();

    const progressbar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement;
    const fill = progressbar.firstElementChild as HTMLElement;

    expect(progressbar.getAttribute('aria-valuenow')).toBe('120');
    expect(fill.style.width).toBe('100%');
  });

  it('applies danger fill styles', () => {
    host.variant = 'danger';
    fixture.detectChanges();

    const fill = fixture.nativeElement.querySelector('[role="progressbar"] > div') as HTMLElement;
    expect(fill.className).toContain('bg-[var(--cxs-color-danger)]');
  });

  it('supports indeterminate progress', () => {
    host.indeterminate = true;
    host.showValue = true;
    fixture.detectChanges();

    const progressbar = fixture.nativeElement.querySelector('[role="progressbar"]') as HTMLElement;
    const fill = progressbar.firstElementChild as HTMLElement;
    const value = fixture.nativeElement.querySelector('[class*="text-[var(--cxs-color-on-surface-muted)]"]') as HTMLElement;

    expect(progressbar.getAttribute('aria-valuenow')).toBeNull();
    expect(progressbar.getAttribute('aria-valuetext')).toBe('Loading');
    expect(fill.className).toContain('animate-[cxs-progress-indeterminate_1.4s_ease-in-out_infinite]');
    expect(value.textContent?.trim()).toBe('Loading');
  });
});
