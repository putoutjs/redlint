import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {extract} from './extract.js';

const {branch, merge} = create({
    cli: false,
    maybeSimple: false,
});

const {parse, stringify} = JSON;

test('redlint: extract', (t) => {
    const filesystem = stringify(['/', '/README.md']);
    const result = parse(extract('/hello/world', filesystem, {
        merge,
        branch,
    }));
    
    const expected = [
        '/hello/world/',
        ['/hello/world/README.md', ''],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
