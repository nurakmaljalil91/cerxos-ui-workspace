import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CxsRadioChipGroupComponent, type CxsRadioChipOption } from './radio-chip-group.component';

@Component({
  selector: 'cxs-radio-chip-test-host',
  standalone: true,
  imports: [ReactiveFormsModule, CxsRadioChipGroupComponent],
  template: `
    <cxs-radio-chip-group
      label="Type"
      [options]="options"
      [invalid]="invalid"
      [formControl]="type"
    />
  `
})
class TestHostComponent {
  readonly options: CxsRadioChipOption[] = [
    { label: 'Credit', value: 'Credit', tone: 'primary' },
    { label: 'Debit', value: 'Debit', tone: 'danger' }
  ];
  readonly type = new FormControl<string | null>(null);
  invalid = false;
}

describe('CxsRadioChipGroupComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  const radios = (fixture: ComponentFixture<TestHostComponent>) =>
    Array.from(fixture.nativeElement.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];

  it('renders two labeled, unselected choices in one native radio group', () => {
    const [credit, debit] = radios(fixture);
    const fieldset = fixture.nativeElement.querySelector('fieldset') as HTMLFieldSetElement;

    expect(fieldset.querySelector('legend')?.textContent?.trim()).toBe('Type');
    expect(radios(fixture).length).toBe(2);
    expect(credit.name).toBe(debit.name);
    expect(credit.checked).toBeFalse();
    expect(debit.checked).toBeFalse();
    expect(credit.closest('label')?.textContent).toContain('Credit');
    expect(debit.closest('label')?.textContent).toContain('Debit');
  });

  it('updates the reactive form and shows a non-color selected marker', () => {
    const [credit, debit] = radios(fixture);
    debit.click();
    fixture.detectChanges();

    expect(host.type.value).toBe('Debit');
    expect(credit.checked).toBeFalse();
    expect(debit.checked).toBeTrue();
    expect(debit.closest('label')?.textContent).toContain('✓');
    expect(credit.closest('label')?.textContent).not.toContain('✓');
  });

  it('uses focusable native radios for keyboard access', () => {
    const [credit, debit] = radios(fixture);
    credit.focus();

    expect(document.activeElement).toBe(credit);
    expect(credit.type).toBe('radio');
    expect(debit.type).toBe('radio');
    expect(credit.tabIndex).toBe(0);
  });

  it('reflects programmatic values, invalid state, and disabled controls', () => {
    host.type.setValue('Credit');
    host.invalid = true;
    fixture.detectChanges();
    expect(radios(fixture)[0].checked).toBeTrue();
    expect(radios(fixture)[0].getAttribute('aria-invalid')).toBe('true');

    host.type.disable();
    fixture.detectChanges();
    expect(radios(fixture).every((radio) => radio.disabled)).toBeTrue();
  });
});
