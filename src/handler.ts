/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import { URL } from 'url';

import { ExpressRouterHandler } from './types';
import { findRequestFile, httpRootPath, sendFile } from './utils/http';

const handler: ExpressRouterHandler = (req, res) => {
  try {
    const url = `${req.protocol}://${req.hostname}${req.url}`;
    const relativePath = new URL(url).pathname || '';

    // local files
    const absolutePath = findRequestFile(httpRootPath, relativePath);
    if (absolutePath) {
      if (absolutePath.endsWith('.ts')) {
        try {
          const proc = require(absolutePath);
          proc.default(req, res);
        } catch (error) {
          try {
            res.send(error instanceof Error ? error.message : String(error));
            res.end();
          } catch {
            console.error(error);
          }
        }

        return;
      }
      sendFile(res, absolutePath);
      return;
    }

    // not found
    res.status(404);
    res.end();
  } catch (error) {
    console.error(error);
  }
};

export default handler;
