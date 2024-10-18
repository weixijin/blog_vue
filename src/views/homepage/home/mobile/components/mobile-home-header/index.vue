<template>
    <div class="mobile-home-header">
        <div class="mobile-home-header-container">
            <!-- <i class="el-icon-arrow-left search-left-arrrow-icon" v-show="isSearch"></i> -->
            <div class="mobile-home-header-search-left pr">
                <i class="el-icon-search"></i>
                <i
                    @click.stop="content = ''"
                    v-show="isSearch"
                    class="el-icon-circle-close mobile-home-header-search-left-close-icon"
                ></i>
                <span class="mobile-home-header-search-left-tip" v-if="!isSearch"> 搜索 </span>
                <input
                    type="text"
                    :class="['mobile-home-header-search-left-input f-14', isSearch ? 'bg-f2' : '']"
                    @focus="inputFocus"
                />
            </div>

            <div class="mobile-home-header-search-right">
                <i class="el-icon-circle-plus" v-show="!isSearch" @click="openUserToolPopup"></i>
                <div
                    v-show="isSearch"
                    class="mobile-home-header-search-right-tip"
                    @click="getArticles"
                >
                    搜索
                </div>
            </div>
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

        <!-- 用户工具弹窗 -->
        <v-popup height="520px" v-model="visibleUserTool">
            <div class="kl-user-tool-popup">
                <img
                    src="//image.zlketang.com/public/news/others/imgs/blog_imgs/231312635_03.png"
                    class="close-mobile-user-tool-popup"
                    @click="visibleUserTool = false"
                />

                <!-- 头部用户信息 -->
                <div class="user-header">
                    <div class="left">
                        <img class="user-avtor" @click="goUserCenter" :src="userHeader()" />
                        今天是你加入知崖的第&nbsp;{{ userCreateDate }}&nbsp;天
                    </div>

                    <div class="right">
                        <img
                            class="right-caogao-icon"
                            src="//image.zlketang.com/public/news/others/imgs/blog_imgs/4116e844ffaab97cc0702f48a7638015.png"
                        />
                        草稿箱
                    </div>
                </div>

                <!-- 用户工具列表入口1 -->
                <div class="tool-ru">
                    <div
                        class="item"
                        v-for="item in entranceList"
                        :key="item.title"
                        @click="goToPage(item)"
                    >
                        <div class="left">
                            <div class="item-title flex-wrap flex-center-wrap">
                                {{ item.title }}<i class="el-icon-arrow-right"></i>
                            </div>
                            <div class="item-desc">
                                {{ item.desc }}
                            </div>
                        </div>
                        <img :src="item.url" alt="" />
                    </div>
                </div>

                <!-- 用户工具列表入口2 -->
                <div class="flex-wrap flex-justify-between user-tool-2">
                    <div
                        class="flex-column-wrap flex-center item"
                        v-for="item in userToolList"
                        :key="item.title"
                        @click="toolGoPage(item)"
                    >
                        <div class="flex-center m-b-10 img-cover">
                            <img :src="item.url" />
                        </div>
                        <span class="f-12">
                            {{ item.title }}
                        </span>
                    </div>
                </div>

                <!-- 锚点文章入口 -->
                <div class="m-t-20 user-tool-3">
                    <div
                        class="flex-wrap flex-justify-between flex-wrap-center f-14 archor-title m-b-10"
                    >
                        <span> 锚点文章 </span>
                        <time
                            class="f-13"
                            v-if="
                                this.articleInfo._id &&
                                userdata &&
                                userdata.article_anchor_point_time
                            "
                        >
                            {{ klDateFormat(userdata.article_anchor_point_time - 0) }}</time
                        >
                    </div>
                    <div @click="goPage">
                        <articleItem
                            v-if="this.articleInfo._id"
                            :articleInfo="articleInfo"
                        ></articleItem>
                        <div v-else class="p-20 p-l-0 c-aaa">暂无文章</div>
                    </div>
                </div>
            </div>
        </v-popup>
    </div>
</template>

<script>
import { getClickRanking, getArticle } from '@/api/blog'

import { baseURL } from '@/plugins/config.js'
import articleItem from '@/views/homepage/home/mobile/components/article/article-item.vue'
export default {
    components: {
        articleItem,
    },
    data() {
        return {
            img1: baseURL + 'ceshi/1.png',
            content: '',
            isSearch: false,
            historyList: [],
            recommendList: [],
            visibleUserTool: false,
            entranceList: [
                {
                    title: '聊天室',
                    desc: '有什么新观点一起说说看',
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/c9ab10dcda021c337cd9860ff7e9e68a.png',
                    path: '/blog/common_im',
                },
                {
                    title: '租房统计',
                    desc: '租房的列表与统计',
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/ab0ebda2361131564db9ff43808c5b29.png',
                    path: '/normal/electric_charge',
                },
            ],
            userToolList: [
                {
                    title: '面试',
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/39712721f381f4c8f62a974309b8bc96.png',
                    path: '/blog/interview_test',
                },
                {
                    title: '每日推送',
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/cdaf70d3b85b7ea59d39efb7c2992cea.png',
                    path: '/normal/push_task',
                },
                {
                    title: '日记',
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/ecef9d98534287d1ff914bf1799f7420.png',
                    path: '/normal/experience_record',
                },
                {
                    title: '体重记录',
                    url: '//image.zlketang.com/public/news/others/imgs/blog_imgs/a9b10f5458ac079fef6d0afc4c6880c1.png',
                    path: '/normal/user_weight',
                },
            ],
            articleInfo: {},
        }
    },
    created() {
        this.init()
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
        goToPage({ path }) {
            if (!path) return
            this.goTo(path)
        },
        toolGoPage({ path }) {
            if (!path) {
                this.$message.error('暂未开放')
                return
            }

            this.goTo(path)
        },
        // 去用户中心页
        goUserCenter(row) {
            if (row) {
            }
            this.$router.push({
                path: '/blog/user_center',
            })
        },
        // 去详情页
        goPage() {
            this.$router.push('/blog/page/' + this.articleInfo._id)
        },
        // 删除历史记录
        delHistoryContent(id) {
            this.historyList = this.historyList.filter((item) => item.id !== id)
            this.setStore('historyList', this.historyList)
        },
        // 选择了历史记录
        getArticles(row) {
            let { content, article_name } = row
            if (article_name || content) {
                this.content = article_name || content
            }

            this.isSearch = false
            this.$emit('getArticles', this.content)
        },
        // 用户头像
        userHeader() {
            let { userdata } = this
            if (this.getType(userdata) == 'object') {
                return baseURL + userdata.header_img
            }
            return ''
        },
        // 打开用户工具弹窗
        openUserToolPopup() {
            this.visibleUserTool = true
            // 获取文章信息
            this.getArticleInfo()
        },
        // 获取历史记录
       async getHistoryList() {
            this.historyList =await this.getStore('historyList', []).sort((a, b) => b.time - a.time).slice(0, 10)
        },

        // 获取猜你想搜 拿最高点击前5~10条
        getRecommendList() {
            let limit = Math.floor(Math.random() * 5) + 5
            getClickRanking({ limit, cache: true }).then((res) => {
                // console.log(res);
                this.recommendList = res?.data || []
            })
        },
        // 获取文章信息
        getArticleInfo() {
            if (this.getType(this.userdata) !== 'object') return
            let { article_anchor_point } = this.userdata
            if (!article_anchor_point) return
            getArticle({ _id: article_anchor_point, type: 1 })
                .then((res) => {
                    if (this.isObject(res.data.article)) {
                        this.articleInfo = res.data.article
                        return
                    }
                    this.saveError('返回的文章信息不是对象')
                })
                .catch((err) => {})
        },

        // 初始化
        init() {
            this.getRecommendList()
            // this.getArticleInfo()
        },
        // input聚焦
        inputFocus() {
            this.$emit('change', {
                name: 'mobileSearchPage',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.mobile-home-header {
    padding: 5px 15px;
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
.mobile-home-header-search-right {
    margin-left: 15px;
    white-space: nowrap;
}
.el-icon-circle-plus {
    font-size: 24px;
    color: #fc5531;
}
.search-left-arrrow-icon {
    font-size: 24px;
    margin-right: 15px;
    font-weight: 600;
    color: #333;
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
    height: calc(100vh - 90px);
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

.kl-user-tool-popup {
    padding: 15px 20px;
    height: 520px;
    overflow-y: auto;
}

.user-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        display: flex;
        align-items: center;
        font-size: 14px;
        img.user-avtor {
            margin-right: 8px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }

    .right {
        font-size: 14px;
        color: #aaa;
        display: flex;
        align-items: center;
        .right-caogao-icon {
            margin-right: 2px;
            width: 13px;
            height: 13px;
        }
    }
}

.tool-ru {
    display: flex;
    margin-top: 15px;
    .item {
        position: relative;
        padding: 10px;
        flex: 1;
        background-color: #444554;
        height: 100px;
        border-radius: 8px;
        margin-right: 15px;
        &:nth-of-type(2n) {
            margin-right: 0;
        }
        &:nth-of-type(1) {
            background-color: #2150f5;
        }
        .left {
            width: 82px;
            color: #fff;
            .item-title {
                font-size: 16px;
                font-weight: 550;
            }

            .item-desc {
                margin-top: 10px;
                font-size: 12px;
                line-height: 20px;
            }
        }

        img {
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 40px;
            height: 40px;
        }
    }
}

.user-tool-2 {
    margin-top: 15px;
    padding: 0 20px;
    .item {
        .img-cover {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f5f5f5;
        }
        img {
            width: 25px;
            height: 25px;
        }
    }
}
.user-tool-3 {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 4px;
}

.archor-title {
    font-weight: 400;
    color: #555;
    time {
        color: #999;
    }
}
.close-mobile-user-tool-popup {
    display: block;
    width: 40px;
    margin: 0px auto;
    margin-bottom: 20px;
}
</style>
