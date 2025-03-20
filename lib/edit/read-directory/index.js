import {parse, transform} from 'putout';
import {__filesystem, toJS} from '@putout/operator-json';
import * as getFileNames from './get-filenames/index.js';

export const readDirectory = (filesystem, {dir, nested, full}) => {
    const source = toJS(filesystem, __filesystem);
    const ast = parse(source);
    
    const [{message}] = transform(ast, filesystem, {
        fix: false,
        rules: {
            'get-filenames': ['on', {
                dir,
                full,
                nested,
            }],
        },
        plugins: [
            ['get-filenames', getFileNames],
        ],
    });
    
    return message;
};
