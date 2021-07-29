/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import fs from 'fs';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import url from 'url';
import Axios, { AxiosRequestConfig } from 'axios';
import createHttpProxyAgent from 'http-proxy-agent';
import createHttpsProxyAgent from 'https-proxy-agent';
import createSocksProxyAgent from 'socks-proxy-agent';
import * as config from '../config';

type ExpressRequest = Parameters<Parameters<ReturnType<typeof express>['all']>[1]>[0];
type ExpressResponse = Parameters<Parameters<ReturnType<typeof express>['all']>[1]>[1];

const rootPath = path.resolve(__dirname, '../');
const distPath = path.join(rootPath, 'wwwroot/');

// express body decoders
const app = express();
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.raw({ type: '*/*', limit: '102400kb' }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// define custom handlers for services proxy
const createProxy = (proxy: string, scheme: string) => {
  if (proxy.startsWith('http://')) {
    return scheme === 'http'
      ? createHttpProxyAgent(proxy)
      : createHttpsProxyAgent(proxy);
  }
  return createSocksProxyAgent(proxy);
};
// build axios config
const axiosConfig: AxiosRequestConfig = {};
// create the socksAgent for axios
let httpProxy = '';
let httpsProxy = '';
Object.entries(process.env).forEach(([k, v]) => {
  if (k && v) {
    if (k.toLowerCase() === 'http_proxy') {
      httpProxy = v;
    } else if (k.toLowerCase() === 'https_proxy') {
      httpsProxy = v;
    }
  }
});
if (!httpsProxy) {
  httpsProxy = httpProxy;
}
if (httpProxy) {
  axiosConfig.httpAgent = createProxy(httpProxy, 'http');
}
if (httpsProxy) {
  axiosConfig.httpsAgent = createProxy(httpsProxy, 'https');
}
// create a new axios instance
const axios = Axios.create(axiosConfig);

// available flag for load balancing
app.all('/status', (req, res) => {
  res.send('It works!');
  res.end();
});

// static dist files
app.get('*', function(req, res) {
  const relpath = url.parse(req.url, true).pathname || '';
  let abspath = path.resolve(path.join(distPath, relpath));
  if (relpath.endsWith('/')) {
    abspath += '/';
  }
  if (!abspath.startsWith(distPath)) {
    res.status(400);
    res.end();
    return;
  }
  if (!abspath.endsWith('/') && fs.existsSync(abspath) && fs.lstatSync(abspath).isFile()) {
    res.sendFile(abspath);
    return;
  }
  abspath = path.join(abspath, 'index.html');
  if (fs.existsSync(abspath) && fs.lstatSync(abspath).isFile()) {
    res.sendFile(abspath);
    return;
  }
  res.status(404);
  res.end();
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Running at http://0.0.0.0:${config.port}`);
});
