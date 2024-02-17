import {operator} from 'putout';
import {resolve} from 'node:path';

const {
    getTemplateValues,
    setLiteralValue,
} = operator;

const maybeAddJs = (a) => {
    if (a.endsWith('.js'))
        return a;
    
    return `${a}.js`;
};

export const report = ({filename}) => filename;
export const fix = ({path, filename}) => {
    const [arg] = path.node.arguments;
    setLiteralValue(arg, maybeAddJs(filename));
};

const REQUIRE = 'require(__a)';

export const traverse = ({push, options}) => ({
    [REQUIRE]: (path) => {
        const {dir = '/'} = options;
        const {__a} = getTemplateValues(path, REQUIRE);
        
        if (__a.value.startsWith('/'))
            return;
        
        const filename = resolve(dir, __a.value);
        
        push({
            path,
            filename,
        });
    },
});
