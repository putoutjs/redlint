import {
    transformAsync,
    parse,
} from 'putout';
import parseOptions from 'putout/parse-options';
import {createProgress} from '@putout/engine-runner/progress';
import {
    branch,
    merge,
} from '@putout/processor-filesystem';

export const lint = async (filesystem, {fix, progress = createProgress()} = {}) => {
    const [{source}] = branch(filesystem);
    const options = parseOptions({
        name: '.filesystem.json',
    });
    
    const ast = parse(source);
    
    const places = await transformAsync(ast, source, {
        fix,
        fixCount: 1,
        ...options,
        progress,
    });
    
    merge(filesystem, [source]);
    
    return places;
};
