import {test} from 'supertape';
import {fromJS, toJS, __filesystem} from '@putout/operator-json';

import {pack} from './pack.js';

const {parse, stringify} = JSON;

test('redlint: pack', (t) => {
    const filesystem = stringify({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
       } ]
    };
    
    const merge = (raw, [source]) => {
        return fromJS(source, __filesystem);
    };
    const result = parse(pack( '/hello/world', filesystem, {
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
