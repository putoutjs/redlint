import putout, {operator} from 'putout';
import {dirname} from 'node:path';
import * as resolveRequire from './resolve-require/index.js';

const {
    writeFileContent,
    getFilename,
    readFileContent,
} = operator;

export const report = (file) => getFilename(file);
export const fix = (file) => {
    const {code} = putout(readFileContent(file), {
        rules: {
            'resolve-require': ['on', {
                dir: dirname(getFilename(file)),
            }],
        },
        plugins: [
            ['resolve-require', resolveRequire],
        ],
    });
    
    writeFileContent(file, code);
};
export const scan = (root, {push, trackFile}) => {
    const filenames = [
        '/index.js',
        '/send.js',
    ];
    
    for (const file of trackFile(root, filenames)) {
        push(file);
    }
};
