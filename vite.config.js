import { createVuePlugin } from 'vite-plugin-vue2'
// 分析打包体积
import { visualizer } from 'rollup-plugin-visualizer'
// 注册全局
import externalGlobals from 'rollup-plugin-external-globals'
const path = require('path')

export default ({ command, mode }) => {
    // 打包项目名称
    const project = process.env.VITE_APP_PROJECT
    let common = {
        plugins: [
            createVuePlugin(),
            {
                name: 'index-on-error',
                transformIndexHtml(html) {
                  return html.replace(
                    /\/static\/index.(\w+).js"/g,
                    function (match, hashValue) {
                      return (
                        match + ' onerror="handleIndexScriptError(\'' + hashValue + '\')"'
                      )
                    }
                  )
                },
              }
            // 打包分析
            // visualizer({
            //     emitFile: true, //是否被触摸
            //     filename: 'test.html', //生成分析网页文件名
            //     open: true, //在默认用户代理中打开生成的文件
            //     gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
            //     brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
            // }),
        ],
        base: './',
        build: {
            outDir: `./dist/${project ? project + '/' : ''}`,
            assetsDir: 'static',
            rollupOptions: {
                external: ['vue', 'element-ui'],
                plugins: [
                    externalGlobals({
                        vue: 'Vue',
                        'element-ui': 'ElementUI',
                    }),
                ],
            },
        },
        resolve: {
            // 可以不用写后缀的文件
            extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
            // 配置别名
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            host: '0.0.0.0',
            open: true,
            // proxy: {
            //     '/api': {
            //         target: 'http://139.9.210.43:5000',
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/api/, ''),
            //     },
            //     '/zl': {
            //         target: 'http://edu.zlketang.com',
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/zl/, ''),
            //     },
            // },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // 配置全局变量
                    additionalData:
                        '@import "@/mixins/style/constant.scss";@import "@/assets/css/constant.scss";',
                },
            },
        },
    }
    //不同环境可以进行配置
    if (command === 'serve') {
        return common
    } else {
        return common
    }
}
