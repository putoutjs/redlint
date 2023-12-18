#!/usr/bin/env node

import {lintJSON} from 'putout/lint/json';
import process from 'node:process';
import {writeFile} from 'node:fs/promises';
import ora from 'ora';
import logo from '../lib/logo.js';
import {buildTree} from '../lib/redlint.js';
import {convertToSimple} from '../lib/simple.js';
import {masterLint} from '../lib/master.js';
import {lint} from '../lib/lint.js';

const {stringify} = JSON;

const [arg] = process.argv.slice(2);

if (arg === 'help') {
    logo();
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
    
    console.log(result);
    process.exit();
}

if (arg === 'lint') {
    const result = lint(filesystem, {
        fix: true,
    });
    
    console.log(result);
    process.exit();
}

if (arg === 'fix') {
    const result = await masterLint(filesystem, {
        fix: true,
    });
    console.log(result);
    process.exit();
}

await writeFile('.filesystem.json', filesystem);
