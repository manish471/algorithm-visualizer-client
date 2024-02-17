const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'https://algoviseasy.vercel.app',
      changeOrigin: true,
    })
  );
};