# CerxosUiWorkspace

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

to build the library, run:

```bash
npm run build cerxos-ui
```

## Publishing `cerxos-ui`

The [npm release workflow](.github/workflows/publish-npm.yml) publishes the built library when a maintainer pushes a tag in the form `vMAJOR.MINOR.PATCH`. The tag must match `projects/cerxos-ui/package.json` exactly. The workspace root package version is unrelated to releases. Branch pushes and pull requests do not publish to npm.

### One-time npm setup

An owner of the existing `cerxos-ui` package must add a **GitHub Actions trusted publisher** in the package's npm settings:

| npm setting | Value |
| --- | --- |
| Organization or user | `nurakmaljalil91` |
| Repository | `cerxos-ui-workspace` |
| Workflow filename | `publish-npm.yml` |
| Environment name | Leave empty |
| Allowed actions | Enable direct `npm publish` |

Enter only the workflow filename, including `.yml`, and verify npm displays these values after saving. The workflow uses a GitHub-hosted runner with OIDC; it does not need an npm publish token. Register the publisher shortly before the first release: npm requires the first successful publish within two days of creating a new trusted publisher. See [npm's trusted publishing guide](https://docs.npmjs.com/trusted-publishers/) for the current settings.

### Release a version

1. Check the latest published version with `npm view cerxos-ui version`, then update **only** `projects/cerxos-ui/package.json` to a new version such as `0.0.22`.
2. Commit the version and any intended library changes to `main`. Confirm the release workflow is present in that commit.
3. From the workspace root, check the tag against the package version, then create and push it:

   ```bash
   node scripts/verify-release-tag.mjs v0.0.22
   git tag v0.0.22
   git push origin main
   git push origin v0.0.22
   ```

4. Check the **Publish Cerxos UI to npm** workflow run and confirm `npm view cerxos-ui@0.0.22 version` returns `0.0.22`. Inspect the npm package page for provenance and package contents.

The workflow runs headless library tests, builds the production library, checks the CSS assets, and runs `npm pack --dry-run` before publishing `dist/cerxos-ui`.

If the run fails before npm accepts the version, fix external configuration or a transient runner issue and rerun the workflow for the same tag. If the tagged source needs a code change, create a new version and tag; do not move a published tag. npm cannot replace an already published name and version.

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
