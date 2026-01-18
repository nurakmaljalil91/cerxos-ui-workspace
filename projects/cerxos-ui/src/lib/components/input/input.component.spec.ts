import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CxsInputComponent } from './input.component';

describe('CxsInputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [FormsModule, CxsInputComponent],
    template: `
      <cxs-input [(ngModel)]="value" placeholder="Email">
        <span cxsInputError>Invalid email</span>
      </cxs-input>
    `
  })
  class TestHostComponent {
    value = 'initial';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the provided value', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('updates value on input', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'next';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.value).toBe('next');
  });

  it('reflects invalid state in aria attributes', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsInputComponent;
    component.invalid = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables when disabled input is true', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsInputComponent;
    component.disabled = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBeTrue();
  });

  it('renders error content when invalid', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsInputComponent;
    component.invalid = true;
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const errorContainer = fixture.nativeElement.querySelector(
      `#${component.errorId}`
    ) as HTMLElement | null;

    expect(input.getAttribute('aria-describedby')).toContain(component.errorId);
    expect(errorContainer?.textContent?.trim()).toContain('Invalid email');
  });

  it('renders a label and associates it with the input', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsInputComponent;
    component.label = 'Email address';
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(label.textContent?.trim()).toContain('Email address');
    expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
    expect(input.getAttribute('aria-labelledby')).toBe(label.getAttribute('id'));
  });
});
