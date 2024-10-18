<template>
    <div :class="['comment-top-item m-t-20',chatItemClassName]">
        <div class="left-user-img">
            <img :src="parseResourceUrl(replaylist.author_id.header_img)" alt="" />
        </div>
        <div class="comment-top-list">
            <div class="top-comment">
                <div class="top-authorname">
                    <span class="user-name">
                        {{
                            replaylist.author_id.username
                                ? replaylist.author_id.username
                                : replaylist.author_id.email
                        }}
                    </span>
                    <span
                        class="louzhu"
                        v-if="replaylist.top_author_id === replaylist.author_id._id"
                    >
                        楼主
                    </span>
                    <span
                        v-if="replaylist.be_reply_user_id._id !== replaylist.author_id._id"
                        class="m-l-r-5"
                    >
                        回复
                    </span>
                    <span v-if="replaylist.be_reply_user_id._id !== replaylist.author_id._id">
                        {{
                            replaylist.be_reply_user_id.username
                                ? replaylist.be_reply_user_id.username
                                : replaylist.be_reply_user_id.email
                        }}
                    </span>
                </div>
                <div class="top-content-info" v-html="replaylist.comment_content"></div>
                <div class="top-fun">
                    <span class="time">
                        {{ replaylist.comment_create_time | filterTime(that) }}
                    </span>
                    <kl-svg
                        @click="putComment(replaylist, '1')"
                        :class="[
                            'c-white',
                            replaylist.up_user_ids.includes(userdata._id) ? 'zan-svg' : '',
                            'cu',
                        ]"
                        name="iconfontdianzan"
                    ></kl-svg>
                    <span class="zan" @click="putComment(replaylist, '1')">
                        {{ replaylist.up_number }}
                    </span>

                    <kl-svg
                        @click="putComment(replaylist, '2')"
                        :class="[
                            'c-white',
                            replaylist.lower_user_ids.includes(userdata._id) ? 'cai-svg' : '',
                            'cu',
                        ]"
                        name="cai"
                    ></kl-svg>
                    <span class="cai" @click="putComment(replaylist, '2')">
                        {{ replaylist.lower_number }}
                    </span>

                    <span @click="openReplayEmoji(replaylist)" class="c-info m-l-20 cu">
                        回复
                    </span>
                    <span
                        v-if="userdata._id === replaylist.author_id._id"
                        @click="delComment(replaylist)"
                        class="c-danger m-l-20 cu"
                    >
                        删除
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { myTime } from '@/tool/index.js'
import adminApi from '@/api/blog/admin'
export default {
    components: {},
    props: {
        article_id: {
            type: String,
            default: '',
        },
        replaylist: {
            type: Object,
            default: {},
        },
        topIndex: {
            type: Number,
            require: true,
        },
        maxWidth:{
            type: Number,
            default: 960,
        }
    },
    data() {
        return {
            that: this,
            chatItemClassName:this.createId()
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
    },

    filters: {
        filterTime(val, that) {
            if (!that.isPc()) {
                return myTime(val - 0, 2)
            }
            return that.moment(val - 0)
        },
    },
    watch: {
        replaylist: {
            handler(val) {
                this.replaylist = val
                //   return newName
            },
            deep: true, // 主要是深度监听对象，数组
            immediate: true, // 值最初时候watch就执行
        },
    },
    mounted() {
        let { chatItemClassName,maxWidth } = this
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
        putComment(...args) {
            this.$emit('putComment', ...args)
        },
        // 打开评论回复
        openReplayEmoji(row) {
            this.$emit('openReplayEmoji', { row, index: this.topIndex })
            //
        },

        // 删除评论
        delComment(row) {
            this.$confirm('删除评论后，评论下所有回复都会被删除是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    let params = {
                        _id: row._id,
                    }
                    if (this.article_id) {
                        params.article_id = this.article_id
                    }
                    adminApi
                        .delComment(params)
                        .then((res) => {
                            this.$message.success(res.msg)

                            this.$emit('delReplayOne', row)
                        })
                        .catch((_) => {})
                })
                .catch((_) => {})
        },
    },
}
</script>

<style lang="scss" scoped>
.comment-top-item {
    margin-bottom: 20px;
    display: flex;
    &:nth-last-of-type(1) {
        margin-bottom: 0;
    }
    .left-user-img {
        margin-right: 15px;
        img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
    }

    .comment-top-list {
        flex: 1;
        // padding-bottom: 20px;
        .top-comment {
            .top-content-info {
                color: #555;
                margin: 10px 0;
                max-width: 200px;
                div {
                    color: #555;
                }
            }
            .top-authorname {
                height: 40px;
                line-height: 40px;
                span {
                    color: #666;
                }
                .louzhu {
                    padding: 0;
                    font-size: 12px;
                    background-color: #ff6699;
                    color: #fff;
                    padding: 0 3px;
                }
            }

            .top-fun {
                display: flex;
                color: $c-white;
                span {
                    font-size: 14px;
                }
                .time {
                    margin-right: 30px;
                }
                .zan {
                    margin-left: 5px;
                    margin-right: 20px;
                }
                .cai {
                    margin-left: 5px;
                }
            }
        }
    }
}

.cai-svg {
    fill: $primary !important;
}
.zan-svg {
    fill: $primary !important;
}
</style>
