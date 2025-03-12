import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

const config = {
    ignores: [
        '**/fixture/*.*',
        '**/example',
    ],
};

export default defineConfig([safeAlign, config]);
