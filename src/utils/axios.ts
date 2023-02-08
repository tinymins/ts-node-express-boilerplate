/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import Axios, { AxiosRequestConfig } from 'axios';
import createHttpProxyAgent from 'http-proxy-agent';
import createHttpsProxyAgent from 'https-proxy-agent';
import createSocksProxyAgent from 'socks-proxy-agent';

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

export default axios;
