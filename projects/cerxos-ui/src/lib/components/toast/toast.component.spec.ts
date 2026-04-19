import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CxsToastCloseReason, CxsToastComponent } from './toast.component';

describe('CxsToastComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsToastComponent],
    template: `
      <cxs-toast
        [open]="open"
        title="Saved"
        message="Changes were saved."
        [duration]="duration"
        position="bottom-right"
        (openChange)="open = $event"
        (dismissed)="onDismissed($event)"
      >
        <button cxsToastAction type="button">Undo</button>
      </cxs-toast>
    `
  })
  class TestHostComponent {
    open = true;
    duration = 0;
    reason?: CxsToastCloseReason;

    onDismissed(reason: CxsToastCloseReason): void {
      this.reason = reason;
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

  it('renders title and message when open', () => {
    const toast = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
    expect(toast).toBeTruthy();
    expect(toast.textContent).toContain('Saved');
    expect(toast.textContent).toContain('Changes were saved.');
  });

  it('applies the toast animation class', () => {
    const toast = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;

    expect(toast.classList).toContain('cxs-toast-panel');
  });

  it('dismisses when clicking the close button', fakeAsync(() => {
    const closeButton = fixture.nativeElement.querySelector('button[aria-label="Dismiss notification"]') as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(host.open).toBeFalse();
    expect(host.reason).toBe('dismiss');

    const toast = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
    expect(toast).toBeTruthy();
    expect(toast.classList).toContain('cxs-toast-panel-exit');

    tick(220);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  }));

  it('auto-dismisses after duration', fakeAsync(() => {
    host.duration = 1000;
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(host.open).toBeFalse();
    expect(host.reason).toBe('timeout');

    tick(220);
    fixture.detectChanges();
  }));
});
