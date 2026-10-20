import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import {
  CxsHoverCardComponent,
  CxsHoverCardContentDirective,
  CxsHoverCardTriggerDirective
} from './hover-card.component';

@Component({
  selector: 'cxs-hover-card-test-host',
  standalone: true,
  imports: [
    CxsHoverCardComponent,
    CxsHoverCardContentDirective,
    CxsHoverCardTriggerDirective
  ],
  template: `
    <cxs-hover-card [openDelay]="100" [closeDelay]="150">
      <a cxsHoverCardTrigger href="#profile">View profile</a>
      <div cxsHoverCardContent side="top" align="start" ariaLabel="Profile preview">
        <a href="#details">Profile details</a>
      </div>
    </cxs-hover-card>
  `
})
class TestHostComponent {}

describe('CxsHoverCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;
  let trigger: HTMLAnchorElement;
  let content: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    host = fixture.nativeElement.querySelector('cxs-hover-card');
    trigger = fixture.nativeElement.querySelector('[cxsHoverCardTrigger]');
    content = fixture.nativeElement.querySelector('[cxsHoverCardContent]');
  });

  it('keeps projected content hidden until the hover delay expires', fakeAsync(() => {
    expect(content.hasAttribute('hidden')).toBeTrue();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);

    host.dispatchEvent(new Event('mouseenter'));
    tick(99);
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeTrue();

    tick(1);
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeFalse();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(content.getAttribute('role')).toBe('dialog');
    expect(content.getAttribute('aria-label')).toBe('Profile preview');
  }));

  it('keeps the card open while moving the pointer into its content', fakeAsync(() => {
    host.dispatchEvent(new Event('mouseenter'));
    tick(100);
    fixture.detectChanges();

    host.dispatchEvent(new Event('mouseleave'));
    tick(100);
    host.dispatchEvent(new Event('mouseenter'));
    tick(150);
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeFalse();

    host.dispatchEvent(new Event('mouseleave'));
    tick(150);
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeTrue();
  }));

  it('opens on keyboard focus and stays open when focus moves into the card', fakeAsync(() => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeFalse();

    const details = content.querySelector('a') as HTMLAnchorElement;
    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: details }));
    tick(150);
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeFalse();

    details.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    tick(150);
    fixture.detectChanges();
    expect(content.hasAttribute('hidden')).toBeTrue();
  }));

  it('closes on Escape without moving focus', fakeAsync(() => {
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(content.hasAttribute('hidden')).toBeTrue();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  }));

  it('returns focus to the trigger when Escape closes content', fakeAsync(() => {
    trigger.focus();
    fixture.detectChanges();
    const details = content.querySelector('a') as HTMLAnchorElement;
    details.focus();
    fixture.detectChanges();

    details.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(trigger);
    expect(content.hasAttribute('hidden')).toBeTrue();
  }));

  it('places the content on the requested side and alignment', () => {
    expect(content.className).toContain('bottom-full');
    expect(content.className).toContain('left-0');
  });
});
