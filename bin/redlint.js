#!/usr/bin/env node

import {lintJSON} from 'putout/lint/json';
import process from 'node:process';
import {writeFile} from 'node:fs/promises';
import formatterCodeFrame from '@putout/formatter-codeframe';
import ora from 'ora';
import {help} from '../lib/help.js';
import {buildTree} from '../lib/redlint.js';
import {convertToSimple} from '../lib/simple.js';
import {masterLint} from '../lib/master.js';
import {lint} from '../lib/lint.js';

const {stringify} = JSON;

const [arg] = process.argv.slice(2);

if (!arg || arg === 'help') {
    help();
    process.exit();
}

const spinner = ora('index filesystem').start();
const result = await buildTree(process.cwd());

spinner.succeed();

if (arg === 'simple') {
    await writeFile('.filesystem.json', lintJSON(stringify(convertToSimple(result))));
    process.exit(0);
}

const filesystem = lintJSON(stringify(result));

if (arg === 'scan') {
    const result = await masterLint(filesystem, {
        fix: false,
    });
    
    if (!result.length)
        process.exit();
    
    console.error(result);
    process.exit(1);
}

if (arg === 'lint') {
    const result = lint(filesystem, {
        fix: true,
    });
    
    process.stderr.write(result);
    process.exit();
}

if (arg === 'fix') {
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
    
    process.stdout.write(result);
    process.exit();
}

if (arg === 'generate')
    await writeFile('.filesystem.json', filesystem);
