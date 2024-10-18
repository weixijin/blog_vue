<template>
    <el-dialog
        class="el-dialog-center"
        top="100px"
        width="800px"
        :title="title"
        :visible="dialogVisible"
        @close="close"
        @determine="submit"
    >
        <div class="dialog-main">
            <div class="item m-b-15">
                <span> 名字： </span>
                <el-input clearable class="w-300" v-model.trim="ac_name"></el-input>
            </div>
            <div class="item m-b-15">
                <span> 地址： </span>
                <el-input clearable class="w-300" v-model.trim="ac_url"></el-input>
            </div>

            <div class="item">
                <span> 内容： </span>
                <el-input type="textarea" :rows="20" v-model.trim="ac_content"></el-input>
            </div>

            <div class="flex-center m-t-15">
                <el-button type="primary" @click="submit"> 提交 </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
export default {
    props: {
        ac_id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            ac_url: '',
            ac_name: '',
            ac_content: '',
            dialogVisible: false,
            title: '新增页面',
        }
    },
    methods: {
        close() {
            this.ac_url = ''
            this.ac_name = ''
            this.ac_content = ''
            this.dialogVisible = false
        },
        init() {
            let { ac_id } = this
            if (!ac_id) return
            let params = {
                ac_id,
            }

            httpApi
                .get_ac_page(params)
                .then((res) => {
                    let { ac_url, ac_name, ac_content } = res?.data?.data || {}
                    this.ac_url = ac_url
                    this.ac_name = ac_name
                    this.ac_content = ac_content
                })
                .catch((err) => {
                    this.Toast(err)
                })
        },
        submit() {
            let { ac_name, ac_content, ac_url, ac_id } = this
            if (!ac_name || !ac_content || !ac_url) {
                return this.$message.warning('不能为空')
            }
            let params = { ac_name, ac_content, ac_url }

            if (ac_id) {
                params.ac_id = ac_id
            }
            httpApi
                .post_ac_page(params)
                .then((res) => {
                    this.close()
                    this.$message.success(res.msg || '操作成功')
                    this.$emit('updataList')
                })
                .catch((err) => {
                    this.Toast(err)
                })
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
