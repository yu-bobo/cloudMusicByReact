const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://chst.vip:666',
        pathRewrite: {
            "^/api": "/"
        },
        changeOrigin: true,
        router: {
            // 用于重写目标服务器
            // 当请求的host为150.158.185.32时重写目标服务器为后面的地址
            'http://150.158.185.32/api': 'http://chst.vip:666'
        }
    }))

};