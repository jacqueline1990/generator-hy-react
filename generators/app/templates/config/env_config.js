//针对不同环境的配置。 比如baseUrl。
// 有些也可以直接在代码中用APP_ENV来判断。webpack中有配置DefinePlugin。

//读取package.json中的信息。
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const appPackageJson = require(resolveApp('package.json'));

const test = {
  proxy2: {
    '/*': {
      target: 'http://mobile.test.ximalaya.com',
      changeOrigin: true,
    },
  },
  proxy3: {
    '/*': {
      target: 'http://hybrid.test.ximalaya.com',
      changeOrigin: true,
    },
  },
  proxy: {
    '/*': {
      target: 'http://m.test.ximalaya.com',
      changeOrigin: true,
    },
  },
};

//将实际的暴露出去。
module.exports = test;
