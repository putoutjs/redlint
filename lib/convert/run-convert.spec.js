import {test, stub} from 'supertape';
import {runConvert} from './run-convert.js';
import {
    CONVERT_JSON_TO_JS,
    CONVERT_JS_TO_JSON,
    CONVERT_RC_TO_FLAT,
} from '../menu.js';

test('redlint: run-convert: json to js: called with filename', async (t) => {
    const convert = stub();
    const askFilename = stub().returns('package.json');
    const filesystem = '[]';
    
    await runConvert(CONVERT_JSON_TO_JS, filesystem, {
        askFilename,
        convert,
    });
    
    t.calledWith(convert, ['package.json', CONVERT_JSON_TO_JS, filesystem]);
    t.end();
});

test('redlint: run-convert: js to json: called with filename', async (t) => {
    const convert = stub();
    const askFilename = stub().returns('package.js');
    const filesystem = '[]';
    
    await runConvert(CONVERT_JS_TO_JSON, filesystem, {
        askFilename,
        convert,
    });
    
    t.calledWith(convert, ['package.js', CONVERT_JS_TO_JSON, filesystem]);
    t.end();
});

test('redlint: run-convert: rc to flat: default filename', async (t) => {
    const convert = stub();
    const askFilename = stub();
    const filesystem = '[]';
    
    await runConvert(CONVERT_RC_TO_FLAT, filesystem, {
        askFilename,
        convert,
    });
    
    t.calledWith(convert, ['.eslintrc.json', CONVERT_RC_TO_FLAT, filesystem]);
    t.end();
});

test('redlint: run-convert: rc to flat: not ask filename', async (t) => {
    const convert = stub();
    const askFilename = stub();
    const filesystem = '[]';
    
    await runConvert(CONVERT_RC_TO_FLAT, filesystem, {
        askFilename,
        convert,
    });
    
    t.notCalled(askFilename);
    t.end();
});

test('redlint: run-convert: no filename', async (t) => {
    const convert = stub();
    const askFilename = stub().returns(undefined);
    const filesystem = '[]';
    
    await runConvert(CONVERT_JSON_TO_JS, filesystem, {
        askFilename,
        convert,
    });
    
    t.notCalled(convert);
    t.end();
});

test('redlint: run-convert: no filename: returns undefined', async (t) => {
    const convert = stub();
    const askFilename = stub().returns(undefined);
    const filesystem = '[]';
    
    const result = await runConvert(CONVERT_JSON_TO_JS, filesystem, {
        askFilename,
        convert,
    });
    
    t.notOk(result);
    t.end();
});

test('redlint: run-convert: empty filename', async (t) => {
    const convert = stub();
    const askFilename = stub().returns('');
    const filesystem = '[]';
    
    await runConvert(CONVERT_JSON_TO_JS, filesystem, {
        askFilename,
        convert,
    });
    
    t.notCalled(convert);
    t.end();
});
