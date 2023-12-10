#!/usr/bin/env node

import {lintJSON} from 'putout/lint/json';
import process from 'node:process';
import {writeFile} from 'node:fs/promises';
import {buildTree} from '../lib/redlint.js';
import {convertToSimple} from '../lib/simple.js';

const {stringify} = JSON;
const result = await buildTree(process.cwd());
const filesystem = lintJSON(stringify(result));
const [arg] = process.argv.slice(2);

if (arg === 'simple') {
    await writeFile('.filesystem.json', convertToSimple(filesystem));
    process.exit(0);
}

await writeFile('.filesystem.json', filesystem);
