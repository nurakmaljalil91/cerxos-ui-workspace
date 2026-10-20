import { readFileSync } from 'node:fs';

const tag = process.argv[2];
const version = JSON.parse(
  readFileSync(new URL('../projects/cerxos-ui/package.json', import.meta.url), 'utf8'),
).version;

if (!/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(tag ?? '')) {
  console.error(`Release tag must have the form vMAJOR.MINOR.PATCH; received ${tag ?? '(none)'}.`);
  process.exit(1);
}

if (tag !== `v${version}`) {
  console.error(`Release tag ${tag} does not match cerxos-ui version ${version}.`);
  process.exit(1);
}

console.log(`Release tag ${tag} matches cerxos-ui version ${version}.`);
