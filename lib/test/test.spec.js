import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {test as redlintTest} from './test.js';

const {branch} = create({
    cli: false,
});

const {stringify} = JSON;

test.skip('redlint: test', (t) => {
    const filesystem = stringify(['/',
        '/index.js',
        [
            '/index.spec.js',
            `t.transform('hello')`,
        ]]);
    
    const [, result] = redlintTest(filesystem, {
        branch,
    });
    
    const expected = [
        ['hello.js', 'hello-fix.js'],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test.skip('redlint: test: no nesting', (t) => {
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

test.skip('redlint: test: no nesting', (t) => {
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
