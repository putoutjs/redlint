import {diff} from 'jest-diff';
import {parseFiles} from '../view/parse-files/index.js';

const {entries} = Object;

export function compareFiles({transformed, correct}) {
    const output = [];
    
    if (!transformed || !correct)
        return output;
    
    const outputFiles = parseFiles(transformed);
    const correctFiles = parseFiles(correct);
    
    for (const [line, files] of entries(outputFiles)) {
        for (const [name, content] of entries(files)) {
            const correctContent = correctFiles[line][name];
            
            if (correctContent === content)
                continue;
            
            output.push(`## ${name}:${line}\n\n`);
            output.push(doDiff(
                correctContent,
                content,
            ));
        }
    }
    
    return output.join('');
}

const doDiff = (a, b) => {
    let diffed = diff(a, b);
    
    if (diffed.includes('\n'))
        diffed = diffed
            .split('\n')
            .slice(3)
            .join('\n');
    
    return diffed;
};
