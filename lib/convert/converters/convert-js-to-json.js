import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertJsToJson] = pluginFilesystem.rules['convert-js-to-json'];

export const convertJSToJson = (filename) => ({
    rules: {
        'filesystem/convert-js-to-json': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-js-to-json', pluginConvertJsToJson],
    ],
});
