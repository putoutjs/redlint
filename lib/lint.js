import {
    transform,
    parse,
} from 'putout';
import parseOptions from 'putout/parse-options';
import {
    branch,
    merge,
} from '@putout/processor-filesystem';
import {createProgress} from '@putout/engine-runner/progress';

export const lint = (filesystem, {fix, progress = createProgress()} = {}) => {
    const [{source}] = branch(filesystem);
    const options = parseOptions({
        name: '.filesystem.json',
    });
    
    const ast = parse(source);
    
    const places = transform(ast, source, {
        fix,
        ...options,
        progress,
    });
    
    merge(filesystem, [source]);
    
    return places;
};
