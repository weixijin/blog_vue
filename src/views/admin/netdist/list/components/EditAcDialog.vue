<template>
    <e-dialog
        top="100px"
        width="600px"
        title="新增页面"
        v-model="dialogVisible"
        :footer="false"
        @closed="closed"
    >
        <div class="dialog-main">
            <kl-upload isShowPreFile ref="klUploadref" @success="uploadSuccess"></kl-upload>
        </div>
    </e-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            isHaveUpload: false,
        }
    },
    methods: {
        closed() {
            this.$refs.klUploadref.init()
            if (this.isHaveUpload) {
                this.$emit('init')
            }
        },
        uploadSuccess() {
            this.isHaveUpload = true
        },
    },
}
</script>

<style lang="scss" scoped>
.dialog-main {
    padding: 15px 20px;
    .item {
        display: flex;
        span {
            display: inline-block;
            white-space: nowrap;
        }
    }
}
</style>
