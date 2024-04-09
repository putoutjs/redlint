import {transformAsync, parse} from 'putout';
import parseOptions from 'putout/parse-options';
import {createProgress} from '@putout/engine-runner/progress';
import {init} from '@putout/operator-filesystem';
import {toJS, __filesystem} from '@putout/operator-json';
import filesystemCLI from '@putout/cli-filesystem';

export const lint = async (filesystem, {
    fix,
    test,
    progress = createProgress(),
} = {}) => {
    if (!test)
        init(filesystemCLI);
    
    const source = toJS(filesystem, __filesystem);
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
    
    if (!test)
        init(filesystemCLI);
    
    return places;
};
