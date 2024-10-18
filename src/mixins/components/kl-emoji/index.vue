<template>
    <!-- 消息类型  1 文本 2 图片 3 文件 4 视频 5 音频 6 位置 7 红包 8 系统消息 9 自定义消息 -->
    <div :class="[isIm ? 'flex-1 hb-100' : '', 'kl-emoji']">
        <!-- im的消息回复 -->
        <div v-if="isIm" class="flex-wrap im-input-container flex-1">
            <!-- 功能栏 -->
            <div class="flex-center-wrap h-40">
                <el-popover
                    v-if="isShowEmojiM"
                    placement="top-start"
                    width="400"
                    trigger="hover"
                    v-model="isShowEmoji"
                >
                    <!-- 表情包列表 -->
                    <div class="emoji-list no-select">
                        <div
                            @click="handleEmoji(item)"
                            class="item"
                            v-for="item in emojiList"
                            :key="item._id"
                        >
                            <div
                                :style="{
                                    background: `url(${bgImg}) no-repeat  -${item.left}px -${item.top}px`,
                                }"
                                class="emoji-icon"
                            ></div>
                        </div>
                        <i v-for="item in 8" :key="item"></i>
                    </div>

                    <!-- 切换选择按钮 -->
                    <div
                        slot="reference"
                        class="cu no-select m-r-10"
                        v-if="isWebkit()"
                        @mousedown="focusEvent"
                    >
                        <kl-svg width="18" height="18" class="m-r-5" name="xiaolian" />
                    </div>
                </el-popover>

                <i class="el-icon-folder f-18 pr el-icon-folder-1 cu" @click="selectInput"></i>
            </div>
            <div
                :id="myInputId"
                class="im-input kl-contenteditable-input flex-1 no-select f-14"
                contenteditable="true"
                @paste="pasteEvent($event)"
                @blur="blurEvent"
            ></div>

            <div class="flex-wrap flex-justify-end h-30">
                <e-image
                    v-if="isEncryptionScenario"
                    :lazy="false"
                    @click="openOnlineVoice"
                    :width="20"
                    :height="20"
                    class="m-r-5 b-r-50 o-h"
                    src="http://139.9.210.43:5000/netdist/kl1718850348458vjab00h8x4d-1718850348280~1~.png"
                ></e-image>

                <span
                    v-if="isEncryptionScenario"
                    class="c-999 f-14 cu m-r-10"
                    @click="handlerAut"
                    >{{ isShowAudioDialog ? '正在录音~' : '点击说话' }}</span
                >
                <span class="c-999 f-14 cu" @click="pushInfo"> 发送 </span>
            </div>
        </div>

        <!-- 默认的消息回复 -->
        <div class="kl-emoji" v-else>
            <div class="userinfo">
                <img
                    v-if="Object.keys(userdata).length === 0"
                    :src="parseResourceUrl('/default/default_header_img.png')"
                    class="user-header-img"
                />
                <img
                    v-else
                    class="user-header-img"
                    :src="parseResourceUrl(Object.keys(userdata).length && userdata.header_img)"
                />
            </div>
            <div class="kl-input-cover">
                <p
                    :id="myInputId"
                    class="my-input kl-contenteditable-input"
                    contenteditable="true"
                    @paste="pasteEvent($event)"
                    @blur="blurEvent"
                ></p>

                <el-popover placement="top-start" width="400" trigger="hover" v-model="isShowEmoji">
                    <!-- 表情包列表 -->
                    <div class="emoji-list no-select">
                        <div
                            @click="handleEmoji(item)"
                            class="item"
                            v-for="item in emojiList"
                            :key="item._id"
                        >
                            <div
                                :style="{
                                    background: `url(${bgImg}) no-repeat  -${item.left}px -${item.top}px`,
                                }"
                                class="emoji-icon"
                            ></div>
                        </div>
                        <i v-for="item in 8" :key="item"></i>
                    </div>

                    <!-- 切换选择按钮 -->
                    <div
                        slot="reference"
                        class="emoji-show-switch cu no-select"
                        v-if="isWebkit() && isPc()"
                        @mousedown="focusEvent"
                    >
                        <kl-svg class="m-r-5" name="xiaolian" />表情
                    </div>
                </el-popover>
            </div>
            <div :class="['my-btn', isLogin ? '' : 'disabled-color']" @click="pushInfo">发布</div>
        </div>

        <!-- 选择文件上传 -->
        <input ref="fileInput" type="file" class="kl-emoje-input" @change="inputFileChange" />

        <!-- 音频录制发送 -->
        <audioDialog v-model="isShowAudioDialog" @pushInfo="pushInfo"></audioDialog>

        <!-- 在线语音弹窗 -->
        <onlineVoiceDialog v-model="isOnlineVoiceVisable"></onlineVoiceDialog>
    </div>
</template>

<script>
export default {
    components: {
        audioDialog: () => import('@/mixins/components/kl-emoji/audioDialog.vue'),
        onlineVoiceDialog: () => import('@/mixins/components/kl-emoji/onlineVoiceDialog.vue'),
    },
    props: {
        type: {
            // 2 im
            type: String,
            default: '1',
        },
    },
    data() {
        return {
            isShowAudioDialog: false,
            imValue: '',
            bgImg: '',
            myInputId: this.createId(),
            emojiList: [],
            content: '',
            isShowEmoji: false,
            el: '',
            range: '',
            isFocus: false,
            isOnlineVoiceVisable: false,
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        ...Vuex.mapGetters(['isLogin']),
        isIm() {
            return this.type === '2'
        },
        filePath() {
            return this.isIm ? 'im/' : 'sys/'
        },
        isShowEmojiM() {
            return this.isWebkit() && this.isPc()
        },
        isEncryptionScenario() {
            // 本地或https加密
            return window.location.protocol === 'https:' || this.isDev()
        },
    },
    created() {
        this.getEmojis({ cache: true })
    },
    mounted() {
        // await this.sleep()
        if (this.isShowEmojiM) {
            this.getIndexDBIMJ(`http://139.9.210.43:5000/netdist/emoji-1718674237291~1~.webp`)
                .then((res) => {
                    this.bgImg = res
                })
                .catch(() => {})
        }
    },

    methods: {
        // 打开在线弹窗
        openOnlineVoice() {
            this.isOnlineVoiceVisable = true
        },
        // 点击了录音按钮
        handlerAut() {
            this.isShowAudioDialog = !this.isShowAudioDialog
        },
        // 有上传文件
        async inputFileChange(e) {
            let file = e.target?.files[0] || ''

            if (!file) return
            let { type } = file
            // 默认最大2M
            let maxSize = 2 * 1024

            // 默认配置
            const config = {
                min: 500,
                msg_type: '3',
                needPoster: false,
            }
            // 图片
            if (type.indexOf('image') >= 0) {
                Object.assign(config, {
                    min: 200,
                    msg_type: '2',
                })
            }

            // mp4
            if (type.indexOf('video') >= 0) {
                if (type != 'video/mp4') {
                    this.$message.warning('请上传mp4格式的视频')
                    return
                }
                maxSize = 50 * 1024 // 50M
                // 视频上传
                Object.assign(config, {
                    min: 500,
                    msg_type: '4',
                    needPoster: true,
                })
            }

            // audio
            if (type.indexOf('audio') >= 0) {
                if (type != 'audio/ogg') {
                    this.$message.warning('请上传audio/ogg格式的音频')
                    return
                }
                Object.assign(config, {
                    min: 500,
                    msg_type: '5',
                })
            }

            // 判断上传文件大小
            let msg = await this.fileLimit(file, {
                maxSize,
            })
            if (msg) {
                this.$message.warning(msg)
                this.$refs.fileInput.value = ''
                return
            }

            // 其他类型
            let { min, msg_type, needPoster } = config
            // 图片使用专属的上传
            const key = msg_type == 2 ? 'commonUploadImg' : 'commonUploadFile'
            let res = await this[key](file, 'im', min, needPoster).catch(() => {})
            // 发送消息
            this.pushInfo({
                ...res,
                msg_type,
                content: res.url,
            })
            this.$refs.fileInput.value = ''
        },
        selectInput() {
            let input = $('.kl-emoje-input')
            input && input.click()
        },
        blurEvent() {
            this.isFocus = false
        },
        focusEvent() {
            this.isFocus = true
        },
        async pasteEvent(event) {
            // 尝试从 event.clipboardData 获取粘贴的项
            if (event.clipboardData && event.clipboardData.items) {
                for (let index in event.clipboardData.items) {
                    const item = event.clipboardData.items[index]

                    if (item.kind === 'file') {
                        event.preventDefault()
                        // 文件类型,将数据收集为fil
                        let file = item.getAsFile()
                        this.commonUploadImg(file, 'im')
                            .then(({ url }) => {
                                this.insertHtmlAtCaret(
                                    `<img src="${this.parseResourceUrl(
                                        url,
                                    )}" class="contenteditable-unpload-img" />`,
                                )
                            })
                            .catch(() => {})
                    }
                }
            }
        },
        // 聚焦
        focusEvent() {
            this.isShowEmoji = true
            if (!this.isFocus) {
                let myInput = $(`#${this.myInputId}`)
                // document.activeElement 当前聚焦的节点
                if (document.activeElement === myInput[0]) return
                if (myInput) {
                    myInput.focus()
                    // 输入框锁定到最后的位置 会自动跳转到对应的位置
                    document.execCommand('selectAll', false, null)
                    document.getSelection().collapseToEnd()
                }
            }
        },
        clearVal() {
            this.isIm ? $('.im-input').html('') : $('#' + this.myInputId).html('')
        },
        // 发布
        async pushInfo(row = null) {
            let { isIm, isLogin } = this
            if (!isLogin) {
                let res = await this.$confirm('登录后开启消息回复功能')
                if (res) {
                    this.goTo('/login')
                }
                return
            }

            // 如果是im并且是粘贴的图片
            if (isIm && this.isObject(row)) {
                this.$emit('postComment', row)
                return
            }

            let val = this.isIm ? $('.im-input').html() : $('#' + this.myInputId).html()
            val = val.replace(/[\r\n]/g, '')

            if (!val || !val.trim()) {
                this.$message.warning('请输入内容')
                return
            }

            if (!isIm) {
                // 留言板发送消息
                this.$emit('postComment', val)
                return
            }

            // im发送文字消息
            this.$emit('postComment', {
                msg_type: '1',
                content: val,
            })

            if (this.isIm) {
                // 清空
                this.clearVal()
            }
        },
        // 选中
        async handleEmoji({ emoji_url }) {
            this.isShowEmoji = false
            let baseUrl = this.emojiBasePath + emoji_url
            this.insertHtmlAtCaret(`<img src="${baseUrl}" class="kl-input-emoji-icon" />`)
        },

        insertHtmlAtCaret(html, element = document.querySelector('.my-input')) {
            // 获取当前元素的选中范围
            let range, selection
            if (window.getSelection) {
                // 大多数浏览器，包括IE9+
                selection = window.getSelection()
                if (selection.rangeCount > 0) {
                    range = selection.getRangeAt(0)
                } else {
                    // 如果没有选中范围，则创建一个新的范围
                    range = document.createRange()
                    range.selectNodeContents(element)
                    range.collapse(false) // 将范围设置在元素内容的末尾
                    selection.addRange(range)
                }
            } else if (document.selection && document.selection.createRange) {
                // 旧版本的IE
                range = document.selection.createRange()
            }

            // 删除选中范围的内容（如果有的话）
            if (range) {
                range.deleteContents()
                // 创建一个临时元素来保存HTML
                const tempEl = document.createElement('div')
                tempEl.innerHTML = html

                // 将临时元素的内容复制到范围中
                while (tempEl.firstChild) {
                    range.insertNode(tempEl.firstChild)
                }
            }
            // 移除选中状态
            if (selection.rangeCount > 0) {
                selection.removeAllRanges()
            }
        },

        getEmojis(row) {
            let params = {
                emoji_isshow: true,
            }
            if (this.getType(row) === 'object') {
                params = Object.assign(params, row)
            }
            this.$apis
                .get_emojis(params)
                .then((res) => {
                    this.emojiList = res.data
                })
                .catch((_) => {})
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-emoji {
    width: 100%;
    display: flex;
}
.my-btn {
    cursor: pointer;
    width: 70px;
    height: 65px;
    line-height: 65px;
    text-align: center;
    color: #fff;
    background-color: $primary;
}
.disabled-color {
    color: $info !important;
}
.user-header-img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.kl-input-cover {
    margin: 0 15px;
    flex: 1;
    line-height: 26px;

    .emoji-show-switch {
        width: 80px;
        display: flex;
        align-items: center;
        margin-top: 10px;
        padding: 3px 8px;
        border: 1px solid #bbb;
        border-radius: 3px;
        font-size: 14px;
        position: relative;

        .some-fun {
            width: 80px;
            height: 50px;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
            .sjx {
                position: absolute;
                bottom: -1px;
                left: 50%;
                transform: translate(-50%, 0);
                width: 0;
                height: 0;
                border: 10px solid;
                border-color: transparent transparent #ddd transparent;
                z-index: 999;
            }
            .emoji-list-pos {
                display: none;
                // opacity: 0;
                transition: all 0.3s;
                height: 220px;
                position: absolute;
                bottom: -220px;
                left: 0;
                width: 360px;
                border: 1px solid #ccc;
                border-radius: 4px;
                overflow-y: auto;
                box-shadow: 0 2px 2px #ccc;
                background-color: #fff;
                overflow-y: auto;
            }
            &:hover {
                .emoji-list-pos {
                    display: block;
                    opacity: 1;
                }
            }
        }
        &:hover {
            background-color: $primary;
            color: #f5f5f5;
            .some-fun {
                display: block;
            }
            svg:last-of-type {
                fill: #f5f5f5;
            }
        }
    }

    i.emoji {
        margin-right: 5px;
        position: relative;
        top: 3px;
        width: 23px;
        height: 23px;
        background: url('https://image.zlketang.com/public/news/others/micro_group/emoji/emoji/emoji.png')
            no-repeat 0px 0px;
    }
}
.emoji-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        .emoji-icon {
            width: 23px;
            height: 23px;
        }
        &:hover {
            background-color: #f0f0f0;
        }
    }
    i {
        width: 35px;
    }
}
.my-input {
    line-height: 26px;
    border-radius: 4px;
    min-height: 65px;
    overflow-y: auto;
    flex: 1;
    border: 1px solid #bbb;
    padding: 10px;
    outline: none;
    color: #555;
    max-height: 300px;
    overflow-y: auto;
    &:focus {
        border: 1px solid $primary;
    }
}
.im-input-container {
    flex-direction: column;
}
.im-input {
    line-height: 26px;
    border: 1px solid #fff;
    outline: none;
    color: #555;
    min-height: calc(200px - 40px - 30px);
    max-height: calc(200px - 40px - 30px);
    overflow-y: auto;
}
.kl-contenteditable-input {
    // width:360px
}
.el-icon-folder-1 {
    top: -1px;
}
.kl-emoje-input {
    position: absolute;
    left: -9999px;
    opacity: 0;
}
</style>
