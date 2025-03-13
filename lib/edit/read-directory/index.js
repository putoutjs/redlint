import {parse, transform} from 'putout';
import {__filesystem, toJS} from '@putout/operator-json';
import * as getFileNames from './get-filenames/index.js';

export const readDirectory = (filesystem, {dir, recursive, full}) => {
    const source = toJS(filesystem, __filesystem);
    const ast = parse(source);
    
    const [{message}] = transform(ast, filesystem, {
        fix: true,
        fixCount: 1,
        rules: {
            'get-filenames': ['on', {
                dir,
                full,
                recursive,
            }],
        },
        plugins: [
            ['get-filenames', getFileNames],
        ],
    });
    
    return message;
};
