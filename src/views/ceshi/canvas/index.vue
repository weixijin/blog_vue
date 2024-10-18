<template>
    <div>
        <h2>pixi.js</h2>
        <div ref="pageRef"></div>
        {{ number }}
        --
        <my v-model="number"></my>
    </div>
</template>

<script>
import { baseURL } from '@/plugins/config'
const plugins = [
    {
        js: baseURL + 'netdist/pixi-1716457838433~1~.js',
    },
]
import my from './my.vue'
export default {
    components: {my},
    data() {
        return {
            app: {},
            number:false
        }
    },
    async mounted() {
        this.getIndexDBJS(plugins).then(() => {
            this.init()
        })
    },
    methods: {
        init() {
            // 创建一个应用实例
            let app = new PIXI.Application({
                width: 256, // default: 800 宽度
                height: 256, // default: 600 高度
                antialias: true, // default: false 反锯齿
                transparent: false, // default: false 透明度
                resolution: 1, // default: 1 分辨率
                forceCanvas: false, // default: false 默认webgl
            })
            // 设置应用的背景色
            app.renderer.backgroundColor = 0x369258

            // 设置应用的自动调整大小
            app.renderer.autoResize = true

            // 再次设置应用的尺寸
            app.renderer.resize(512, 512)

            //
            const imgUrl =
                'http://139.9.210.43:5000/netdist/b55dba33e5c476a1d751ca7c4a41a369-1709302423536~1~.jpg'

            // add 加载图片
            PIXI.loader.add(imgUrl).on('progress', loadProgressHandler).load(setup)

            function loadProgressHandler(loader, resource) {
                console.log('loading: ' + resource.url)
                console.log('progress: ' + loader.progress + '%')
            }

            // 在图片加载完成后触发
            function setup() {
                // resources 是一个资源管理器
                // texture 创建了一个纹理对象
                // Sprite 是一个精灵对象
                let cat = new PIXI.Sprite(PIXI.loader.resources[imgUrl].texture)

                // 向舞台中添加精灵
                app.stage.addChild(cat)

                // 删除一个精灵
                // app.stage.removeChild(cat)
                // cat.visible = false;
            }
            // 将应用的view添加到页面中
            this.$refs.pageRef.appendChild(app.view)
            this.app = app
        },
    },
}
</script>

<style lang="scss" scoped></style>
