import {choose as chooseDialog} from '@putout/cli-choose';

import {
    CONVERT_JS_TO_JSON,
    CONVERT_JSON_TO_JS,
    BACK,
    EXIT,
} from '../menu.js';

export * from './convert.js';

export const chooseConvert = async () => {
    const command = await chooseDialog('Convert:', [
        CONVERT_JS_TO_JSON,
        CONVERT_JSON_TO_JS,
        BACK,
        EXIT,
    ]);
    
    return command;
};
