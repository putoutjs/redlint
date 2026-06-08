import {
    CONVERT_JS_TO_JSON,
    CONVERT_JSON_TO_JS,
    CONVERT_JSON_TO_JS_DEBUG,
    CONVERT_JS_TO_JSON_DEBUG,
    CONVERT_YAML_TO_JSON,
    CONVERT_YAML_TO_JSON_DEBUG,
    CONVERT_JSON_TO_YAML,
    CONVERT_JSON_TO_YAML_DEBUG,
    CONVERT_TOML_TO_JSON,
    CONVERT_TOML_TO_JSON_DEBUG,
    CONVERT_JSON_TO_TOML,
    CONVERT_JSON_TO_TOML_DEBUG,
    CONVERT_YAML_TO_TOML,
    CONVERT_YAML_TO_TOML_DEBUG,
    CONVERT_TOML_TO_YAML,
    CONVERT_TOML_TO_YAML_DEBUG,
    CONVERT_RC_TO_FLAT,
} from '../menu.js';
import {convertYamlToJson} from './converters/convert-yaml-to-json.js';
import {convertJsonToYaml} from './converters/convert-json-to-yaml.js';
import {convertJsonToJs} from './converters/convert-json-to-js.js';
import {convertJSToJson} from './converters/convert-js-to-json.js';
import {convertTomlToJson} from './converters/convert-toml-to-json.js';
import {convertJsonToToml} from './converters/convert-json-to-toml.js';
import {convertTomlToYaml} from './converters/convert-toml-to-yaml.js';
import {convertYamlToToml} from './converters/convert-yaml-to-toml.js';
import {convertRCToFlat} from './converters/convert-rc-to-flat.js';

const CONVERTERS = {
    [CONVERT_JSON_TO_JS]: convertJsonToJs,
    [CONVERT_JSON_TO_JS_DEBUG]: convertJsonToJs,
    [CONVERT_JS_TO_JSON]: convertJSToJson,
    [CONVERT_JS_TO_JSON_DEBUG]: convertJSToJson,
    [CONVERT_YAML_TO_JSON]: convertYamlToJson,
    [CONVERT_YAML_TO_JSON_DEBUG]: convertYamlToJson,
    [CONVERT_JSON_TO_YAML]: convertJsonToYaml,
    [CONVERT_JSON_TO_YAML_DEBUG]: convertJsonToYaml,
    [CONVERT_TOML_TO_JSON]: convertTomlToJson,
    [CONVERT_TOML_TO_JSON_DEBUG]: convertTomlToJson,
    [CONVERT_JSON_TO_TOML]: convertJsonToToml,
    [CONVERT_JSON_TO_TOML_DEBUG]: convertJsonToToml,
    [CONVERT_YAML_TO_TOML]: convertYamlToToml,
    [CONVERT_YAML_TO_TOML_DEBUG]: convertYamlToToml,
    [CONVERT_TOML_TO_YAML]: convertTomlToYaml,
    [CONVERT_TOML_TO_YAML_DEBUG]: convertTomlToYaml,
    [CONVERT_RC_TO_FLAT]: convertRCToFlat,
};

export const createOptions = (filename, type) => {
    const converter = CONVERTERS[type];
    
    if (!converter)
        return {};
    
    return converter(filename);
};
