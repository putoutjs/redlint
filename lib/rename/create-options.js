import * as pluginReact from '@putout/plugin-react';
import {isRenameToJs, isRenameToJsx} from '../menu.js';

const [, pluginRenameJsxToJs] = pluginReact.rules['rename-file-jsx-to-js'];
const [, pluginRenameJsToJsx] = pluginReact.rules['rename-file-js-to-jsx'];

export const createOptions = (filename, type) => {
    if (isRenameToJsx(type))
        return {
            rules: {
                'react/rename-jsx-to-js': ['on', {
                    filename,
                }],
            },
            plugins: [
                ['react/rename-jsx-to-js', pluginRenameJsxToJs],
            ],
        };
    
    if (isRenameToJs(type))
        return {
            rules: {
                'react/rename-js-to-jsx': ['on', {
                    filename,
                }],
            },
            plugins: [
                ['react/rename-js-to-jsx', pluginRenameJsToJsx],
            ],
        };
    
    return {};
};
