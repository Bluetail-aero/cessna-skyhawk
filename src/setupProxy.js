const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
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
