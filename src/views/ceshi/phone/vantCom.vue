<template>
    <div class="demo">
        <maxTextEll class="my-max-text-ell" v-model="ellText" />

        <img
            class="pre-img"
            src="//image.zlketang.com/public/news/others/imgs/20200211084406659.jpg"
            alt=""
        />
        <div class="my-konva" v-show="konvaVisible"></div>
        <el-button @click="drowKonva">打开konva弹窗</el-button>
        <h2>测试折叠面板</h2>
        /** * accordion 是否开启手风琴模式 * v-model="activeNames" 选中的面板 数组同时展开多个
        字符串只展开一个 * name="1" 面板的唯一标识符 * #title 标题插槽 **/
        <van-collapse v-model="activeNames" accordion>
            <van-collapse-item name="1">
                <template #title>
                    <div>标题1 <van-icon name="question-o" /></div>
                </template>
                内容1
            </van-collapse-item>
            <van-collapse-item name="2">
                <template #title>
                    <div>标题2 <van-icon name="question-o" /></div>
                </template>
                内容2
            </van-collapse-item>
        </van-collapse>

        <h2>loading控制</h2>
        <el-button @click="openLoading">open</el-button>
        <div>
            <p>v-image</p>
            <v-image width="200px" height="200px" src="https://img.yzcdn.cn/vant/apple-1.jpg" />

            <van-button @click="dialogVisible = true">v-dialog</van-button>
            <v-dialog
                circle
                :overlay="false"
                v-model="dialogVisible"
                :close-time="5"
                width="300px"
                class="ceshi-v-dialog"
            >
                <div class="h-300">aghahjha</div>
            </v-dialog>

            <v-swiper>
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
            </v-swiper>
        </div>

        <div class="flex-wrap flex-center-wrap">
            <v-tabs v-model="active" :sticky="true" offset-top="40px" @change="tabChange">
                <van-tab v-for="(item, index) in 4" :key="index">
                    <!-- 自定义头部插槽 -->
                    <template #title>
                        <div class="tab-item">
                            <van-icon
                                class="pos-icon"
                                v-if="index === 2"
                                name="more-o"
                            />tab头部切换项{{ index + 1 }}
                        </div>
                    </template>

                    <!-- 默认的内容直接插入 -->
                    <!-- 内容 {{ index }} -->
                </van-tab>
            </v-tabs>
            <!-- 添加一个右侧图标 -->
            <i class="el-icon-menu m-l-20"></i>
        </div>

        <v-swiper :duration="duration" ref="swiper" @change="swiperChange">
            <van-swipe-item> 1 </van-swipe-item>
            <van-swipe-item> 2 </van-swipe-item>
            <van-swipe-item> 3 </van-swipe-item>
            <van-swipe-item> 4 </van-swipe-item>
        </v-swiper>

        <div class="vh-300">
            <van-button type="primary" @click="popupVisable = true"> 弹出右侧v-popup </van-button>

            <v-popup v-model="popupVisable" position="right" height="100%" width="100%"></v-popup>
        </div>
        <kl-del-list></kl-del-list>
    </div>
</template>

<script>
// import VImage from '../../../mixins/components/aComponents/v-image.vue'
// import MaxTextEll from '../../../mixins/components/defaultRegister/maxTextEll.vue'
export default {
    components: {
        // VImag,
        // MaxTextElle,
    },
    data() {
        return {
            popupVisable: false,
            active: 0,
            dialogVisible: false,
            duration: 300,
            vantLoading: null,
            activeNames: '1',
            konvaVisible: false,
            ellText:
                `初级会计职称,中级会计职称,注册会计师

简介： 中国政法大学硕士，曾于云南财经大学会计学院任教12年，拥有10年大型集团财务管理经验。自上世纪90年代开始从事会计职称及注册会计师培训，教龄超过20年，是一位兼具教学经验、工作经验且对考试研究颇深的老师。授课生动风趣，通俗易懂，条理清晰，被评为“课堂最丰富、最有魅力老师”，学生好评率高达99%`,
        }
    },
    created(){
        setTimeout(()=>{
            this.ellText = 'aghdavghaghg'
        },5000)
    },
    methods: {
        async drowKonva() {
            let that = this
            this.konvaVisible = true
            await this.$nextTick()

            var sources = {
                lion: '//image.zlketang.com/public/news/others/imgs/20200211084406659.jpg',
            }

            loadImages(sources, buildStage)

            function loadImages(sources, callback) {
                var images = {}
                var loadedImages = 0
                var numImages = 0
                for (var src in sources) {
                    numImages++
                }
                for (var src in sources) {
                    images[src] = new Image()
                    images[src].crossOrigin = 'Anonymous'
                    images[src].onload = function () {
                        if (++loadedImages >= numImages) {
                            callback(images)
                        }
                    }
                    images[src].src = sources[src]
                }
            }
            function buildStage(images) {
                // 获取可视区域的宽高
                let width = document.documentElement.clientWidth
                let height = document.documentElement.clientHeight
                // 创建Konva.Stage实例
                let stage = new Konva.Stage({
                    container: '.my-konva', // 挂载的容器
                    width: width, // 宽度
                    height: height, // 高度
                })

                let scal = 0.8
                let img_width = 337 * scal
                let img_height = 600 * scal

                var layer = new Konva.Layer({
                    width: width,
                    height: height,
                    x: (width - img_width) / 2,
                    y: (height - img_height) / 2,
                })

                // 创建图片背景
                var lion = new Konva.Image({
                    image: images.lion,
                    width: img_width,
                    height: img_height,
                    blurRadius: 8,
                })

                // 创建文字
                var complexText = new Konva.Text({
                    text: '我是绘制的文字我是绘制的文字我是绘制的文字我是绘制的文字',
                    fontSize: 16,
                    fontFamily: 'Calibri',
                    fill: '#fff',
                    width: img_width,
                    padding: 20,
                    align: 'center',
                })

                // stage 绑定click事件
                stage.on('click', function () {
                    // 关闭弹窗
                    let flage = true
                    let scaleNumber = 1

                    var anim = new Konva.Animation(function (frame) {
                        if (flage) {
                            scaleNumber += 0.01
                        } else {
                            scaleNumber -= 0.03
                            let opacity = layer.opacity()
                            if (opacity > 0) {
                                layer.opacity(opacity - 0.05)
                            }
                        }
                        if (scaleNumber > 1.1) {
                            flage = false
                        }

                        // layer缩放中保持居中
                        layer.scaleX(scaleNumber)
                        layer.scaleY(scaleNumber)
                        layer.x((width - img_width * scaleNumber) / 2)
                        layer.y((height - img_height * scaleNumber) / 2)
                        layer.batchDraw()
                    }, layer)

                    anim.start()

                    setTimeout(() => {
                        anim.stop()
                        that.konvaVisible = false
                    }, 500)
                })

                // layer 绑定click事件
                layer.on('click', function (ctx) {
                    ctx.cancelBubble = true
                    that.konvaVisible = true
                })

                lion.cache()
                lion.filters([Konva.Filters.Blur])
                layer.add(lion)
                layer.add(complexText)
                stage.add(layer)
            }
        },
        // 关闭loading
        closeLoading() {
            this.vantLoading.clear()
        },
        // 打开loading
        openLoading() {
            this.vantLoading = vant.Toast.loading({
                duration: 0, // 持续展示 toast
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
            })

            setTimeout(() => {
                this.closeLoading()
            }, 1000)
        },
        tabChange(val) {
            this.active = val
            // 对应的swiper切换
            this.duration = 0
            this.$refs.swiper.swipeTo(val)
            let timer = setTimeout(() => {
                this.duration = 300
                clearTimeout(timer)
                timer = null
            }, 50)
        },
        swiperChange(e) {
            this.active = e
        },
    },
}
</script>

<style>
.pre-img {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    top: -999px;
    left: -999px;
}
.van-toast {
    /* background-color: rgba(0,0,0,0.45) !important; */
}
</style>
<style lang="scss" scoped>
.demo {
    height: calc(100vh - 40px);
    overflow-y: auto;
}
.h-300 {
    height: 300px;
}
.vh-300 {
    height: 300vh;
}
.tab-item {
    width: 100%;
    height: 100%;
    position: relative;
}
.van-icon {
    position: absolute;
    right: -8px;
    top: -13px;
}

.my-konva {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.35);
}
.my-text-ell {
    line-height: 24px;
    max-height: 72px;
}
::v-deep {
    .my-max-text-ell {
        width: 344px;
        font-size: 14px;
        font-weight: 400;
        color: #8c8c8c;
        line-height: 24px;
    }
    .max-text-ell-space {
        display: inline-block;
        width: 48px;
        height: 2px;
        line-height: 24px;
        font-size: 14px;
    }
    .max-text-ell-some {
        font-size: 14px;
    }
}
</style>
