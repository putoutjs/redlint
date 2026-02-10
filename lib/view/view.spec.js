import {__filesystem_name} from '@putout/operator-json';
import montag from 'montag';
import {test, stub} from '#test';
import {view} from './view.js';

test('redlint: view', (t) => {
    const readFileSync = stub().returns('');
    
    view('./hello.js', {
        readFileSync,
    });
    
    t.calledWith(readFileSync, ['./hello.js', 'utf8']);
    t.end();
});

test('redlint: view: result', (t) => {
    const readFileSync = stub().returns(`
        ${__filesystem_name}([
            '/',
            ['/package.json', '{"type":"module"}'],
        ])
    `);
    
    const result = view('./hello.js', {
        readFileSync,
    });
    
    const expected = montag`
        /package.json:2
        1 | {"type":"module"}
    `;
    
    t.stripEqual(result, expected);
    t.end();
});

