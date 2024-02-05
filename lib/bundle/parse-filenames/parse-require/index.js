import {operator} from 'putout';
import {resolve} from 'node:path';

const {getTemplateValues} = operator;

export const report = ({filename}) => maybeAddJs(filename);
export const fix = () => {};

const REQUIRE = 'require(__a)';
const maybeAddJs = (a) => a.endsWith('js') ? a : `${a}.js`;

export const traverse = ({push, options}) => ({
    [REQUIRE]: (path) => {
        const {dir = '/'} = options;
        const {__a} = getTemplateValues(path, REQUIRE);
        const filename = resolve(dir, __a.value);
        
        push({
            path,
            filename,
        });
    },
});
