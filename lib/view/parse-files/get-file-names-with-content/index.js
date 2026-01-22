import {operator} from 'putout';

const {
    getFileType,
    readFileContent,
    getFilename,
} = operator;

export const report = (file, {line}) => {
    const name = getFilename(file);
    const content = readFileContent(file);
    
    return `${line} -> ${name} -> ${content}`;
};

const isFile = (a) => getFileType(a) === 'file';

export const fix = () => {};
export const scan = (root, {push, trackFile}) => {
    const files = trackFile(root, '*').filter(isFile);
    const {line} = root.node.loc.start;
    
    for (const file of files) {
        push(file, {
            line,
        });
    }
};
