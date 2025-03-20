import {basename} from 'node:path';
import {operator} from 'putout';
import {getFileType} from '@putout/operator-filesystem';

const {
    getFilename,
    readDirectory,
    findFile,
} = operator;

export const report = (path, {name}) => name;
export const fix = () => {};
export const scan = (rootPath, {push, options}) => {
    const {
        dir = '/',
        full,
        nested,
    } = options;
    
    const names = [];
    const [dirPath] = findFile(rootPath, dir);
    
    const files = nested ? findFile(dirPath, '*') : readDirectory(dirPath);
    
    for (const file of files) {
        const currentPath = getFilename(file);
        const type = getFileType(file);
        
        if (dir === currentPath)
            continue;
        
        if (nested && type === 'directory')
            continue;
        
        if (!full && nested) {
            const name = currentPath
                .replace(dir, '')
                .replace(/^\//, '');
            
            names.push(name);
            continue;
        }
        
        const name = full ? currentPath : basename(currentPath);
        
        names.push(name);
    }
    
    const sorted = names.sort();
    
    for (const name of sorted) {
        push(dirPath, {
            name,
        });
    }
};

