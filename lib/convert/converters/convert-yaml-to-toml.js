import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertYamlToToml] = pluginFilesystem.rules['convert-yaml-to-toml'];

export const convertYamlToToml = (filename) => ({
    rules: {
        'filesystem/convert-yaml-to-toml': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-yaml-to-toml', pluginConvertYamlToToml],
    ],
});
