import {askFilename} from '../dialog.js';
import {isConvertRCToFlat} from '../menu.js';
import {masterConvert} from './master.js';

export const runConvert = async (arg, filesystem, overrides = {}) => {
    const {
        askFilename: getFilename = askFilename,
        convert = masterConvert,
        isRCToFlat = isConvertRCToFlat,
    } = overrides;
    
    let filename = '.eslintrc.json';
    
    if (!isRCToFlat(arg))
        filename = await getFilename();
    
    if (filename)
        return await convert(filename, arg, filesystem);
};
