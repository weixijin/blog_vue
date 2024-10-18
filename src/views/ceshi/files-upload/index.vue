<template>
    <div class="demo">
        <klUpload
            hideFooter
            ref="klUploadRef"
            preview
            @fileChange="fileChange"
            @getFiles="getFiles"
            :limit="3"
        />

        <h2>图片压缩</h2>
        <ImgCompress />
    </div>
</template>

<script>
import ImgCompress from '@/views/ceshi/files-upload/imgCompress.vue'
export default {
    name: 'demo',
    components: { ImgCompress },
    data() {
        return {
            url: 'http://127.0.0.1:5000/ceshi/files',
        }
    },
    methods: {
        // 每次有变化都会返回的
        fileChange(fileOptions) {
            // console.log('每次上传文件变化时的返回--', fileOptions)
        },

        // 使用了组件内部的确定返回的
        async getFiles(fileOptions) {
            let param = new FormData()
            fileOptions.forEach((item) => {
                param.append('file', item.file)
            })

            let data = await axios({
                method: 'post',
                url: this.url,
                data: param,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // console.log(data.data)
            this.$message.success(data.data.msg)
            this.$refs.klUploadRef.clear()
        },
    },
}
</script>

<style lang="scss" scoped>
h2 {
    margin-top: 80px;
    margin-bottom: 30px;
}
</style>
