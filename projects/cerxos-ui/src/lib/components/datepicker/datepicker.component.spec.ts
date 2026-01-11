import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CxsDatepickerComponent } from './datepicker.component';

describe('CxsDatepickerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [FormsModule, CxsDatepickerComponent],
    template: `
      <cxs-datepicker [(ngModel)]="value"></cxs-datepicker>
      <cxs-datepicker [(ngModel)]="customValue" [useNative]="false"></cxs-datepicker>
    `
  })
  class TestHostComponent {
    value = '2024-01-15';
    customValue = '2024-03-10';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the bound value', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('2024-01-15');
  });

  it('updates value on input', () => {
    const input = fixture.nativeElement.querySelector('input[type="date"]') as HTMLInputElement;
    input.value = '2024-02-01';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.value).toBe('2024-02-01');
  });

  it('selects a date from the custom overlay', () => {
    const customInput = fixture.nativeElement.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    customInput.click();
    fixture.detectChanges();

    const dayButton = fixture.nativeElement.querySelector(
      'button[data-date="2024-03-15"]'
    ) as HTMLButtonElement;
    dayButton.click();
    fixture.detectChanges();

    expect(host.customValue).toBe('2024-03-15');
  });
});
