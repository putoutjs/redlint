import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {test as redlintTest} from './test.js';

const {branch} = create({
    cli: false,
});

const {stringify} = JSON;

test('redlint: test', (t) => {
    const filesystem = stringify(['/', [
        '/index.spec.js',
        `transform('hello')`,
    ]]);
    
    const result = redlintTest(filesystem, {
        branch,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
