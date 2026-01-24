import {operator} from 'putout';

const {
    readDirectory,
    findFile,
    readFileContent,
    getFilename,
} = operator;

export const report = (file) => {
    const name = getFilename(file);
    const content = readFileContent(file);
    
    return `${name} -> ${content}`;
};

export const fix = () => {};

export const scan = (root, {push}) => {
    const [fixture] = findFile(root, 'fixture');
    
    if (!fixture)
        return;
    
    for (const file of readDirectory(fixture)) {
        push(file);
    }
};
