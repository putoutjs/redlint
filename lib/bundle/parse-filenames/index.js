import putout from 'putout';
import {dirname} from 'node:path';
// parse-require
import * as parseRequire from './parse-require/index.js';
import * as convertEsmToCommonjs from '@putout/plugin-nodejs/convert-esm-to-commonjs';

// parse-require
const {operator} = putout;
const {
    readFileContent,
    getFilename,
    findFile,
} = operator;

const getMessage = ({message}) => message;

export const report = (root, {file}) => file;
export const fix = () => {};
export const scan = (root, {push, options}) => {
    debugger;
    const {entry = '/index.js'} = options;
    const files = new Set();
    const processingNames = new Set([entry]);
    
    for (const currentName of processingNames) {
        const [file] = findFile(root, currentName);
        
        if (!file)
            throw Error(`file '${currentName}' not found`);
        
        const filename = getFilename(file);
        const dir = dirname(filename);
        
        files.add(filename);
        
        const {places} = putout(readFileContent(file), {
            rules: {
                'parse-require': ['on', {
                    dir,
                }],
            },
            plugins: [
                ['convert-esm-to-commonjs', convertEsmToCommonjs],
                ['parse-require', parseRequire],
            ],
        });
        
        for (const name of places.map(getMessage))
            processingNames.add(name);
    }
    
    for (const file of files) {
        push(root, {
            file,
        });
    }
};
