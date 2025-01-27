import {choose as chooseDialog} from '@putout/cli-choose';
import {
    RENAME_JS_TO_JSX,
    RENAME_JSX_TO_JS,
    BACK,
    EXIT,
} from '../menu.js';

export * from './rename.js';
export const chooseRename = async () => {
    const command = await chooseDialog('Rename:', [
        RENAME_JS_TO_JSX,
        RENAME_JSX_TO_JS,
        BACK,
        EXIT,
    ]);
    
    return command;
};
