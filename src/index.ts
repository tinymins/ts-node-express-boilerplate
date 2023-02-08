/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';

import * as config from './config';
import defaultHandler from './handler';
import { makeCORSOrigin } from './utils/cors';
import { log } from './utils/log';
import statusHandler from './wwwroot/status';

// show configure
log('-'.repeat(45));
log('TypeScript Node Express Project');
log('-'.repeat(45));
log(`Port: ${config.port}`);
log('-'.repeat(45));
log('Access Control Allow Origin:');
config.accessControlAllowOrigin.map(s => String(s)).forEach(s => log(s));
log('-'.repeat(45));

// express body decoders
const app = express();
app.use(cookieParser());
app.use(compression());
app.use(express.raw({ type: '*/*', limit: '102400kb' }));
app.use((req, res, next) => {
  const origin = makeCORSOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});

// register handlers
app.all('/status', statusHandler);
app.all('*', defaultHandler);

// start listen
app.listen(config.port, '0.0.0.0', () => {
  log(`Running at http://127.0.0.1:${config.port}`);
});
