# Cxs Habit Grid

GitHub-style grid of days for habit tracking. Columns are Monday–Sunday weeks and rows are days of the week. The component is presentational: it renders the dates it is given and emits `dayToggle`; the parent stores the data and updates `doneDates`.

## Usage

```html
<cxs-habit-grid
  from="2026-01-05"
  to="2026-10-04"
  today="2026-10-04"
  startDate="2026-01-12"
  [doneDates]="doneDates"
  [scheduledDays]="[1, 3, 5]"
  [interactive]="true"
  ariaLabel="Gym history"
  (dayToggle)="onToggle($event)"
></cxs-habit-grid>
```

Weekly target (shows `done/target` under each week):

```html
<cxs-habit-grid from="2026-07-06" to="2026-10-04" today="2026-10-04" [doneDates]="doneDates" [weeklyTarget]="3"></cxs-habit-grid>
```

## Day states

| State | Meaning | Toggleable |
|---|---|---|
| `done` | Completed | yes (emits `done: false`) |
| `empty` | Scheduled, in range, not completed | yes (emits `done: true`) |
| `off` | Day of week not in `scheduledDays` (even if a completion exists) | no |
| `out-of-range` | Before `startDate` or after `today` | no |

Cells before `from` and after `to` in the first and last week are hidden padding.

## Inputs

- `from`, `to`, `today`: `yyyy-MM-dd` strings (required)
- `startDate`: `yyyy-MM-dd` | `null` (default: `null`)
- `doneDates`: `readonly string[]` (default: `[]`)
- `scheduledDays`: `readonly CxsIsoDay[]` | `null` — ISO days, 1 = Monday … 7 = Sunday; `null` means every day (default: `null`)
- `weeklyTarget`: number | `null` (default: `null`)
- `accentColor`: CSS colour | `null` — colour of done cells (default: `--cxs-color-primary`)
- `interactive`: boolean (default: `false`)
- `ariaLabel`: string (default: `Habit history`)
- `locale`: string for date labels (default: `en-GB`)

## Outputs

- `dayToggle`: `{ date: string; done: boolean }` — the requested new state

## Accessibility

- `role="grid"` with one `row` per day of the week and a `rowheader` for each weekday.
- Each cell has a label with the full date and state, for example "Sunday, 4 October 2026, done".
- Roving tabindex starting at `today`; arrow keys move by a day (up/down) or a week (left/right); Enter or Space toggles in interactive mode.
- Non-toggleable cells are `aria-disabled` in interactive mode; the grid is `aria-readonly` otherwise.

## Tokens

- `--cxs-habit-grid-accent` (set by `accentColor`), falling back to `--cxs-color-primary`
- `--cxs-habit-grid-cell-size` (default `0.875rem`), `--cxs-habit-grid-gap` (default `3px`)
- `--cxs-color-border`, `--cxs-color-surface-hover`, `--cxs-color-on-surface-muted`, `--cxs-color-focus`
