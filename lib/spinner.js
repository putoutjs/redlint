import ora from 'ora';
import chalk from 'chalk';

export function setStart(rule, store) {
    const shortRule = rule.replace('/', ': ');
    const spinner = ora(shortRule).start();
    
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
