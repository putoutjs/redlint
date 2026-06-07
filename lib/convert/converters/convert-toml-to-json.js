import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertTomlToJson] = pluginFilesystem.rules['convert-toml-to-json'];

export const convertTomlToJson = (filename) => ({
    rules: {
        'filesystem/convert-toml-to-json': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-toml-to-json', pluginConvertTomlToJson],
    ],
});
