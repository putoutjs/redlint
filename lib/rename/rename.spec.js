import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {rename} from './rename.js';
import {
    RENAME_JSX_TO_JS,
    RENAME_JS_TO_JSX,
} from '../menu.js';

const {branch, merge} = create({
    cli: false,
    maybeSimple: false,
});

const {parse, stringify} = JSON;

test('redlint: rename: jsx to js', (t) => {
    const filesystem = stringify(['/', [
        '/hello.jsx',
        'const a = <A></A>',
    ]]);
    
    const renamed = rename('*.jsx', RENAME_JSX_TO_JS, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(renamed);
    
    const expected = ['/', ['/hello.js', 'Y29uc3QgYSA9ICgKICAgIDxBPjwvQT4KKTsK']];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: rename: js to jsx', (t) => {
    const filesystem = stringify(['/', [
        '/hello.js',
        'const a = <A></A>',
    ]]);
    
    const renamed = rename('*.js', RENAME_JS_TO_JSX, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(renamed);
    
    const expected = ['/', ['/hello.jsx', 'Y29uc3QgYSA9ICgKICAgIDxBPjwvQT4KKTsK']];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: rename: jsx to js: not supported', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/package.json']);
    const result = parse(rename('package.js', '', filesystem));
    const expected = {
        filename: '/hello/world',
        type: 'directory',
        files: [{
            filename: '/hello/world/package.json',
            type: 'file',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

