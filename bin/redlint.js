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

const {stringify, parse} = JSON;

const [arg] = process.argv.slice(2);
let header = true;

await uiLoop(arg);

async function uiLoop(arg) {
    if (!arg) {
        const cmd = await choose();
        
        if (!cmd)
            process.exit(1);
        
        [arg] = stripAnsi(cmd).split(' ');
        header = false;
    }
    
    if (arg === 'debug') {
        arg = await debug();
        
        if (arg === 'back')
            return await uiLoop();
    }
    
    if (arg === 'exit')
        process.exit();
    
    if (arg === 'version') {
        const packagePath = new URL('../package.json', import.meta.url);
        const packageData = await readFile(packagePath);
        const {version} = parse(packageData);
        
        console.log(`v${version}`);
        process.exit();
    }
    
    if (arg === 'help') {
        help({
            header,
        });
        process.exit();
    }
    
    console.log('Running:');
    const spinner = ora('index filesystem').start();
    const CWD = process.cwd();
    const result = await buildTree(CWD);
    
    spinner.succeed();
    
    if (arg === 'generate:simple') {
        await writeFile('.filesystem.json', lintJSON(stringify(convertToSimple(result))));
        process.exit(0);
    }
    
    const filesystem = lintJSON(stringify(result));
    
    if (arg === 'scan') {
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
    
    if (arg === 'pack') {
        const result = await masterPack(CWD, filesystem);
        await writeFile(join(CWD, 'filesystem.red'), result);
        const spinner = ora(`pack 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (arg === 'extract') {
        const filesystem = await readFile(join(CWD, 'filesystem.red'), 'utf8');
        await masterExtract(CWD, filesystem);
        const spinner = ora(`extract 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (arg === 'extract:debug') {
        const filesystem = await readFile(join(CWD, 'filesystem.red'), 'utf8');
        await extract(CWD, filesystem);
        const spinner = ora(`extract 'filesystem.red'`).start();
        
        spinner.succeed();
        process.exit();
    }
    
    if (arg === 'pack:debug') {
        const result = pack(CWD, filesystem);
        await writeFile(join(CWD, 'filesystem.red'), result);
        
        done(`pack 'filesystem.red'`);
        process.exit();
    }
    
    if (arg === 'scan:debug') {
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
    
    if (arg === 'fix:debug') {
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
    
    if (arg === 'fix') {
        await masterLint(filesystem, {
            fix: true,
        });
        
        process.exit();
    }
    
    if (arg === 'generate')
        await writeFile('.filesystem.json', filesystem);
    
    done(`generate '.filesystem.json'`);
}

function done(message) {
    const spinner = ora(message).start();
    spinner.succeed();
}
