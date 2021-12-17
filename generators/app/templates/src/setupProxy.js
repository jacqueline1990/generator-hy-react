const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/proxy2', {
      target: 'http://mobile.test.ximalaya.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy2': '',
      },
    }),
    proxy('/proxy3', {
      target: 'http://hybrid.test.ximalaya.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy3': '',
      },
    }),
    proxy('/proxy', {
      target: 'http://m.test.ximalaya.com',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '',
      },
    }),
  );
};
