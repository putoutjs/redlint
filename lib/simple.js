const addSlash = (a) => a === '/' ? a : `${a}/`;

export const convertToSimple = (tree, simpleTree = []) => {
    const {type, filename} = tree;
    
    if (type === 'directory') {
        simpleTree.push(addSlash(filename));
        
        for (const file of tree.files)
            convertToSimple(file, simpleTree);
        
        return simpleTree;
    }
    
    if (tree.content) {
        simpleTree.push([filename, tree.content]);
        return simpleTree;
    }
    
    simpleTree.push(filename);
    
    return simpleTree;
};
