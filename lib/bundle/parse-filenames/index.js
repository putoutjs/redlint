import putout from 'putout';
// parse-require
import * as parseRequire from './parse-require/index.js';

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
export const scan = (root, {push}) => {
    const entry = '/index.js';
    const files = new Set();
    const processingNames = new Set([entry]);
    
    for (const currentName of processingNames) {
        const [file] = findFile(root, currentName);
        
        files.add(getFilename(file));
        
        const {places} = putout(readFileContent(file), {
            plugins: [
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
