<template>
    <div :style="getStyle" class="page-echarts" ref="echartsRef"></div>
</template>

<script>
export default {
    components: {},
    props: {
        options: {
            type: Object,
            default: () => {
                return {}
            },
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        isAuto: {
            type: Boolean,
            default: true,
        },
        isAutoWidth: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            echartInfo: {},
        }
    },
    watch: {
        options: {
            handler() {
                if (!this.isAuto) return
                this.init()
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        getStyle() {
            const result = {
                height: this.height + 'px',
            }
            if (!this.isAutoWidth) {
                result.width = this.width + 'px'
            }
            return result
        },
    },
    methods: {
        async init() {
                //  console.log('echarts');
            await this.sleep(50)
       
            
            let { echartsRef } = this.$refs
            if (!echartsRef || !echarts || Object.keys(this.options).length === 0) return
            this.echartInfo = echarts.init(echartsRef)
            this.echartInfo.setOption(this.options)
        },
    },
}
</script>

<style lang="scss" scoped>
.page-echarts{
    width:calc(100vw - 270px)
}
</style>
