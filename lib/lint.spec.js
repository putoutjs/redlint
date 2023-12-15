import {test} from 'supertape';
import {scan} from './lint.js';

test('redlint: scan', (t) => {
    const filesystem = JSON.stringify([ 
        '/',
        '/.madrun.mjs',
        ['/package.json', '{"type": "module"}']
    ]);
    const places = scan(filesystem);
    
    console.log(places);
    t.end();
});
