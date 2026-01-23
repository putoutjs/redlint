import {operator} from 'putout';

const {
    createDirectory,
    createFile,
} = operator;

export const report = (dir, {name}) => `Init fixture '${name}'`;

export const fix = (root, {name}) => {
    const fixtureDir = createDirectory(root, 'fixture');
    
    createFile(fixtureDir, name);
};

export const scan = (root, {options, push}) => {
    const {names = []} = options;
    
    if (!names.length)
        return;
    
    for (const [a, b] of names) {
        push(root, {
            name: a,
        });
        
        push(root, {
            name: b,
        });
    }
};
