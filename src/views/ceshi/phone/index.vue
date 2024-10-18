<template>
    <div class="demo">
        <kl-nav :rightNum="10" :active="active" :list="navList" @change="navChange" />
        <router-view></router-view>
    </div>
</template>

<script>
import { ceshiRouters } from '@/router/ceshi.js'
export default {
    components: {},
    data() {
        return {
            ceshiRouters: ceshiRouters,
            navList: [],
            active: '',
        }
    },
    created() {
        this.navList = ceshiRouters[1].children.map(({ path, meta: { title } }) => {
            return {
                value: path,
                label: title,
            }
        })

        this.active = this.navList[2].value
    },
    methods: {
        navChange(val) {
            this.active = val
            this.$router.push('/phone/'+val)
        },
    },
}
</script>

<style lang="scss" scoped>
.nav-a {
    display: inline-block;
    margin: 10px;
}
</style>
