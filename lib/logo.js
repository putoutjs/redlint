import chalk from 'chalk';
import process from 'node:process';

/*
console.log(`
${chalk.red('██████  ███████ ██████ ')} ${chalk.white('██      ██ ███    ██ ████████ ')}
${chalk.red('██   ██ ██      ██   ██')} ${chalk.white('██      ██ ████   ██    ██    ')}
${chalk.red('██████  █████   ██   ██')} ${chalk.white('██      ██ ██ ██  ██    ██    ')}
${chalk.red('██   ██ ██      ██   ██')} ${chalk.white('██      ██ ██  ██ ██    ██    ')}
${chalk.red('██   ██ ███████ ██████ ')} ${chalk.white('███████ ██ ██   ████    ██    ')}
`);
*/
export default () => process.stdout.write(`
${chalk.red('██████  ███████ ██████ ')} ██      ██ ███    ██ ████████ 
${chalk.red('██   ██ ██      ██   ██')} ██      ██ ████   ██    ██    
${chalk.red('██████  █████   ██   ██')} ██      ██ ██ ██  ██    ██    
${chalk.red('██   ██ ██      ██   ██')} ██      ██ ██  ██ ██    ██    
${chalk.red('██   ██ ███████ ██████ ')} ███████ ██ ██   ████    ██    
`.slice(1));
