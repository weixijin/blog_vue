<template>
    <div class="admin">
        <header>
            <h1>admin</h1>
            <el-button @click="goIndex" type="success" size="mini"> 返回首页 </el-button>
        </header>
        <main>
            <el-button size="mini" type="primary" @click="addArticle">添加新article笔记</el-button>
            <ul v-if="navlist.length > 0">
                <li>
                    <div class="item item1">分类名</div>
                    <div class="item item2">操作</div>
                </li>
                <div class="scorll_better_wxj">
                    <li v-for="(item, index) in navlist" :key="index">
                        <div class="item item1">
                            <input v-model="item.article_name" />
                        </div>
                        <div class="item item2">
                            <el-button type="warning" size="mini" @click="putArticle(item._id)"
                                >编辑</el-button
                            >
                            <el-button size="mini" type="danger" @click="delArticle(item._id)"
                                >删除</el-button
                            >
                        </div>
                    </li>
                </div>
            </ul>
            <div class="nohave" v-else>还没有笔记，快去创建吧</div>
        </main>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import { getArticles, delArticle } from '@/api/blog'
export default {
    name: 'admin',
    data() {
        return {
            isShow: true,
            navlist: [],
            newClass: '',
            class_id: '',
        }
    },
    mounted() {
        let class_id = this.$route.query._id
        if (class_id) {
            this.class_id = class_id
            this.getArticles()
        } else {
            return this.$router.replace('/')
        }
    },
    methods: {
        // 返回首页
        goIndex() {
            this.$router.push('/')
        },
        // 获取 articles
        async getArticles() {
            let data = await getArticles({
                class_id: this.class_id,
            })
            this.navlist = data.data
        },

        // 删除分类
        async delArticle(_id) {
            if (confirm('确定删除吗？')) {
                let data = await delArticle({
                    _id,
                })
                this.$message.success(data.msg)
                if (data.code == 200) {
                    this.getArticles()
                }
            }
        },

        // 跳转到articles页面 new
        addArticle() {
            this.$router.push(`/blog/admin_article?class_id=${this.class_id}`)
        },

        // put
        putArticle(_id) {
            this.$router.push(`/blog/admin_article?_id=${_id}`)
        },
    },
    components: {
        Nav,
    },
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
    h1 {
        font-size: 24px;
    }

    .el-button {
        a {
            color: #fff;
        }
    }
}

div.admin {
    main {
        width: 100vw;
        height: calc(100vh - 50px);
        overflow-y: scroll;

        .el-button {
            margin: 30px;
        }

        ul {
            margin: 0 auto;
            max-width: 800px;
            border: 0.5px solid #ddd;
            cursor: pointer;
            li {
                height: 40px;
                display: flex;
                justify-content: space-between;
                border-bottom: 0.5px solid #ddd;

                &:hover {
                    background-color: #f5f5f5;
                    input {
                        background-color: #f5f5f5 !important;
                    }
                }
                div.item.item1 {
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    flex: 3;
                    border-right: 0.5px solid #ddd;
                    input {
                        width: 100%;
                        height: 30px;
                        outline: none;
                        border: none;
                        padding-left: 10px;
                        cursor: pointer;
                    }
                }

                div.item.item2 {
                    min-width: 140px;
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .el-button {
                        margin: 5px;
                        span {
                            color: #fff !important;
                        }
                    }
                }
            }
        }
    }
}
.main::-webkit-scrollbar {
    display: none;
}
</style>
