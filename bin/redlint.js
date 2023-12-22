#!/usr/bin/env node

import {join} from 'node:path';
import process from 'node:process';
import {
    readFile,
    writeFile,
} from 'node:fs/promises';
import {lintJSON} from 'putout/lint/json';
import stripAnsi from 'strip-ansi';
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

    
import {
    version} from '../lib/cli/version.js';

import {
    SCAN,
    SCAN_DEBUG,
    FIX,
    FIX_DEBUG,
    PACK,
    PACK_DEBUG,
    EXTRACT,
    EXTRACT_DEBUG,
    GENERATE,
    GENERATE_SIMPLE,
    HELP,
    VERSION,
    DEBUG,
    EXIT,
} from '../lib/menu.js';
    
const {log} = console;
const {exit} = process;


const {stringify, parse} = JSON;

const [arg] = process.argv.slice(2);
let header = true;

await uiLoop(arg);

async function uiLoop(arg) {
    if (!arg) {
        arg = await choose();
        
        if (!arg)
            process.exit(1);
        
        header = false;
    }
    
    if (arg === DEBUG) {
        arg = await debug();
        
        if (arg === BACK)
            return await uiLoop();
    }
    
    if (arg === EXIT)
        process.exit();
    
    if (arg === VERSION) {
        return version({
            log,
            exit,
            readFile,
        });
    }
    
    if (arg === HELP) {
        help({
            header,
        });
        process.exit();
    }
    
    log('Running:');
    const spinner = ora('index filesystem').start();
    const CWD = process.cwd();
    const result = await buildTree(CWD);
    
    spinner.succeed();
    
    if (arg === GENERATE_SIMPLE) {
        await writeFile('.filesystem.json', lintJSON(stringify(convertToSimple(result))));
        process.exit(0);
    }
    
    const filesystem = lintJSON(stringify(result));
    
    if (arg === SCAN) {
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
            count: places.length,
            filesCount: 1,
            errorsCount: places.length,
        });
        
        process.stderr.write(dump);
        
        process.exit(1);
    }
    
    if (arg === PACK) {
        const result = await masterPack(CWD, filesystem);
        await writeFile(join(CWD, 'filesystem.red'), result);
        const spinner = ora(`pack 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (arg === EXTRACT) {
        const filesystem = await readFile(join(CWD, 'filesystem.red'), 'utf8');
        await masterExtract(CWD, filesystem);
        const spinner = ora(`extract 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (arg === EXTRACT_DEBUG) {
        const filesystem = await readFile(join(CWD, 'filesystem.red'), 'utf8');
        await extract(CWD, filesystem);
        const spinner = ora(`extract 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (arg === PACK_DEBUG) {
        const result = pack(CWD, filesystem);
        await writeFile(join(CWD, 'filesystem.red'), result);
        
        done(`pack 'filesystem.red'`);
        process.exit();
    }
    
    if (arg === SCAN_DEBUG) {
        const places = lint(filesystem, {
            fix: false,
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
        
        process.stderr.write(result);
        process.exit(1);
    }
    
    if (arg === FIX_DEBUG) {
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
    
    if (arg === FIX) {
        await masterLint(filesystem, {
            fix: true,
        });
        
        process.exit();
    }
    
    if (arg === GENERATE)
        await writeFile('.filesystem.json', filesystem);
    
    done(`generate '.filesystem.json'`);
}

function done(message) {
    const spinner = ora(message).start();
    spinner.succeed();
}
