import {test} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {convert} from './convert.js';
import {
    CONVERT_JSON_TO_JS,
    CONVERT_JS_TO_JSON,
    CONVERT_RC_TO_FLAT,
    CONVERT_YAML_TO_JSON,
    CONVERT_JSON_TO_YAML,
    CONVERT_TOML_TO_JSON,
    CONVERT_JSON_TO_TOML,
} from '../menu.js';

const {parse, stringify} = JSON;

const {branch, merge} = create({
    cli: false,
    maybeSimple: false,
});

test('redlint: convert: json to js', (t) => {
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/package.json',
    ]);
    
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
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/package.js',
    ]);
    
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

test('redlint: convert: yaml to json', (t) => {
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/actions.yaml',
    ]);
    
    const converted = convert('actions.yaml', CONVERT_YAML_TO_JSON, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/actions.json',
        'e30K',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: json to yaml', (t) => {
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/actions.json',
    ]);
    
    const converted = convert('actions.json', CONVERT_JSON_TO_YAML, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/actions.yaml',
        'e30K',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: js to json: not supported', (t) => {
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/package.js',
    ]);
    
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

test('redlint: convert: toml to json', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/bunfig.toml',
        '[install]\nlockfile = false\nlinker = "hoisted"\n',
    ]]);
    
    const converted = convert('bunfig.toml', CONVERT_TOML_TO_JSON, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/bunfig.json',
        'ewogICAgImluc3RhbGwiOiB7CiAgICAgICAgImxvY2tmaWxlIjogZmFsc2UsCiAgICAgICAgImxpbmtlciI6ICJob2lzdGVkIgogICAgfQp9Cg==',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: json to toml', (t) => {
    const filesystem = stringify(['/hello/world/', ['/hello/world/bunfig.json', JSON.stringify({
        install: {
            lockfile: false,
            linker: 'hoisted',
        },
    })]]);
    
    const converted = convert('bunfig.json', CONVERT_JSON_TO_TOML, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/bunfig.toml',
        'W2luc3RhbGxdCmxvY2tmaWxlID0gZmFsc2UKbGlua2VyID0gImhvaXN0ZWQiCg==',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: ESLint: rc to flat', (t) => {
    const filesystem = stringify([
        '/hello/world/',
        '/hello/world/.eslintrc.json',
    ]);
    
    const converted = convert('package.js', CONVERT_RC_TO_FLAT, filesystem, {
        merge,
        branch,
    });
    
    const result = parse(converted);
    
    const expected = ['/hello/world/', [
        '/hello/world/eslint.config.js',
        'aW1wb3J0IHtzYWZlQWxpZ259IGZyb20gJ2VzbGludC1wbHVnaW4tcHV0b3V0JzsKCmV4cG9ydCBkZWZhdWx0IFsuLi5zYWZlQWxpZ25dOwo=',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});
