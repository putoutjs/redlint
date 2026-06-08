# Contributing to RedLint

## Quick Reference

- **No unused variables or imports** — clean them up before committing.
- **No `t.pass('everything ok')` in tests** — every assertion must test something meaningful.
- **100% coverage required** — checked via [`.nycrc.json`](.nycrc.json). Run `redrun coverage` to verify.
- **Tests use [supertape](https://github.com/coderaiser/supertape)** with `stub()` for mocking.
- **TDD is encouraged** — write a failing test first, then implement, then `redrun fix:lint coverage`.
- **Run `redrun fix:lint coverage` before every commit** — linter must be clean, all tests green, coverage 100%.

## Table of Contents

- [Do / Don't](#do--dont)
- [Workflow](#workflow)
- [Architecture](#architecture)
- [How to add a new converter](#how-to-add-a-new-converter)
- [Import Map](#import-map)
- [File Tree](#file-tree)
- [Overrides Pattern](#overrides-pattern)
- [Tools we use](#tools-we-use)

## Do / Don't

| Do                                               | Don't                                            |
|--------------------------------------------------|------------------------------------------------|
| Write one assertion per test                     | Use `t.pass('ok')` or `t.comment()`            |
| Use descriptive test names                       | Use vague names like `'test1'`                 |
| Inject deps via `overrides`                      | Import real modules inline (hard to stub)      |
| Use early returns to flatten logic               | Nest deeply with `if/else` chains              |
| Keep modules small, one concern per file         | Put multiple operations in one file            |
| Use `async` for tests that `await`               | Forget `await` in async test functions         |
| Run `redrun fix:lint coverage` before commit         | Commit red linter output                   |

## Workflow

Install [`redrun`](https://github.com/coderaiser/redrun) (faster than `npm run`):

```sh
bun i redrun -g
```

Every commit should pass:

```sh
redrun fix:lint     # runs putout . --fix
redrun test         # runs all .spec.js tests
redrun coverage     # run coverage (aim for 100%):
```

## Architecture

### Worker / Direct Pattern

Each filesystem operation (`scan`, `fix`, `pack`, `extract`, `convert`) has two paths:

| Mode       | Function                                | Thread         |
|------------|-----------------------------------------|----------------|
| **Normal** | `master*()` + `slave.js`              | Web Worker       |
| **Debug**  | Direct import (e.g. `lint()`, `convert()`) | Main thread |

The debug mode is an escape hatch when workers misbehave.

### Module layout

- `lib/<operation>/master.js` — spawns a worker, returns a promise.
- `lib/<operation>/slave.js` — runs inside the worker, calls the real logic.
- `lib/<operation>/<operation>.js` — the actual implementation (imported by slave and tests).
- `lib/<operation>/<operation>.spec.js` — tests.
- `lib/<operation>/fixture/` — test fixtures.

### Testing

- Framework: [supertape](https://github.com/coderaiser/supertape)
- Mocking: `stub()` from supertape (no external mocking library)
- Fixtures: plain `.js` files in `fixture/` directories

## How to add a new converter (e.g. `convert-json-to-yaml`)?

All converters live in `lib/convert/converters/` and follow the same pattern. Adding a new one requires changes in **6 files** (1 new, 5 modified):

### 1. Create the converter — `lib/convert/converters/convert-X-to-Y.js`

```js
import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertXToY] = pluginFilesystem.rules['convert-X-to-Y'];

export const convertXToY = (filename) => ({
    rules: {
        'filesystem/convert-X-to-Y': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-X-to-Y', pluginConvertXToY],
    ],
});
```

The `[@putout/plugin-filesystem](https://github.com/coderaiser/putout/tree/master/packages/plugin-filesystem)`
package must already export the rule (use `[@putout/plugin-filesystem](https://github.com/coderaiser/putout/tree/master/packages/plugin-filesystem)` >= 13.2.0 for `convert-json-to-yaml`).

### 2. Register menu constants — `lib/menu.js`

Add a pair of exports (normal + debug):

```js
export const CONVERT_X_TO_Y = '🦏 convert x to y';
export const CONVERT_X_TO_Y_DEBUG = '🦏 convert x to y: debug';
```

Then add `CONVERT_X_TO_Y` to the array in `isConvertChosen()` and `CONVERT_X_TO_Y_DEBUG` to the array in `isConvertChosenDebug()`.

### 3. Add to converters map — `lib/convert/create-options.js`

```js
import {convertXToY} from './converters/convert-X-to-Y.js';

const CONVERTERS = {
    // ...existing...
    [CONVERT_X_TO_Y]: convertXToY,
    [CONVERT_X_TO_Y_DEBUG]: convertXToY,
};
```

### 4. Add to convert menu — `lib/convert/index.js`

Import `CONVERT_X_TO_Y` and add it to the `chooseConvert()` dialog array.

### 5. Add to debug menu — `lib/debug.js`

Import `CONVERT_X_TO_Y_DEBUG` and add it to the `debug()` dialog array.

### 6. Add a test — `lib/convert/convert.spec.js`

```js
import {CONVERT_X_TO_Y} from '../menu.js';

test('redlint: convert: x to y', (t) => {
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/file.x',
    ]);
    
    const converted = convert('file.x', CONVERT_X_TO_Y, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/file.y',
        'e30K',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});
```

### 🧪 Verify

```sh
redrun fix:lint     # putout . --fix — must pass
redrun coverage     # 100% required
```

## Import Map

The project uses Node.js [`imports`](package.json) for internal aliases:

```json
{
    "imports": {
        "#edit": "./lib/edit/edit.js",
        "#test": "./test/create-test.js"
    }
}
```

Used in `bin/redlint.js`:

```js
import {edit, editHelp} from '#edit';
```

## Overrides Pattern

When a module calls external dependencies, accept them as optional overrides so tests can inject stubs:

```js
import {operator} from 'putout';

const {getFilename} = operator;

// run-convert.js
export const runConvert = async (arg, filesystem, overrides = {}) => {
    const {
        getFilename = askFilename,
        convert = masterConvert,
        isRCToFlat = isConvertRCToFlat,
    } = overrides;
    
    let filename = '.eslintrc.json';
    
    if (!isRCToFlat(arg))
        filename = await askFilename();
    
    if (filename)
        return await convert(filename, arg, filesystem);
};
```

Test injects stubs to verify behavior without side effects:

```js
// run-convert.spec.js
test('redlint: run-convert: json to js: called with filename', async (t) => {
    const convert = stub();
    const askFilename = stub().returns('package.json');
    const filesystem = '[]';
    
    await runConvert(CONVERT_JSON_TO_JS, filesystem, {
        askFilename,
        convert,
    });
    
    t.calledWith(convert, ['package.json', CONVERT_JSON_TO_JS, filesystem]);
    t.end();
});
```

This pattern keeps functions pure, easy to unit test, and doesn't require any mocking framework.

## Tools we use

| Tool                                                  | Purpose                                              | Link                 |
|-------------------------------------------------------|------------------------------------------------------|----------------------|
| [redrun](https://github.com/coderaiser/redrun)        | Fast task runner (replaces `npm run`)                | `bun i redrun -g`    |
| [madrun](https://github.com/coderaiser/madrun)        | Define tasks in `.madrun.js`                         | `redrun`             |
| [putout](https://github.com/coderaiser/putout)        | JavaScript code transformer & linter                 | `redrun fix:lint`    |
| [supertape](https://github.com/coderaiser/supertape)  | Test framework with built-in `stub()`                | `redrun test`        |
| [superc8](https://github.com/coderaiser/superc8)      | coverage tool, drop-in modern  `c8` replacement                                  | `redrun coverage`    |
| [nodemon](https://github.com/remy/nodemon)            | Watch mode for tests                                 | `redrun watch:test`  |
