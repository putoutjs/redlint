import {test, stub} from 'supertape';
import {create} from '@putout/processor-filesystem/create';
import {montag} from 'montag';
import {runDSLConverter} from './dsl.js';

const {parse, stringify} = JSON;

const {branch, merge} = create({
    cli: false,
    maybeSimple: false,
});

test('redlint: run-convert-with-options: -h', (t) => {
    const filesystem = {};
    const [error] = runDSLConverter(filesystem, ['-h']);
    
    t.equal(error.message, 'a -> b: c, toml -> json: bunfig.toml');
    t.end();
});

test('redlint: run-convert-with-options: --help', (t) => {
    const filesystem = {};
    const [error] = runDSLConverter(filesystem, ['--help']);
    
    t.equal(error.message, 'a -> b: c, toml -> json: bunfig.toml');
    t.end();
});

test('redlint: run-convert-with-options: json -> toml: all matched', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.json',
        '{}',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'json',
        '->',
        'toml:',
        'package.json',
    ], {
        branch,
        merge,
    });
    
    const result = parse(string);
    
    const expected = ['/hello/world/', [
        '/hello/world/package.toml',
        'Cg==',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: json -> toml: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.json',
        '{}',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'json',
        '->',
        'toml:',
        'package.json',
    ], {
        branch,
        merge,
    });
    
    const result = parse(string);
    
    const expected = ['/hello/world/', [
        '/hello/world/package.toml',
        'Cg==',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: json -> toml: no files matched', (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.json","{}"]]');
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.json',
        '{}',
    ]]);
    
    const [error] = runDSLConverter(filesystem, [
        'json',
        '->',
        'toml:',
        'package.json',
    ], {
        convert,
    });
    
    t.equal(error.message, 'No files matched');
    t.end();
});

test('redlint: run-convert-with-options: unknown conversion', (t) => {
    const convert = stub();
    const filesystem = '[]';
    
    const [error] = runDSLConverter(filesystem, [
        'foo',
        '->',
        'bar:',
        'x.txt',
    ], {
        convert,
    });
    
    t.equal(error.message, `Unknown conversion 'foo -> bar'`);
    t.end();
});

test('redlint: run-convert-with-options: missing filename', (t) => {
    const convert = stub();
    const filesystem = '[]';
    
    const [error] = runDSLConverter(filesystem, ['json', '->', 'toml'], {
        convert,
    });
    
    t.equal(error.message, 'Filename is required');
    t.end();
});

test('redlint: run-convert-with-options: json -> js: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.json',
        '{}',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'json',
        '->',
        'js:',
        'package.json',
    ], {
        branch,
        merge,
    });
    
    const result = parse(string);
    
    const expected = ['/hello/world/', ['/hello/world/package.js', btoa('export default {};\n')]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: js -> json: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.js',
        '{}',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'js',
        '->',
        'json:',
        'package.js',
    ], {
        branch,
        merge,
    });
    
    const result = parse(string);
    
    const expected = ['/hello/world/', [
        '/hello/world/package.js',
        '{}',
    ]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: yaml -> json: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.yaml',
        'hello: world',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'yaml',
        '->',
        'json:',
        'package.yaml',
    ], {
        branch,
        merge,
    });
    
    const content = btoa(
        stringify({
            hello: 'world',
        }, null, 4) +
        '\n',
    );
    
    const result = parse(string);
    const expected = ['/hello/world/', ['/hello/world/package.json', content]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: json -> yaml: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.json',
        '{}',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'json',
        '->',
        'yaml:',
        'package.json',
    ], {
        branch,
        merge,
    });
    
    const content = btoa('{}\n');
    
    const result = parse(string);
    const expected = ['/hello/world/', ['/hello/world/package.yaml', content]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: toml -> json: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.toml',
        'hello = "world"',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'toml',
        '->',
        'json:',
        'package.toml',
    ], {
        branch,
        merge,
    });
    
    const content = btoa(
        stringify({
            hello: 'world',
        }, null, 4) +
        '\n',
    );
    
    const result = parse(string);
    const expected = ['/hello/world/', ['/hello/world/package.json', content]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: yaml -> toml: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.yaml',
        montag`
            hello: world
        `,
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'yaml',
        '->',
        'toml:',
        'package.yaml',
    ], {
        branch,
        merge,
    });
    
    const result = parse(string);
    
    const expected = ['/hello/world/', ['/hello/world/package.toml', btoa('hello = "world"\n')]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: run-convert-with-options: toml -> yaml: calls convert', (t) => {
    const filesystem = stringify(['/hello/world/', [
        '/hello/world/package.toml',
        '[hello]\na=3',
    ]]);
    
    const [, string] = runDSLConverter(filesystem, [
        'toml',
        '->',
        'yaml:',
        'package.toml',
    ], {
        merge,
        branch,
    });
    
    const result = parse(string);
    
    const expected = ['/hello/world/', ['/hello/world/package.yaml', btoa(montag`
        hello:
          a: 3\n
    `)]];
    
    t.deepEqual(result, expected);
    t.end();
});
