import {basename} from 'node:path';
import {operator} from 'putout';

const {
    getFilename,
    readDirectory,
    findFile,
} = operator;

export const report = (path, {name}) => name;
export const fix = () => {};
export const scan = (rootPath, {push, options}) => {
    console.time('scan');
    
    const {
        dir = '/',
        full,
        recursive,
    } = options;
    
    const names = [];
    const [dirPath] = findFile(rootPath, dir);
    
    const files = recursive ? findFile(dirPath, '*') : readDirectory(dirPath);
    
    for (const file of files) {
        const path = getFilename(file);
        
        if (dir === path)
            continue;
        
        if (!full && recursive) {
            const name = path
                .replace(dir, '')
                .replace(/^\//, '');
            
            names.push(name);
            continue;
        }
        
        const name = full ? path : basename(path);
        
        names.push(name);
    }
    
    const sorted = names.sort();
    
    for (const name of sorted) {
        push(dirPath, {
            name,
        });
    }
};
