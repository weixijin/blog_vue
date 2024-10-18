<template>
    <div :class="['w-200 m-t-15 user-article-item',isMaxScreen?'w-300':'']" @click="goArticle">
        <div :class="['pr user-article-img-cover h-120',isMaxScreen?'h-180':'']">
            <e-image
                :src="
                    articleInfo.article_bck_url
                "
                :class="['user-article-img-cover-img b-r-4 w-200 h-120',isMaxScreen?'w-300 h-180':'']"
                @click.prevent="()=>{}"
            />
            <div
                :class="[
                    'pa article-type f-12',
                    articleInfo.article_need_token == 2 ? 'c-warning' : 'c-fff',
                ]"
            >
                {{ articleInfo.article_need_token == 2 ? '私有' : '公开' }}
            </div>
            <!-- 是否选中的checkbox -->
            <div class="pa article-checkbox">
                <div class="article-checkbox-mask" @click.stop="goArticle"></div>
                <el-checkbox
                    v-show="isHandle"
                    size="medium"
                    v-model="articleInfo.isHandle"
                ></el-checkbox>
            </div>

            <!-- hover出现的蒙层 -->
            <div class="mask-article-info pa c-fff f-14">
                <div class="ell f-500 f-12">浏览量：{{ articleInfo.article_watch_numbers }}</div>
                <div class="m-t-10 ell f-12">
                    作者：{{ articleInfo.author_id && articleInfo.author_id.username }}
                </div>
            </div>
        </div>
    
        <div :class="[articleInfo.isRead ? 'op-50' : '']">
            <h2 class="ell f-500 m-t-10 f-14">
                {{ articleInfo.article_name }}
            </h2>

            <div class="flex-wrap flex-justify-between flex-center-wrap f-12 m-t-6">
                <div class="c-666">
                    近期修改：<span class="c-666 f-12">{{
                        formateTime(articleInfo.article_updata_time)
                    }}</span>
                </div>

                <el-dropdown @command="commandFun" v-if="isAdmin">
                    <div class="flex-wrap flex-column-wrap flex-justify-between h-16 dors">
                        <div class="dor" v-for="item in 3" :key="item"></div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-if="type === 'ac'"
                            command="prevew"
                            icon="el-icon-full-screen"
                            >预览</el-dropdown-item
                        >
                        <el-dropdown-item command="delete" icon="el-icon-delete"
                            >删除</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { myTime } from '@/tool/index.js'
import { delArticle } from '@/api/blog'
export default {
    props: {
        type: {
            type: String,
            default: 'common',
        },
        articleInfo: {
            type: Object,
            default: () => {
                return {
                    isHandle: false,
                }
            },
        },
        isHandle: {
            // 批量处理
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isMaxScreen:false
        }
    },
    computed: {
        ...Vuex.mapGetters(['isAdmin']),
    },
    watch: {
        articleInfo: {
            handler(val) {
                this.articleInfo = val
            },
            deep: true,
        },
    },
    mounted(){
        // 获取可视区宽度
        const {width} = this.getViewportSize()
        if(width > 1920){
            this.isMaxScreen = true
        }
    },
    methods: {
        commandFun(type) {
            switch (type) {
                case 'prevew':
                    this.$emit('openPrevew', this.articleInfo)
                    break
                case 'delete':
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            delArticle({ _id: this.articleInfo._id })
                                .then(() => {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!',
                                    })
                                    this.$emit(type, this.articleInfo)
                                })
                                .catch(() => {})
                        })
                        .catch(() => {})

                    break
                default:
                    break
            }
        },
        formateTime(time) {
            return myTime(time)
        },
        goArticle() {
            let { isHandle, articleInfo } = this
            if (isHandle) {
                this.articleInfo.isHandle = !this.articleInfo.isHandle
                return
            }
            this.$emit('goPage', { row: articleInfo })
        },
    },
}
</script>

<style lang="scss" scoped>
.article-type {
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
    border-radius: 4px 0 4px 0;
}
.user-article-img-cover{
    width:100%;
}
.user-article-img-cover:hover {
    .article-type {
        display: none;
    }
    .mask-article-info {
        display: block;
    }
}
.mask-article-info {
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    padding: 15px;
}

.dors {
    padding: 0 2px 0 15px;
}
.dor {
    width: 4px;
    height: 4px;
    background: #999;
    border-radius: 2px;
}
.article-checkbox {
    top: 0;
    right: 0;
    z-index: 100;
    width: 16px;
    height: 16px;
}
.article-checkbox-mask {
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    // background-color: red;
}
.user-article-img-cover-img {
    width: 100%;
    object-fit: cover;
}
.op-50 {
    opacity: 0.5;
}
.h-180{
    height: 180px;
}
</style>
