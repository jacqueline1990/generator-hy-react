/*
 * @Author: hy
 * @Date: 2021-07-29 11:02:23
 * @LastEditTime: 2021-12-17 14:16:43
 * @LastEditors: Please set LastEditors
 * @Description: api config
 * @FilePath: /test-template/src/common/apis/config.js
 */
import { env } from '../utils/env';

// const API_TEST = '测试环境地址';
// const API_UAT = 'uat地址';
// const API_PRODUCT = '线上地址';
const orginPath = 'http://xxx/';

const API = env.isDev ? '/proxy/' : orginPath;

export const Api = {
  testpath: `${API}testpath`,
};
