import {join} from 'node:path';
import {operator} from 'putout';

const {renameFile} = operator;

export const report = (filePath, {from, to}) => `Rename '${from}' to '${to}'`;

export const fix = (filePath, {to}) => {
    renameFile(filePath, to);
};

const addFromTo = (namesFrom, namesTo) => (a, i) => [
    namesFrom[i],
    namesTo[i],
    a,
];

export const scan = (path, {push, trackFile, options}) => {
    const {
        from = [],
        to = [],
        dir = '/',
    } = options;
    
    if (from.length !== to.length)
        return;
    
    if (isEqual(from, to))
        return;
    
    const [fullNames, fromNames, toNames] = getRenamedFiles(dir, from, to);
    const convertToTuple = addFromTo(fromNames, toNames);
    
    const trackFileIterator = trackFile(path, fullNames).map(convertToTuple);
    
    for (const [from, to, currentFile] of trackFileIterator) {
        push(currentFile, {
            from,
            to,
        });
    }
};

function getRenamedFiles(dir, a, b) {
    const from = [];
    const to = [];
    const full = [];
    const n = a.length;
    let i = -1;
    
    while (++i < n) {
        if (a[i] !== b[i]) {
            const currentFrom = a[i];
            const currentTo = b[i];
            
            full.push(join(
                dir,
                currentFrom,
            ));
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
    
    while (--i >= 0) {
        if (a[i] !== b[i])
            return false;
    }
    
    return true;
}
