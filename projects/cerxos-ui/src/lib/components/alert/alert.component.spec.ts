import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsAlertComponent } from './alert.component';

describe('CxsAlertComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsAlertComponent],
    template: `
      <cxs-alert title="Heads up">System maintenance scheduled.</cxs-alert>
      <cxs-alert [dismissible]="true" (closed)="closed = true">Dismiss me</cxs-alert>
    `
  })
  class TestHostComponent {
    closed = false;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders title and projected content', () => {
    const alerts = fixture.nativeElement.querySelectorAll('div[role="status"]');
    expect(alerts[0].textContent).toContain('Heads up');
    expect(alerts[0].textContent).toContain('System maintenance scheduled.');
  });

  it('hides when dismissed and emits closed', () => {
    const closeButton = fixture.nativeElement.querySelector(
      'button[aria-label="Dismiss alert"]'
    ) as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(host.closed).toBeTrue();
    const remainingButton = fixture.nativeElement.querySelector(
      'button[aria-label="Dismiss alert"]'
    );
    expect(remainingButton).toBeNull();
  });
});
