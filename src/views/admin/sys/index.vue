<template>
    <div class="demo">
        <el-button type="primary" @click="day_init">每日任务</el-button>

        <el-button type="primary" @click="del_c_bug">清除c_bug的过期数据</el-button>

        <el-button type="primary" @click="del_blog_imgs">清除blog的未使用图片资源</el-button>
        <el-button type="primary" @click="del_im_file">清除im下的未使用资源</el-button>
    </div>
</template>

<script>
import admin from '@/api/blog/admin'
export default {
    components: {},
    data() {
        return {}
    },
    methods: {
        del_im_file() {
            this.$confirm('确定删除im的未使用资源?')
                .then(() => {
                    this.$apis
                        .del_im_file()
                        .then((res) => {
                            this.$message({
                                message: res.msg || '操作成功',
                                type: 'success',
                            })
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        del_blog_imgs() {
            this.$confirm('确定删除blog的未使用图片资源?')
                .then(() => {
                    admin
                        .del_blog_imgs()
                        .then((res) => {
                            this.$message({
                                message: res.msg || '操作成功',
                                type: 'success',
                            })
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        del_c_bug() {
            this.$confirm('确定删除以解决bug,及清空图片?')
                .then(() => {
                    admin
                        .del_c_bug()
                        .then((res) => {
                            this.$message({
                                message: res.msg || '操作成功',
                                type: 'success',
                            })
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        day_init() {
            this.$confirm('确定执行每日任务?')
                .then(() => {
                    admin
                        .day_init()
                        .then((res) => {
                            this.$message({
                                message: res.msg || '操作成功',
                                type: 'success',
                            })
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
    },
}
</script>

<style lang="scss" scoped></style>
