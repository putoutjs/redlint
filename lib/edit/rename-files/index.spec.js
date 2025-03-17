import {test} from 'supertape';
import {__filesystem, toJS} from '@putout/operator-json';
import {branch, merge} from '../../test.test.js';
import {renameFiles} from './index.js';

const {parse, stringify} = JSON;

test('redlint: edit: rename', (t) => {
    const filesystem = stringify(['/', '/hello.js']);
    
    const options = {
        dir: '/',
        from: ['hello.js'],
        to: ['world.js'],
    };
    
    const result = parse(renameFiles(filesystem, options, {
        merge,
        branch,
    }));
    
    const expected = [
        '/',
        '/world.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: edit: rename: full', (t) => {
    const filesystem = stringify(['/', '/hello.js']);
    
    const options = {
        full: true,
        dir: '/',
        from: ['/hello.js'],
        to: ['/123/world.js'],
    };
    
    const result = parse(renameFiles(filesystem, options, {
        merge,
        branch,
    }));
    
    const expected = [
        '/',
        '/123/',
        '/123/world.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
