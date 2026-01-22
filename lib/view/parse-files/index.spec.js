import {test} from 'supertape';
import {__filesystem_name} from '@putout/operator-json';
import montag from 'montag';
import {parseFiles} from './index.js';

const {stringify} = JSON;

test('redlint: view: parseFiles', (t) => {
    const result = parseFiles(montag`
        ${__filesystem_name}([
            '/',
            ['/package.json', '{"type":"module"}']
        ]);
    `);
    
    const expected = {
        1: {
            '/package.json': stringify({
                type: 'module',
            }),
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});
