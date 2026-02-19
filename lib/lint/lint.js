import {transformAsync, parse} from 'putout';
import {parseOptions} from 'putout/parse-options';
import {createProgress} from '@putout/engine-runner/progress';
import {inject, eject} from '@putout/operator-filesystem/maybe';
import {toJS, __filesystem} from '@putout/operator-json';
import * as filesystemCLI from '@putout/cli-filesystem';

export const lint = async (filesystem, overrides = {}) => {
    const {
        fix,
        test,
        progress = createProgress(),
    } = overrides;
    
    !test && inject(filesystemCLI);
    
    const source = toJS(filesystem, __filesystem);
    
    const options = parseOptions({
        name: '.filesystem.json',
    });
    
    const ast = parse(source);
    
    const places = await transformAsync(ast, {
        fix,
        fixCount: 1,
        ...options,
        progress,
    });
    
    !test && eject(filesystemCLI);
    
    return places;
};
