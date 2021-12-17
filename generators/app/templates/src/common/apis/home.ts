/*
 * @Author: hy
 * @Date: 2021-12-16 17:57:00
 * @LastEditTime: 2021-12-16 17:59:29
 * @LastEditors: Please set LastEditors
 * @Description: 请求fn
 * @FilePath: /test-template/src/common/apis/home.ts
 */
import fetch from './fetch';
import { Api } from './config';

function queryTest() {
  return fetch({
    url: Api.testpath,
    tip: false,
  });
}

export { queryTest };
