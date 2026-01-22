import {parse, transform} from 'putout';
import * as getFileNamesWithContent from './get-file-names-with-content/index.js';

const {assign} = Object;

export const parseFiles = (source) => {
    const ast = parse(source);
    const places = transform(ast, source, {
        fix: false,
        plugins: [
            ['get-filenames-with-content', getFileNamesWithContent],
        ],
    });
    
    const files = places.map(getNameWithContent);
    
    return nest(files);
};

function nest(files) {
    const result = {};
    
    for (const [line, name, content] of files) {
        result[line] = result[line] || {};
        assign(result[line], {
            [name]: content,
        });
    }
    
    return result;
}

const getNameWithContent = ({message}) => {
    const [line, name] = message.split(' -> ', 2);
    const arrowLength = ' -> '.length * 2;
    const content = message.slice(name.length + line.length + arrowLength);
    
    return [
        line,
        name,
        content,
    ];
};
