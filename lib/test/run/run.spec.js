import {createRequire} from 'node:module';
import {test} from 'supertape';
import {run} from './run.js';

test('redlint: test: run', (t) => {
    const source = `
        module.exports.report = () => 'Use "const"';
        module.exports.replace = () => ({
                'let __a = __b': 'const __a = __b',
            });
        `;
    
    const incorrect = `
        let a = 3;
    `;
    
    const result = run(source, {
        incorrect,
    });
    
    const expected = 'const a = 3;\n';
    
    t.equal(result, expected);
    t.end();
});

test('redlint: test: run: nested', (t) => {
    const source = `
        {
            const {
                parse: parse,
                print: print,
                transform: transform,
                operator: operator,
            } = require('putout');
        }
        
        export const report = () => 'Use "const"';
        export const replace = () => ({
                'let __a = __b': 'const __a = __b',
            });
        `;
    
    const incorrect = `
        let a = 3;
    `;
    
    const result = run(source, {
        incorrect,
        require: createRequire(import.meta.url),
    });
    
    const expected = 'const a = 3;\n';
    
    t.equal(result, expected);
    t.end();
});

test('redlint: test: run: putout: not destructured', (t) => {
    const source = `
        const putout = require('putout');
        putout('');
        
        export const report = () => 'Use "const"';
        export const replace = () => ({
                'let __a = __b': 'const __a = __b',
            });
        `;
    
    const incorrect = `
        let a = 3;
    `;
    
    const result = run(source, {
        incorrect,
        require: createRequire(import.meta.url),
    });
    
    const expected = 'const a = 3;\n';
    
    t.equal(result, expected);
    t.end();
});
