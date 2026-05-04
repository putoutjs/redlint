import {readFileSync as _readFileSync} from 'node:fs';
import {codeFrameColumns} from '@putout/babel';
import dedent from 'dedent';
import {tryCatch} from 'try-catch';
import {parseFiles} from './parse-files/index.js';

const {entries} = Object;

export const view = (filename, overrides = {}) => {
    const {
        readFileSync = _readFileSync,
    } = overrides;
    
    const lines = [];
    const [error, filesystem] = tryCatch(readFileSync, filename, 'utf8');
    
    if (error)
        return error.message;
    
    const files = parseFiles(filesystem);
    
    for (const [line, nameWithContent] of entries(files)) {
        for (const [name, content] of entries(nameWithContent)) {
            lines.push(
                codeFrameColumns(dedent(content), {}, {
                    highlightCode: true,
                    message: `${name}:${line}`,
                }) +
                '\n',
            );
        }
    }
    
    return lines.join('\n');
};
