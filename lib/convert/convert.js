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
import {
    isConvertToJs,
    isConvertToJson,
} from '../menu.js';

const [, pluginConvertJsonToJs] = pluginFilesystem.rules['convert-json-to-js'];
const [, pluginConvertJsToJson] = pluginFilesystem.rules['convert-js-to-json'];

export const convert = (filename, type, filesystem, {
    progress = createProgress(),
    branch = originalBranch,
    merge = originalMerge,
} = {}) => {
    const [{source}] = branch(filesystem);
    const ast = parse(source);
    const options = createOptions(filename, type);
    
    transform(ast, filesystem, {
        fix: true,
        fixCount: 1,
        progress,
        ...options,
    });
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};

function createOptions(filename, type) {
    if (isConvertToJs(type))
        return {
            rules: {
                'filesystem/convert-json-to-js': ['on', {
                    filename,
                }],
            },
            plugins: [
                ['filesystem/convert-json-to-js', pluginConvertJsonToJs],
            ],
        };
    
    if (isConvertToJson(type))
        return {
            rules: {
                'filesystem/convert-js-to-json': ['on', {
                    filename,
                }],
            },
            plugins: [
                ['filesystem/convert-js-to-json', pluginConvertJsToJson],
            ],
        };
    
    return {};
}
