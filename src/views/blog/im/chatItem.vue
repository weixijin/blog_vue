<template>
    <!-- 消息类型  1 文本 2 图片 3 文件 4 视频 5 音频 6 位置 7 红包 8 系统消息 9 自定义消息 -->
    <div :class="['flex-wrap', is_sys_right ? 'flex-justify-end' : '', chatItemClassName]">
        <div class="user-avtor flex-0 m-r-10" v-if="!is_sys_right">
            <e-image
                :class="['user-avtor', isOnLine ? '' : 'grayscale-img']"
                :src="avatar"
                :title="title"
                :lazy="!isAdminPage"
            />
        </div>

        <div>
            <!-- 姓名 -->
            <div
                :class="['user-name f-14 c-666', is_sys_right ? 't-a-r' : '']"
                v-if="is_show_username"
            >
                {{ title }}
            </div>
            <!-- 直接在输入框输入的内容 -->
            <div
                v-if="msg_type == 1"
                :class="[
                    'content-container f-14 m-t-4 l-h-16 dp-i-b im-msg_type-1',
                    isMe ? 'bg-primary' : 'bg-default',
                ]"
            >
                <div v-html="parseHtmlUrl(row.content)"></div>
            </div>

            <!-- 图片 -->
            <div
                v-if="msg_type == 2"
                :class="['content-container f-14 m-t-4', isMe ? 'bg-primary' : 'bg-default']"
            >
                <div class="msg-type-2 o-h">
                    <e-image
                        :width="imgWidth"
                        :height="imgHeight"
                        :src="parseResourceUrl(row.content)"
                        class="msg-type-2"
                        :lazy="!isAdminPage"
                        previewA
                    ></e-image>
                </div>
            </div>

            <!-- 视频只支持mp4 -->
            <div
                v-if="msg_type == 4"
                :class="['content-container f-14 m-t-4 pr', isMe ? 'bg-primary' : 'bg-default']"
            >
                <div class="msg-type-20" @click="openvideoDialog">
                    <!-- 封面 -->
                    <e-image
                        class="msg-type-2"
                        :lazy="!isAdminPage"
                        :src="parseResourceUrl(row.poster)"
                        :width="imgWidth"
                        :height="imgHeight"
                    ></e-image>

                    <!-- play图标 -->
                    <img
                        class="p-a w-60 playing-icon cu"
                        src="https://image.zlketang.com/public/news/images/new_official/play/play_play_icon.png"
                        alt=""
                    />
                </div>
            </div>

            <!-- 音频 -->
            <div
                v-if="msg_type == 5"
                :class="[
                    'content-container f-14 m-t-4 pr dp-i-b',
                    isMe ? 'bg-primary' : 'bg-default',
                ]"
            >
                <div class="dp-i-b cu" @click="playIngAudio">
                    <e-image
                        :class="['b-r-50 o-h', isShowAudio ? 'an-1' : '']"
                        :width="60"
                        :height="60"
                        src="http://139.9.210.43:5000/netdist/kl1718850348458vjab00h8x4d-1718850348280~1~.png"
                    ></e-image>
                    <div class="m-t-5 f-14 c-555">时长：{{ getTime() }}</div>
                </div>
            </div>

            <!-- 其他 -->
            <div
                v-if="msg_type == 3"
                :class="[
                    'content-container f-14 m-t-4 pr dp-i-b',
                    isMe ? 'bg-primary' : 'bg-default',
                ]"
            >
                <div class="dp-i-b cu" @click="uploadFile">
                    <e-image
                        :width="60"
                        :height="60"
                        title="点击下载"
                        src="https://bpic.588ku.com/element_origin_min_pic/19/04/09/f6ee1317a9bb3ef11258a0297a4cabe7.jpg"
                    ></e-image>
                </div>
            </div>
        </div>

        <div class="user-avtor flex-0 m-l-10" v-if="is_sys_right">
            <e-image
                :class="['user-avtor', isOnLine ? '' : 'grayscale-img']"
                :src="avatar"
                :title="title"
            />
        </div>

        <!-- 播放器组件 -->
        <playerDialog
            :video_url="parseResourceUrl(video_url)"
            :visable.sync="isPlaying"
        ></playerDialog>

        <!-- 语音播放 -->
        <audioPlay
            v-model="isShowAudio"
            :url="parseResourceUrl(row.content)"
            @ended="audioEnd"
        ></audioPlay>
    </div>
</template>

<script>
export default {
    components: {
        playerDialog: () => import('@/components/playerDialog/index.vue'),
        wifiIcon: () => import('@/components/wifiIcon/index.vue'),
        audioPlay: () => import('@/components/audioPlay/index.vue'),
    },
    props: {
        row: {
            type: Object,
            default: () => {
                return {}
            },
        },
        roomMembers: {
            type: Array,
            default: () => {
                return []
            },
        },
        roomMemberInfo: {
            type: Object,
            default: () => {
                return {}
            },
        },
        maxWidth: {
            type: Number,
            default: 290,
        },
        isAdminPage: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            chatItemClassName: this.createId(),
            isPlaying: false,
            video_url: '',
            isShowAudio: false,
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        isMe() {
            return this.userdata.header_img === this.row?.author_id?.header_img
        },
        avatar() {
            return this.parseResourceUrl(
                this.isMe ? this.userdata.header_img : this.row?.author_id?.header_img,
            )
        },
        title() {
            return this.isMe ? this.userdata.username : this.row?.author_id?.username
        },
        isOnLine() {
            // 是否在线
            return this.roomMembers.some((item) => {
                if (item.author_id._id === this.row?.author_id?._id) {
                    return item.status == 1
                }
            })
        },
        roomMember() {
            return (
                this.roomMembers.find((item) => item.author_id?._id === this.row?.author_id?._id) ||
                {}
            )
        },
        msg_type() {
            return this.row.msg_type || '1'
        },

        is_sys_right() {
            return this.isMe && this.roomMemberInfo.is_sys_right == 1
        },
        is_show_username() {
            return this.roomMemberInfo.is_show_username == 1
        },

        // 对于视频封面需要特殊处理，防止页面不美观
        newMaxWidth() {
            return this.row.width > this.row.height ? this.maxWidth : this.maxWidth / 2
        },

        // 计算图片展示宽度
        imgWidth() {
            let { maxWidth, msg_type, newMaxWidth } = this
            const { video_width, video_height } = this.row
            if (![2, 4].includes(+msg_type)) {
                return 0
            }
            if (msg_type == 2) {
                let arr = this.row.content?.split('~')
                arr = arr.filter((item) => !isNaN(+item))
                if (Array.isArray(arr)) {
                    let len = arr.length
                    if (len === 3) {
                        let width = +arr[1]
                        let height = +arr[2]
                        if (isNaN(width) || isNaN(height)) {
                            return 0
                        }
                        return width > maxWidth ? maxWidth : width
                    }
                }
            }

            if (msg_type == 4) {
                if (!video_width || !video_height) {
                    return 0
                }
                return video_width > newMaxWidth ? newMaxWidth : video_width
            }
            return 0
        },

        // 计算图片展示高度
        imgHeight() {
            let { maxWidth, msg_type } = this
            const { video_width, video_height } = this.row
            if (![2, 4].includes(+msg_type)) {
                return 0
            }

            if (msg_type == 2) {
                let arr = this.row.content?.split('~')
                arr = arr.filter((item) => !isNaN(+item))
                if (Array.isArray(arr)) {
                    let len = arr.length
                    if (len === 3) {
                        let width = +arr[1]
                        let height = +arr[2]
                        if (isNaN(width) || isNaN(height)) {
                            return 0
                        }
                        if (width > maxWidth) {
                            let scale = maxWidth / width
                            width = maxWidth
                            height = height * scale
                        }
                        return height
                    }
                }
            }

            if (msg_type == 4) {
                if (!video_width || !video_height) {
                    return 0
                }
                // 与宽保持比例
                let scale = video_width / video_height
                return this.imgWidth / scale
            }

            return 0
        },
    },
    mounted() {
        let { chatItemClassName, maxWidth } = this
        let imgs = document.querySelectorAll(`.${chatItemClassName} .contenteditable-unpload-img`)
        if (imgs && imgs.length > 0) {
            for (let i = 0; i < imgs.length; i++) {
                const item = imgs[i]
                item.onclick = () => {
                    this.prevewImg(item)
                }

                // 重新设置图片的宽高
                const src = $(item).attr('src')
                let arr = src.split('~')
                arr = arr.filter((item) => !isNaN(+item))
                if (Array.isArray(arr)) {
                    let len = arr.length
                    if (len === 3) {
                        let width = +arr[1]
                        let height = +arr[2]
                        if (isNaN(width) || isNaN(height)) return
                        if (width > maxWidth) {
                            let scale = maxWidth / width
                            width = maxWidth
                            height = height * scale
                        }
                        $(item).css({
                            width: width + 'px',
                            height: height + 'px',
                        })
                    }
                }
            }
        }
    },
    methods: {
        getTime() {
            let { time } = this.row
            return time ? (time / 1000).toFixed(1) + 's' : '未知'
        },
        uploadFile() {
            this.$confirm('确认下载吗?')
                .then(() => {
                    let el = document.createElement('a')
                    el.href = this.parseResourceUrl(this.row.content)
                    el.click()
                    el.remove()
                })
                .catch(() => {})
        },
        audioEnd() {
            this.isShowAudio = false
        },
        playIngAudio() {
            this.$emit('closeAllPlay')

            this.isShowAudio = true
        },
        openvideoDialog() {
            this.$emit('closeAllPlay')

            this.isPlaying = true
            this.video_url = this.row.content || ''
        },
    },
}
</script>

<style lang="scss" scoped>
.user-avtor {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}
.content-container {
    word-break: break-all;
    padding: 8px;
    border-radius: 6px;
    min-height: 30px;
}
.bg-default {
    background-color: #ddd;
}
.grayscale-img {
    filter: grayscale(100%);
}
.playing-icon {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}
.an-1 {
    animation: a1 1s infinite alternate;
    transition: all 1s;
}

@keyframes a1 {
    0% {
        border: 1px solid #fff;
    }
    100% {
        border-color: $primary;
    }
}
</style>
