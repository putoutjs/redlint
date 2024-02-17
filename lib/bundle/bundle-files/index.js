import {
    types,
    operator,
    template,
} from 'putout';

const {
    replaceWith,
    getFilename,
    readFileContent,
} = operator;

const {
    Identifier,
    VariableDeclarator,
    VariableDeclaration,
    StringLiteral,
    ObjectProperty,
    ObjectExpression,
} = types;

const createFunction = template('(exports, require, module) => {BODY}');

const createIIFEE = template(`
    (() => {
        FILESYSTEM;
        MODULES;
        REQUIRE;
        ENTRY;
    })()
`);

export const report = () => '';

export const fix = (root, {entry, filenames, trackFile}) => {
    const object = ObjectExpression([]);
    
    for (const file of trackFile(root, filenames)) {
        const content = readFileContent(file);
        const filename = getFilename(file);
        const property = ObjectProperty(StringLiteral(filename), createFunction({
            BODY: template.ast(content),
        }));
        
        object.properties.push(property);
    }
    
    const filesystem = VariableDeclaration('const', [VariableDeclarator(Identifier('__filesystem'), object)]);
    
    replaceWith(root.parentPath, createIIFEE({
        FILESYSTEM: filesystem,
        MODULES: createModules(),
        REQUIRE: createRequire(),
        ENTRY: requireEntry(entry),
    }));
};
export const scan = (root, {push, options, trackFile}) => {
    const {entry, filenames = []} = options;
    
    if (!entry || !filenames.length)
        return;
    
    push(root, {
        entry,
        filenames,
        trackFile,
    });
};

function createModules() {
    return template.ast(`const __modules = {}`);
}

function requireEntry(entry) {
    return template.ast(`require("${entry}")`);
}

function createRequire() {
    return template.ast(`
        const require = (name) => {
            const exports = {};
            const module = {
                exports,
            };
            
            if (__modules[name])
                return __modules[name];
            
            __filesystem[name](exports, require, module);
            __modules[name] = module.exports;
            
            return module.exports;
        };
    `);
}
