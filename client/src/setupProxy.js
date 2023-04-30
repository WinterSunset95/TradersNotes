const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost/TradersNotes/api/v1/endpoints/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
