<template>
    <div class="admin">
        <header>
            <h1>admin</h1>
            <router-link to="/">
                <el-button type="success" size="mini"> 返回首页 </el-button>
            </router-link>
        </header>
        <main>
            <el-button size="mini" type="primary" @click="dialogVisible = true"
                >添加新分类</el-button
            >
            <ul>
                <li>
                    <div class="item item1">分类名</div>
                    <div class="item item2">操作</div>
                </li>
                <li v-for="(item, index) in navlist" :key="index">
                    <div class="item item1">
                        <input
                            v-model="item.class_name"
                            @change="putClassName(item._id, item.class_name)"
                        />
                    </div>
                    <div class="item item2">
                        <el-button type="warning" size="mini" @click="goArticle(item._id)"
                            >编辑</el-button
                        >
                        <el-button size="mini" type="danger" @click="delClass(item._id)"
                            >删除</el-button
                        >
                    </div>
                </li>
            </ul>
        </main>
        <!-- 添加新分类 -->
        <el-dialog
            title="添加新分类"
            :visible.sync="dialogVisible"
            :width="$store.state.isPc ? '30%' : '80%'"
        >
            <el-input type="text" v-model.trim="newClass" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="putClass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import { putClass, getClasss, addClass,delClass } from '@/api/blog'
export default {
    name: 'admin',
    data() {
        return {
            dialogVisible: false,
            isShow: true,
            navlist: [],
            newClass: '',
        }
    },
    mounted() {
        this.getClasss()
    },
    methods: {
        // 修改类名
        async putClassName(_id, class_name) {
            let data = await putClass({
                _id,
                class_name,
            })
            this.$message(data.msg)
        },
        changeIsShow() {
            this.isShow = !this.isShow
        },
        // 获取classs
        async getClasss() {
            let data = await getClasss()
            // console.log(data);
            this.navlist = data?.data?.list || []
        },

        // 提交新添加分类
        async putClass() {
            if (!this.newClass) {
                return this.$message.error('请输入内容')
            }

            let data = await addClass({
                class_name: this.newClass,
            })
            if (data.code == 200) {
                this.$message.success(data.msg)
                this.getClasss()
            }
            this.dialogVisible = false
        },

        // 删除分类
        async delClass(_id) {
            if (confirm('确定删除吗？') == true) {
                let data = await delClass({
                    _id,
                })
                this.$message.success(data.msg)
                if (data.code == 200) {
                    this.getClasss()
                }
            }
        },

        //跳转到articles页面
        goArticle(_id) {
            this.$router.push(`/blog/admin_articles?_id=${_id}`)
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
                &:nth-last-of-type(1) {
                    border-bottom: none;
                }
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
