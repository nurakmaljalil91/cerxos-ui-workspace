import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CxsCheckboxComponent } from './checkbox.component';

describe('CxsCheckboxComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [FormsModule, CxsCheckboxComponent],
    template: `
      <cxs-checkbox [(ngModel)]="value" label="Accept terms"></cxs-checkbox>
      <cxs-checkbox [indeterminate]="true">Mixed</cxs-checkbox>
    `
  })
  class TestHostComponent {
    value = false;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders label text', () => {
    const labels = fixture.nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>;
    expect(labels[0].textContent?.trim()).toContain('Accept terms');
  });

  it('updates value on change', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(host.value).toBeTrue();
  });

  it('reflects indeterminate state in aria attributes', () => {
    const input = fixture.nativeElement.querySelectorAll('input')[1] as HTMLInputElement;
    expect(input.indeterminate).toBeTrue();
    expect(input.getAttribute('aria-checked')).toBe('mixed');
  });
});
