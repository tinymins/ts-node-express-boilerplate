/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import { URL } from 'url';

import * as config from '../config';
import { ExpressRequest } from '../types';

export const makeCORSOrigin = (req: ExpressRequest) => {
  let origin = '';
  if (req.headers.referer) {
    try {
      origin = new URL(req.headers.referer).origin;
    } catch {}
  }
  if (origin) {
    const exist = config.accessControlAllowOrigin.some((s) => {
      if (typeof s === 'string') {
        return s === origin;
      }
      s.lastIndex = 0;
      return s.test(origin);
    });
    if (exist) {
      return origin;
    }
  }
  return '';
};
