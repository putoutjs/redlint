import {test} from 'supertape';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {extract} from './extract.js';

const {parse, stringify} = JSON;

test('redlint: extract', (t) => {
    const filesystem = stringify({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/README.md',
        }],
    });
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    const result = parse(extract('/hello/world', filesystem, {
        merge,
        branch,
    }));
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: '',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});
