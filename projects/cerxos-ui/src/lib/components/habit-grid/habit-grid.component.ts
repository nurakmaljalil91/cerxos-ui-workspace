import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output
} from '@angular/core';

/** ISO day of week: 1 = Monday … 7 = Sunday. */
export type CxsIsoDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * State of a day cell:
 * - `done`: completed
 * - `empty`: scheduled and in range but not completed
 * - `off`: not scheduled on that day of the week
 * - `out-of-range`: before the start date or after today
 * - `padding`: outside `from`–`to`, only used to fill the first and last week
 */
export type CxsHabitGridDayState = 'done' | 'empty' | 'off' | 'out-of-range' | 'padding';

/** Emitted when an interactive `done` or `empty` cell is toggled. */
export interface CxsHabitGridDayToggle {
  /** The date as `yyyy-MM-dd`. */
  date: string;
  /** The requested new state: `true` to mark done, `false` to clear. */
  done: boolean;
}

export interface CxsHabitGridDay {
  date: string;
  isoDay: CxsIsoDay;
  state: CxsHabitGridDayState;
  label: string;
}

export interface CxsHabitGridWeek {
  start: string;
  days: CxsHabitGridDay[];
  doneCount: number;
  progressLabel: string | null;
  progressAriaLabel: string | null;
}

const DAY_MS = 86_400_000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DAYS: CxsIsoDay[] = [1, 2, 3, 4, 5, 6, 7];
const STATE_TEXT: Record<CxsHabitGridDayState, string> = {
  done: 'done',
  empty: 'not done',
  off: 'not scheduled',
  'out-of-range': 'unavailable',
  padding: ''
};

const CELL_BASE_CLASSES =
  'block h-[var(--cxs-habit-grid-cell-size,0.875rem)] w-[var(--cxs-habit-grid-cell-size,0.875rem)] shrink-0 rounded-[3px] ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-[var(--cxs-color-focus)] focus-visible:ring-offset-1';

const CELL_STATE_CLASSES: Record<CxsHabitGridDayState, string> = {
  done: 'bg-[var(--cxs-habit-grid-accent,var(--cxs-color-primary))]',
  empty: 'border border-[var(--cxs-color-border)] bg-[var(--cxs-color-surface-hover)]',
  off: 'border border-dashed border-[var(--cxs-color-border)] bg-transparent opacity-50',
  'out-of-range': 'bg-[var(--cxs-color-surface-hover)] opacity-30',
  padding: 'invisible'
};

const INTERACTIVE_CLASSES = 'cursor-pointer hover:opacity-80';

function parseIsoDate(value: string): number | null {
  if (!ISO_DATE.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const time = Date.UTC(year, month - 1, day);
  return formatIsoDate(time) === value ? time : null;
}

function formatIsoDate(time: number): string {
  return new Date(time).toISOString().slice(0, 10);
}

function isoDayOf(time: number): CxsIsoDay {
  return (((new Date(time).getUTCDay() + 6) % 7) + 1) as CxsIsoDay;
}

/**
 * GitHub-style grid of days for habit tracking. Columns are Monday–Sunday weeks; rows are days of the week.
 * Presentational only: it renders the dates it is given and emits `dayToggle`; the parent owns the data.
 */
@Component({
  selector: 'cxs-habit-grid',
  standalone: true,
  templateUrl: './habit-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
    '[style.--cxs-habit-grid-accent]': 'accentColor || null'
  }
})
export class CxsHabitGridComponent implements OnChanges {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** First date shown, as `yyyy-MM-dd`. */
  @Input({ required: true }) from = '';
  /** Last date shown, as `yyyy-MM-dd`. */
  @Input({ required: true }) to = '';
  /** The user's local today; later dates are out of range. */
  @Input({ required: true }) today = '';
  /** The habit's start date; earlier dates are out of range. */
  @Input() startDate: string | null = null;
  /** Dates marked done, as `yyyy-MM-dd`. */
  @Input() doneDates: readonly string[] = [];
  /** Scheduled ISO days of week; `null` means every day is scheduled. */
  @Input() scheduledDays: readonly CxsIsoDay[] | null = null;
  /** Weekly target; when set, each week shows `done/target`. */
  @Input() weeklyTarget: number | null = null;
  /** Optional colour for done cells; defaults to `--cxs-color-primary`. */
  @Input() accentColor: string | null = null;
  /** Whether done and empty cells can be toggled. */
  @Input() interactive = false;
  /** Accessible name of the grid. */
  @Input() ariaLabel = 'Habit history';
  /** Locale for accessible date labels. */
  @Input() locale = 'en-GB';

  /** Emitted when the user toggles a `done` or `empty` cell in interactive mode. */
  @Output() readonly dayToggle = new EventEmitter<CxsHabitGridDayToggle>();

  readonly dayRows = ISO_DAYS;
  weeks: CxsHabitGridWeek[] = [];
  focusedDate: string | null = null;

  private rangeStart: number | null = null;
  private rangeEnd: number | null = null;

  get hasWeeklyProgress(): boolean {
    return this.weeklyTarget != null && this.weeklyTarget > 0;
  }

  ngOnChanges(): void {
    this.weeks = this.buildWeeks();
    if (!this.focusedDate || !this.isWithinRange(this.focusedDate)) {
      this.focusedDate = this.initialFocusDate();
    }
  }

  weekdayLabel(isoDay: CxsIsoDay): string {
    // 2024-01-01 is a Monday.
    return new Intl.DateTimeFormat(this.locale, { weekday: 'short', timeZone: 'UTC' }).format(
      new Date(Date.UTC(2024, 0, isoDay))
    );
  }

  dayAt(week: CxsHabitGridWeek, isoDay: CxsIsoDay): CxsHabitGridDay {
    return week.days[isoDay - 1];
  }

  cellClass(day: CxsHabitGridDay): string {
    const classes = [CELL_BASE_CLASSES, CELL_STATE_CLASSES[day.state]];
    if (this.isToggleable(day)) {
      classes.push(INTERACTIVE_CLASSES);
    }
    return classes.join(' ');
  }

  tabIndexFor(day: CxsHabitGridDay): number | null {
    if (day.state === 'padding') {
      return null;
    }
    return day.date === this.focusedDate ? 0 : -1;
  }

  isToggleable(day: CxsHabitGridDay): boolean {
    return this.interactive && (day.state === 'done' || day.state === 'empty');
  }

  onCellClick(day: CxsHabitGridDay): void {
    if (day.state === 'padding') {
      return;
    }
    this.focusedDate = day.date;
    this.toggle(day);
  }

  onCellKeydown(event: KeyboardEvent, day: CxsHabitGridDay): void {
    const moves: Record<string, number> = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 };

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(day);
      return;
    }

    const delta = moves[event.key];
    if (delta === undefined) {
      return;
    }

    event.preventDefault();
    const current = parseIsoDate(day.date);
    if (current === null || this.rangeStart === null || this.rangeEnd === null) {
      return;
    }

    const target = Math.min(Math.max(current + delta * DAY_MS, this.rangeStart), this.rangeEnd);
    this.focusedDate = formatIsoDate(target);
    queueMicrotask(() => this.focusCell(this.focusedDate));
  }

  private toggle(day: CxsHabitGridDay): void {
    if (!this.isToggleable(day)) {
      return;
    }
    this.dayToggle.emit({ date: day.date, done: day.state === 'empty' });
  }

  private focusCell(date: string | null): void {
    if (!date) {
      return;
    }
    this.elementRef.nativeElement.querySelector<HTMLElement>(`[data-date="${date}"]`)?.focus();
  }

  private isWithinRange(date: string): boolean {
    const time = parseIsoDate(date);
    return time !== null && this.rangeStart !== null && this.rangeEnd !== null
      && time >= this.rangeStart && time <= this.rangeEnd;
  }

  private initialFocusDate(): string | null {
    if (this.rangeStart === null || this.rangeEnd === null) {
      return null;
    }
    const today = parseIsoDate(this.today);
    const target = today === null ? this.rangeEnd : Math.min(Math.max(today, this.rangeStart), this.rangeEnd);
    return formatIsoDate(target);
  }

  private buildWeeks(): CxsHabitGridWeek[] {
    this.rangeStart = parseIsoDate(this.from);
    this.rangeEnd = parseIsoDate(this.to);
    if (this.rangeStart === null || this.rangeEnd === null || this.rangeStart > this.rangeEnd) {
      this.rangeStart = null;
      this.rangeEnd = null;
      return [];
    }

    const done = new Set(this.doneDates);
    const scheduled = this.scheduledDays ? new Set(this.scheduledDays) : null;
    const today = parseIsoDate(this.today);
    const start = this.startDate ? parseIsoDate(this.startDate) : null;
    const labelFormat = new Intl.DateTimeFormat(this.locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    });
    const weekFormat = new Intl.DateTimeFormat(this.locale, { day: 'numeric', month: 'short', timeZone: 'UTC' });

    const firstMonday = this.rangeStart - (isoDayOf(this.rangeStart) - 1) * DAY_MS;
    const weeks: CxsHabitGridWeek[] = [];

    for (let weekStart = firstMonday; weekStart <= this.rangeEnd; weekStart += 7 * DAY_MS) {
      const days = ISO_DAYS.map((isoDay) => {
        const time = weekStart + (isoDay - 1) * DAY_MS;
        const date = formatIsoDate(time);
        const state = this.stateOf(time, date, isoDay, done, scheduled, start, today);
        const label = state === 'padding' ? '' : `${labelFormat.format(time)}, ${STATE_TEXT[state]}`;
        return { date, isoDay, state, label };
      });

      const doneCount = days.filter((d) => d.state === 'done').length;
      const target = this.hasWeeklyProgress ? this.weeklyTarget! : null;

      weeks.push({
        start: formatIsoDate(weekStart),
        days,
        doneCount,
        progressLabel: target === null ? null : `${doneCount}/${target}`,
        progressAriaLabel:
          target === null ? null : `Week of ${weekFormat.format(weekStart)}: ${doneCount} of ${target}`
      });
    }

    return weeks;
  }

  private stateOf(
    time: number,
    date: string,
    isoDay: CxsIsoDay,
    done: Set<string>,
    scheduled: Set<CxsIsoDay> | null,
    start: number | null,
    today: number | null
  ): CxsHabitGridDayState {
    if (time < this.rangeStart! || time > this.rangeEnd!) {
      return 'padding';
    }
    if ((start !== null && time < start) || (today !== null && time > today)) {
      return 'out-of-range';
    }
    if (scheduled && !scheduled.has(isoDay)) {
      return 'off';
    }
    return done.has(date) ? 'done' : 'empty';
  }
}
