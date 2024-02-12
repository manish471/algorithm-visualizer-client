const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'https://algorithm-visualizer-server.onrender.com',
      changeOrigin: true,
    })
  );
};