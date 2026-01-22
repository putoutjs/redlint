import {test, stub} from 'supertape';
import {__filesystem_name} from '@putout/operator-json';
import montag from 'montag';
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
        \x1b[0m  /package.json:2
         \x1b[90m 1 |\x1b[39m {\x1b[32m"type"\x1b[39m\x1b[33m:\x1b[39m\x1b[32m"module"\x1b[39m}\x1b[0m
    
    `;
    
    t.equal(result, expected);
    t.end();
});
