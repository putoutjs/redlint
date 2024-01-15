import {test} from 'supertape';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';

import {convert} from './convert.js';
import {CONVERT_JSON_TO_JS, CONVERT_JS_TO_JSON} from '../menu.js';

const {parse, stringify} = JSON;

test('redlint: convert: json to js', (t) => {
    const filesystem = stringify({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/package.json'
        }],
    });
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    
    const result = parse(convert('package.json', CONVERT_JSON_TO_JS, filesystem, {
        merge,
        branch,
    }));
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/package.json',
            content: '',
        }, {
            type: 'file',
            filename: '/hello/world/package.js',
            content: 'ZXhwb3J0IGRlZmF1bHQge307Cg==',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: js to json', (t) => {
    const filesystem = stringify({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/package.js'
        }],
    });
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    
    const result = parse(convert('package.js', CONVERT_JS_TO_JSON, filesystem, {
        merge,
        branch,
    }));
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/package.js',
            content: '',
        }, {
            type: 'file',
            filename: '/hello/world/package.json',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: js to json: not supported', (t) => {
    const filesystem = stringify({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/package.js'
        }],
    });
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    
    const result = parse(convert('package.js', '', filesystem, {
        merge,
        branch,
    }));
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/package.js',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});
