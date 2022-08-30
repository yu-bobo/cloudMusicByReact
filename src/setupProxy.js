const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://150.158.185.32/mua',
        pathRewrite: {
            "^/api": "/"
        },
        changeOrigin: true,
    }))

};
