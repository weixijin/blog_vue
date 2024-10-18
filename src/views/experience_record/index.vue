<template>
    <!-- 这个页面需要兼容移动端和PC端 -->
    <div class="page-1">
        <div :class="['', IS_PC ? 'w-1200 page-content blog-html-page-pc' : 'm-page-content']">
            <kl-scroll
                :isBar="false"
                :pageOption="pageOption"
                :list="list"
                :scrollHeight="scrollHeight"
                @bottom="bottomEvent"
            >
                <div class="collect-item" v-for="item in list" :key="item._id">
                    <h2 class="m-b-10">
                        {{ getCreateTime(item.article_updata_time) }}
                    </h2>
                    <div v-highlight class="blog-html-page">
                        <div v-html="item.article_content"></div>
                        <div v-if="IS_PC" class="flex-wrap flex-justify-end m-t-10">
                            <el-button size="small" type="primary" plain @click="edit(item)"
                                >编辑</el-button
                            >
                        </div>
                    </div>
                </div>
            </kl-scroll>
        </div>
    </div>
</template>

<script>
import { getArticles } from '@/api/blog/index'
export default {
    data() {
        return {
            rowCopy: {
                content: '',
            },
            visable: false,
            collectClassList: [],
            list: [],
            scrollHeight: 500,
            pageOption: {
                page: 1,
                limit: 8,
                total: 0,
            },
            channel: null,
        }
    },
    computed: {
        IS_PC() {
            return this.isPc()
        },
    },
    created() {
        Object.assign(this.pageOption,this.createPages())
        this.init()
    },
    mounted() {
        let { IS_PC } = this
        // 获取可视区域高度
        this.scrollHeight = document.documentElement.clientHeight

        // tab标签页间的通信 BroadcastChannel
        this.channel = new BroadcastChannel('experience_record')
        this.channel.onmessage = (e) => {
            if (e.data) {
                let { _id, article_content } = e.data
                this.list = this.list.map((item) => {
                    if (item._id === _id) {
                        item.article_content = article_content
                    }
                    return item
                })
            }
        }
    },
    beforeDestroy() {
        this.channel.close()
    },

    methods: {
        createPages() {
            if (this.IS_PC) {
                return {
                    page: 1,
                    limit: 7,
                    total: 0,
                }
            }

            return {
                page: 1,
                limit: 4,
                total: 0,
            }
        },
        edit(row) {
            window.open(`#/blog/admin_article?_id=${row._id}&from=experience_record`)
        },
        bottomEvent() {
            let { page, limit, total } = this.pageOption
            if (page * limit >= total) return
            this.pageOption.page++
            this.getArticles()
        },
        getCreateTime(time) {
            // 转为时间戳
            return this.klDateFormat(new Date(time).getTime(), 'yyyy-MM-dd hh:mm:ss')
        },
        getArticles() {
            let { page, limit } = this.pageOption
            getArticles({
                page,
                limit,
                class_mark: 1,
            })
                .then(async (res) => {
                    let { total, list } = res.data
                    if (Array.isArray(list)) {
                        this.pageOption.total = total - 0
                        this.list = [...this.list, ...list]

                        await this.$nextTick()
                        // 给所有图片绑定预览,需要先取消之前的绑定
                        let imgs = Array.from(document.querySelectorAll('.blog-html-page img'))

                        if (this.isArrayLength(imgs)) {
                            imgs.forEach((img) => {
                                $(img)
                                    .unbind('click')
                                    .click(() => {
                                        this.prevewImg(img)
                                    })
                            })
                        }
                    }
                })
                .catch(() => {})
        },
        init() {
            this.getArticles()
        },
    },
}
</script>

<style lang="scss" scoped>
.page-1 {
    background-color: #f9f9f9;
    height: 100vh;
}
.page-content {
    margin: 0 auto;
    height: calc(100vh);
    overflow-y: auto;
    border: none;
    padding: 0px;
    ::v-deep {
        .blog-html-page {
            padding: 10px;
            border: 1px solid #ccc;
            // 添加边框阴影
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            .line-number {
                color: #fff;
                width: 48px;
            }
        }
        img {
            opacity: 1;
        }
    }
}
::v-deep {
    .m-page-content {
        height: 100vh;
        // 添加边框阴影
        padding: 0 10px;
        color: #555;
        font-weight: 400;
        .blog-html-page {
            border-radius: 8px;
            padding: 10px;
            border: 1px solid #ccc;
            // 添加边框阴影
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            .line-number {
                color: #fff;
                width: 48px;
            }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            color: #333;
            width: 100%;
            margin: 10px 0;
        }

        h1 {
            font-size: 20px;
        }
        h2 {
            font-size: 18px;
            line-height: 30px;
            line-height: 30px;
        }
        h3 {
            font-size: 16px;
            line-height: 25px;
            line-height: 25px;
        }
        h4,
        h5,
        h6 {
            font-size: 14px;
        }

        ul {
            list-style-type: disc !important;
            list-style-position: inside;

            li {
                padding-left: 10px;
                line-height: 30px;
                list-style-type: disc !important;
                list-style-position: inside;
            }
        }

        ol {
            list-style-type: ecimal !important;
            list-style-position: inside;

            li {
                padding-left: 10px;
                line-height: 30px;
                list-style-type: ecimal !important;
                list-style-position: inside;
            }
        }

        ul {
            list-style-type: disc !important;
        }

        ol {
            list-style-type: decimal !important;
        }

        li {
            list-style: inherit !important;
        }

        img {
            max-width: 100%;
            display: block;
            margin: 5px auto;
        }

        p {
            max-width: 100%;
            overflow-y: auto;
            white-space: wrap;
            font-size: 16px;
            line-height: 24px;
        }

        a {
            color: $primary;
            font-weight: 500;
            font-size: 14px;
        }
        table,
        th,
        td {
            border: 1px solid #ccc;
        }

        table {
            border-collapse: collapse;
        }

        th,
        td {
            // text-align: center;
            padding: 6px 10px;
            color: #555;
            font-size: 14px;
        }

        .language-js {
            display: block;
            overflow-x: auto;
            color: #333;
            background: #f8f8f8;
        }

        .hljs {
            display: block;
            overflow-x: auto;
        }

        pre {
            border-radius: 4px;
            overflow: hidden;
            background-color: #282c34;
            margin: 20px 0;
            position: relative;
            display: flex;
            padding-left: 40px;
            &::after {
                // 代码与行号的分割线
                content: '';
                position: absolute;
                top: 40px;
                left: 40px;
                height: calc(100% - 56px);
                width: 1px;
                z-index: 9;
                background: linear-gradient(
                    to bottom,
                    transparent 0%,
                    transparent 50%,
                    #5c677b 50%
                );
                background-size: 1px 12px;
                background-repeat: repeat-y;
            }

            // 行
            ul {
                width: 40px;
                position: absolute;
                top: 40px;
                left: 0;
                padding: 0;
                margin: 0;
                list-style: none;
                li {
                    height: 30px;
                    line-height: 30px;
                    text-align: right;
                    padding-right: 10px;
                    color: #ccc;
                }
            }

            // 仿苹果
            .line-number-div {
                position: absolute;
                top: 0;
                left: 10px;
                width: 50px;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .line-number-div-item {
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    &:nth-of-type(1) {
                        background-color: #ff5f57;
                    }
                    &:nth-of-type(2) {
                        background-color: #ffbd2e;
                    }
                    &:nth-of-type(3) {
                        background-color: #27c93f;
                    }
                }
            }
            code {
                flex: 1;
                padding-left: 10px;
                display: block;
                border-radius: 5px;
                font-size: 16px;
                line-height: 30px;
                padding-top: 40px;
                .copy-button {
                    position: absolute;
                    right: 10px;
                    top: 15px;
                    padding: 3px 5px;
                    background-color: #666;
                    color: #fff;
                    border-radius: 3px;
                    cursor: pointer;
                }

                span {
                    line-height: 30px;
                }
            }
        }

        strong {
            color: red;
            font-weight: 500;
        }
    }
}
</style>

