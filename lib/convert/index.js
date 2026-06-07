import {choose as chooseDialog} from '@putout/cli-choose';
import {
    CONVERT_JS_TO_JSON,
    CONVERT_JSON_TO_JS,
    BACK,
    EXIT,
    CONVERT_RC_TO_FLAT,
    CONVERT_YAML_TO_JSON,
    CONVERT_JSON_TO_YAML,
    CONVERT_TOML_TO_JSON,
} from '../menu.js';

export * from './convert.js';
export const chooseConvert = async () => {
    const command = await chooseDialog('Convert:', [
        CONVERT_JS_TO_JSON,
        CONVERT_JSON_TO_JS,
        CONVERT_YAML_TO_JSON,
        CONVERT_JSON_TO_YAML,
        CONVERT_TOML_TO_JSON,
        CONVERT_RC_TO_FLAT,
        BACK,
        EXIT,
    ]);
    
    return command;
};
