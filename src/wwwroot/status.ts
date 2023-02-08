/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import { ExpressRouterHandler } from '../types';

// available flag for load balancing
const handler: ExpressRouterHandler = (req, res) => {
  res.send('It works!');
  res.end();
};

export default handler;
