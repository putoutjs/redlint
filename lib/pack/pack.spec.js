import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {pack} from './pack.js';

const {merge, branch} = create({
    cli: false,
});

const {parse, stringify} = JSON;

test('redlint: pack', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/README.md']);
    
    const result = parse(pack('/hello/world', filesystem, {
        merge,
        branch,
    }));
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/README.md',
            content: '',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});
