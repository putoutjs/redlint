import enq from 'enquirer';

const {prompt} = enq;

export const askFilename = async () => {
    const [e, result] = await tryToCatch(prompt, {
        type: 'input',
        name: 'filename',
        message: 'filename:',
    });
    
    return result?.filename;
}
