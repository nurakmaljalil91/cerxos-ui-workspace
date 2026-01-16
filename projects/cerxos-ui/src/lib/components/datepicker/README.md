# Cxs Datepicker

Token-driven datepicker component for Cerxos UI. Uses the native `input[type="date"]` by default,
with an optional custom overlay calendar with month and year selectors.

## Usage

```html
<cxs-datepicker [(ngModel)]="date"></cxs-datepicker>
<cxs-datepicker [min]="'2024-01-01'" [max]="'2024-12-31'"></cxs-datepicker>
<cxs-datepicker [useNative]="false" [(ngModel)]="date"></cxs-datepicker>
```

## Inputs

- `value`: string (default: `''`)
- `variant`: `outline` | `filled` (default: `outline`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `useNative`: boolean (default: `true`)
- `disabled`: boolean (default: `false`)
- `readonly`: boolean (default: `false`)
- `required`: boolean (default: `false`)
- `invalid`: boolean (default: `false`)
- `min`: string | undefined
- `max`: string | undefined

When `useNative` is `false`, the calendar header includes month and year dropdowns. The year list
is derived from `min`/`max` when provided; otherwise it spans 10 years before and after the
currently displayed year.

## Outputs

- `valueChange`: emits the selected date string
