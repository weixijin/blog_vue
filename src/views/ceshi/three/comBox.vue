<template>
    <div class="demo">
        <slot :item="someData"></slot>
        <slot name="a" :item="someData"></slot>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            someData: '555',
        }
    },
    mounted() { 
        this.$bus.$on('test-click', (data) => {
            // once 只触发一次
            console.log(data)
        })
    },
    beforeDestroy() {
        this.$bus.$off('test-click')
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
