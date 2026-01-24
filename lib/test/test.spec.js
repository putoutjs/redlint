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
       
       ## ❌ Incorrect code
       
       \x1b[0m \x1b[90m 1 |\x1b[39m\x1b[0m
       
       ## ✅ Correct code
       
       \x1b[0m \x1b[90m 1 |\x1b[39m\x1b[0m
    
    
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
