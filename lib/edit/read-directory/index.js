import {parse, transform} from 'putout';
import {__filesystem, toJS} from '@putout/operator-json';
import * as getFileNames from './get-filenames/index.js';

const getMessage = ({message}) => message;

export const readDirectory = (filesystem, {dir, nested, full}) => {
    const source = toJS(filesystem, __filesystem);
    const ast = parse(source);
    
    const places = transform(ast, filesystem, {
        fix: true,
        fixCount: 1,
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
    
    return places.map(getMessage);
};
