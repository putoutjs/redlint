import {safeAlign} from 'eslint-plugin-putout/config';

const config = {
    ignores: [
        '**/fixture/*.*',
        '**/example',
    ],
};

export default [
    ...safeAlign,
    config,
];
