import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {removeFiles} from './index.js';

const {parse, stringify} = JSON;

const {branch, merge} = create({
    cli: false,
    maybeSimple: false,
});

test('redlint: edit: remove-files', (t) => {
    const filesystem = stringify(['/', '/hello.js']);
    
    const options = {
        dir: '/',
        from: ['hello.js'],
        to: [],
    };
    
    const result = parse(removeFiles(filesystem, options, {
        merge,
        branch,
    }));
    
    const expected = ['/'];
    
    t.deepEqual(result, expected);
    t.end();
});
