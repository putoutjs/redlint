import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {renameFiles} from './index.js';

const {parse, stringify} = JSON;

const {branch, merge} = create({
    cli: false,
    maybeSimple: false,
});

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

test('redlint: edit: rename: full: remove', (t) => {
    const filesystem = stringify(['/', '/hello/', '/hello/world.js']);
    
    const options = {
        full: true,
        from: ['/hello/world.js'],
        to: [''],
    };
    
    const result = parse(renameFiles(filesystem, options, {
        merge,
        branch,
    }));
    
    const expected = ['/'];
    
    t.deepEqual(result, expected);
    t.end();
});
