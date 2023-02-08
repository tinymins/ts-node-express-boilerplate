/**
 * This file is part of tinymin's project.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import type express from 'express';

export type ExpressRequest = Parameters<Parameters<ReturnType<typeof express>['all']>[1]>[0];
export type ExpressResponse = Parameters<Parameters<ReturnType<typeof express>['all']>[1]>[1];
export type ExpressRouterHandler = (req: ExpressRequest, res: ExpressResponse) => void;
