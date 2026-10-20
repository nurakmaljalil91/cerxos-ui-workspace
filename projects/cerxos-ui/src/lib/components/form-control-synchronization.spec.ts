import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CxsCheckboxComponent } from './checkbox/checkbox.component';
import { CxsDatepickerComponent } from './datepicker/datepicker.component';
import { CxsInputComponent } from './input/input.component';
import { CxsMultiSelectComponent } from './multi-select/multi-select.component';
import { CxsRadioComponent } from './radio/radio.component';
import { CxsSelectComponent } from './select/select.component';
import { CxsSliderComponent } from './slider/slider.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CxsInputComponent,
    CxsSelectComponent,
    CxsDatepickerComponent,
    CxsCheckboxComponent,
    CxsSliderComponent,
    CxsRadioComponent,
    CxsMultiSelectComponent
  ],
  template: `
    <cxs-input [formControl]="name" />
    <cxs-select [formControl]="choice"><option value="one">One</option><option value="two">Two</option></cxs-select>
    <cxs-datepicker [formControl]="date" />
    <cxs-checkbox [formControl]="checked" label="Confirmed" />
    <cxs-slider [formControl]="amount" />
    <cxs-radio [formControl]="selected" value="basic">Basic</cxs-radio>
    <cxs-multi-select [formControl]="teams" [options]="options" />
  `
})
class TestHostComponent {
  readonly name = new FormControl('Alpha', { nonNullable: true });
  readonly choice = new FormControl('one', { nonNullable: true });
  readonly date = new FormControl('2026-10-01', { nonNullable: true });
  readonly checked = new FormControl(false, { nonNullable: true });
  readonly amount = new FormControl(10, { nonNullable: true });
  readonly selected = new FormControl('basic', { nonNullable: true });
  readonly teams = new FormControl<string[]>([], { nonNullable: true });
  readonly options = [{ label: 'Platform', value: 'platform' }];
}

describe('OnPush form control synchronization', () => {
  it('renders programmatic values and resets after the initial render', async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const root = fixture.nativeElement as HTMLElement;

    host.name.setValue('Beta');
    host.choice.setValue('two');
    host.date.setValue('2026-10-20');
    host.checked.setValue(true);
    host.amount.setValue(40);
    host.selected.setValue('other');
    host.teams.setValue(['platform']);
    fixture.detectChanges();

    expect((root.querySelector('cxs-input input') as HTMLInputElement).value).toBe('Beta');
    expect((root.querySelector('cxs-select select') as HTMLSelectElement).value).toBe('two');
    expect((root.querySelector('cxs-datepicker input') as HTMLInputElement).value).toBe('2026-10-20');
    expect((root.querySelector('cxs-checkbox input') as HTMLInputElement).checked).toBeTrue();
    expect((root.querySelector('cxs-slider input') as HTMLInputElement).value).toBe('40');
    expect((root.querySelector('cxs-radio input') as HTMLInputElement).checked).toBeFalse();
    expect(root.querySelector('cxs-multi-select button[aria-label="Remove Platform"]')).not.toBeNull();

    host.name.reset();
    host.choice.reset();
    host.date.reset();
    host.checked.reset();
    host.amount.reset();
    host.selected.reset();
    host.teams.reset();
    fixture.detectChanges();

    expect((root.querySelector('cxs-input input') as HTMLInputElement).value).toBe('Alpha');
    expect((root.querySelector('cxs-select select') as HTMLSelectElement).value).toBe('one');
    expect((root.querySelector('cxs-datepicker input') as HTMLInputElement).value).toBe('2026-10-01');
    expect((root.querySelector('cxs-checkbox input') as HTMLInputElement).checked).toBeFalse();
    expect((root.querySelector('cxs-slider input') as HTMLInputElement).value).toBe('10');
    expect((root.querySelector('cxs-radio input') as HTMLInputElement).checked).toBeTrue();
    expect(root.querySelector('cxs-multi-select button[aria-label="Remove Platform"]')).toBeNull();
  });

  it('renders form-driven disabled and enabled states', async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const host = fixture.componentInstance;
    const root = fixture.nativeElement as HTMLElement;
    const controls = [host.name, host.choice, host.date, host.checked, host.amount, host.selected, host.teams];
    const selectors = [
      'cxs-input input', 'cxs-select select', 'cxs-datepicker input',
      'cxs-checkbox input', 'cxs-slider input', 'cxs-radio input', 'cxs-multi-select input'
    ];

    controls.forEach(control => control.disable());
    fixture.detectChanges();
    selectors.forEach(selector => {
      expect((root.querySelector(selector) as HTMLInputElement | HTMLSelectElement).disabled).toBeTrue();
    });

    controls.forEach(control => control.enable());
    fixture.detectChanges();
    selectors.forEach(selector => {
      expect((root.querySelector(selector) as HTMLInputElement | HTMLSelectElement).disabled).toBeFalse();
    });
  });
});
