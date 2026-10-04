import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsHabitGridComponent, CxsHabitGridDayToggle, CxsIsoDay } from './habit-grid.component';

describe('CxsHabitGridComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsHabitGridComponent],
    template: `
      <cxs-habit-grid
        [from]="from"
        [to]="to"
        [today]="today"
        [startDate]="startDate"
        [doneDates]="doneDates"
        [scheduledDays]="scheduledDays"
        [weeklyTarget]="weeklyTarget"
        [accentColor]="accentColor"
        [interactive]="interactive"
        (dayToggle)="toggles.push($event)"
      ></cxs-habit-grid>
    `
  })
  class TestHostComponent {
    // 2026-09-28 is a Monday and 2026-10-04 a Sunday.
    from = '2026-09-28';
    to = '2026-10-11';
    today = '2026-10-04';
    startDate: string | null = '2026-09-29';
    doneDates: string[] = ['2026-09-30', '2026-10-02'];
    scheduledDays: CxsIsoDay[] | null = null;
    weeklyTarget: number | null = null;
    accentColor: string | null = null;
    interactive = false;
    toggles: CxsHabitGridDayToggle[] = [];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  const cell = (date: string): HTMLElement =>
    fixture.nativeElement.querySelector(`[data-date="${date}"]`) as HTMLElement;

  const rerender = (changes: Partial<TestHostComponent>): void => {
    Object.assign(host, changes);
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  };

  it('renders one column per Monday–Sunday week and seven day rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('[role="row"]');
    expect(rows.length).toBe(7);
    expect(rows[0].querySelectorAll('[role="gridcell"]').length).toBe(2);
    expect(rows[0].querySelector('[role="rowheader"]').textContent.trim()).toBe('Mon');
  });

  it('assigns done, empty, and out-of-range states', () => {
    expect(cell('2026-09-30').dataset['state']).toBe('done');
    expect(cell('2026-10-01').dataset['state']).toBe('empty');
    expect(cell('2026-09-28').dataset['state']).toBe('out-of-range');
    expect(cell('2026-10-05').dataset['state']).toBe('out-of-range');
  });

  it('marks unscheduled days as off, even when a completion exists', () => {
    rerender({ scheduledDays: [1, 3, 5] });

    expect(cell('2026-09-30').dataset['state']).toBe('done');
    expect(cell('2026-10-01').dataset['state']).toBe('off');
    rerender({ scheduledDays: [1, 4], doneDates: ['2026-09-30'] });
    expect(cell('2026-09-30').dataset['state']).toBe('off');
  });

  it('pads the first and last week with hidden cells outside the range', () => {
    rerender({ from: '2026-09-30', to: '2026-10-02' });

    const padding = fixture.nativeElement.querySelectorAll('[role="gridcell"][aria-hidden="true"]');
    expect(padding.length).toBe(4);
    expect(cell('2026-09-29')).toBeNull();
  });

  it('labels each day with its full date and state', () => {
    expect(cell('2026-09-30').getAttribute('aria-label')).toBe('Wednesday, 30 September 2026, done');
    expect(cell('2026-10-01').getAttribute('aria-label')).toBe('Thursday, 1 October 2026, not done');
  });

  it('shows weekly progress when a target is set', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="cxs-habit-grid-progress"]')).toBeNull();

    rerender({ weeklyTarget: 3 });

    const labels = Array.from(
      fixture.nativeElement.querySelectorAll('[data-testid="cxs-habit-grid-progress"] [aria-label]') as NodeListOf<HTMLElement>
    ).map((el) => el.textContent?.trim());
    expect(labels).toEqual(['2/3', '0/3']);
  });

  it('does not emit toggles unless interactive', () => {
    cell('2026-10-01').click();

    expect(host.toggles).toEqual([]);
    expect(fixture.nativeElement.querySelector('[role="grid"]').getAttribute('aria-readonly')).toBe('true');
  });

  it('emits the requested state when an interactive cell is clicked', () => {
    rerender({ interactive: true });

    cell('2026-10-01').click();
    cell('2026-09-30').click();

    expect(host.toggles).toEqual([
      { date: '2026-10-01', done: true },
      { date: '2026-09-30', done: false }
    ]);
  });

  it('toggles with Space and Enter', () => {
    rerender({ interactive: true });

    cell('2026-10-01').dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    cell('2026-09-30').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(host.toggles).toEqual([
      { date: '2026-10-01', done: true },
      { date: '2026-09-30', done: false }
    ]);
  });

  it('never toggles off or out-of-range days', () => {
    rerender({ interactive: true, scheduledDays: [1, 3, 5] });

    cell('2026-10-01').click();
    cell('2026-10-05').click();
    cell('2026-09-28').dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

    expect(host.toggles).toEqual([]);
    expect(cell('2026-10-01').getAttribute('aria-disabled')).toBe('true');
  });

  it('uses a roving tabindex starting at today and moves focus with arrow keys', async () => {
    expect(cell('2026-10-04').tabIndex).toBe(0);
    expect(cell('2026-10-03').tabIndex).toBe(-1);

    cell('2026-10-04').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    fixture.detectChanges();
    await Promise.resolve();
    expect(cell('2026-10-03').tabIndex).toBe(0);
    expect(document.activeElement).toBe(cell('2026-10-03'));

    cell('2026-10-03').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    await Promise.resolve();
    expect(cell('2026-09-28').tabIndex).toBe(0);

    cell('2026-09-28').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    await Promise.resolve();
    expect(cell('2026-09-28').tabIndex).toBe(0);
  });

  it('applies the accent colour as a CSS variable', () => {
    rerender({ accentColor: '#22c55e' });

    const element = fixture.nativeElement.querySelector('cxs-habit-grid') as HTMLElement;
    expect(element.style.getPropertyValue('--cxs-habit-grid-accent')).toBe('#22c55e');
  });

  it('renders nothing for an invalid range', () => {
    rerender({ from: '2026-10-11', to: '2026-09-28' });

    expect(fixture.nativeElement.querySelectorAll('[role="gridcell"]').length).toBe(0);
  });
});
