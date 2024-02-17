import putout, {operator} from 'putout';
import {dirname} from 'node:path';
import * as resolveRequire from './resolve-require/index.js';
import * as convertEsmToCommonjs from '@putout/plugin-nodejs/convert-esm-to-commonjs';

const {
    writeFileContent,
    getFilename,
    readFileContent,
} = operator;

export const report = (file) => getFilename(file);
export const fix = (file) => {
    const {code} = putout(readFileContent(file), {
        fixCount: 1,
        rules: {
            'resolve-require': ['on', {
                dir: dirname(getFilename(file)),
            }],
        },
        plugins: [
            ['convert-esm-to-commonjs', convertEsmToCommonjs],
            ['resolve-require', resolveRequire],
        ],
    });
    
    writeFileContent(file, code);
};
export const scan = (root, {push, trackFile, options}) => {
    const {filenames} = options;
    
    for (const file of trackFile(root, filenames)) {
        push(file);
    }
};

