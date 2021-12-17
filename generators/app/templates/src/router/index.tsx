/*
 * @Author: hy
 * @Date: 2021-07-29 11:02:23
 * @LastEditTime: 2021-12-17 13:57:16
 * @LastEditors: hy
 * @Description: router配置
 * @FilePath: /test-template/src/router/index.tsx
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeGift from '../pages/Home/home';
const Router = (props: any) => (
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/" component={HomeGift} exact />
    </Switch>
  </BrowserRouter>
);

export default Router;
