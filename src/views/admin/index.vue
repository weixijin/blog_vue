<template>
    <div class="admin-page">
        <adminMenu />

        <div class="admin-right-main">
            <div class="admin-main-content">
                <keep-alive>
                    <router-view v-if="$route.meta.isKeepLive"></router-view>
                </keep-alive>

                <transition name="component-fade-opacity" mode="out-in">
                    <router-view v-if="!$route.meta.isKeepLive"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import adminMenu from '@/components/adminMenu/index.vue'
export default {
    components: { adminMenu },
    data() {
        return {}
    },
    computed: {
        ...Vuex.mapState(['url_title']),
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.admin-page {
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.admin-right-main {
    flex: 1;
    max-width: calc(100vw - 200px);
    padding: 15px 15px 0;
    background-color: #f7f8fa;
}
</style>
