<template>
    <div class="move-to">
        <slot> </slot>
    </div>
</template>

<script>
export default {
    name: 'move-to',
    props: {
        to: {
            type: String,
            default: 'body',
        },
    },
    async mounted() {
        console.log(88888);
        await this.$nextTick()
        // 将当前组件移动到指定的元素to下
        console.log(123,this.$el)
        document.querySelector(this.to).appendChild(this.$el)
    },
    beforeDestroy() {
        // 组件销毁时，将当前组件移除
        this.$el.parentNode.removeChild(this.$el)
    },
}
</script>

<style lang="scss" scoped></style>
