<template>
    <div class="flex-wrap flex-center-wrap flex-justify-between page-header" v-if="!isLoading">
        <div
            class="flex-wrap flex-center-wrap author-info"
            v-if="article && article.author_id && isUserStick"
        >
            <i
                class="el-icon-arrow-left f-500 f-24 c-333 pr el-icon-arrow-left-icon"
                @click="goBack"
            ></i>
            <img
                @click="$emit('openUserInfoPopup')"
                class="author-avtor m-r-10"
                :src="parseResourceUrl(article.author_id.header_img)"
            />
            <span class="f-14 c-555">
                {{ article.author_id.username }}
            </span>
            <span class="m-l-10 flex-center f-12 follow-btn">关注</span>
        </div>
        <i
            v-show="!isUserStick"
            class="el-icon-arrow-left f-500 f-24 c-333 pr el-icon-arrow-left-icon"
            @click="goBack"
        ></i>

        <div class="tool-list">
             <!-- 语音播放 -->
            <img
                @click="beginPlay"
                src="//image.zlketang.com/public/news/others/imgs/blog_imgs/eb766451af2b8a3ba26381b9879a789b.png"
            />
            <!-- 历史记录 -->
            <img
                @click="openHistory"
                src="//image.zlketang.com/public/news/others/imgs/blog_imgs/eb766451af2b8a3ba26381b9879a789b.png"
            />
            <!-- 搜索 -->
            <img
                @click="openSearch"
                src="//image.zlketang.com/public/news/others/imgs/blog_imgs/a7b8d9cc5f558b4117470449bc418307.png"
            />
            <!-- 分享 -->
            <img
                @click="openSharePopup"
                src="//image.zlketang.com/public/news/others/imgs/blog_imgs/fb27bc55668b28ccba2b2595b3f09e9d.png"
            />
        </div>

        <!-- 分享弹窗 -->
        <blogSharePopup
            :shareInfo="shareInfo"
            :visibleShare="visibleShare"
            @close="clsoseSharePopup"
        ></blogSharePopup>

        <!-- 历史记录弹窗 -->
        <v-popup v-model="historyVisible" height="500px">
            <div class="v-h-80 o-y-h pr">
                <div class="h-45 flex-center pr f-15 f-550">
                    <!-- <i
                        @click="historyVisible = false"
                        class="f-18 c-aaa el-icon-close p-a share-header-close-icon"
                    ></i> -->
                    历史记录
                </div>

                <!-- <v-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh"> -->
                <kl-scroll
                    :list="historyList"
                    :scrollHeight="455"
                    @bottom="bottomEvent"
                    class="p-l-10 p-r-10"
                >
                    <!-- <div class="h-10 bg-fff" v-if="historyList.length > 0"></div> -->
                    <articleList @page="goPage" :list="historyList" v-if="historyList.length > 0" />
                    <kl-no-data class="m-t-150" v-if="historyList.length == 0 && !isHistoryLoading">
                        暂无数据
                    </kl-no-data>
                </kl-scroll>
                <!-- </v-pull-refresh> -->
            </div>
        </v-popup>
    </div>
</template>

<script>
import articleList from '@/views/homepage/home/mobile/components/article/index.vue'
import httpApi from '@/api/blog/admin.js'
import blogSharePopup from '@/views/blog/home/page/mobile/components/blogSharePopup.vue'

export default {
    components: {
        blogSharePopup,
        articleList,
    },
    props: {
        isLoading: {
            type: Boolean,
            default: true,
        },
        isUserStick: {
            // 当用户滚动到一定位置时，头部会显示用户信息
            type: Boolean,
            default: false,
        },
        article: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            shareInfo: {},
            isHistoryLoading: false,
            isRefreshLoading: false,
            visibleShare: false,

            historyVisible: false,
            historyList: [],
            pageOption: {
                page: 1,
                limit: 10,
                total: 0,
            },
        }
    },
    methods: {
        // 返回
        goBack() {
            this.$router.go(-1)
        },
        onRefresh() {
            this.isRefreshLoading = true
            setTimeout(() => {
                this.pageOption.page = 1
                this.historyList = []
                this.getHistoryList()
            }, 500)
        },
        // 阅读更多
        goPage(id) {
            this.historyVisible = false
            if (this.$route.params && this.$route.params.id == id) {
                return
            }
            this.$emit('setHistoryRead', this.article._id)
            this.$emit('getArticle', id)
        },
        // 触底监听
        bottomEvent() {
            this.pageOption.page++
            this.getHistoryList()
        },
        beginPlay() {
            this.$emit('beginPlay')
        },
        // 打开历史记录弹窗
        openHistory() {
            // 获取可视区高度
            let clientHeight =
                document.documentElement.clientHeight || document.body.clientHeight || 700
            this.historyScrollHeight = Math.floor(clientHeight * 0.8 - 45) + 'px'
            this.historyVisible = true
            // 先清空列表
            this.pageOption = {
                page: 1,
                limit: 10,
                total: 0,
            }
            this.historyList = []
            this.getHistoryList()
        },
        // 获取列表
        getHistoryList() {
            this.isHistoryLoading = true
            let params = {
                type: 3,
                page: this.pageOption.page,
                limit: this.pageOption.limit,
            }
            httpApi
                .get_mobile_home_list(params)
                .then((res) => {
                    if (res.data) {
                        let { list, total } = res.data

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
                                item.article_updata_time = this.klDateFormat(item.updata_time - 0)
                                return item
                            }
                        })

                        this.historyList = [...this.historyList, ...list]
                        this.pageOption.total = total - 0
                    }
                })
                .catch(() => {})
                .finally(() => {
                    this.isHistoryLoading = false
                    this.isRefreshLoading = false
                })
        },
        //切换到搜索
        openSearch() {
            this.$emit('change', {
                name: 'mobileSearchPage',
            })
        },
        // 关闭弹窗
        async clsoseSharePopup() {
            this.visibleShare = false
        },
        // 打开分享弹窗
        async openSharePopup() {
            let {
                article_bck_url,
                article_name,
                article_keywords,
                author_id: { username, header_img },
            } = this.article
            this.shareInfo = {
                share_bg_img: 'https://image.zlketang.com/public/zl_wxpub/circle_poster_pic.png',
                share_main_img: article_bck_url,
                share_authorheader_img: this.parseResourceUrl(header_img),
                share_author_name: username,
                share_blog_content: article_name+'=>'+article_keywords,
            }
            this.visibleShare = true
        },

        // 分享事件
        shareEvent(index) {
            switch (index) {
                case 0:
                    // QQ
                    let baseUrl = 'http://connect.qq.com/widget/shareqq/index.html?'
                    // 获取页面标题
                    let title = document.title
                    // 获取页面链接
                    let url = window.location.href
                    // 获取页面描述
                    let desc =
                        document
                            .querySelector('meta[name="description"]')
                            ?.getAttribute('content') || ''
                    // 获取页面缩略图
                    let pics =
                        document.querySelector('meta[name="thumbnail"]')?.getAttribute('content') ||
                        ''
                    // 拼接参数
                    let params = {
                        url,
                        title,
                        desc,
                        pics,
                        site: '知崖',
                        style: '201',
                        width: 32,
                        height: 32,
                    }
                    window.open(this.joinParams(baseUrl, params))
                    break
                case 1:
                    // 微信
                    break
                case 2:
                    // 朋友圈
                    break
                case 3:
                    // 复制链接
                    break
                case 4:
                    // 海报
                    break
                default:
                    break
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page-header {
    height: 50px;
    padding: 0 15px;
}
.author-avtor {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.follow-btn {
    height: 24px;
    border-radius: 12px;
    padding: 0 15px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);
    color: #555;
}
.tool-list {
    img {
        width: 20px;
        height: 20px;
        margin-left: 15px;
    }
}

.el-icon-arrow-left-icon {
    left: -5px;
}
</style>
