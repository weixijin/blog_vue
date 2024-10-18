<template>
    <e-dialog
        title="批量移动文章，切换分类"
        center
        v-model="value"
        width="30%"
        @closed="handleClose"
        @confirm="confirm"
    >
        <div class="main p-15">
            <p class="c-danger m-b-15">确定要将已选择的文章移动到其他分类吗？</p>
            <p class="m-b-15">
                已选择 <span class="c-primary">{{ selectNumber }}</span> 篇文章
            </p>

            <p class="m-b-15">请选择分类：</p>

            <el-radio
                class="m-b-15"
                v-model="class_id"
                :label="item._id"
                v-for="item in navList"
                :key="item._id"
                >{{ item.class_name }}</el-radio
            >
        </div>
    </e-dialog>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        selectNumber: {
            type: Number,
            default: 0,
        },
        navList: {
            type: Array,
            default: [],
        },
        articlesList: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            class_id: '',
        }
    },
    watch: {
        navList:{
            handler(val){
                this.navList = val
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        confirm() {
            let params = {
                class_id: this.class_id,
            }
            params.article_ids = this.articlesList
                .filter((item) => item.isHandle)
                .map((item) => item._id)

            if(!this.class_id){
                this.$message.error('请选择分类')
                return
            }

            if(!params.article_ids.length){
                this.$message.error('请选择文章')
                return
            }
            httpApi
                .put_article_class(params)
                .then(() => {
                    this.class_id = ''
                    this.$emit('confirm')
                })
                .catch(() => {})
        },
        handleClose() {
            this.$emit('input',false)
        },
    },
}
</script>

<style lang="scss" scoped></style>
