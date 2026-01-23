import {operator} from 'putout';

const {getTemplateValues} = operator;
const TRANSFORM = 't.transform(__a)';

export const report = (path) => {
    const {__a} = getTemplateValues(path, TRANSFORM);
    return __a.value;
};

export const fix = () => {};

export const include = () => [TRANSFORM];
