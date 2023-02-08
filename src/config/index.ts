/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

if (!argv || argv instanceof Promise) {
  throw new Error('yargs parse failed!');
}

/**
 * 监听端口号
 */
export const port = Number(argv.port || 80);

/**
 * 允许跨域访问的域名列表
 */
export const accessControlAllowOrigin = [
  /.*\..*(?::\d+)?$/uis,
];
