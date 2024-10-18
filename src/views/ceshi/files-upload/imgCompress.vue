<template>
    <div class="img-compress">
        <span> 输入宽高压缩比 </span> <el-input v-model="ratio"></el-input>
        <input type="file" ref="fileRef" @change="fileChange" />

        <div class="item">
            <span> 压缩前:{{ imgSize }} </span>
            <img :src="img1" alt="" />
        </div>
        <div class="item">
            <div>
                <span> 压缩后:{{ imgSize_ }} </span>
                <img :src="img2" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import { compressImg } from '@/mixins/tool/tool.js'
export default {
    components: {},
    data() {
        return {
            img1: '',
            img2: '',
            imgSize: '',
            imgSize_: '',
            ratio: 1,
        }
    },
    watch: {
        ratio() {
            if (!this.img1) {
                return
            }
            this.fileChange()
        },
    },
    methods: {
        async fileChange() {
            var file = this.$refs.fileRef.files[0]
            let fileInfo = await compressImg(file, this.ratio)
            // console.log(fileInfo)
            this.img1 = fileInfo.imgBase64
            this.img2 = fileInfo.imgBase64_
            this.imgSize = fileInfo.imgSize
            this.imgSize_ = fileInfo.imgSize_
        },
    },
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 200px;
}
</style>
