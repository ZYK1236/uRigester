const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                externals: {
                    'vue': 'Vue',
                    'axios': 'axios',
                    'vue-router': 'VueRouter'
                },
                plugins: [
                    new CompressionPlugin({
                        test: /\.js(\?.*)?$/i,
                        threshold: 8192
                    })
                ]
            }
        } else {
            // 为开发环境修改配置...
            return {
                externals: {
                    'vue': 'Vue',
                    'axios': 'axios',
                    'vue-router': 'VueRouter'
                }
            }
        }
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {
            '/api': {
                target: 'https://xdvolunteer.xyz/',  // 后台api
                changeOrigin: true, //是否跨域
                secure: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    lintOnSave: false
}