import {extend} from 'supertape';
import * as strip from '@supertape/operator-strip';

export {stub} from 'supertape';

export const test = extend(strip);
