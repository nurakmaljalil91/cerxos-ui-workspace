import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsDialogCloseReason, CxsDialogComponent } from './dialog.component';

describe('CxsDialogComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsDialogComponent],
    template: `
      <cxs-dialog
        [open]="open"
        title="Invite teammates"
        description="Share access with your team."
        (openChange)="onOpenChange($event)"
        (closed)="onClosed($event)"
      >
        <p>Use email addresses to invite new members.</p>
        <div cxsDialogActions>
          <button type="button">Cancel</button>
          <button type="button">Send</button>
        </div>
      </cxs-dialog>
    `
  })
  class TestHostComponent {
    open = true;
    lastReason?: CxsDialogCloseReason;

    onOpenChange(value: boolean): void {
      this.open = value;
    }

    onClosed(reason: CxsDialogCloseReason): void {
      this.lastReason = reason;
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

  it('renders the dialog when open is true', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain('Invite teammates');
  });

  it('applies appear animation classes to the overlay and panel', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    const overlay = dialog.parentElement as HTMLElement;

    expect(overlay.classList).toContain('cxs-dialog-overlay');
    expect(dialog.classList).toContain('cxs-dialog-panel');
  });

  it('closes when clicking the backdrop', () => {
    const overlay = fixture.nativeElement.querySelector('[role="dialog"]')?.parentElement as HTMLElement;
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(host.open).toBeFalse();
    expect(host.lastReason).toBe('backdrop');
  });

  it('closes when pressing Escape', () => {
    host.open = true;
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(host.open).toBeFalse();
    expect(host.lastReason).toBe('escape');
  });

  it('closes when clicking the dismiss button', () => {
    host.open = true;
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('button[aria-label="Close dialog"]') as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(host.open).toBeFalse();
    expect(host.lastReason).toBe('dismiss');
  });
});
