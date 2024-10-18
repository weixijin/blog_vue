<template>
    <div class="others">
        <kl-tab v-model="activeName" :options="tabOptions" @change="changeCom" />
        <div class="main">
            <keep-alive>
                <transition
                    mode="out-in"
                    appear
                    enter-active-class="animate__animated animate__fadeInLeft"
                    leave-active-class="animate__animated animate__fadeOutRight"
                >
                    <component style="animation-duration: 500ms" :is="activeName"></component>
                </transition>
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        Form: () => import('./form.vue'),
        Bar: () => import('./bar.vue'),
        Nav: () => import('./nav.vue'),
        Menu: () => import('./menu.vue'),
        Table: () => import('./table.vue'),
    },
    data() {
        return {
            activeName: 'Table',
            tabOptions: [
                {
                    value: 'Table',
                    label: '群发优化项',
                },
                {
                    value: 'Menu',
                    label: 'menu横向nav',
                },
                {
                    value: 'Nav',
                    label: '横向滚动',
                },
                {
                    value: 'Bar',
                    label: '滚动条',
                },
                {
                    value: 'Form',
                    label: '表单相关',
                },
            ],
        }
    },
    methods: {
        changeCom(val) {
            this.activeName = val
        },
    },
}
</script>

<style lang="scss" scoped>
.main {
    padding: 20px 0;
}
</style>
