const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/quickbooks_token/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true
    })
  );

  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true
    })
  );
};
