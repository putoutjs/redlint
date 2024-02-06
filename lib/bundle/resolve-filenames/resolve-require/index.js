import {operator} from 'putout';
import {resolve} from 'node:path';

const {
    getTemplateValues,
    setLiteralValue,
} = operator;

export const report = ({filename}) => filename;
export const fix = ({path, filename}) => {
    const [arg] = path.node.arguments;
    setLiteralValue(arg, `${filename}.js`);
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
