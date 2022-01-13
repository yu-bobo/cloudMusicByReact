const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://150.158.185.32:4000',
        pathRewrite: {
            "^/api": "/"
        },
        changeOrigin: true,
    }))

};