import {choose as chooseDialog} from '@putout/cli-choose';
import {
    SCAN_DEBUG,
    PACK_DEBUG,
    FIX_DEBUG,
    CONVERT_JS_TO_JSON_DEBUG,
    CONVERT_JSON_TO_JS_DEBUG,
    RENAME_JS_TO_JSX_DEBUG,
    BACK,
    EXIT,
    BUNDLE_DEBUG,
} from './menu.js';

export const debug = async () => {
    const command = await chooseDialog('Debug:', [
        SCAN_DEBUG,
        FIX_DEBUG,
        PACK_DEBUG,
        CONVERT_JS_TO_JSON_DEBUG,
        CONVERT_JSON_TO_JS_DEBUG,
        RENAME_JS_TO_JSX_DEBUG,
        RENAME_JS_TO_JSX_DEBUG,
        BUNDLE_DEBUG,
        BACK,
        EXIT,
    ]);
    
    console.log('');
    
    return command;
};
