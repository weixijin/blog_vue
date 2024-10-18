<template>
    <div class="ceshi">
        <header>
            <router-link to="/">
                <el-button type="primary"> 返回首页 </el-button>
            </router-link>

            <el-button @click="goPhone" type="success"> 前往移动端组件 </el-button>
        </header>
        <div class="container">
            <div class="left">
                <el-menu router :default-active="defaultRouter" class="el-menu-vertical-demo">
                    <el-menu-item
                        v-for="item in menuList"
                        :key="item.path"
                        :index="'/ceshi/' + item.path"
                    >
                        {{ item.meta.title }}
                    </el-menu-item>
                </el-menu>
            </div>
            <el-scrollbar ref="scrollBarRef" :style="scrollBarStyle">
                <div class="right">
                    <router-view style="animation-duration: 500ms"></router-view>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { ceshiRouters } from '@/router/ceshi.js'
export default {
    name: 'ceshi',
    components: {},
    data() {
        return {
            menuList: ceshiRouters[0].children,
            defaultRouter: '',
            scrollBarStyle: {},
        }
    },
    computed: {
        ...Vuex.mapState(['url_path']),
    },
    created() {
        let { url_path } = this
        this.defaultRouter = url_path ? url_path : '/ceshi/' + this.menuList[0].path
    },
    async mounted() {
        await this.$nextTick()
        // 获取可视区高度
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        this.scrollBarStyle = {
            height: clientHeight - 50 + 'px',
            flex: 1,
        }
    },

    methods: {
        goPhone() {
            this.$router.push('/phone')
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    height: calc(100vh - 50px);
    background-color: #f5f5f5;
    .left {
        width: 150px;
    }
    .right {
        padding: 30px;
        flex: 1;
        height: calc(100vh - 50px);
        overflow-y: auto;
        background-color: #fff;
        overflow-x: hidden;
    }
}

header {
    padding: 0 20px;
    height: 50px;
    display: flex;
    align-items: center;
}

@media screen and (max-width: 500px) {
    .container {
        .left {
            display: none !important;
        }
    }
}
</style>
