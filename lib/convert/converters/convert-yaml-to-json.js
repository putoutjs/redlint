import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertYamlToJson] = pluginFilesystem.rules['convert-yaml-to-json'];

export const convertYamlToJson = (filename) => ({
    rules: {
        'filesystem/convert-yaml-to-json': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-yaml-to-json', pluginConvertYamlToJson],
    ],
});
