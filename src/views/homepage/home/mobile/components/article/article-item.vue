<template>
    <div class="bg-fff article-item-container" @click="goPage">
        <div class="flex-wrap flex-justify-between" v-if="isShow">
            <div class="left flex-1">
                <div class="user-info flex-center-wrap">
                    <v-image
                        class="m-r-5"
                        width="20"
                        height="20"
                        round
                        :src="parseResourceUrl(articleInfo.author_id.header_img)"
                    />
                    {{ articleInfo.author_id.username }}
                </div>

                <div class="article-info ell-1 f-14 m-t-5">
                    <span class="article-label"> 原创 </span>
                    {{ articleInfo.article_name }}
                </div>

                <div
                    :class="[
                        'article-info ell-2 f-14 m-t-5',
                        isPrivate(articleInfo) ? 'c-warning' : 'c-777',
                    ]"
                >
                    {{ isPrivate(articleInfo) ? '私密文章' : articleInfo.article_keywords }}
                </div>

                <div class="article-item-footer m-t-5">
                    <div class="left">
                        <div class="flex-wrap flex-center-wrap m-b-5">
                            <kl-svg width="12" class="m-r-5" name="mulu" />
                            <p class="f-12 m-w-130 ell-1" v-if="articleInfo && articleInfo.class_id">
                                博文&nbsp;|&nbsp;{{ articleInfo.class_id.class_name }}
                            </p>
                        </div>
                        <div class="flex-wrap flex-center-wrap">
                            <kl-svg width="12" class="m-r-5" name="rili" />
                            <span class="f-12"
                                >{{ articleInfo.article_updata_time | filterArticleTime }}
                            </span>
                            &nbsp;&nbsp;

                            <kl-svg
                                width="12"
                                class="svg-fire"
                                :style="{ color: 'red' }"
                                name="fire"
                            />
                            <span class="f-12">
                                {{
                                    articleInfo.article_watch_numbers
                                        ? articleInfo.article_watch_numbers
                                        : 0
                                }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right m-l-10 flex-0">
                <div class="dors flex-wrap flex-center-wrap flex-justify-end">
                    <div class="dor" v-for="item in 3" :key="item"></div>
                </div>

                <v-image
                    class="m-t-15"
                    width="70px"
                    height="70px"
                    :src="articleInfo.article_bck_url"
                />
            </div>
        </div>

    </div>
</template>

<script>
import { myTime } from '@/tool/index.js'
export default {
    props: {
        articleInfo: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            isShow: false,
        }
    },
    watch: {
        articleInfo: {
            handler(val) {
                // 判断一个对象存在key
                if (this.getType(val) == 'object' && Object.keys(val).length > 0) {
                    this.isShow = true
                    return
                }
                this.isShow = false
            },
            immediate: true,
        },
    },
    filters: {
        filterArticleTime(val) {
            return myTime(val)
        },
    },
    methods: {
        isPrivate(row) {
            if (this.getType(row) == 'object' && row.article_need_token == 2) {
                return true
            }
            return false
        },
        // 跳转到详情页
        goPage() {
            let { _id } = this.articleInfo
            this.$emit('page', _id)
        },
    },
}
</script>

<style lang="scss" scoped>
.user-info {
    font-size: 14px;
    color: #555;
    img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 5px;
    }
}
.article-label {
    display: inline-block;
    color: $primary;
    background-color: $primary-1;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 2px;
    margin-right: 2px;
}

.dors {
    height: 20px;
}
.dor {
    margin-right: 2px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #aaa;
    &:nth-last-of-type(1) {
        margin-right: 0px;
    }
}
.article-info {
    // max-width: calc(100vw - 120px);
word-break: break-word;
}
</style>
