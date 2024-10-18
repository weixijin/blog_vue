const path = require('path')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 每次打包的版本
const version = new Date().getTime()

// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 本地环境是否需要使用cdn
const devNeedCdn = process.env.NODE_ENV !== 'development' ? false : true
// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        marked: 'marked',
        nprogress: 'NProgress',
        axios: 'axios',
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
        isProduction?'https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.min.js':'https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.min.js',
        'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
        'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    ],
    // js: [
    //     'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    //     'https://image.zlketang.com/public/news/others/js/vuex.min.js',
    //     'https://image.zlketang.com/public/news/others/js/vue-router.min.js',
    //     'https://image.zlketang.com/public/news/others/js/axios.min.js',
    // ],
}

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: './',
    productionSourceMap: false, //不输出map文件 ---false

    devServer: {
        hot: true,
        open: true,
        port: 3999,
        host: '127.0.0.1',
        proxy: {
            '/api': {
                //以/api开头的都会被代理
                target: 'http://139.9.210.43:5000', //需要代理的目标
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '', // 这里用‘/api’代替target里面的地址，组件中调用接口时直接用api代替 比如我要调用'http://xxx.com:8080/api/NEWS/getNews.json?page=1&pageSize=10'，直接写‘/api/NEWS/getNews.json?page=1&pageSize=10’即可
                },
            }
        },
    },

    // css 样式分离
    css: {
        // 打包编译后的 文件名称  【模块名称.版本号.时间戳】
        extract: {
            // 修改打包后css文件名   // css打包文件，添加时间戳
            filename: `css/[name].${version}.css`,
            chunkFilename: `css/[name].${version}.css`,
        },
    },

    chainWebpack: (config) => {
        // scss

        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach((item) => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // 全局变量文件路径，只有一个时可将数组省去
                    resources: ['./src/mixins/style/constant.scss','./src/assets/css/constant.scss'],
                })
                .end()
        })

        // ============注入cdn start============
        config.plugin('html').tap((args) => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============

        // ============压缩图片 start============
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true,
            })
            .end()
        // ============压缩图片 end============
    },
    configureWebpack: (config) => {
        // 打包编译后的 文件名称  【模块名称.版本号.时间戳】
        output: {
            filename: `js/[name].[chunkhash].${version}.js`
            chunkFilename: `js/[id].[chunkhash].${version}.js`
        }

        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals

        // 代码压缩
        if (isProduction) {
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        // 删除注释
                        output: {
                            comments: false,
                        },

                        //生产环境自动删除console
                        compress: {
                            drop_debugger: true,
                            drop_console: true,
                            pure_funcs: ['console.log'],
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                }),
            )
        }

        // 公共代码抽离
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100,
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60,
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    runtimeChunk: {
                        name: 'manifest',
                    },
                },
            },
        }

        // gzip 开启
        if (isProduction) {
            //gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false, // 删除原文件
                }),
            )
        }
    },
}
