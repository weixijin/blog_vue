<template>
    <div :class="['ac-page flex-wrap', IS_PC ? '' : 'mobile-ac-page']">
        <nav class="flex-0 nav-left" v-if="IS_PC">
            <ul>
                <li
                    class="nav-item ell-1" 
                    @click="goAnchor('kl' + item._id)"
                    v-for="item in comList"
                    :key="item._id + 'aaa'"
                >
                    【{{ item.children.length }}】{{ item.class_name }}
                </li>
            </ul>
        </nav>
        <div ref="klScrollRef" :class="['flex-1 scroll-box', IS_PC ? 'scroll-box-pc' : 'p-b-10']">
            <div v-for="item in comList" :key="item._id">
                <h2 class="anchor-title" :id="'kl' + item._id">
                    {{ item.class_name }}
                </h2>
                <userArticleList
                    class="articles-scroll-page"
                    :list="item.children"
                    :scrollHeight="scrollHeight"
                    @goPage="goPage"
                ></userArticleList>
            </div>
        </div>
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin'
import userArticleList from '@/views/blog/home/home/components/user-article-list.vue'
export default {
    components: {
        userArticleList,
    },
    data() {
        return {
            scrollTop: 0,
            list: [],
            scrollHeight: 5000,
        }
    },
    computed: {
        ...Vuex.mapState(['navlist']),
        IS_PC() {
            return this.isPc()
        },
        comList(){
            let result = []
            this.navlist.forEach((item) => {
                this.list.forEach((itey) => {
                    if (item._id === itey._id) {
                        result.push(itey)
                    }
                })
            })

            return result
        }
    },
    created() {
        this.init()
    },
    async activated() {
        if (this.IS_PC) return
        // 滚动到历史记录处
        await this.$nextTick()
        let { klScrollRef } = this.$refs
        if (klScrollRef) {
            klScrollRef.scrollTop = this.scrollTop
        }
    },
    deactivated() {
        if (this.IS_PC) return
        // 保存scrollTop
        let { klScrollRef } = this.$refs
        if (klScrollRef) {
            this.scrollTop = klScrollRef.scrollTop || 0
        }
    },

    methods: {
        ...Vuex.mapActions(['GET_NAV_LIST']),
        // 目录点击 锚点跳转
        goAnchor(id) {
            document.querySelector(`#${id}`).scrollIntoView({
                behavior: 'smooth', // 添加顺滑滚动
            })
        },
        // 跳转到详情页
        goPage({ row }) {
            let { IS_PC } = this
            this.list = this.list.map((item) => {
                if (Array.isArray(item.children)) {
                    item.children = item.children.map((itey) => {
                        if (itey._id === row._id) {
                            itey.isRead = true
                        }
                        return itey
                    })
                }
                return item
            })

            let path = `/blog/page/${row._id}`
            let query = {
                from: 'interview_test',
            }

            this.goTo(path, {
                query,
                target: IS_PC ? '_blank' : '_self',
            })
        },

        init() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)',
            })
            this.GET_NAV_LIST()
            
            // 拉取标签是面试的文章
            httpApi
                .get_article_by_tagids({
                    blog_tags: ['65a72a07b4553f04e4c1c9dc'],
                    cache: true,
                    // expire_time: 1 * 24 * 3600 * 1000
                })
                .then((res) => {
                    let list = res?.data?.data || []
                    list = list.map((item) => {
                        this.$set(item, 'isRead', false)
                        return item
                    })

                    // 处理大的分类
                    let arr = []
                    list.forEach((item) => {
                        let { _id } = item.class_id
                        if (arr.length === 0 || !arr.some((itey) => itey._id === _id)) {
                            arr.push({
                                ...item.class_id,
                                children: [],
                            })
                        }
                    })

                    // 处理小的分类
                    arr.forEach((item) => {
                        list.forEach((itey) => {
                            if (item._id === itey.class_id._id) {
                                item.children.push(itey)
                            }
                        })
                    })

                    this.list = arr
                })
                .catch((err) => {
                    console.log('err', err)
                })
                .finally(() => {
                    loading.close()
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.ac-page {
    height: 100vh;
}
.scroll-box {
    height: 100vh;
    overflow-y: auto;
}
.scroll-box-pc {
    padding: 0 0 10px 10px;
}
.nav-left {
    width: 160px;
}

$itemHeight: 45px;
.nav-item {
    padding-left: 10px;
    line-height: $itemHeight;
    height: $itemHeight;
    &:hover {
        cursor: pointer;
        background-color: #f0f0f0;
    }
}
.anchor-title {
    padding-left: 10px;
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 550;
    color: #8e2580;
}

.mobile-ac-page {
    ::v-deep {
        .user-article-item {
            width: 45vw;
        }
    }
}
</style>
