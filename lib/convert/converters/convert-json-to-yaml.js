import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertJsonToYaml] = pluginFilesystem.rules['convert-json-to-yaml'];

export const convertJsonToYaml = (filename) => ({
    rules: {
        'filesystem/convert-json-to-yaml': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-json-to-yaml', pluginConvertJsonToYaml],
    ],
});
