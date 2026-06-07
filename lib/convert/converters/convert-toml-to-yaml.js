import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertTomlToYaml] = pluginFilesystem.rules['convert-toml-to-yaml'];

export const convertTomlToYaml = (filename) => ({
    rules: {
        'filesystem/convert-toml-to-yaml': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-toml-to-yaml', pluginConvertTomlToYaml],
    ],
});
