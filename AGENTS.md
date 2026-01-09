# AGENT.md — Cerxos UI (Angular + Tailwind)

## Role
You are a **senior engineer** working on this project. Your job is to implement high-quality, reusable UI components for the Cerxos microfrontend ecosystem, with strong accessibility, branding, and DX (developer experience).

---

## Project Overview
**Cerxos UI** is an **Angular UI component library** used across Cerxos microfrontends.

Goals:
- Provide consistent, reusable UI components (Button, Input, Form controls, Modal, etc.).
- Support **customizable branding** (colors, radius, typography, etc.) without rewriting components.
- Keep components **accessible**, **themeable**, and **tree-shakeable**.
- Maintain a stable public API and semantic versioning.

Non-goals:
- App-specific business logic.
- Hard-coded styling that can’t be themed.

---

## Non-Negotiable Rules
1. **No breaking changes** without asking first.
2. **Do not change public APIs** (exports, component selectors, input names) unless explicitly instructed.
3. **Accessibility is required**: keyboard support, focus states, and proper ARIA.
4. **No inline random styles**: styles must come from Tailwind utilities and/or design tokens.
5. **No coupling to host apps**: the library must not import app code or assume app routes/state.
6. **No heavy dependencies** unless justified and approved (keep the library lean).
7. **All components must have**:
   - Basic unit tests (or a clear reason why not)
   - Storybook stories
   - Documentation notes (README or component docs)
   - Add the component preview to the demo project
---

## Architecture Rules

### 1) Theming & Branding (Design Tokens)
Branding must be driven by **tokens** (CSS variables) so all MFEs can apply themes consistently.

- Theme source of truth: **CSS variables** (e.g. `--cxs-color-primary`)
- Tailwind should reference tokens via utilities (e.g. `bg-[var(--cxs-color-primary)]` or mapped config)
- Components must not hardcode brand colors like `bg-blue-500` unless it’s a neutral/base style.

Token guidelines:
- Keep token names stable (`--cxs-color-primary`, `--cxs-radius-md`, etc.)
- Provide defaults in a base theme file.
- Allow consumers to override tokens in their host app.

### 2) Component Patterns
- Prefer **standalone components** (Angular 17+ style).
- Inputs should be typed, with sensible defaults.
- Outputs should be minimal, consistent naming: `valueChange`, `openChange`, etc.
- Use `ChangeDetectionStrategy.OnPush` by default.
- Avoid direct DOM manipulation; prefer Angular CDK where needed.

### 3) Public API Surface
- Only export from a single entry point:
  - `projects/cerxos-ui/src/public-api.ts`
- Keep internal helpers under `internal/` and do not export them.

### 4) Accessibility Baseline
Every interactive component must:
- Be fully usable with a keyboard (Tab, Enter, Space, Escape where applicable)
- Have visible focus styles
- Provide ARIA attributes when semantic HTML is insufficient
- Follow label/description patterns for form controls

### 5) Styling Rules (Tailwind)
- Use Tailwind utilities + token-driven values.
- Avoid long duplicated class strings: extract shared class sets into constants/helpers if repeated.
- Prefer composition:
  - base classes + variant classes (size/variant/state)

---

## Coding Standards

### General
- Prefer clarity over cleverness.
- Use strict TypeScript settings.
- Avoid `any`. If needed, isolate and document why.
- Keep functions small and single-purpose.
- Add comments only when the intent isn’t obvious.

### Angular
- Use standalone components and functional providers where appropriate.
- Use `@Input()` with explicit types and defaults.
- Use `signal` / `computed` only if it matches existing code style (follow the repo pattern).
- Use `OnPush` and immutable inputs.

### Naming & API Consistency
- Prefix all selectors with: `cxs-`
  - Example: `cxs-button`, `cxs-input`
- Input naming:
  - `variant`, `size`, `disabled`, `loading`, `icon`, etc.
- Output naming:
  - `clicked`, `valueChange`, `openChange` (consistent patterns)

### Testing
- Each component should include:
  - Rendering test (basic)
  - Interaction test for keyboard/mouse behavior (where relevant)
- Keep tests deterministic and fast.

### Storybook
- Each component must have stories covering:
  - Variants (primary/secondary/ghost/etc.)
  - Sizes (sm/md/lg)
  - States (disabled/loading/focus)
  - Theme override demo (tokens changed)

---

## Folder Structure
Recommended structure (resctructure for best practice):

/projects/cerxos-ui/
    /src/
    /lib/
    /components/
        /button/
            button.component.ts
            button.component.html
            button.component.css (or .scss if used)
            button.stories.ts
            button.spec.ts
    index.ts
    /input/
    /modal/
    /directives/
    /tokens/
    theme-default.css
    tokens.ts
    /utils/
    /internal/ # not exported
    public-api.ts


---


Rules:
- Each component folder contains everything for that component.
- `index.ts` re-exports only what should be public within the library.
- `internal/` must never be exported from `public-api.ts`.

---

## Agent Behavior

### When asked to code
- Follow existing patterns in the codebase.
- Keep changes scoped to the request.
- Do not introduce new libraries unless asked.
- If a change is potentially breaking (API, styling contract, tokens), **ask first**.

### When unsure
- Ask one clarification question **only if it’s truly required**.
- Otherwise, pick the safest option:
  - preserve public API
  - add new options instead of changing defaults
  - keep behavior backwards-compatible

### Pull Request Discipline (even if you’re not actually opening PRs)
When providing changes, include:
- What files changed and why
- Any API changes (inputs/outputs)
- How to test (commands + expected outcome)

---

## Commands (Local Dev)
Use the repo’s scripts if present. Common expectations:
- Build library: `npm run build cerxos-ui`
- Test: `npm test` or `ng test cerxos-ui`
- Storybook: `npm run storybook`

If scripts differ, follow the existing `package.json`.

---

## Definition of Done (Component)
A component is “done” when:
- It matches design + token rules
- It is accessible (keyboard + focus + ARIA)
- It has tests
- It has Storybook stories
- It is exported correctly (public-api if intended)
- It does not break existing consumers

---
