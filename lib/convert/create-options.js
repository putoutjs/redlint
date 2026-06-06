import * as pluginFilesystem from '@putout/plugin-filesystem';
import * as pluginESLint from '@putout/plugin-eslint';
import {
    CONVERT_JS_TO_JSON,
    CONVERT_JSON_TO_JS,
    CONVERT_JSON_TO_JS_DEBUG,
    CONVERT_JS_TO_JSON_DEBUG,
    CONVERT_YAML_TO_JSON,
    CONVERT_YAML_TO_JSON_DEBUG,
    CONVERT_RC_TO_FLAT,
} from '../menu.js';
import {convertYamlToJson} from './converters/convert-yaml-to-json.js';

const [, pluginConvertJsonToJs] = pluginFilesystem.rules['convert-json-to-js'];
const [, pluginConvertJsToJson] = pluginFilesystem.rules['convert-js-to-json'];
const [, pluginConvertRCToFlat] = pluginESLint.rules['convert-rc-to-flat'];

const CONVERTERS = {
    [CONVERT_JSON_TO_JS]: convertJsonToJs,
    [CONVERT_JSON_TO_JS_DEBUG]: convertJsonToJs,
    [CONVERT_JS_TO_JSON]: convertJSToJson,
    [CONVERT_JS_TO_JSON_DEBUG]: convertJSToJson,
    [CONVERT_YAML_TO_JSON]: convertYamlToJson,
    [CONVERT_YAML_TO_JSON_DEBUG]: convertYamlToJson,
    [CONVERT_RC_TO_FLAT]: convertRCToFlat,
};

export const createOptions = (filename, type) => {
    const converter = CONVERTERS[type];
    
    if (!converter)
        return {};
    
    return converter(filename);
};

function convertRCToFlat() {
    return {
        rules: {
            'eslint/convert-rc-to-flat': 'on',
        },
        plugins: [
            ['eslint/convert-rc-to-flat', pluginConvertRCToFlat],
        ],
    };
}

function convertJsonToJs(filename) {
    return {
        rules: {
            'filesystem/convert-json-to-js': ['on', {
                filename,
            }],
        },
        plugins: [
            ['filesystem/convert-json-to-js', pluginConvertJsonToJs],
        ],
    };
}

function convertJSToJson(filename) {
    return {
        rules: {
            'filesystem/convert-js-to-json': ['on', {
                filename,
            }],
        },
        plugins: [
            ['filesystem/convert-js-to-json', pluginConvertJsToJson],
        ],
    };
}
