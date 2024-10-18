<template>
    <div class="upload-img">
        <div v-show="!value" class="flex-center w-100 h-100 border-1" @click.stop="openImgDialog">
            <i class="el-icon-plus"></i>
        </div>
        <div class="w-100 h-100 pr o-h" v-show="value">
            <i class="el-icon-circle-close p-a c-fff" @click.stop="clearPluginBgUrl"></i>
            <el-image style="width: 100px; height: 100px" :src="value" :preview-src-list="[value]">
            </el-image>
        </div>
        <moveTo>
            <selectImgs
                @closeSelectDialog="closeSelectDialog"
                @determine="determine"
                v-model="isSelectImgsShow"
            />
        </moveTo>
    </div>
</template>

<script>
import moveTo from '@/components/moveTo/index.vue'
import selectImgs from '@/components/selectImgs/index.vue'

export default {
    components: {
        selectImgs,
        moveTo
    },
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSelectImgsShow: false,
        }
    },
    methods: {
        openImgDialog() {
            this.isSelectImgsShow = true
        },
        clearPluginBgUrl() {
            this.$emit('input', '')
        },
        closeSelectDialog() {
            this.isSelectImgsShow = false
        },
        determine(arr) {
            if (arr.length === 0) return
            this.$emit('input', arr[0].imgs_url)
            this.isSelectImgsShow = false
        },
    },
}
</script>

<style lang="scss" scoped>
.border-1 {
    border: 1px solid #ccc;
}
.el-icon-circle-close{
 top: 0;
 right: 0;
 z-index: 10;
}
</style>
