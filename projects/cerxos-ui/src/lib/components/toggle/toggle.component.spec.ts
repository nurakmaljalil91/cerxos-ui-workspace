import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsToggleComponent } from './toggle.component';

describe('CxsToggleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsToggleComponent],
    template: `
      <cxs-toggle
        [checked]="checked"
        [disabled]="disabled"
        label="Email alerts"
        (checkedChange)="onCheckedChange($event)"
      ></cxs-toggle>
    `
  })
  class TestHostComponent {
    checked = false;
    disabled = false;

    onCheckedChange(value: boolean): void {
      this.checked = value;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders with aria-checked set to false by default', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('toggles when clicked', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(host.checked).toBeTrue();
    expect(button.getAttribute('aria-checked')).toBe('true');
  });

  it('does not toggle when disabled', () => {
    host.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(host.checked).toBeFalse();
    expect(button.disabled).toBeTrue();
  });
});
