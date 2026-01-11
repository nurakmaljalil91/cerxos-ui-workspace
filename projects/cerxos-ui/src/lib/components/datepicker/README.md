# Cxs Datepicker

Token-driven datepicker component for Cerxos UI. Uses the native `input[type="date"]` by default,
with an optional custom overlay calendar.

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

## Outputs

- `valueChange`: emits the selected date string
