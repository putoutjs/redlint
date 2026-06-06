# Contributing to RedLint

## Quick Reference

- **No unused variables or imports** — clean them up before committing.
- **No `t.pass('everything ok')` in tests** — every assertion must test something meaningful.
- **100% coverage required** — checked via [`.nycrc.json`](.nycrc.json). Run `redrun coverage` to verify.
- **Tests use [supertape](https://github.com/coderaiser/supertape)** with `stub()` for mocking.
- **TDD is encouraged** — write a failing test first, then implement, then `redrun fix:lint test`.
- **Run `redrun fix:lint test` before every commit** — linter must be clean, all tests green.

## Table of Contents

- [Do / Don't](#do--dont)
- [Workflow](#workflow)
- [Architecture](#architecture)
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

## File Tree

```
redlint/
├── bin/redlint.js          # CLI entry point
├── lib/
│   ├── convert/            # convert json↔js, rc→flat
│   ├── edit/               # interactive filesystem editing
│   ├── extract/            # unpack filesystem.red
│   ├── help/               # --help output
│   ├── lint/               # scan & fix filesystem
│   ├── pack/               # pack to filesystem.red
│   ├── rename/             # rename js↔jsx
│   ├── test/               # test runner & plugins
│   ├── view/               # view file contents
│   ├── cli/                # version
│   ├── choose.js           # interactive menu
│   ├── debug.js            # debug menu
│   ├── dialog.js           # ask for filename
│   ├── menu.js             # menu constants & predicates
│   ├── redlint.js          # buildTree
│   ├── run.js              # worker runner
│   ├── simple.js           # simple filesystem format
│   ├── slave.js            # worker helper
│   └── spinner.js          # CLI spinner
├── test/                   # integration tests
├── .nycrc.json             # coverage config (100% required)
├── .madrun.js              # task runner scripts
├── .putout.json            # putout rules
└── package.json
```

## Overrides Pattern

When a module calls external dependencies, accept them as optional overrides so tests can inject stubs:

```js
// run-convert.js
export const runConvert = async (arg, filesystem, overrides = {}) => {
    const {
        askFilename: getFilename = askFilename,
        convert = masterConvert,
        isRCToFlat = isConvertRCToFlat,
    } = overrides;
    
    let filename = '.eslintrc.json';
    
    if (!isRCToFlat(arg))
        filename = await getFilename();
    
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
| [superc8](https://github.com/coderaiser/superc8)      | Enhanced c8 wrapper                                  | `redrun coverage`    |
| [nodemon](https://github.com/remy/nodemon)            | Watch mode for tests                                 | `redrun watch:test`  |
