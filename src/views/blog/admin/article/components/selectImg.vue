<template>
    <div class="plugin-bg-container">
        <!-- 默认展示 -->
        <div v-show="!value" class="no-bg cu w-100 h-100 b-r-8 flex-center" @click="openImgDialog">
            <i class="el-icon-plus f-24 c-ccc"></i>
        </div>

        <!-- 有背景图片展示 -->
        <div class="imgs-cover pr w-100 h-100" v-show="value">
            <i class="cu c-999 f-20 pa el-icon-circle-close pos-close z-999" @click="clearPluginBgUrl"></i>
            <el-image style="width: 100px; height: 100px" :src="value" :preview-src-list="[value]">
            </el-image>
        </div>

        <!-- 选择图片弹窗 -->
        <selectImgs
            :modal="false"
            @close="closeSelectDialog"
            @determine="determine"
            v-model="isSelectImgsShow"
        ></selectImgs>
    </div>
</template>

<script>
export default {
    components: {
        selectImgs: () => import('@/components/selectImgs/index.vue'),
    },
    props: {
        value: {
            // 背景图片
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSelectImgsShow: false, // 是否显示选择图片弹窗
        }
    },
    methods: {
        // 关闭选择图片弹窗
        closeSelectDialog() {
            this.isSelectImgsShow = false
        },

        // 确定选择图片
        determine(imgs_arr) {
            if (!Array.isArray(imgs_arr) || imgs_arr.length == 0) return
            this.$emit('input', imgs_arr[0].imgs_url)
            this.isSelectImgsShow = false
        },

        // 打开选择图片弹窗
        openImgDialog() {
            this.isSelectImgsShow = true
        },

        // 清除背景图片
        clearPluginBgUrl() {
            this.$emit('input', '')
        },
    },
}
</script>

<style lang="scss" scoped>
.plugin-bg-container {
    min-height: 100px;
    .no-bg {
        border: 1px solid #ccc;
    }
}

.pos-close {
    top: 5px;
    right: 5px;
}
</style>
