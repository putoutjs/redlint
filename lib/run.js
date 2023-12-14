import {print, transform, parse} from 'putout';
import parseOptions from 'putout/parse-options';
import {branch, merge} from '@putout/processor-filesystem';

import {toJS, __filesystem} from '@putout/operator-json'
import {createProgress} from '@putout/engine-runner/progress';

export const scan = (filesystem, {progress = createProgress()}) => {
    const [{source}] = branch(filesystem);
    
    const options = parseOptions({
        name: '.filesystem.json',
    });
    
    const ast = parse(source);
    const places = transform(ast, filesystem, {
        fix: false,
        ...options,
        progress,
    });
    
    merge(filesystem, [source]);
    
    return places;
};

export const fix = (filesystem) => {
    const options = parseOptions();
    const {places} = putout(filesystem, {
        fix: true,
        ...options,
    });
};
