/*
 * @Author: your name
 * @Date: 2021-07-29 11:02:23
 * @LastEditTime: 2021-12-04 10:03:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /test-template/src/index.tsx
 */
/* eslint-disable comma-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import Router from './router';

import './common/styles/index.scss';

const root = document.getElementById('root') as any;
// if (root.hasChildNodes()) {
//   ReactDOM.hydrate(<Router />, root);
// } else {
ReactDOM.render(<Router />, root);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
