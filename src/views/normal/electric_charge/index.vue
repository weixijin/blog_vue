<template>
    <div class="demo">
        <pc v-if="isPc()" />
        <mobile :loadScript="loadScript" v-if="!isPc()" />
    </div>
</template>

<script>
const plugins = [
    {
        js: 'http://139.9.210.43:5000/netdist/echarts543min-1728272924292~1~.js',
    },
]
export default {
    components: {
        pc: () => import('@/views/normal/electric_charge/pc/index.vue'),
        mobile: () => import('@/views/normal/electric_charge/mobile/index.vue'),
    },
    data() {
        return {
            isPC: false,
            loadScript:false
        }
    },
    mounted() {
        this.getIndexDBJS(plugins).then(()=>{
            this.loadScript = true
        })
    },
}
</script>

<style lang="scss" scoped></style>
