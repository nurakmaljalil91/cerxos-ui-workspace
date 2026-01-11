import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CxsRadioComponent } from './radio.component';

describe('CxsRadioComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [FormsModule, CxsRadioComponent],
    template: `
      <cxs-radio name="plan" value="basic" [(ngModel)]="value">Basic</cxs-radio>
      <cxs-radio name="plan" value="pro" [(ngModel)]="value">Pro</cxs-radio>
    `
  })
  class TestHostComponent {
    value = 'basic';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders projected content', () => {
    const labels = fixture.nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;
    expect(labels[0].textContent?.trim()).toContain('Basic');
  });

  it('marks the matching value as checked', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    expect(inputs[0].checked).toBeTrue();
    expect(inputs[1].checked).toBeFalse();
  });

  it('updates value on change', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(host.value).toBe('pro');
  });

  it('reflects invalid state in aria attributes', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsRadioComponent;
    component.invalid = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables when disabled input is true', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsRadioComponent;
    component.disabled = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBeTrue();
  });
});
