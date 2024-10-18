<template>
    <div class="admin-menu">
        <div @click="goToHome">
            <kl-logo :height="60" />
        </div>
        <el-menu :collapse="isCollapse" :default-active="url_path" class="el-menu-vertical-demo" router unique-opened>
            <el-submenu :index="item.path" v-for="item in menuList" :key="item.path">
                <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{ item.meta.title }}</span>
                </template>

                <el-menu-item
                    v-for="itey in item.children"
                    :key="`${item.path}/${itey.path}`"
                    :index="`${item.path}/${itey.path}`"
                    >{{ itey.meta.title }}</el-menu-item
                >
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { adminRouters } from '@/router/admin.js'
export default {
    components: {},
    data() {
        return {
            isCollapse: false,
            menuList: adminRouters,
        }
    },
    computed: {
        ...Vuex.mapState(['url_path']),
    },
    methods: {
        goToHome() {
            this.$router.push({ path: '/' })
        },
    },
}
</script>

<style lang="scss" scoped>
.admin-back-home {
    height: 60px;
    font-weight: 550;
    font-size: 18px;
    color: $primary;
}

.admin-apge {
    background-color: #fff;
    width: 100vw;
    height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
::v-deep {
    .el-menu{
        border-right: none;
    }
    ul.el-menu > .is-active {
        border-right: none;
    }
    .el-menu > .is-active .is-active {
        background-color: #fff !important;
        color: $primary !important;
        position: relative;
        &::after {
            content: '';
            display: block;
            position: absolute;
            z-index: 1;
            left: 10px;
            right: 10px;
            top: 5px;
            bottom: 5px;
            border-radius: 6px;
            background-color: rgba(0, 99, 255, 0.1);
        }
    }
    .el-submenu.is-active {
        .el-submenu__title {
            color: $primary;
            i {
                color: $primary;
            }
        }
    }
    .el-menu-item{
        transition: height 0.1s;   
        padding-left: 50px !important;
    }
    .el-menu-item:focus, .el-menu-item:hover {
    background-color: #fff;
}
}
</style>
