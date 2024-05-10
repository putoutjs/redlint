import {
    parse,
    transform,
    print,
} from 'putout';
import {createProgress} from '@putout/engine-runner/progress';
import writeAllFiles from '@putout/plugin-filesystem/write-all-files';
import replaceCwd from '@putout/plugin-filesystem/replace-cwd';
import {
    branch as originalBranch,
    merge as originalMerge,
} from '@putout/processor-filesystem';

export const extract = (to, filesystem, overrides = {}) => {
    const {
        progress = createProgress(),
        branch = originalBranch,
        merge = originalMerge,
    } = overrides;
    
    const [{source}] = branch(filesystem);
    const ast = parse(source);
    
    transform(ast, filesystem, {
        fixCount: 1,
        progress,
        rules: {
            'replace-cwd': ['on', {
                from: '/',
                to,
            }],
        },
        plugins: [
            ['replace-cwd', replaceCwd],
            ['write-all-files', writeAllFiles],
        ],
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
