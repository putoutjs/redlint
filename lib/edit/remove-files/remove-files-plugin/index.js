import {join} from 'node:path';
import {operator} from 'putout';

const {removeFile, getFilename} = operator;

const getRemovables = (a, b) => Array.from(new Set(a).symmetricDifference(new Set(b)));
const isEqual = (a, b) => a.filter(Boolean).length === b.filter(Boolean).length;

export const report = (filePath) => {
    const name = getFilename(filePath);
    return `Remove '${name}'`;
};

export const fix = (filePath) => {
    removeFile(filePath);
};

export const scan = (path, {push, trackFile, options}) => {
    const {
        from = [],
        to = [],
        dir = '/',
    } = options;
    
    if (isEqual(from, to))
        return;
    
    const removables = getRemovables(from, to);
    const fullNames = getFullNames(dir, removables);
    const trackFileIterator = trackFile(path, fullNames);
    
    for (const currentFile of trackFileIterator) {
        push(currentFile);
    }
};

function getFullNames(dir, names) {
    const full = [];
    
    for (const current of names) {
        full.push(join(dir, current));
    }
    
    return full;
}
