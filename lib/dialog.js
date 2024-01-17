import enq from 'enquirer';
import tryToCatch from 'try-to-catch';

const {prompt} = enq;

export const askFilename = async () => {
    const [, result] = await tryToCatch(prompt, {
        type: 'input',
        name: 'filename',
        message: 'filename:',
    });
    
    return result?.filename;
};
