<template>
    <div class="blog-share" v-if="visibleShare">
        <img class="share-image" :src="shareImg" alt="" />
        <!-- 底部分享功能区 -->
        <v-popup
            class="share-bottom"
            :duration="0.3"
            height="140px"
            v-model="visiblePopup"
            @close="clsoseSharePopup"
        >
            <div class="bg-f5 share-popop-container">
                <div>
                    <!-- 添加一个过渡动画 -->
                    <div class="share-list flex-center flex-justify-between p-10-20">
                        <div
                            :class="[
                                'share-item flex-center flex-column-wrap',
                                visibleShare ? 'enter-animate' : 'leave-animate',
                            ]"
                            v-for="(item, index) in shareList"
                            :key="item.name"
                        >
                            <div class="p-8 b-r-6 bg-fff w-40 h-40" @click="shareEvent(index)">
                                <img class="share-item-img" :src="item.url" alt="" />
                            </div>
                            <span class="f-12 c-333 m-t-10">{{ item.name }}</span>
                        </div>
                    </div>
                    <div @click.stop="clsoseSharePopup" class="flex-center f-14 can cancel-btn">
                        取消
                    </div>
                </div>
            </div>
        </v-popup>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2-fix'

export default {
    props: {
        visibleShare: {
            type: Boolean,
            default: false,
        },
        shareInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            visiblePopup: false,
            shareList: [
                {
                    name: 'QQ',
                    url: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.1c_TB87h4zUutxh2Hu_k0AHaHk&w=247&h=252&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
                },
                {
                    name: '微信',
                    url: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.KX_05K6jrKo-yU66jG3mNwHaFo?w=255&h=194&c=7&r=0&o=5&pid=1.7',
                },
                {
                    name: '朋友圈',
                    url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.-iuM6lriZuLwTc1c6XJB0QHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7',
                },
                {
                    name: '复制链接',
                    url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.lmHf12ZzdW_3RKrR2GZRHAAAAA?w=169&h=180&c=7&r=0&o=5&pid=1.7',
                },
                {
                    name: '海报',
                    url: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.WyqLaJi_3MQVKcSWrWEmZAHaOs?w=176&h=349&c=7&r=0&o=5&pid=1.7',
                },
            ],
            shareImg: '',
        }
    },
    watch: {
        visibleShare(val) {
            if (val) {
                this.init()
                return
            }
        },
    },
    methods: {
        shareEvent() {},
        clsoseSharePopup() {
            this.visiblePopup = false
            let timer = setTimeout(() => {
                this.$emit('close', false)
                clearTimeout(timer)
                timer = null
            }, 500)
        },
        // 处理分享的参数
        handlerShareParams() {
            let {
                share_bg_img,
                share_main_img,
                share_authorheader_img,
                share_author_name,
                share_blog_content,
            } = this.shareInfo

            let result = {
                share_bg_img: {
                    url: share_bg_img,
                    width: 265,
                    height: 452,
                    top: 0,
                    left: 0,
                },
                share_authorheader_img: {
                    url: share_authorheader_img,
                    width: 70,
                    height: 70,
                    top: 48,
                    left: 153,
                },
                share_author_name: {
                    text: share_author_name,
                    color: '#262626',
                    size: 16,
                    top: 128,
                },
                share_main_img: {
                    url: share_main_img,
                    width: 288,
                    height: 288,
                    top: 166,
                    left: 44,
                },
                share_blog_content: {
                    text: share_blog_content,
                    color: '#262626',
                    size: 16,
                    top: 466,
                    left: 40,
                },
            }

            return result
        },

        // 绘制分享的海报
        drowShareImg(options) {
            return new Promise((res, rej) => {})
        },
        async init() {
            let options = this.handlerShareParams()
            try {
                await this.drowShareImg(options)
                this.visiblePopup = true
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.blog-share {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
}
.share-header-close-icon {
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
}
.share-popop-container {
    height: 140px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
}
.share-item {
    transform: translatey(40px);
    opacity: 0;
}
.share-item-img {
    width: 100%;
    height: 100%;
}

.enter-animate {
    animation: enter 0.6s ease-out forwards;
    &:nth-of-type(1) {
        animation-delay: 0s;
    }
    &:nth-of-type(2) {
        animation-delay: 0.08s;
    }
    &:nth-of-type(3) {
        animation-delay: 0.16s;
    }
    &:nth-of-type(4) {
        animation-delay: 0.24s;
    }
    &:nth-of-type(5) {
        animation-delay: 0.32s;
    }
}

.leave-animate {
    opacity: 0;
    transform: translatey(40px);
}

@keyframes enter {
    0% {
        opacity: 0;
        transform: translatey(40px);
    }
    50% {
        opacity: 1;
        transform: translatey(-10px);
    }
    60% {
        transform: translatey(-5px);
        opacity: 1;
    }
    70% {
        transform: translatey(0px);
        opacity: 1;
    }
    80% {
        transform: translatey(1px);
        opacity: 1;
    }
    100% {
        transform: translatey(0);
        opacity: 1;
    }
}
.share-image {
    position: absolute;
    width: 295px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
}
.share-bottom {
    border-radius: 12px 12px 0 0;
}
.cancel-btn {
    height: 45px;
}
</style>
