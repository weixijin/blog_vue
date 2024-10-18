<template>
    <div class="mobile-home-header">
        <div class="mobile-home-header-container p-l-10 p-r-10">
            <i @click="backHome" class="el-icon-arrow-left f-24 f-500 m-r-10"></i>
            <div class="mobile-home-header-search-left pr">
                <i class="el-icon-search m-r-8"></i>
                <input
                    class="mobile-home-header-search-input"
                    type="text"
                    :class="['mobile-home-header-search-left-input f-14', isSearch ? 'bg-f2' : '']"
                    v-model="content"
                    @focus="inputFocus"
                    @keydown.enter="getArticles"
                />
            </div>

            <div class="m-l-10 f-15 c-555" @click="getArticles">搜索</div>
        </div>

        <!-- 历史搜索记录 及 猜你想搜 -->
        <div class="mobile-pos-history-recommend" v-show="isSearch" @click="isSearch = false">
            <div class="mobile-history-title">
                历史搜索
                <i class="el-icon-delete"></i>
            </div>
            <div class="mobile-history-content">
                <div
                    @click="getArticles(item)"
                    class="mobile-history-content-item"
                    v-for="item in historyList"
                    :key="item.id"
                >
                    <span>
                        {{ item.content }}
                    </span>
                    <i class="el-icon-close" @click.stop="delHistoryContent(item.id)"></i>
                </div>
            </div>

            <div class="mobile-recommend-title">猜你想搜</div>
            <div class="mobile-recommend-content">
                <div
                    @click="getArticles(item)"
                    class="mobile-recommend-content-item"
                    v-for="item in recommendList"
                    :key="item._id"
                >
                    {{ item.article_name }}
                </div>
            </div>
        </div>

        <!-- 搜索列表 -->
        <div class="search-list">
            <klScroll
                class="p-t-15 p-b-20"
                :list="list"
                :scrollHeight="scrollHeight"
                :pageOption="pageOption"
                @scroll="scrollTopNumber"
                @bottom="bottom"
            >
                <articleList @page="goPage" :list="list" />
            </klScroll>
        </div>
    </div>
</template>

<script>
import { getClickRanking, getArticle, searchArticles } from '@/api/blog'
import articleList from '@/views/homepage/home/mobile/components/article/index.vue'

export default {
    components: {
        articleList,
    },
    props: {
        from: {
            type: String,
            default: 'page',
        },
    },
    data() {
        return {
            isLoading: true,
            pageOption: {
                page: 1,
                limit: 10,
                total: 0,
            },
            list: [],
            scrollHeight: 0,
            content: '',
            isSearch: true,
            historyList: [],
            recommendList: [],

            articleInfo: {},
            scrollTop: 0,
        }
    },
    activated() {
        this.init()
    },
    mounted() {
        this.scrollHeight = document.documentElement.clientHeight - 40 || 0
    },
    computed: {
        ...Vuex.mapState(['userdata']),
        userCreateDate() {
            if (this.userdata) {
                let { register_time } = this.userdata
                return Math.ceil(
                    (Date.now() - new Date(register_time).getTime()) / 1000 / 60 / 60 / 24,
                )
            }
        },
    },

    methods: {
        bottom() {
            this.pageOption.page++
            let { page, limit, total } = this.pageOption
            if (page * limit >= total) return
            this.getList()
        },
        // 返回
        backHome() {
            this.scrollTop = 0
            this.list = []
            this.isSearch = true
            this.content = ''
            this.$emit('change', { name: this.from })
        },
        // 获取scroll组件的scrollTop
        scrollTopNumber(top) {
            this.scrollTop = top
        },
        // 去详情页
        goPage(_id) {
            let { path } = this.$route
            if (path.includes('/blog/page')) {
                this.$emit('reloadArticle', {
                    name: 'page',
                    _id,
                })
                return
            }
            this.$router.push('/blog/page/' + _id)
        },
        // 删除历史记录
        delHistoryContent(id) {
            this.setStore(
                'historyList',
                this.historyList.filter((item) => item.id !== id),
            )
        },
        // 选择了历史记录
        getArticles(row) {
            let { content, article_name } = row
            if (article_name || content) {
                // 历史记录
                this.content = article_name || content
            }

            if (this.content.trim().length === 0) {
                this.$klMessage('请输入搜索内容')
                return
            }

            this.list = []
            this.pageOption.page = 1
            this.getList()
        },
        // 获取文章列表
        getList() {
            let { content } = this
            let { page, limit } = this.pageOption
            let params = {
                page,
                limit,
                content,
            }

            this.saveHistory(content)
            this.isLoading = true
            searchArticles(params)
                .then((res) => {
                    let { data, total } = res.data
                    if (Array.isArray(data)) {
                        this.list = [...this.list, ...data]
                        this.pageOption.total = total - 0
                    }
                })
                .catch(() => {})
                .finally(() => {
                    this.isLoading = false
                    this.isSearch = false
                    this.getHistoryList()
                })
        },

        // 获取历史记录
        async getHistoryList() {
            let historyList = await this.getStore('historyList', [])
            let number = Math.floor(Math.random() * 10) + 10
            this.historyList = historyList.sort((a, b) => b.time - a.time).slice(0, number)
        },

        // 保存搜索历史
        async saveHistory(content) {
            let historyList = await this.getStore('historyList', [])

            let obj = {
                id: this.createId(),
                content,
                number: 1,
                time: Date.now(),
            }
            if (historyList.every((item) => item.content !== content)) {
                // 新的搜索内容
                historyList.push(obj)
            } else {
                // 旧的搜索内容
                historyList = historyList.map((item) => {
                    if (item.content === content) {
                        item.number++
                        item.time = Date.now()
                    }
                    return item
                })
            }

            this.setStore('historyList', historyList)
        },

        // 获取猜你想搜 拿最高点击前5~10条
        getRecommendList() {
            let limit = Math.floor(Math.random() * 5) + 10
            getClickRanking({ limit, cache: true }).then((res) => {
                this.recommendList = res?.data || []
            })
        },
        // 获取文章信息
        getArticleInfo() {
            if (this.getType(this.userdata) !== 'object') return
            let { article_anchor_point } = this.userdata
            getArticle({ _id: article_anchor_point, type: 1 })
                .then((res) => {
                    if (this.getType(res.data.article) == 'object') {
                        this.articleInfo = res.data.article
                        return
                    }
                    this.saveError('返回的文章信息不是对象')
                })
                .catch((err) => {})
        },

        // 初始化
        init() {
            let { list, scrollTop } = this
            if (list.length && scroll) {
                // 滚动到历史记录位置
                let el = $('.zl-scroll')
                if (!el) return
                el.scrollTop(scrollTop)
            }

            let el = document.querySelector('.mobile-home-header-search-input')
            if (el) {
                el.focus()
            }

            // 推荐
            this.getRecommendList()
            // 历史记录
            this.getHistoryList()

            // 添加物理返回拦截
            this.pushState()
        },
        //添加一条历史记录，防止用户物理返回
        pushState() {
            //同时监听物理返回
            window.addEventListener('popstate', this.deviceBackAction, false)
            //添加一条历史记录，防止用户物理返回，物理返回也应该调backAction方法
            if (history.state && history.state.page && history.state.page === 'dynamic') return
            history.pushState({ page: 'dynamic' }, null)
        },
        //设备物理返回时，
        deviceBackAction() {
            this.$emit('back')
        },

        // input聚焦
        inputFocus() {
            this.getHistoryList()
            this.isSearch = true
        },
    },
}
</script>

<style lang="scss" scoped>
.mobile-home-header {
    padding: 5px 0;
    background-color: #fff;
}
.mobile-home-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.mobile-home-header-search-left {
    flex: 1;
    padding: 8px 8px 8px 10px;
    background-color: #f2f2f2;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.mobile-home-header-search-left-input {
    flex: 1;
    background-color: #fff;
    height: 100%;
    padding-left: 10px;
    padding-right: 25px;
    color: #333;
}
.el-icon-search {
    color: #999;
}
.mobile-home-header-search-left-tip {
    margin-left: 8px;
    margin-right: 6px;
    color: #999;
    font-size: 14px;
}

.el-icon-circle-plus {
    font-size: 24px;
    color: #fc5531;
}
.bg-f2 {
    background-color: #f2f2f2;
}
.mobile-home-header-search-left-close-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    color: #aaa;
}

.obile-home-header-search-right-tip {
    min-width: 60px;
}

.mobile-pos-history-recommend {
    background-color: #fff;
    position: absolute;
    height: calc(100vh - 40px);
    left: 0;
    padding-left: 15px;
    padding-right: 5px;
    z-index: 100;
    .mobile-history-title {
        padding-right: 10px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: #333;

        i.el-icon-delete {
            font-size: 16px;
            color: #999;
        }
    }

    .mobile-history-content {
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        .mobile-history-content-item {
            margin-top: 10px;
            padding: 5px 10px;
            font-size: 14px;
            color: #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 10px;
            background-color: #f5f5f5;

            i.el-icon-close {
                margin-left: 10px;
                position: relative;
                top: 1px;
                font-size: 16px;
                color: #aaa;
            }
        }
    }

    .mobile-recommend-title {
        margin-top: 30px;
        font-size: 16px;
        color: #333;
    }

    .mobile-recommend-content {
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;

        .mobile-recommend-content-item {
            margin-top: 10px;
            padding: 5px 10px;
            font-size: 14px;
            color: #333;
            margin-right: 10px;
            background-color: #f5f5f5;
        }
    }
}

.close-mobile-user-tool-popup {
    display: block;
    width: 40px;
    margin: 0px auto;
    margin-bottom: 20px;
}

.search-list {
    height: calc(100vh - 40px);
}
::v-deep {
    .article-item-container {
        padding: 0 15px;
        margin-bottom: 10px;
        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }
    }
    .article-item-container {
        padding: 10px 15px;
    }
}
</style>
