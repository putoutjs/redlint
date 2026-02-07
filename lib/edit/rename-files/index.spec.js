import {test, stub} from 'supertape';
import {renameFiles} from './index.js';

const {parse, stringify} = JSON;

test('redlint: edit: rename', (t) => {
    const filesystem = stringify(['/', '/hello.js']);
    
    const options = {
        dir: '/',
        from: ['hello.js'],
        to: ['world.js'],
    };
    
    const renameFile = stub();
    
    const result = parse(renameFiles(filesystem, options, {
        renameFile,
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
    
    const renameFile = stub();
    
    const result = parse(renameFiles(filesystem, options, {
        renameFile,
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
    
    const renameFile = stub();
    
    const result = parse(renameFiles(filesystem, options, {
        renameFile,
    }));
    
    const expected = ['/'];
    
    t.deepEqual(result, expected);
    t.end();
});
