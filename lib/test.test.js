import {
    __filesystem,
    fromJS,
    toJS,
} from '@putout/operator-json';

export const branch = (raw) => {
    const source = toJS(raw, __filesystem);
    
    return [{
        source,
    }];
};

export const merge = (raw, [source]) => fromJS(source, __filesystem);
