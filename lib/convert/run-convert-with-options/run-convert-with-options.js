import {convert as convertFile} from '../convert.js';
import {
    CONVERT_JSON_TO_JS,
    CONVERT_JS_TO_JSON,
    CONVERT_YAML_TO_JSON,
    CONVERT_JSON_TO_YAML,
    CONVERT_TOML_TO_JSON,
    CONVERT_JSON_TO_TOML,
    CONVERT_YAML_TO_TOML,
    CONVERT_TOML_TO_YAML,
} from '../../menu.js';
import {parseConverter} from './parse-converter.js';

const CONVERT_TYPE_MAP = new Map([
    ['json -> js', CONVERT_JSON_TO_JS],
    ['js -> json', CONVERT_JS_TO_JSON],
    ['yaml -> json', CONVERT_YAML_TO_JSON],
    ['json -> yaml', CONVERT_JSON_TO_YAML],
    ['toml -> json', CONVERT_TOML_TO_JSON],
    ['json -> toml', CONVERT_JSON_TO_TOML],
    ['yaml -> toml', CONVERT_YAML_TO_TOML],
    ['toml -> yaml', CONVERT_TOML_TO_YAML],
]);

export const runConvertWithOptions = (filesystem, argOptions, overrides = {}) => {
    const {
        convert: convertFn = convertFile,
    } = overrides;
    
    const [from, to, filename] = parseConverter(argOptions);
    const typeStr = `${from} -> ${to}`;
    const type = CONVERT_TYPE_MAP.get(typeStr);
    
    if (!type)
        return [Error(`Unknown conversion '${typeStr}'`)];
    
    if (!filename)
        return [Error('Filename is required')];
    
    const result = convertFn(filename, type, filesystem);
    
    if (result === filesystem)
        return [Error('No files matched')];
    
    return [null, result];
};
