const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    '/oauth',
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
    }),
  );

  app.use(
    '/documents',
    createProxyMiddleware({
      target: 'http://localhost:3004',
      changeOrigin: true,
    }),
  );
};
