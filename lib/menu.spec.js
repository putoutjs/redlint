import {test} from 'supertape';
import {isKnownCommand} from './menu.js';

test('redlint: menu: isKnownCommand', (t) => {
    const result = isKnownCommand('hello');
    
    t.notOk(result);
    t.end();
});

test('redlint: menu: isKnownCommand: yes', (t) => {
    const result = isKnownCommand('convert');
    
    t.ok(result);
    t.end();
});
