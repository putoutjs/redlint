import {basename, dirname} from 'node:path';
import {operator} from 'putout';

const {
    createNestedDirectory,
    moveFile,
    renameFile,
    getFilename,
    getParentDirectory,
    removeFile,
    removeEmptyDirectory,
} = operator;

export const report = (filePath, {from, to}) => `Rename '${from}' to '${to}'`;

export const fix = (filePath, {to}) => {
    const filename = getFilename(filePath);
    const dirFrom = dirname(filename);
    const dirTo = dirname(to);
    const nameTo = basename(to);
    const nameFrom = basename(filename);
    
    if (!nameTo) {
        const dir = getParentDirectory(filePath);
        
        removeFile(filePath);
        removeEmptyDirectory(dir);
        
        return;
    }
    
    if (nameFrom !== nameTo)
        renameFile(filePath, nameTo);
    
    if (dirFrom !== dirTo) {
        const currentDirPath = createNestedDirectory(filePath, dirTo);
        
        moveFile(filePath, currentDirPath);
    }
};

const addFromTo = (namesFrom, namesTo) => (a, i) => [
    namesFrom[i],
    namesTo[i],
    a,
];

export const scan = (path, {push, trackFile, options}) => {
    const {from = [], to = []} = options;
    
    if (from.length !== to.length)
        return;
    
    if (isEqual(from, to))
        return;
    
    const [fullNames, fromNames, toNames] = getRenamedFiles(from, to);
    const convertToTuple = addFromTo(fromNames, toNames);
    const trackFileIterator = trackFile(path, fullNames).map(convertToTuple);
    
    for (const [from, to, currentFile] of trackFileIterator) {
        push(currentFile, {
            from,
            to,
        });
    }
};

function getRenamedFiles(a, b) {
    const from = [];
    const to = [];
    const full = [];
    const n = a.length;
    let i = -1;
    
    while (++i < n) {
        if (a[i] !== b[i]) {
            const currentFrom = a[i];
            const currentTo = b[i];
            
            full.push(currentFrom);
            from.push(currentFrom);
            to.push(currentTo);
        }
    }
    
    return [
        full,
        from,
        to,
    ];
}

function isEqual(a, b) {
    let i = a.length;
    let is = true;
    
    while (--i >= 0) {
        if (a[i] !== b[i]) {
            is = false;
            break;
        }
    }
    
    return is;
}
