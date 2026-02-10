import {stripVTControlCharacters} from 'node:util';
import {extend} from 'supertape';
export {stub} from 'supertape';

const trimEnd = (a) => a.trimEnd();
const trim = (a) => a.trim();

export const test = extend({
    stripEqual: (operator) => (a, b) => {
        const result = stripVTControlCharacters(a)
            .split('\n')
            .map(trim)
            .filter(Boolean)
            .join('\n');
        
        return operator.equal(result, b);
    },
    stripEndEqual: (operator) => (a, b) => {
        const result = stripVTControlCharacters(a)
            .split('\n')
            .map(trimEnd)
            .filter(Boolean)
            .join('\n');
        
        return operator.equal(result, b);
    },
});

