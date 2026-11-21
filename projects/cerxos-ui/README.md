# CerxosUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.0.

## Interactive cursor

Tailwind v4's preflight resets buttons to `cursor: default`. `cerxos-ui/styles/tailwind.css` (imported by the shell and every MFE) restores a pointer cursor in `@layer base` for enabled interactive elements:

- `button` and `[role="button"]` (unless `:disabled` / `aria-disabled="true"`)
- `summary`, `label[for]`, and labels wrapping an enabled checkbox, radio or color input
- `select`, checkbox / radio / color / range / button / submit / reset inputs (unless disabled)
- the file input's `::file-selector-button`

Conventions:

- **Clickable non-button elements must use button semantics**: `role="button"`, `tabindex="0"`, and Enter (and ideally Space) handling. CSS cannot see `(click)` bindings, so a bare `div`/`span` with a click handler gets no pointer.
- **Don't add `cursor-pointer` to elements the rule already covers.** Use `cursor-*` utilities only to override (e.g. `cursor-not-allowed` for disabled states, `cursor-col-resize`); utilities always win over the base layer.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build cerxos-ui
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Publishing is triggered by a maintainer-pushed version tag. Follow the
[workspace release instructions](https://github.com/nurakmaljalil91/cerxos-ui-workspace#publishing-cerxos-ui) for the
version, tag, npm trusted publisher setup, and verification steps.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
