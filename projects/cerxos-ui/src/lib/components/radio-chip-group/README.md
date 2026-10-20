# Cxs Radio Chip Group

A two or more choice form control that displays labeled radio options as chips. Each option has a theme-driven `primary`, `danger`, or `neutral` tone. Use it with Angular forms when users must choose one value.

```html
<cxs-radio-chip-group
  label="Type"
  [options]="typeOptions"
  [required]="true"
  [(ngModel)]="type"
></cxs-radio-chip-group>
```

```ts
type: string | null = null;
typeOptions = [
  { label: 'Credit', value: 'Credit', tone: 'primary' },
  { label: 'Debit', value: 'Debit', tone: 'danger' },
] satisfies CxsRadioChipOption[];
```

`null` displays no selection. The component implements `ControlValueAccessor`, supports `disabled`, `invalid`, and `required`, and emits `valueChange` when the user selects an option. Native radio inputs provide keyboard navigation and are grouped by the fieldset label. The checkmark and outline identify the selection independently of color.

Use `size="sm"`, `size="md"` (default), or `size="lg"` to fit different form layouts.
