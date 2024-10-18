<template>
    <div class="blog common-bg-1">
        <!-- 头部 -->
        <header class="flex-wrap flex-justify-between p-10 blog-user-articles-header">
            <h1 @click="$router.push('/home')" class="title_import">All DO BEST</h1>

            <div v-if="isAdmin">
                <el-button
                    :type="isHandle ? 'info' : 'success'"
                    size="small"
                    @click="changeStatus"
                    >{{ isHandle ? '放弃' : '批量处理' }}</el-button
                >
                <el-button type="primary" size="small" class="pc_btn" @click="getUpdatas"
                    >近期跟新</el-button
                >
            </div>
        </header>
        <main>
            <!-- 左侧导航 -->
            <Nav :navlist="navlist" @getArticles="init" />
            <div class="articles-container-page">
                <div
                    class="flex-wrap flex-center-wrap flex-justify-between check-box"
                    v-show="isHandle"
                >
                    <div>
                        <el-checkbox v-model="checkedAll">{{
                            checkedAll ? `取消全选` : '全选'
                        }}</el-checkbox>

                        <span
                            class="f-14 c-warning m-l-20"
                            v-show="selectNumber"
                            @click="changeClassVisable = true"
                        >
                            开始处理
                        </span>
                    </div>

                    <div class="c-primary f-14">已选择 {{ selectNumber }} 篇文章</div>
                </div>
                <userArticleList
                    class="articles-scroll-page"
                    :list="articlesList"
                    :pageOption="pageOption"
                    :scrollHeight="scrollHeight"
                    :isHandle="isHandle"
                    @bottom="bottom"
                    @goPage="goPage"
                    @scroll="scroll"
                    @delete="deleteFun"
                ></userArticleList>
            </div>
        </main>

        <kl-back-top el=".kl-scroll" />

        <!-- 处理移动class的弹窗 -->
        <updateArticleClassDialog
            :selectNumber="selectNumber"
            :navList="filterNavList()"
            :articlesList="articlesList"
            v-model="changeClassVisable"
            @confirm="confirmUpdate"
        ></updateArticleClassDialog>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import userArticleList from '@/views/blog/home/home/components/user-article-list.vue'
import updateArticleClassDialog from '@/views/blog/home/home/components/updateArticleClassDialog.vue'
import {getArticles } from '@/api/blog'
import httpApi from '@/api/blog/admin.js'

const pageOption = {
    page: 1,
    limit: 50,
    total: 0,
}
export default {
    components: {
        Nav,
        userArticleList,
        updateArticleClassDialog,
    },
    name: 'home',
    data() {
        return {
            changeClassVisable: false,
            checkedAll: false,
            isHandle: false,
            isLoading: false,
            clientHeight: 0,
            content: '',
            isShow: true,
            articlesList: [],
            scrollHeight: 0,
            pageOption: this.deepClone(pageOption),
            isUpdata: false, // 是否是近期更新
        }
    },

    async created() {
        await this.GET_NAV_LIST()
        this.init()
    },
    mounted() {
        this.getScrollHeight()
        window.addEventListener('resize', this.getScrollHeight)
    },
    async activated() {
        await this.$nextTick()
        let { scrollTop } = this
        let scroll_el = document.querySelector('.kl-scroll')
        if (scrollTop && scroll_el) {
            scroll_el.scrollTop = scrollTop
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'class_id','navlist']),
        ...Vuex.mapGetters(['isAdmin']),
        selectNumber() {
            return this.articlesList.filter((item) => item.isHandle).length
        },
    },
    watch: {
        checkedAll(val) {
            this.articlesList = this.articlesList.map((item) => {
                item.isHandle = val
                return item
            })
        },
        isHandle(val) {
            this.getScrollHeight()
        },
    },
    methods: {
        ...Vuex.mapActions(['GET_NAV_LIST']),
        deleteFun({ _id }) {
            this.articlesList = this.articlesList.filter((item) => item._id !== _id)
        },
        filterNavList() {
            return this.navlist.filter((item) => item._id !== this.class_id)
        },

        // 确定移除
        confirmUpdate() {
            this.changeClassVisable = false
            this.init()
        },
        // 切换批量处理以及放弃的状态
        changeStatus() {
            this.isHandle = !this.isHandle
            this.articlesList = this.articlesList.map((item) => {
                item.isHandle = false
                return item
            })
        },
        // 保存滚动距离
        scroll(scrollTop) {
            this.scrollTop = scrollTop
        },
        // 左侧导航切换
        init() {
            this.isUpdata = false
            this.checkedAll = false
            this.isHandle = false
            this.scrollTop = 0
            Object.assign(this.pageOption, pageOption)
            this.articlesList = []
            this.getArticles()
        },
        // 触底
        bottom() {
            let { page, limit } = this.pageOption
            if (page * limit >= this.pageOption.total) {
                return
            }
            this.pageOption.page++
            this.getArticles()
        },

        // 跳转到后台
        goLogin() {
            this.$store.state.userdata
                ? this.$router.push('/blog/admin')
                : this.$router.push('/login')
        },
        // 获取近期更新
        async getUpdatas() {
            this.isUpdata = true
            this.pageOption = this.deepClone(pageOption)
            this.articlesList = []
            this.getArticles()
        },

        // 获取Articles数据
        async getArticles() {
            let { class_id, navlist, isUpdata } = this
            let { page, limit } = this.pageOption
            let params = {
                page,
                limit,
            }

            if (class_id) {
                params.class_id = class_id
            } else if (navlist && navlist[0]) {
                params.class_id = navlist[0]._id
            }

            if (!params.class_id) {
                return this.$message.error('你可能不存在文章分类数据，请先去创建分类，创建文章')
            }

            if (!isUpdata) {
                // 获取文章列表
                getArticles(params)
                    .then((res) => {
                        let { list, total } = res.data
                        if (Array.isArray(list)) {
                            // 统一添加 isHandle 属性 控制是否是处于批量处理状态
                            list = list.map((item) => {
                                item.isHandle = false
                                return item
                            })
                            this.articlesList = [...this.articlesList, ...list]
                            this.pageOption.total = total - 0
                        }
                    })
                    .catch(() => {})
                return
            }

            // 获取近期更新列表
            params.type = '4'
            httpApi
                .get_mobile_home_list(params)
                .then((res) => {
                    if (res.data) {
                        let { list, total } = res.data
                        if (Array.isArray(list)) {
                            // 统一添加 isHandle 属性 控制是否是处于批量处理状态
                            list = list.map((item) => {
                                item.isHandle = false
                                return item
                            })
                            this.articlesList = [...this.articlesList, ...list]
                            this.pageOption.total = total - 0
                        }
                    }
                })
                .catch(() => {})
        },

        // 设置滚动区域高度
        async getScrollHeight() {
            await this.$nextTick()
            // 获取 rticles-scroll-page 距离顶部的距离
            let el = document.querySelector('.articles-scroll-page')
            if (!el) {
                // this.$message.error('获取不到元素,请刷新页面')
                return
            }
            let { top } = el.getBoundingClientRect()
            // 获取可视区高度
            let clientHeight = document.documentElement.clientHeight
            // 获取滚动区域高度
            this.scrollHeight = clientHeight - top
        },

        // 跳转到详情页
        goPage({ row }) {
            this.$router.push(`/blog/page/${row._id}?from=blog_home`)
        },
    },
}
</script>

<style lang="scss" scoped>
.blog-user-articles-header {
    box-shadow: 0 0 10px #ccc;
}
.title_import {
    background-image: linear-gradient(to right, orange, purple);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 30px;
}
.blog {
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    cursor: pointer;
}
main {
    display: flex;
    article {
        padding: 20px;
        height: calc(100vh - 50px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
}
article::-webkit-scrollbar {
    display: none;
}
.home_search {
    max-width: 200px;
}
.articles-container-page {
    height: calc(100vh - 60px);
}

.check-box {
    padding: 20px 10px 10px;
}

::v-deep {
    .kl-scroll-page-bottom {
        height: 100px;
    }
}
</style>
