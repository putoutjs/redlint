import {test} from 'supertape';
import {masterLint} from './master.js';

const {stringify} = JSON;

test('redlint: master', async (t) => {
    const info = {
        type: 'module',
    };
    
    const filesystem = stringify(['/', '/.madrun.mjs', ['/package.json', stringify(info)]]);
    
    const places = await masterLint(filesystem, {
        fix: false,
    });
    
    const expected = [{
        rule: 'nodejs/rename-file-mjs-to-js',
        message: `Rename '/.madrun.mjs' to '/.madrun.js'`,
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
