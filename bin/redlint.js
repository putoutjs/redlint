#!/usr/bin/env node

import {join} from 'node:path';
import process from 'node:process';
import {
    readFile,
    writeFile,
} from 'node:fs/promises';
import {lintJSON} from 'putout/lint/json';
import formatterCodeFrame from '@putout/formatter-codeframe';
import formatterDump from '@putout/formatter-dump';
import ora from 'ora';
import {help} from '../lib/help/help.js';
import {choose} from '../lib/choose.js';
import {buildTree} from '../lib/redlint.js';
import {convertToSimple} from '../lib/simple.js';
import {masterLint} from '../lib/lint/master.js';
import {masterPack} from '../lib/pack/master.js';
import {masterExtract} from '../lib/extract/master.js';
import {lint} from '../lib/lint/lint.js';
import {pack} from '../lib/pack/pack.js';
import {extract} from '../lib/extract/extract.js';
import {debug} from '../lib/debug.js';
import {logo} from '../lib/help/logo.js';
import {version} from '../lib/cli/version.js';
import {chooseConvert} from '../lib/convert/index.js';
import {convert} from '../lib/convert/convert.js';
import {masterConvert} from '../lib/convert/master.js';
import {askFilename} from '../lib/dialog.js';
import {
    isScan,
    isScanDebug,
    isFix,
    isFixDebug,
    isPack,
    isPackDebug,
    isExtract,
    isExtractDebug,
    isGenerate,
    isGenerateSimple,
    isHelp,
    isVersion,
    isDebug,
    isConvert,
    isConvertChosen,
    isConvertChosenDebug,
    isBack,
    isExit,
} from '../lib/menu.js';

const {log} = console;
const {exit} = process;

const {stringify} = JSON;

const [arg] = process.argv.slice(2);
let header = true;

await uiLoop(arg);

async function uiLoop(arg) {
    if (!arg) {
        if (header) {
            console.log('Lint your files according to 🐊Putout rules.\n');
            process.stdout.write(logo);
            console.log('');
        }
        
        arg = await choose();
        
        if (!arg)
            process.exit(1);
        
        header = false;
    }
    
    if (isVersion(arg))
        return version({
            log,
            exit,
            readFile,
        });
    
    if (isHelp(arg)) {
        help({
            header,
        });
        return process.exit();
    }
    
    if (isConvert(arg))
        arg = await chooseConvert();
    
    if (isDebug(arg))
        arg = await debug();
    
    if (isBack(arg))
        return await uiLoop();
    
    if (isExit(arg))
        return process.exit();
    
    if (!arg)
        return;
    
    log('Running:');
    const spinner = ora('index filesystem').start();
    const CWD = process.cwd();
    const result = await buildTree(CWD);
    
    spinner.succeed();
    
    if (isGenerateSimple(arg)) {
        await writeFile('.filesystem.json', lintJSON(stringify(convertToSimple(result))));
        process.exit(0);
    }
    
    const filesystem = lintJSON(stringify(result));
    
    if (isConvertChosen(arg)) {
        const filename = await askFilename();
        
        if (filename)
            await masterConvert(result.filename, arg, filesystem);
        
        return;
    }
    
    if (isConvertChosenDebug(arg)) {
        const filename = await askFilename();
        
        if (filename)
            await convert(filename, arg, filesystem);
        
        return;
    }
    
    if (isScan(arg)) {
        const places = await masterLint(filesystem, {
            fix: false,
        });
        
        if (!places.length)
            process.exit();
        
        console.log('');
        
        const dump = await formatterDump({
            name: '.filesystem.json',
            source: filesystem,
            places,
            index: 0,
            count: 1,
            filesCount: 1,
            errorsCount: places.length,
        });
        
        process.stderr.write(dump);
        process.exit(1);
    }
    
    if (isPack(arg)) {
        const result = await masterPack(CWD, filesystem);
        await writeFile(join(CWD, 'filesystem.red'), result);
        const spinner = ora(`pack 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (isExtract(arg)) {
        const filesystem = await readFile(join(CWD, 'filesystem.red'), 'utf8');
        await masterExtract(CWD, filesystem);
        const spinner = ora(`extract 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (isExtractDebug(arg)) {
        const filesystem = await readFile(join(CWD, 'filesystem.red'), 'utf8');
        await extract(CWD, filesystem);
        const spinner = ora(`extract 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (isPackDebug(arg)) {
        const result = pack(CWD, filesystem);
        await writeFile(join(CWD, 'filesystem.red'), result);
        
        done(`pack 'filesystem.red'`);
        process.exit();
    }
    
    if (isScanDebug(arg)) {
        const places = await lint(filesystem, {
            fix: false,
        });
        
        const result = await formatterCodeFrame({
            name: '.filesystem.json',
            source: filesystem,
            places,
            index: 0,
            count: 1,
            filesCount: 1,
            errorsCount: places.length,
        });
        
        process.stderr.write(result);
        process.exit(1);
    }
    
    if (isFixDebug(arg)) {
        const places = lint(filesystem, {
            fix: true,
        });
        
        const result = await formatterCodeFrame({
            name: '.filesystem.json',
            source: filesystem,
            places,
            index: 0,
            count: places.length,
            filesCount: 1,
            errorsCount: places.length,
        });
        
        process.stdout.write(result);
        process.exit();
    }
    
    if (isFix(arg)) {
        await masterLint(filesystem, {
            fix: true,
        });
        
        process.exit();
    }
    
    if (isGenerate(arg))
        await writeFile('.filesystem.json', filesystem);
    
    done(`generate '.filesystem.json'`);
}

function done(message) {
    const spinner = ora(message).start();
    spinner.succeed();
}
