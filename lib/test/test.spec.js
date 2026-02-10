import {stripVTControlCharacters} from 'node:util';
import {create} from '@putout/processor-filesystem/create';
import montag from 'montag';
import {test} from '#test';
import {test as redlintTest} from './test.js';

const {branch} = create({
    cli: false,
});

const {stringify} = JSON;

test('redlint: test', (t) => {
    const filesystem = stringify(['/', '/index.js', [
        '/index.spec.js',
        `t.transform('hello')`,
    ]]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const expected = montag`
       # 🍄 hello
    `;
    
    t.stripEndEqual(result, expected);
    t.end();
});

test('redlint: test: no nesting', (t) => {
    const filesystem = stringify(['/', '/add/', [
        '/add/index.js',
        '/add/index.spec.js',
        `t.transform('hello')`,
    ]]);
    
    const [error] = redlintTest(filesystem, {
        branch,
    });
    
    t.equal(error.message, `No 'index.spec.js' found`);
    t.end();
});

test('redlint: test: no index.js', (t) => {
    const filesystem = stringify(['/', [
        '/index.spec.js',
        `t.transform('hello')`,
    ]]);
    
    const [error] = redlintTest(filesystem, {
        branch,
    });
    
    t.equal(error.message, `No 'index.js' found`);
    t.end();
});

test('redlint: test: success', (t) => {
    const filesystem = stringify([
        '/',
        ['/index.js', `
            module.exports.report = () => 'Use "const"';
            module.exports.replace = () => ({
                'let __a = __b': 'const __a = __b',
            });
        `],
        ['/index.spec.js', `t.transform('hello')`],
        '/fixture/',
        ['/fixture/hello.js', 'let a = 1;\n'],
        ['/fixture/hello-fix.js', 'const a = 1;\n'],
    ]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const expected = montag`
        # 🍀 hello
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

test('redlint: test: no files', (t) => {
    const filesystem = stringify([
        '/',
        ['/index.js', `
            module.exports.report = () => '';
            module.exports.fix = () => {};
            module.exports.scan = () => {};
        `],
        ['/index.spec.js', `t.transform('hello')`],
        '/fixture/',
        ['/fixture/hello.js', `
            __putout_processor_filesystem([
                '/',
            ]);
        `],
        ['/fixture/hello-fix.js', `
            __putout_processor_filesystem([
                '/',
                '/hello.txt',
            ]);
        `],
    ]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const expected = montag`
        # 🍄 hello
        ## ✅ Expected
          1 |
          2 |             __putout_processor_filesystem([
          3 |                 '/',
          4 |                 '/hello.txt',
          5 |             ]);
          6 |
       ## ❌ Received
          1 | __putout_processor_filesystem(["/"]);
          2 |
    `;
    
    t.stripEndEqual(result, expected);
    t.end();
});

test('redlint: test: diff', (t) => {
    const filesystem = stringify([
        '/',
        ['/index.js', `
            module.exports.report = () => '';
            module.exports.fix = () => {};
            module.exports.scan = () => {};
        `],
        ['/index.spec.js', `t.transform('hello')`],
        '/fixture/',
        ['/fixture/hello.js', montag`
            __putout_processor_filesystem([
                '/',
                ['/hello.txt', 'hello']
            ]);
        `],
        ['/fixture/hello-fix.js', montag`
            __putout_processor_filesystem([
                '/',
                ['/hello.txt', 'world'],
            ]);
        `],
    ]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const expected = montag`
      # 🍄 hello
      ## /hello.txt:1
      - world
      + hello
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

test('redlint: test: same files', (t) => {
    const filesystem = stringify([
        '/',
        ['/index.js', `
            module.exports.report = () => '';
            module.exports.fix = () => {};
            module.exports.scan = () => {};
        `],
        ['/index.spec.js', `t.transform('hello')`],
        '/fixture/',
        ['/fixture/hello.js', montag`
            __putout_processor_filesystem([
                '/',
                ['/hello.txt', 'hello'],
            ]);
        `],
        ['/fixture/hello-fix.js', montag`
            __putout_processor_filesystem(["/", [
                "/hello.txt",
                "hello"
            ]]);\n
        `],
    ]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const stripped = stripVTControlCharacters(result);
    
    const expected = montag`
      # 🍀 hello
    `;
    
    t.stripEqual(stripped, expected);
    t.end();
});

test('redlint: test: same files: couple', (t) => {
    const filesystem = stringify([
        '/',
        ['/index.js', `
            module.exports.report = () => '';
            module.exports.fix = () => {};
            module.exports.scan = () => {};
        `],
        ['/index.spec.js', `t.transform('hello')`],
        '/fixture/',
        ['/fixture/hello.js', montag`
            __putout_processor_filesystem([
                '/',
                ['/hello.txt', 'hello'],
            ]);
        `],
        ['/fixture/hello-fix.js', montag`
            __putout_processor_filesystem(["/", "/abc.txt", [
                "/hello.txt",
                "hello"
            ]]);\n
        `],
    ]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const stripped = stripVTControlCharacters(result);
    
    t.match(stripped, 'Expected');
    t.end();
});

test('redlint: test: same files: top level', (t) => {
    const filesystem = stringify([
        '/',
        '/hello/',
        '/hello/index.js',
        ['/index.js', `
            module.exports.report = () => '';
            module.exports.fix = () => {};
            module.exports.scan = () => {};
        `],
        ['/index.spec.js', `t.transform('hello')`],
        '/fixture/',
        ['/fixture/hello.js', montag`
            __putout_processor_filesystem([
                '/',
                ['/hello.txt', 'hello'],
            ]);
        `],
        ['/fixture/hello-fix.js', montag`
            __putout_processor_filesystem(["/", "/abc.txt", [
                "/hello.txt",
                "hello"
            ]]);\n
        `],
    ]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const stripped = stripVTControlCharacters(result);
    
    t.match(stripped, 'Expected');
    t.end();
});

