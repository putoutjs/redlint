import {lintJSON} from 'putout/lint/json';
import process from 'node:process';
import {writeFile} from 'node:fs/promises';
import {buildTree} from '../lib/redlint.js';

const {stringify} = JSON;
const result = await buildTree(process.cwd());
const filesystem = lintJSON(stringify(result));

await writeFile('.filesystem.json', filesystem);
