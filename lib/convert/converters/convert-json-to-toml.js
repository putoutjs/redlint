import * as pluginFilesystem from '@putout/plugin-filesystem';

const [, pluginConvertJsonToToml] = pluginFilesystem.rules['convert-json-to-toml'];

export const convertJsonToToml = (filename) => ({
    rules: {
        'filesystem/convert-json-to-toml': ['on', {
            filename,
        }],
    },
    plugins: [
        ['filesystem/convert-json-to-toml', pluginConvertJsonToToml],
    ],
});
