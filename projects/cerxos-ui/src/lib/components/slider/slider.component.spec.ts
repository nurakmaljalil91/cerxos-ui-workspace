import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsSliderComponent, CxsSliderVariant } from './slider.component';

describe('CxsSliderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsSliderComponent],
    template: `
      <cxs-slider
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
        [variant]="variant"
        [label]="label"
        [showValue]="showValue"
        [disabled]="disabled"
        [ariaLabel]="ariaLabel"
        (valueChange)="value = $event"
      ></cxs-slider>
    `
  })
  class TestHostComponent {
    value = 25;
    min = 0;
    max = 100;
    step = 5;
    variant: CxsSliderVariant = 'primary';
    label?: string;
    showValue = false;
    disabled = false;
    ariaLabel = 'Volume';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('renders range semantics', () => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
    expect(input.step).toBe('5');
    expect(input.getAttribute('aria-label')).toBe('Volume');
  });

  it('updates the bound value on input', () => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    input.value = '40';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.value).toBe(40);
  });

  it('shows the current value when requested', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsSliderComponent;
    host.showValue = true;
    component.value = 25;
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector('span:last-child') as HTMLElement;
    expect(value.textContent?.trim()).toBe('25');
  });

  it('associates a visible label with the range input', () => {
    host.label = 'Volume';
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;

    expect(label.textContent?.trim()).toBe('Volume');
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-labelledby')).toBe(label.id);
    expect(input.getAttribute('aria-label')).toBeNull();
  });

  it('clamps values above the max', () => {
    host.value = 130;
    host.max = 80;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.value).toBe('80');
    expect(input.style.getPropertyValue('--cxs-slider-percent')).toBe('100%');
  });

  it('applies danger variant styles', () => {
    host.variant = 'danger';
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.className).toContain('cxs-slider--danger');
    expect(input.style.getPropertyValue('--cxs-slider-fill')).toBe('var(--cxs-color-danger)');
  });

  it('disables the range input', () => {
    host.disabled = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.disabled).toBeTrue();
  });
});
