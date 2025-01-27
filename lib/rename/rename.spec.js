import {test} from 'supertape';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {rename} from './rename.js';
import {
    RENAME_JSX_TO_JS,
    RENAME_JS_TO_JSX,
} from '../menu.js';

const {parse, stringify} = JSON;

test('redlint: rename: jsx to js', (t) => {
    const filesystem = stringify(['/', ['/hello.jsx', 'const a = <A></A>']]);
    const renamed = rename('*.jsx', RENAME_JSX_TO_JS, filesystem);
    const result = parse(renamed);
    
    const expected = ['/', [
        '/hello.js',
        'Y29uc3QgYSA9ICgKICAgIDxBPjwvQT4KKTsK',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: rename: js to jsx', (t) => {
    const filesystem = stringify(['/', ['/hello.js', 'const a = <A></A>']]);
    
    const renamed = rename('*.js', RENAME_JS_TO_JSX, filesystem);
    const result = parse(renamed);
    
    const expected = ['/', [
        '/hello.jsx',
        'Y29uc3QgYSA9ICgKICAgIDxBPjwvQT4KKTsK',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: rename: jsx to js: not supported', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/package.json']);
    
    const result = parse(rename('package.js', '', filesystem));
    
    const expected = [
        '/hello/world/',
        '/hello/world/package.json',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
