import {basename, dirname} from 'node:path';
import {operator} from 'putout';

const {getFilename} = operator;

export const report = (path, {name}) => name;
export const fix = () => {};
export const scan = (path, {push, trackFile, options}) => {
    const {
        dir = '/',
        full,
        recursive,
    } = options;
    
    const names = [];
    
    for (const file of trackFile(path, '*')) {
        const path = getFilename(file);
        const currentDir = dirname(path);
        
        if (dir === path)
            continue;
        
        if (!recursive && currentDir !== dir)
            continue;
        
        if (!full && recursive) {
            const name = path
                .replace(dir, '')
                .replace(/^\//, '');
            
            if (!name)
                continue;
            
            push(file, {
                name,
            });
            continue;
        }
        
        const name = full ? path : basename(path);
        
        names.push(name);
    }
    
    const sorted = names.sort();
    
    for (const name of sorted) {
        push(path, {
            name,
        });
    }
};
