import {test} from 'supertape';
import {parseConverter} from './parse-converter.js';

test('redlint: convert: parseConverter', (t) => {
    const converter = 'json -> toml'.split(' ');
    const result = parseConverter(converter);
    
    const expected = [
        'json',
        'toml',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('redlint: convert: parseConverter: file', (t) => {
    const converter = 'json -> toml: bunfig.toml'.split(' ');
    const result = parseConverter(converter);
    
    const expected = [
        'json',
        'toml',
        'bunfig.toml',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
