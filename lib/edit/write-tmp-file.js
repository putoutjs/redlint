import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {
    mkdtempSync,
    writeFileSync,
    rmSync,
} from 'node:fs';

const createRemoveTmpFile = (tmpDir, removeDirectory) => () => {
    removeDirectory(tmpDir, {
        recursive: true,
    });
};

export const writeTmpFile = (content, overrides = {}) => {
    const {
        createTmpDirectory = mkdtempSync,
        writeFileContent = writeFileSync,
        generateTmpName = tmpdir,
        removeDirectory = rmSync,
    } = overrides;
    
    const tmpDir = createTmpDirectory(join(generateTmpName(), 'redlint-'));
    const tmpFile = join(tmpDir, 'edit.tmp');
    
    writeFileContent(tmpFile, content);
    
    const removeTmpFile = createRemoveTmpFile(tmpDir, removeDirectory);
    
    return [tmpFile, removeTmpFile];
};
