import {
    parse,
    transform,
    print,
} from 'putout';
import {createProgress} from '@putout/engine-runner/progress';
import * as pluginFilesystem from '@putout/plugin-filesystem';
import {
    branch as originalBranch,
    merge as originalMerge,
} from '@putout/processor-filesystem';

const [, readAllFiles] = pluginFilesystem.rules['read-all-files'];
const [, replaceCwd] = pluginFilesystem.rules['replace-cwd'];

export const extract = (to, filesystem, {
    progress = createProgress(),
    branch = originalBranch,
    merge = originalMerge,
} = {}) => {
    const [{source}] = branch(filesystem);
    const ast = parse(source);
    
    transform(ast, filesystem, {
        fix: true,
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
            ['write-all-files', readAllFiles],
        ],
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
