const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api',{
        target:'http://chst.vip:666',
        pathRewrite: {
            "^/api": "/"
        },
        changeOrigin: true
    }))

};