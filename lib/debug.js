import {choose as chooseDialog} from '@putout/cli-choose';

export const debug = async () => {
    const command = await chooseDialog('Debug:', [
        'scan:debug',
        'fix:debug',
        'pack:debug',
        'back',
        'exit',
    ]);
    
    console.log('');
    
    return command;
};
