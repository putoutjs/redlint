import * as pluginESLint from '@putout/plugin-eslint';

const [, pluginConvertRCToFlat] = pluginESLint.rules['convert-rc-to-flat'];

export const convertRCToFlat = () => ({
    rules: {
        'eslint/convert-rc-to-flat': 'on',
    },
    plugins: [
        ['eslint/convert-rc-to-flat', pluginConvertRCToFlat],
    ],
});
