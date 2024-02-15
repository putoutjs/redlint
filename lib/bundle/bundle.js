import {
    parse,
    transform,
    print,
    findPlaces,
} from 'putout';
import {createProgress} from '@putout/engine-runner/progress';
import * as pluginFilesystem from '@putout/plugin-filesystem';
import * as pluginParseFilenames from './parse-filenames/index.js';
import {
    branch as originalBranch,
    merge as originalMerge,
} from '@putout/processor-filesystem';

const [, replaceCwd] = pluginFilesystem.rules['replace-cwd'];
const [, readAllFiles] = pluginFilesystem.rules['read-all-files'];

export const bundle = (from, entry, filesystem, {
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
            'read-all-files': ['on', {
                mask: '*.js',
            }],
            'replace-cwd': ['on', {
                from,
                to: '/',
            }],
        },
        plugins: [
            ['read-all-files', readAllFiles],
            ['replace-cwd', replaceCwd],
        ],
    });
    
    debugger;
    
    const places = findPlaces(ast, filesystem, {
        fixCount: 1,
        progress,
        rules: {
            'parse-filenames': ['on', {
                entry,
            }],
        },
        plugins: [
            ['parse-filenames', pluginParseFilenames],
        ],
    });
    
    console.log(places);
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
