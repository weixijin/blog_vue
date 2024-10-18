<template>
    <div class="mobile-home-page">
        <mobileHomeHeader
            @change="
                (row) => {
                    $emit('change', row)
                }
            "
            @getArticles="getArticles"
        />
        <div class="flex-center-wrap nav-container">
            <kl-nav :rightNum="10" :active="active" :list="navList" @change="navChange" />
            <i class="el-icon-s-operation nav-right-icon"></i>
        </div>
        <div class="list-container">
            <!-- <v-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh"> -->
            <kl-scroll
                :pageOption="pageOption"
                :list="list"
                :scrollHeight="scrollHeight"
                @bottom="bottomEvent"
                @scroll="klScrollEvent"
            >
                <div class="h-10 bg-fff" v-if="list.length > 0"></div>
                <articleList @page="goPage" :list="list" />
                <kl-no-data v-if="list.length == 0 && !isLoading"></kl-no-data>
            </kl-scroll>
            <!-- </v-pull-refresh> -->
        </div>

        <kl-back-top ref="myScrolLeftRef" el=".zl-scroll" />
    </div>
</template>

<script>
// 头部搜索组件
import mobileHomeHeader from './components/mobile-home-header/index.vue'
import articleList from '@/views/homepage/home/mobile/components/article/index.vue'

import httpApi from '@/api/blog/admin.js'
import { searchArticles } from '@/api/blog'

export default {
    components: {
        mobileHomeHeader,
        articleList,
    },
    data() {
        return {
            isRefreshLoading: false,
            isLoading: true,
            navList: [
                {
                    value: '1',
                    label: '全部',
                },
                {
                    value: '2',
                    label: '点击排行',
                },
                {
                    value: '3',
                    label: '阅读记录',
                },

                {
                    value: '4',
                    label: '最近更新',
                },
            ],
            active: '3',
            scrollHeight: 0,
            visable: false,
            list: [], // 文章列表
            searchOption: {
                total: 0,
                isSearch: false, // 记录当前是否是搜索状态
                content: '',
                content_old: '',
            },
            pageOption: {
                page: 1,
                limit: 10,
                total: 0,
            },
        }
    },
    created() {
        this.init()
    },
    activated() {
        // 滚动到历史记录位置
        let el = $('.zl-scroll')
        if (!el) return
        // 无需动画定位到历史浏览位置
        el.scrollTop(this.$route.meta.top)
    },
    methods: {
        klScrollEvent(e) {
            this.$route.meta.top = e
        },
        async onRefresh() {
            await this.sleep()
            this.init()
        },

        // 阅读更多
        goPage(id) {
            this.$router.push(`/blog/page/${id}`)
        },

        // 导航栏切换
        navChange(val) {
            if (val !== this.active) {
                this.list = []
                this.pageOption = Object.assign(this.pageOption, {
                    page: 1,
                    limit: 10,
                    total: 0,
                })
            }
            this.active = val
            this.getList()
        },
        // 获取列表
        getList() {
            this.isLoading = true
            let { active } = this
            let params = {
                type: active,
                page: this.pageOption.page,
                limit: this.pageOption.limit,
            }
            httpApi
                .get_mobile_home_list(params)
                .then((res) => {
                    if (res.data) {
                        let { list, total } = res.data

                        if (this.active == 3) {
                            // 阅读记录类型需要单独处理
                            list = list.filter((item) => {
                                if (this.getType(item.article_id) == 'object') {
                                    let {
                                        _id,
                                        article_need_token,
                                        class_id,
                                        article_bck_url,
                                        article_name,
                                        article_keywords,
                                        article_watch_numbers,
                                    } = item.article_id

                                    item = Object.assign(item, {
                                        _id,
                                        class_id,
                                        article_keywords,
                                        article_name,
                                        article_bck_url,
                                        article_watch_numbers,
                                        article_need_token,
                                    })
                                    item.article_updata_time = this.klDateFormat(
                                        item.updata_time - 0,
                                    )
                                    return item
                                }
                            })
                        }

                        this.list = [...this.list, ...list]
                        this.pageOption.total = total
                    }
                })
                .catch(() => {})
                .finally(() => {
                    this.isRefreshLoading = false
                    this.isLoading = false
                })
        },
        // 触底监听
        bottomEvent() {
            this.pageOption.page++
            this.navChange(this.active)
        },
        // 初始化
        init() {
            this.reset()
            this.setScrollHeight()
            this.navChange(this.active)
        },
        reset() {
            this.list = []
            this.pageOption = Object.assign(this.pageOption, {
                page: 1,
                limit: 10,
                total: 0,
            })
        },

        // 设置滚动区域高度
        async setScrollHeight() {
            await this.$nextTick()
            this.scrollHeight = document.documentElement.clientHeight - 90
        },
        // 搜索拉取数据
        getArticles(content) {
            if (!content) return this.$klMessage('请输入搜索内容')
            this.saveHistory(content)
            this.list = []
            this.isLoading = true
            searchArticles({
                content,
            })
                .then((res) => {
                    this.list = res.data
                })
                .catch()
                .finally(() => {
                    this.isLoading = false
                })
        },
        // 保存搜索历史
        async saveHistory(content) {
            let historyList =await this.getStore('historyList',historyList)

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

            this.setSore('historyList', historyList)
        },
    },
}
</script>

<style lang="scss" scoped>
.mobile-home-page {
    max-width: 100vw;
    overflow-x: hidden;
    background-color: #f1f1f1;
}
.list-container {
    background-color: #f1f1f1;
}

::v-deep {
    .kl-back-top {
        right: 20px !important;
    }
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
    .kl-no-data {
        padding-top: 100px;
        height: calc(100vh - 90px);
        background-color: #fff;
        img {
            width: 150px;
        }
    }
}
.nav-container {
    padding: 0 15px;
    background-color: #fff;
}
.nav-right-icon {
    font-size: 20px;
    color: #999;
    margin-left: 10px;
    position: relative;
    top: -2px;
}
</style>
