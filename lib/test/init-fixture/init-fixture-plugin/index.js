import {operator} from 'putout';

const {
    createDirectory,
    createFile,
    getFile,
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
    
    const [fixtureDir] = getFile(root, 'fixture');
    
    for (const [a, b] of names) {
        if (!fixtureDir || !getFile(fixtureDir, a))
            push(root, {
                name: a,
            });
        
        if (!fixtureDir || !getFile(fixtureDir, b))
            push(root, {
                name: b,
            });
    }
};
