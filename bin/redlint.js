#!/usr/bin/env node

import {lintJSON} from 'putout/lint/json';
import process from 'node:process';
import {writeFile} from 'node:fs/promises';
import stripAnsi from 'strip-ansi';
import formatterCodeFrame from '@putout/formatter-codeframe';
import formatterDump from '@putout/formatter-dump';
import ora from 'ora';
import {help} from '../lib/help.js';
import {start} from '../lib/start.js';
import {buildTree} from '../lib/redlint.js';
import {convertToSimple} from '../lib/simple.js';
import {masterLint} from '../lib/master.js';
import {lint} from '../lib/lint.js';
import {logo} from '../lib/logo.js';

const {stringify} = JSON;

let [arg] = process.argv.slice(2);
let header = true;

if (!arg) {
    const cmd = await start();
    
    if (!cmd)
        process.exit(1);
    
    [arg] = stripAnsi(cmd).split(' ');
    header = false;
}

if (arg === 'help') {
    help({
        header,
    });
    process.exit();
}

console.log('Running:');
const spinner = ora('index filesystem').start();
const result = await buildTree(process.cwd());

spinner.succeed();

if (arg === 'simple') {
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

if (arg === 'scan:frame') {
    const places = await masterLint(filesystem, {
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
    
    process.stderr.write(result);
    process.exit(1);
}

if (arg === 'lint') {
    const places = lint(filesystem, {
        fix: true,
    });
    
    console.log(logo);
    
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

if (arg === 'fix') {
    await masterLint(filesystem, {
        fix: true,
    });
    
    process.exit();
}

if (arg === 'generate')
    await writeFile('.filesystem.json', filesystem);
