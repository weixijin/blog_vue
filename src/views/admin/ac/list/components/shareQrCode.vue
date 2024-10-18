<template>
    <klDialog
        class="qr-code-dialog"
        center
        width="300px"
        title="二维码"
        :dialogVisible="dialogVisible"
        @close="dialogVisible = false"
        @determine="submit"
        nobg
    >
        <!-- 二维码部分 -->
        <div class="qr-code-container">
            <!-- 二维码容器 -->
            <div id="qrcode" ref="codeRef" class="pos-img"></div>

            <!-- 最终的合成 -->
            <div class="pr flex-img" v-show="canvasImg">
                <img class="img-bg" :src="canvasImg" @click="dialogVisibleImg = true" />
                <el-button class="m-t-15" type="primary" @click="downloadImg"> 下载 </el-button>
            </div>

            <!-- 加载中 -->
            <div v-if="!canvasImg" class="loading-code">
                <i class="el-icon-loading c-fff"></i>
                <p class="c-fff">二维码生成中</p>
            </div>
        </div>

        <!-- 去掉头部 -->
        <template v-slot:header>
            <i></i>
        </template>

        <!-- 去掉底部 -->
        <template v-slot:footer>
            <i></i>
        </template>

        <klDialog
            center
            width="440px"
            :dialogVisible="dialogVisibleImg"
            @close="dialogVisibleImg = false"
            nobg
        >
            <img class="big-img" :src="canvasImg" alt="" />
            <!-- 去掉头部 -->
            <template v-slot:header>
                <i></i>
            </template>

            <!-- 去掉底部 -->
            <template v-slot:footer>
                <i></i>
            </template>
        </klDialog>
    </klDialog>
</template>

<script>
import QRCode from 'qrcodejs2-fix'
import httpApi from '@/api/blog/admin.js'
import { baseURL } from '@/plugins/config.js'
export default {
    props: {
        ac_id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            dialogVisibleImg: false,
            dialogVisible: false,
            qrCode: '',
            qrcode: '',
            bgImgUrl: '//image.zlketang.com/public/news/others/imgs/school_code/bg-2.png',
            canvasImg: '',
            acData: {},
        }
    },
        mounted() {
        const plugins = [
            {
                js: 'https://cdn.bootcdn.net/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
            }
        ]
        this.getIndexDBJS(plugins)
    },
    methods: {
        submit() {},
        sleep(time) {
            return new Promise((res) => {
                setTimeout(() => {
                    res()
                }, time)
            })
        },
        async init() {
            this.canvasImg = ''
            let that = this
            await this.$nextTick()
            let ac_data = await httpApi.get_ac_page({ ac_id: this.ac_id })
            this.acData = ac_data?.data?.data || {}
            // 获取详细的页面信息
            let { ac_url, ac_name } = this.acData
            $('#qrcode').html('')
            // 会生成节点二维码 可以在页面上看到，但没有实际的二维码链接与图片资源
            this.qrcode = new QRCode(this.$refs.codeRef, {
                text: baseURL + 'ac/' + ac_url,
                width: 880,
                height: 880,
                colorDark: '#333333',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H,
            })

            // 可以将一个节点的图像转成图片资源 bas464
            html2canvas(this.$refs.codeRef, {
                backgroundColor: null,
                width: 880,
                height: 880,
            }).then((data) => {
                var imgData = data.toDataURL('image/jpeg') //这里转为图片方式 `[base64转图片并显示](https://blog.csdn.net/weixin_45527702/article/details/117324946)`
                // 拿到了二维码图片的base64
                this.qrCode = imgData

                let { bgImgUrl, qrCode } = this

                // 绘制画板
                let canvas = document.createElement('canvas')
                canvas.width = 880
                canvas.height = 880
                let context = canvas.getContext('2d')
                if (!context) {
                    return that.$message.error('当前浏览器不支持canvas,请使用谷歌或edge')
                }
                context.rect(0, 0, canvas.width, canvas.height)
                context.fillStyle = '#ffffff'
                that.roundRect(context, 0, 0, 880, 880, 20)
                context.fill()
                let myImage = new Image()
                myImage.src = bgImgUrl
                // 允许跨域
                myImage.crossOrigin = 'Anonymous'
                myImage.onload = () => {
                    // 背景底图加载完毕 绘制背景
                    context.drawImage(myImage, 0, -4, 880, 884)

                    // 绘制二维码白色矩形圆角底图
                    that.roundRect(context, 200, 200, 480, 480, 20)

                    let myImage2 = new Image()
                    myImage2.src = qrCode
                    myImage2.crossOrigin = 'Anonymous'
                    myImage2.onload = () => {
                        // 二维码图片加载完毕 开始绘制二维码
                        context.drawImage(myImage2, 232, 232, 416, 416)
                        // 添加文字
                        context.fillStyle = '#fff' // 文字填充颜色
                        context.font = 'normal normal 600 64px Adobe Ming Std'
                        // 使用了 textAlign 就设置220 为宽度的一半
                        context.textAlign = 'center'
                        context.fillText('扫码查看', 440, 140)
                        context.fillStyle = '#fff'
                        context.font = 'normal normal 400 48px Adobe Ming Std'
                        context.fillText(ac_name, 440, 780)
                        setTimeout(() => {
                            let base64 = canvas.toDataURL('image/png') //"image/png" 这里注意一下
                            that.canvasImg = base64
                        }, 0)
                    }
                }
            })
        },


        downloadImg() {
            //   创建a标签下载
            let oA = document.createElement('a')
            oA.download = this.acData.ac_name || '知崖' // 设置下载的文件名
            oA.href = this.canvasImg
            document.body.appendChild(oA)
            oA.click()
            oA.remove() // 下载之后把创建的元素删除
        },
    },
}
</script>

<style lang="scss" scoped>
.pr {
    position: relative;
}
.img-bg {
    width: 220px;
    height: 220px;
}
.qr-code {
    position: absolute;
    top: 58px;
    left: 58px;
    width: 104px;
    height: 104px;
}
#myImg {
    width: 220px;
    height: 220px;
}
.flex-img {
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.pos-img {
    position: absolute;
    top: -99999px;
}

.el-icon-loading {
    font-size: 50px;
    color: #999;
    margin-bottom: 10px;
}
.loading-code {
    color: #999;
    width: 220px;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.c-fff {
    color: #fff !important;
}
.big-img {
    width: 440px;
    height: 440px;
}
</style>
