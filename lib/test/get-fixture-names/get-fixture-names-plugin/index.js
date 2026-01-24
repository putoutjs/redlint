import {operator} from 'putout';

const {getTemplateValues} = operator;
const TRANSFORM = 't.transform(__a)';
const TRANSFORM_COUPLE = 't.transform(__a, __b)';

export const report = (path) => {
    return parseValue(path);
};

export const fix = () => {};

export const include = () => [TRANSFORM, TRANSFORM_COUPLE];

function parseValue(path) {
    const {length} = path.node.arguments;
    
    if (length === 1) {
        const {__a} = getTemplateValues(path, TRANSFORM);
        return __a.value;
    }
    
    const {__a} = getTemplateValues(path, TRANSFORM_COUPLE);
    
    return __a.value;
}
