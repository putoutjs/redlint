import {test, stub} from 'supertape';
import {runConvertWithOptions} from './run-convert-with-options.js';

test('redlint: run-convert-with-options: -h', async (t) => {
    const filesystem = {};
    const [error] = await runConvertWithOptions(filesystem, ['-h']);
    
    t.equal(error.message, 'a -> b: c, toml -> json: bunfig.toml');
    t.end();
});

test('redlint: run-convert-with-options: --help', async (t) => {
    const filesystem = {};
    const [error] = await runConvertWithOptions(filesystem, ['--help']);
    
    t.equal(error.message, 'a -> b: c, toml -> json: bunfig.toml');
    t.end();
});

test('redlint: run-convert-with-options: json -> toml: all matched', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.toml","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.json","{}"]]';
    
    const [error] = await runConvertWithOptions(filesystem, [
        'json',
        '->',
        'toml:',
        'package.json',
    ], {
        convert,
    });
    
    t.notOk(error);
    t.end();
});

test('redlint: run-convert-with-options: json -> toml: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.toml","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.json","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'json',
        '->',
        'toml:',
        'package.json',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.json',
        '🦏 convert json to toml',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: json -> toml: no files matched', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.json","{}"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.json","{}"]]';
    
    const [error] = await runConvertWithOptions(filesystem, [
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

test('redlint: run-convert-with-options: unknown conversion', async (t) => {
    const convert = stub();
    const filesystem = '[]';
    
    const [error] = await runConvertWithOptions(filesystem, [
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

test('redlint: run-convert-with-options: missing filename', async (t) => {
    const convert = stub();
    const filesystem = '[]';
    
    const [error] = await runConvertWithOptions(filesystem, ['json', '->', 'toml'], {
        convert,
    });
    
    t.equal(error.message, 'Filename is required');
    t.end();
});

test('redlint: run-convert-with-options: json -> js: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.js","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.json","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'json',
        '->',
        'js:',
        'package.json',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.json',
        '🦏 convert json to js',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: js -> json: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.json","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.js","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'js',
        '->',
        'json:',
        'package.js',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.js',
        '🦏 convert js to json',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: yaml -> json: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.json","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.yaml","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'yaml',
        '->',
        'json:',
        'package.yaml',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.yaml',
        '🦏 convert yaml to json',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: json -> yaml: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.yaml","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.json","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'json',
        '->',
        'yaml:',
        'package.json',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.json',
        '🦏 convert json to yaml',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: toml -> json: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.json","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.toml","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'toml',
        '->',
        'json:',
        'package.toml',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.toml',
        '🦏 convert toml to json',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: yaml -> toml: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.toml","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.yaml","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'yaml',
        '->',
        'toml:',
        'package.yaml',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.yaml',
        '🦏 convert yaml to toml',
        filesystem,
    ]);
    t.end();
});

test('redlint: run-convert-with-options: toml -> yaml: calls convert', async (t) => {
    const convert = stub().returns('["/hello/world/",["/hello/world/package.yaml","e30K"]]');
    const filesystem = '["/hello/world/",["/hello/world/package.toml","{}"]]';
    
    await runConvertWithOptions(filesystem, [
        'toml',
        '->',
        'yaml:',
        'package.toml',
    ], {
        convert,
    });
    
    t.calledWith(convert, [
        'package.toml',
        '🦏 convert toml to yaml',
        filesystem,
    ]);
    t.end();
});
