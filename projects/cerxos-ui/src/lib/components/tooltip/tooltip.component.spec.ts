import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsTooltipComponent } from './tooltip.component';

describe('CxsTooltipComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsTooltipComponent],
    template: `
      <cxs-tooltip text="View profile">
        <button type="button">Profile</button>
      </cxs-tooltip>
    `
  })
  class TestHostComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('shows tooltip on hover', () => {
    const host = fixture.nativeElement.querySelector('cxs-tooltip') as HTMLElement;
    host.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const tooltip = fixture.nativeElement.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent?.trim()).toBe('View profile');
  });

  it('hides tooltip on mouse leave', () => {
    const host = fixture.nativeElement.querySelector('cxs-tooltip') as HTMLElement;
    host.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    host.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    const tooltip = fixture.nativeElement.querySelector('[role="tooltip"]') as HTMLElement | null;
    expect(tooltip).toBeNull();
  });

  it('hides tooltip on Escape', () => {
    const host = fixture.nativeElement.querySelector('cxs-tooltip') as HTMLElement;
    host.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    const tooltip = fixture.nativeElement.querySelector('[role="tooltip"]') as HTMLElement | null;
    expect(tooltip).toBeNull();
  });
});
