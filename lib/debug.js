import {choose as chooseDialog} from '@putout/cli-choose';

export const debug = async () => {
    console.log('Debug:');
    
    const command = await chooseDialog('Command:', ['scan:debug', 'pack:debug', 'exit']);
    
    console.log('');
    
    return command;
};
