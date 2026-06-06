import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertJsonToJs] = pluginFilesystem.rules['convert-json-to-js'];

export const convertJsonToJs = (filename) => ({
    rules: {
        'filesystem/convert-json-to-js': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-json-to-js', pluginConvertJsonToJs],
    ],
});
