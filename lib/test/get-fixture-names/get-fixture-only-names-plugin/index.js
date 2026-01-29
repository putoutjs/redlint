import {operator} from 'putout';

const {
    getTemplateValues,
    compare,
} = operator;

const TRANSFORM = 't.transform(__a)';
const TRANSFORM_COUPLE = 't.transform(__a, __b)';

export const report = (path) => parseValue(path);

export const fix = () => {};

export const include = () => [TRANSFORM, TRANSFORM_COUPLE];

export const filter = (path) => {
    return compare(path.parentPath.parentPath, 'test.only(__a, __b)');
};

function parseValue(path) {
    const {length} = path.node.arguments;
    
    if (length === 1) {
        const {__a} = getTemplateValues(path, TRANSFORM);
        return __a.value;
    }
    
    const {__a} = getTemplateValues(path, TRANSFORM_COUPLE);
    
    return __a.value;
}
