<template>
    <el-drawer
        append-to-body
        modal-append-to-body
        :visible.sync="visible"
        :direction="direction"
        :size="height"
        @close="close"
    >
        <slot> </slot>
    </el-drawer>
</template>

<script>
export default {
    props: {
        modal: {
            type: Boolean,
            default: true,
        },
        height: {
            type: String,
            default: 'auto',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        direction: {
            type: String,
            default: 'btt',
        },
    },
    data() {
        return {}
    },
    methods: {
        close() {
            this.$emit('close')
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-drawer__header {
        display: none;
    }
    .el-drawer__body {
        overflow: auto;
    }
    .el-drawer__container ::-webkit-scrollbar {
        display: none;
    }

}
</style>
