import {
    parse,
    transform,
    print,
} from 'putout';
import {createProgress} from '@putout/engine-runner/progress';
import * as pluginFilesystem from '@putout/plugin-filesystem';
import {create} from '@putout/processor-filesystem/create';
import {readFileContent as _readFileContent} from '@putout/cli-filesystem';

const [, readAllFiles] = pluginFilesystem.rules['read-all-files'];
const [, replaceCwd] = pluginFilesystem.rules['replace-cwd'];

export const pack = (from, filesystem, overrides = {}) => {
    const {
        progress = createProgress(),
        readFileContent = _readFileContent,
    } = overrides;
    
    const {branch, merge} = create({
        cli: true,
        maybeSimple: true,
        filesystemCLI: {
            readFileContent,
        },
    });
    
    const [{source}] = branch(filesystem);
    const ast = parse(source);
    
    transform(ast, {
        fixCount: 1,
        progress,
        rules: {
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
    
    const code = print(ast);
    
    return merge(filesystem, [code]);
};
