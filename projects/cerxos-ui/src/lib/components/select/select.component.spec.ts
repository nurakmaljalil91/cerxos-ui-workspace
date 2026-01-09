import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CxsSelectComponent } from './select.component';

describe('CxsSelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [FormsModule, CxsSelectComponent],
    template: `
      <cxs-select [(ngModel)]="value" placeholder="Pick one">
        <option value="one">One</option>
        <option value="two">Two</option>
      </cxs-select>
    `
  })
  class TestHostComponent {
    value = '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the placeholder when value is empty', () => {
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.value).toBe('');
    expect(select.selectedOptions[0].textContent?.trim()).toBe('Pick one');
  });

  it('updates value on change', () => {
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'two';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(host.value).toBe('two');
  });

  it('reflects invalid state in aria attributes', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsSelectComponent;
    component.invalid = true;
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables when disabled input is true', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsSelectComponent;
    component.disabled = true;
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.disabled).toBeTrue();
  });
});
