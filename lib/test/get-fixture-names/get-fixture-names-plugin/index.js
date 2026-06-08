import {operator} from 'putout';

const {stringify} = JSON;

const {
    getTemplateValues,
    compare,
} = operator;

const TRANSFORM = 't.transform(__a)';
const TRANSFORM_COUPLE = 't.transform(__a, __b)';
const TRANSFORM_WITH_OPTIONS = 't.transformWithOptions(__a, __b)';

export const report = (path) => {
    const name = parseName(path);
    const options = parseOptions(path);
    
    return `${name} -> ${options}`;
};

export const fix = () => {};

export const include = () => [
    TRANSFORM,
    TRANSFORM_COUPLE,
    TRANSFORM_WITH_OPTIONS,
];

function parseName(path) {
    const {length} = path.node.arguments;
    
    if (length === 1) {
        const {__a} = getTemplateValues(path, TRANSFORM);
        return __a.value;
    }
    
    const {__a} = getTemplateValues(path, TRANSFORM_COUPLE);
    
    return __a.value;
}

function parseOptions(path) {
    if (!compare(path, TRANSFORM_WITH_OPTIONS))
        return '{}';
    
    const {value} = path.get('arguments.1').evaluate();
    
    return stringify(value, null, 4);
}
