<template>
    <el-dialog
        :custom-class="['dialog-center', customClass]"
        :z-index="zIndex"
        :title="title"
        :visible.sync="value"
        :width="width"
        :modal="modal"
        :close-on-click-modal="clickModal"
        :modal-append-to-body="toBody"
        @closed="handleClose"
    >
        <div
            v-if="title"
            class="h-50 flex-center-wrap flex-justify-between p-l-20 p-r-20 e-d-h-borader"
        >
            <div class="el-dialog-header f-18 f-600">
                {{ title }}
            </div>
            <i
                class="el-dialog__close el-icon el-icon-close f-20 f-600 cu e-dialog-close-icon"
                v-if="showClose"
                @click="handleClose"
            ></i>
        </div>
        <slot></slot>
        <div class="flex-center-end h-60 p-r-20" v-if="footer">
            <el-button type="info" plain class="cancel-el-btn" size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary" @click="$emit('confirm')">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        header: {
            type: Boolean,
            default: false,
        },
        clickModal: {
            type: Boolean,
            default: true,
        },
        isCenter: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '30%',
        },
        footer: {
            type: Boolean,
            default: true,
        },
        // 遮罩层
        modal: {
            type: Boolean,
            default: true,
        },
        zIndex: {
            type: Number,
            default: 1000,
        },
        toBody: {
            type: Boolean,
            default: true,
        },
        customClass: {
            type: String,
            default: '',
        },
        showClose: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {}
    },
    methods: {
        handleClose() {
            this.$emit('input', false)
            this.$emit('closed')
        },
    },
}
</script>

<style lang="scss" scoped>
.dialog-center-footer {
    border-top: 1px solid #dfdfdf;
}
.el-dialog-header {
    color: #303133;
}
::v-deep {
    .dialog-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 !important;
        border-radius: 12px;
    }
    .dialog-center .el-dialog__header {
        display: none;
    }

    .dialog-center .el-dialog__body {
        padding: 0;
    }
}
.e-d-h-borader {
    border-bottom: 1px solid #dcdfe6;
}
.e-dialog-close-icon {
    color: #909399 !important;
}
.el-button {
    border: none;
    border-radius: 4px;
}
</style>
