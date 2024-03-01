import ora from 'ora';
import chalk from 'chalk';
import {isCI} from 'ci-info';

export function setStart(rule, store) {
    const text = rule.replace('/', ': ');
    const spinner = ora(text).start();
    
    spinner.suffixText = '';
    
    store({
        rule,
        count: 0,
        spinner,
    });
}

export function setPush(store) {
    const {
        rule,
        count,
        spinner,
    } = store();
    
    store({
        rule,
        count: count + 1,
        spinner,
    });
}

export function setFail(store) {
    const {
        rule,
        count,
        spinner,
    } = store();
    
    spinner.suffixText = chalk.red(count);
    spinner.fail();
    
    store({
        rule,
        count,
        spinner,
    });
}

export function setSuffixText(store, {percent}) {
    const {spinner} = store();
    
    spinner.suffixText = percent;
}

export function setSuccess(store) {
    const {spinner} = store();
    
    if (!isCI)
        spinner.succeed();
    
    spinner.suffixText = '';
    
    store({
        ...store(),
        spinner: null,
    });
}

export function setEnd(data, resolve) {
    resolve(data);
}
