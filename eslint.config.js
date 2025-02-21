import {safeAlign} from 'eslint-plugin-putout';
import {createESLintConfig} from '@putout/eslint-flat';

const config = {
    ignores: [
        '**/fixture/*.*',
        '**/example',
    ],
};

export default createESLintConfig([safeAlign, config]);
