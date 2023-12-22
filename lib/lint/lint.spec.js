import {test} from 'supertape';
import {lint} from './lint.js';

const {stringify} = JSON;

test('redlint: lint', (t) => {
    const info = {
        type: 'module',
    };
    
    const filesystem = stringify(['/', '/.madrun.mjs', ['/package.json', stringify(info)]]);
    const parseOptions = () => {};
    
    const places = lint(filesystem, {
        fix: false,
        parseOptions,
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
