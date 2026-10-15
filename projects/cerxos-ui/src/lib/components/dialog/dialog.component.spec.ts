import { Component, signal } from '@angular/core';
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
        [closeOnBackdrop]="closeOnBackdrop()"
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
    readonly closeOnBackdrop = signal(true);
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

  function getOverlay(): HTMLElement {
    return fixture.nativeElement.querySelector('[role="dialog"]')?.parentElement as HTMLElement;
  }

  function getPanel(): HTMLElement {
    return fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
  }

  function pressOn(target: HTMLElement): void {
    target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  }

  function clickOn(target: HTMLElement): void {
    target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
  }

  it('closes when pressing and releasing on the backdrop', () => {
    const overlay = getOverlay();
    pressOn(overlay);
    clickOn(overlay);

    expect(host.open).toBeFalse();
    expect(host.lastReason).toBe('backdrop');
  });

  it('stays open when a press inside the panel is released on the backdrop', () => {
    pressOn(getPanel());
    // The browser targets the click at the common ancestor: the overlay.
    clickOn(getOverlay());

    expect(host.open).toBeTrue();
    expect(host.lastReason).toBeUndefined();
  });

  it('stays open when a press on the backdrop is released inside the panel', () => {
    pressOn(getOverlay());
    clickOn(getPanel());

    expect(host.open).toBeTrue();
    expect(host.lastReason).toBeUndefined();
  });

  it('stays open on a backdrop click when closeOnBackdrop is false', () => {
    host.closeOnBackdrop.set(false);
    fixture.detectChanges();

    const overlay = getOverlay();
    pressOn(overlay);
    clickOn(overlay);

    expect(host.open).toBeTrue();
    expect(host.lastReason).toBeUndefined();
  });

  it('closes when pressing Escape with closeOnBackdrop false', () => {
    host.closeOnBackdrop.set(false);
    fixture.detectChanges();

    getPanel().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(host.open).toBeFalse();
    expect(host.lastReason).toBe('escape');
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
