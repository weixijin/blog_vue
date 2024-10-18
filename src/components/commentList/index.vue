<template>
    <div class="com-comments" ref="commentsRef">
        <div class="comment-header">
            <div class="left-total">
                <span class="f-24"> 评论 </span>
                <span> {{ pageOption.total }} </span>
            </div>
            <div class="right-type">
                <span
                    @click="setCommentType('1')"
                    :class="[+commentType === 1 ? 'active-type' : '']"
                >
                    最热
                </span>
                <span class="m-r-l-10"> | </span>
                <span
                    @click="setCommentType('2')"
                    :class="[+commentType === 2 ? 'active-type' : '']"
                >
                    最新
                </span>
            </div>
        </div>
        <kl-emoji class="m-t-30" ref="pushCommentRef" @postComment="postComment" />

        <div class="comment-list-content">
            <div
                v-for="(item, index) in commentList"
                class="comment-top-item m-t-30"
                :key="item._id"
            >
                <div class="left-user-img">
                    <img :src="parseResourceUrl(item.author_id.header_img)" alt="" />
                </div>
                <div class="comment-top-list">
                    <div class="top-comment">
                        <div class="top-authorname">
                            {{
                                item.author_id.username
                                    ? item.author_id.username
                                    : item.author_id.email
                            }}
                        </div>
                        <div class="top-content-info" v-html="item.comment_content"></div>
                        <div class="top-fun">
                            <span class="time">
                                {{ item.comment_create_time | filterTime(that) }}
                            </span>
                            <kl-svg
                                @click="putComment(item, '1')"
                                :class="[
                                    'c-white',
                                    item.up_user_ids.includes(userdata._id) ? 'zan-svg' : '',
                                    'cu',
                                ]"
                                name="iconfontdianzan"
                            ></kl-svg>
                            <span class="zan" @click="putComment(item, '1')">
                                {{ item.up_number }}
                            </span>

                            <kl-svg
                                @click="putComment(item, '2')"
                                :class="[
                                    'c-white',
                                    item.lower_user_ids.includes(userdata._id) ? 'cai-svg' : '',
                                    'cu',
                                ]"
                                name="cai"
                            ></kl-svg>
                            <span class="cai" @click="putComment(item, '2')">
                                {{ item.lower_number }}
                            </span>

                            <span
                                @click="openReplayEmoji({ row: item, index })"
                                class="c-info m-l-20 cu"
                            >
                                回复
                            </span>
                            <span
                                v-if="userdata._id === item.author_id._id"
                                @click="delComment(item)"
                                class="c-danger m-l-20 cu"
                            >
                                删除
                            </span>
                        </div>
                        <!-- 回复信息列表 -->
                        <div class="reply-comments" v-if="item.children && item.children.length">
                            <comment-item
                                :article_id="article_id"
                                :topIndex="index"
                                class="reply-item"
                                :replaylist="itey"
                                v-for="itey in item.children"
                                :key="itey._id"
                                @resetCommentList="resetCommentList"
                                @openReplayEmoji="openReplayEmoji"
                                @putComment="putComment"
                                @delReplayOne="delReplayOne"
                            ></comment-item>
                        </div>

                        <!-- 回复输入 -->
                        <kl-emoji
                            class="m-t-20"
                            v-if="replayCommentParams.showIndex === index"
                            @postComment="replayComment"
                            ref="replayCommentRef"
                        ></kl-emoji>
                    </div>
                </div>
            </div>

            <p class="flex-center c-999 h-60" v-if="commentList.length != 0 && !isLoading">
                到底了
            </p>
        </div>
        <div class="no-comment flex-center" v-if="commentList.length === 0 && !isLoading">
            还没有评论，快来抢沙发吧！
        </div>
    </div>
</template>

<script>
import { myTime } from '@/tool/index.js'
import adminApi from '@/api/blog/admin'
import CommentItem from './commentItem.vue'
export default {
    name: 'CommentList',
    components: { CommentItem },
    props: {
        article_id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isLoading: true,
            that: this,
            pageOption: {
                page: 1,
                limit: 1000,
                tital: 0,
                top_total: 0,
            },
            commentList: [],
            commentType: '1',
            replayCommentParams: {
                comment_content: '',
                showIndex: '',
                row: {},
            },
        }
    },
    async mounted() {
        await this.sleep(100)
        let {commentsRef} = this.$refs
        if(!commentsRef) return
        let ob = new IntersectionObserver((entries) => {
            let enter = entries[0]
            if (enter.isIntersecting) {
                this.getComments()
                ob.unobserve(commentsRef)
            }
        })
        ob.observe(commentsRef)
    },
    watch: {
        'replayCommentParams.showIndex'(val) {
            this.replayCommentParams.comment_content = ''
            this.replayCommentParams.index = ''
        },
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

    methods: {
        // 子评论删除的特殊处理方式
        // 只删除当前项评论--拿到后端获取到的最新的当前top评论及子评论，做替换
        delReplayOne(row) {
            if (!this.userdata) return this.$message.warning('请先登录')
            let { _id, top_id } = row
            // 找到顶层
            let top_comment = this.commentList.find((item) => item._id === top_id)

            if (top_comment) {
                //  修改这层的children数据  需要删除这项及回复这项的子评论
                top_comment.children = top_comment.children.filter((item) => {
                    if (!(item._id === _id || item.parent_id === _id)) {
                        return item
                    }
                })
                this.pageOption.total = this.pageOption.total - 1
            }
        },
        // 赞或踩
        putComment(row, type) {
            if (!this.userdata) return this.$message.warning('请先登录')
            let params = {
                _id: row._id,
                type,
            }

            if (this.article_id) {
                params.article_id = this.article_id
            }

            adminApi
                .putComment(params)
                .then((res) => {
                    this.$message.success(res.msg)
                    // this.resetCommentList()
                    let { top_total } = this.pageOption
                    if (+top_total !== +res.data.top_total) {
                        this.$message.warning('评论数量发生变化，重新拉取评论成功')
                        this.resetCommentList()
                        return
                    }
                    // 不再去拉数据，选择本地处理
                    let { up_user_ids, lower_user_ids, up_number, lower_number } = row
                    let user_id = this.userdata._id

                    let newobj = {}
                    if (+type === 1) {
                        // 赞
                        if (up_user_ids.includes(user_id)) {
                            up_user_ids.splice(up_user_ids.indexOf(user_id), 1)
                            up_number -= 1
                        } else {
                            up_user_ids.push(user_id)
                            up_number += 1
                        }

                        if (lower_user_ids.includes(user_id)) {
                            lower_user_ids.splice(lower_user_ids.indexOf(user_id), 1)
                            lower_number -= 1
                        }

                        newobj = {
                            up_user_ids,
                            lower_user_ids,
                            up_number,
                            lower_number,
                        }
                    }

                    if (+type === 2) {
                        // 踩
                        if (up_user_ids.includes(user_id)) {
                            up_user_ids.splice(up_user_ids.indexOf(user_id), 1)
                            up_number -= 1
                        }

                        if (lower_user_ids.includes(user_id)) {
                            lower_user_ids.splice(lower_user_ids.indexOf(user_id), 1)
                            lower_number -= 1
                        } else {
                            lower_user_ids.push(user_id)
                            lower_number += 1
                        }

                        newobj = {
                            up_user_ids,
                            lower_user_ids,
                            up_number,
                            lower_number,
                        }
                    }

                    row = Object.assign(row, newobj)
                })
                .catch((_) => {})
        },

        // 设置返回评论的方式
        setCommentType(type) {
            if (!this.userdata) return this.$message.warning('请先登录')
            this.commentType = type
            this.resetCommentList()
        },
        // 打开评论回复
        openReplayEmoji({ row, index }) {
            if (!this.userdata) return this.$message.warning('请先登录')
            this.replayCommentParams.showIndex = index
            this.replayCommentParams.row = row

            this.$nextTick(() => {
                // 自动聚焦
                this.$refs.replayCommentRef[0].focusEvent()
            })
        },
        // 回复评论
        replayComment(comment_content) {
            if (!this.userdata) return this.$message.warning('请先登录')
            let { _id, author_id, top_id, is_top } = this.replayCommentParams.row

            let params = {
                comment_content,
                parent_id: _id,
                is_top: '0',
                be_reply_user_id: author_id._id,
            }
            if (+is_top === 1) {
                params.top_id = _id
            } else {
                params.top_id = top_id
            }

            if (this.article_id) {
                params.article_id = this.article_id
            }

            adminApi
                .replayComment(params)
                .then((res) => {
                    this.$message.success(res.msg)
                    this.replayCommentParams.showIndex = ''
                    let { top_total } = this.pageOption
                    if (+top_total !== +res.data.top_total) {
                        this.$message.warning('评论数量发生变化，重新拉取评论成功')
                        this.resetCommentList()
                        return
                    }

                    // 回复就需要更新当前top项的children数据
                    let oldLength = 0
                    let newlength = 0
                    this.commentList = this.commentList.map((item) => {
                        if (item._id === params.top_id) {
                            oldLength = item.children.length
                            item.children = res.data.data
                            newlength = item.children.length
                        }
                        return item
                    })

                    this.pageOption.total = this.pageOption.total + (newlength - oldLength)
                })
                .catch((_) => {})
        },

        // 删除评论
        delComment(row) {
            if (!this.userdata) return this.$message.warning('请先登录')
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
                            let { top_total } = this.pageOption
                            if (+top_total - 1 !== +res.data.top_total) {
                                this.$message.warning('评论数量发生变化，重新拉取评论成功')
                                this.resetCommentList()
                                return
                            }
                            // 当是主评论时，删除主评论后，需要删除下面的回复
                            if (+row.is_top === 1) {
                                let length = 1
                                this.commentList = this.commentList.filter((item) => {
                                    if (item._id !== row._id) {
                                        return item
                                    }
                                    length = item.children.length + length
                                })

                                this.pageOption.total = this.pageOption.total - length
                                this.pageOption.top_total = top_total - 1
                            } else {
                            }
                        })
                        .catch((_) => {})
                })
                .catch((_) => {})
        },
        // 重置评论列表
        resetCommentList(data) {
            this.pageOption = {
                page: 1,
                limit: 1000,
                tital: 0,
                top_total: 0,
            }
            this.commentList = []
            this.getComments(data)
        },
        // 发送消息
        postComment(val) {
            if (!this.userdata) return this.$message.warning('请先登录')
            let params = {}

            if (!val) return this.$message.warning('请输入内容')
            params.comment_content = val
            params.is_top = '1'
            // console.log('params', params)
            if (this.article_id) {
                params.article_id = this.article_id
            }
            adminApi
                .postComment(params)
                .then((res) => {
                    this.$message.success('发布成功')
                    this.$refs.pushCommentRef.clearVal()

                    // 新增了顶层评论，就重新拉数据 需要手动将新增的这条数据提前
                    // 需要将这条数据提前
                    let { top_total, total } = this.pageOption
                    if (top_total + 1 === +res.data.top_total) {
                        this.pageOption.top_total = res.data.top_total
                        this.pageOption.total = total + 1
                        this.commentList = [res.data.data, ...this.commentList]
                        return
                    }
                    this.$message.warning('评论数量发生变化，重新拉取评论成功')
                    this.resetCommentList()
                })
                .catch((_) => {})
        },
        // 获取评论
        getComments(row) {
            let { page, limit, top_total } = this.pageOption

            let params = {
                page,
                limit,
                type: this.commentType + '',
            }
            if (this.article_id) {
                params.article_id = this.article_id
            }

            this.isLoading = true
            adminApi
                .getComments(params)
                .then((res) => {
                    this.pageOption.total = res.data.total || 0
                    this.pageOption.top_total = res.data.top_total || 0
                    if (
                        +top_total !== +res.data.top_total &&
                        +top_total !== 0 &&
                        +res.data.top_total !== 0
                    ) {
                        this.$message.warning('评论数量发生变化，重新拉取评论成功')
                        this.resetCommentList()
                    } else {
                        this.commentList = [...this.commentList, ...res.data.data]
                    }
                })
                .catch((_) => {})
                .finally(() => {
                    this.isLoading = false
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.com-comments {
    min-height: 450px;
}
.cai-svg {
    fill: $primary !important;
}
.zan-svg {
    fill: $primary !important;
}

.comment-top-item {
    margin-bottom: 20px;
    display: flex;
    &:nth-last-of-type(1) {
        margin-bottom: 0;
    }
    .left-user-img {
        margin-right: 20px;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .comment-top-list {
        flex: 1;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        .top-comment {
            .top-content-info {
                color: #555;
                margin: 10px 0;
                div {
                    color: #555;
                }
            }
            .top-authorname {
                height: 40px;
                line-height: 40px;
                color: #666;
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

.comment-header {
    display: flex;
    align-items: flex-end;
    .left-total {
        span.f-24 {
            font-size: 24px;
        }

        span.comment-total {
            font-size: 16px;
        }
    }

    .right-type {
        position: relative;
        top: -3px;
        margin-left: 30px;
        span {
            cursor: pointer;
            &:hover {
                color: $primary;
            }
        }
        span.m-r-l-10 {
            margin: 0 5px;
        }
        .active-type {
            color: $primary;
        }
    }
}
.no-comment {
    min-height: 278px;
}
</style>
