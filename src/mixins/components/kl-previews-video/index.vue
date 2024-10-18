<template>
    <div class="kl-previews-video">
        <div class="left">
            <div class="f-24 box-upload" v-if="!dataURL" @click="toGetUpdate">+</div>
            <div class="img-fin" v-if="dataURL">
                <img class="prev-img" :src="dataURL" alt="" />
                <div :class="['left-moban', dataURL ? 'block-class' : '']">默认封面</div>
                <div :class="['left-upload-img']">上传封面</div>
            </div>
        </div>
        <div class="right">
            <div class="right-tips">
                正在生成可选封面，系统会默认选中第一张作为视频封面，<span class="c-primary cu">
                    查看更多封面
                </span>
            </div>
            <div class="prev-imgs">
                <div
                    :class="['item']"
                    @click="currentPrevImg(item)"
                    v-for="item in videoPreViewImgs"
                    :key="item.id"
                >
                    <div v-show="currentPrevImgId === item.id" class="current-img">?</div>
                    <img class="item-img" :src="item.url" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            dataURL: '',
            videoPreViewImgs: [],
            currentPrevImgId: 0,
            videoPages: {
                // 视频的封面图片
                page: 1,
                limit: 5,
                total: 0,
            },
        }
    },
    methods: {
        // 切换封面
        currentPrevImg(row) {
            this.dataURL = row.url
            this.currentPrevImgId = row.id
        },
        //上传点击事件
        toGetUpdate() {
            // 生成文件上传的控件
            let inputElement = document.createElement('input')
            inputElement.setAttribute('type', 'file')
            inputElement.style.display = 'none'
            if (window.addEventListener) {
                inputElement.addEventListener(
                    'change',
                    (e) => {
                        this.uploadFile(e)
                    },
                    false,
                )
            } else {
                inputElement.attachEvent('onchange', (e) => {
                    this.uploadFile(e)
                })
            }
            document.body.appendChild(inputElement)
            inputElement.click()
        },
        //上传方法
        uploadFile(el) {
            let that = this
            if (el && el.target && el.target.files && el.target.files.length > 0) {
                // console.log(el)
                const files = el.target.files[0]
                const isLt100M = files.size / 1024 / 1024 < 100 //100M大小
                const size = files.size / 1024 / 1024 //文件大小单位为M,(做限制条件用)

                const reader = new FileReader() // 创建读取文件对象
                reader.readAsDataURL(el.target.files[0]) // 发起异步请求，读取文件
                reader.onload = async function (e) {
                    let video = document.createElement('video')
                    video.setAttribute('src', e.target.result)
                    // video.setAttribute('controls', 'controls');
                    video.setAttribute('width', 800) //设置大小，如果不设置，下面的canvas就要按需设置
                    video.setAttribute('height', 600)
                    let currentTime = await that.getDuration(video)
                    for (let i = 0; i < 4; i++) {
                        let video = document.createElement('video')
                        video.setAttribute('src', e.target.result)
                        video.setAttribute('controls', 'controls')
                        video.setAttribute('width', 800) //设置大小，如果不设置，下面的canvas就要按需设置
                        video.setAttribute('height', 600)
                        let time =
                            Math.floor((currentTime / 5) * (i + 1)) === 0
                                ? 1
                                : Math.floor((currentTime / 5) * (i + 1))
                        video.currentTime = time
                        video.addEventListener('loadeddata', function () {
                            let canvas = document.createElement('canvas'),
                                width = video.width, //canvas的尺寸和图片一样
                                height = video.height
                            canvas.width = width //画布大小，默认为视频宽高
                            canvas.height = height
                            canvas.getContext('2d').drawImage(video, 0, 0, width, height) //绘制canvas
                            let dataURL = canvas.toDataURL('image/png') //转换为base64

                            video.setAttribute('poster', dataURL) //设置为视频封面
                            let obj = {
                                id: that.createId(),
                                url: dataURL,
                            }

                            if (i === 0) {
                                that.dataURL = dataURL
                            }

                            that.videoPreViewImgs.push(obj)
                        })
                    }
                }
            }
        },

        // 获取视频时长
        getDuration(video) {
            return new Promise((res, rej) => {
                video.addEventListener('loadeddata', function () {
                    if (video.duration) {
                        res(video.duration)
                    } else {
                        rej('error')
                    }
                })
            })
        },

        mouseleave() {
            let el = document.querySelector('.left-upload-img')

            el.attributes.class.value = 'left-upload-img'
        },

        //
        mouseenter() {
            let el = document.querySelector('.left-upload-img')
            if (this.dataURL) {
                el.attributes.class.value = 'left-upload-img block-class'
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-previews-video {
    display: flex;
    .left {
        width: 188px;
        height: 118px;
        .box-upload {
            line-height: 118px;
            text-align: center;
            border: 1px dashed #ccc;
            color: #555;
            font-size: 30px;
            border-radius: 4px;
        }
        .img-fin {
            position: relative;
            width: 188px;
            height: 118px;
            .prev-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                box-shadow: 0 0 5px #f1f1f1;
            }
            .left-moban {
                position: absolute;
                height: 24px;
                line-height: 24px;
                top: 0;
                right: 0;
                left: 120px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                color: #fff;
                z-index: 10;
                font-size: 14px;
                text-align: center;
                cursor: pointer;
            }
            .left-upload-img {
                display: none;
                padding: 0 5px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                color: #fff;
                height: 24px;
                line-height: 24px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            &:hover {
                .left-upload-img {
                    display: block;
                }
            }
        }

        .block-class {
            display: block;
        }
    }
    .right {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .right-tips {
            font-size: 14px;
            color: #999;
            .c-primary {
                color: $primary;
            }
        }
        .prev-imgs {
            margin-top: 5px;
            display: flex;
            .item {
                position: relative;
                margin-right: 15px;
                width: 124px;
                height: 80px;
                box-shadow: 0 0 5px #f1f1f1;
                .item-img {
                    width: 124px;
                    height: 80px;
                    border-radius: 4px;
                }
                .current-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 124px;
                    height: 80px;
                    background-color: rgba(0, 0, 0, 0.5);
                    border: 2px solid $primary;
                    z-index: 100;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
