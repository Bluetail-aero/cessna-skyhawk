const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '*localhost:3005*',
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
    }),
  );

  app.use(
    '*localhost:3004*',
    createProxyMiddleware({
      target: 'http://localhost:3004',
      changeOrigin: true,
    }),
  );
};
