/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import moment from 'moment';

export const log = (s: string) => {
  console.log(`[${moment().format('YYYY/MM/DD HH:mm:ss')}] ${s}`);
};
