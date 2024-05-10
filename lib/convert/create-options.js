import * as pluginFilesystem from '@putout/plugin-filesystem';
import * as pluginESLint from '@putout/plugin-eslint';
import {
    isConvertToJs,
    isConvertToJson,
    isConvertRCToFlat,
} from '../menu.js';

const [, pluginConvertJsonToJs] = pluginFilesystem.rules['convert-json-to-js'];
const [, pluginConvertJsToJson] = pluginFilesystem.rules['convert-js-to-json'];
const [, convertRCToFlat] = pluginESLint.rules['convert-rc-to-flat'];

export const createOptions = (filename, type) => {
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
    
    if (isConvertRCToFlat(type))
        return {
            rules: {
                'eslint/convert-rc-to-flat': 'on',
            },
            plugins: [
                ['eslint/convert-rc-to-flat', convertRCToFlat],
            ],
        };
    
    return {};
};
