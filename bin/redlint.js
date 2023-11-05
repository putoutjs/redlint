import process from 'node:process';
import {writeFile} from 'node:fs/promises';
import {buildTree} from '../lib/redlint.js';

const result = await buildTree(process.cwd());
const filesystem = JSON.stringify(result, null, 4) + '\n';

await writeFile('.filesystem.json', filesystem);
