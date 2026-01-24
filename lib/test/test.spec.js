import {stripVTControlCharacters} from 'node:util';
import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import montag from 'montag';
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
    
    t.equal(result, expected);
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
    const filesystem = stringify(['/', '/add/', [
        '/add/index.spec.js',
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
    
    t.equal(result, expected);
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
       
       \x1b[0m \x1b[90m 1 |\x1b[39m
        \x1b[90m 2 |\x1b[39m             __putout_processor_filesystem([
        \x1b[90m 3 |\x1b[39m                 \x1b[32m'/'\x1b[39m\x1b[33m,\x1b[39m
        \x1b[90m 4 |\x1b[39m                 \x1b[32m'/hello.txt'\x1b[39m\x1b[33m,\x1b[39m
        \x1b[90m 5 |\x1b[39m             ])\x1b[33m;\x1b[39m
        \x1b[90m 6 |\x1b[39m         \x1b[0m
       
       ## ❌ Received
       
       \x1b[0m \x1b[90m 1 |\x1b[39m __putout_processor_filesystem([\x1b[32m"/"\x1b[39m])\x1b[33m;\x1b[39m
        \x1b[90m 2 |\x1b[39m\x1b[0m
    
    
    `;
    
    t.equal(result, expected);
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
      
      \x1b[32m- world\x1b[39m
      \x1b[31m+ hello\x1b[39m
    
    `;
    
    t.equal(result, expected);
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
    
    t.equal(stripped, expected);
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
