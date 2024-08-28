import {test} from 'supertape';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {convert} from './convert.js';
import {
    CONVERT_JSON_TO_JS,
    CONVERT_JS_TO_JSON,
    CONVERT_RC_TO_FLAT,
} from '../menu.js';

const {parse, stringify} = JSON;

test('redlint: convert: json to js', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/package.json']);
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    
    const converted = convert('package.json', CONVERT_JSON_TO_JS, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/package.js',
        'ZXhwb3J0IGRlZmF1bHQge307Cg==',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: js to json', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/package.js']);
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    
    const converted = convert('package.js', CONVERT_JS_TO_JSON, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/package.js',
        '',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: js to json: not supported', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/package.js']);
    
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
    
    const expected = [
        '/hello/world/',
        '/hello/world/package.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: ESLint: rc to flat', (t) => {
    const filesystem = stringify(['/hello/world/', '/hello/world/.eslintrc.json']);
    
    const branch = (raw) => {
        const source = toJS(raw, __filesystem);
        
        return [{
            source,
        }];
    };
    
    const merge = (raw, [source]) => fromJS(source, __filesystem);
    
    const converted = convert('package.js', CONVERT_RC_TO_FLAT, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', ['/hello/world/eslint.config.js', 'aW1wb3J0IHtzYWZlQWxpZ259IGZyb20gJ2VzbGludC1wbHVnaW4tcHV0b3V0L2NvbmZpZyc7CgpleHBvcnQgZGVmYXVsdCBbLi4uc2FmZUFsaWduXTsK']];
    
    t.deepEqual(result, expected);
    t.end();
});
