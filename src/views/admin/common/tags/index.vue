<template>
    <div class="tags">
        <el-tag
            :key="tag._id"
            v-for="tag in userTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            @click="handleClick(tag)"
        >
            {{ tag.tag_content }}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
            >+ New Tag</el-button
        >
    </div>
</template>

<script>
import adminApi from '@/api/blog/admin.js'
export default {
    components: {},
    data() {
        return {
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
        }
    },
    computed: {
        ...Vuex.mapState(['userTags']),
    },
    methods: {
        ...Vuex.mapActions(['GET_OPTIONS']),
        handleClick(tag) {
        },
        handleClose({ _id }) {
            if (!_id) this.$message.error('_id不存在')

            adminApi
                .del_tag({ _id })
                .then((res) => {
                    this.GET_OPTIONS()
                    this.$message.success('删除成功')
                })
                .catch(() => {
                    this.$message.error('删除失败')
                })
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                adminApi
                    .post_tag({ tag_content: inputValue })
                    .then((res) => {
                        this.GET_OPTIONS()
                        this.$message.success('添加成功')
                    })
                    .catch(() => {})
                    .finally((_) => {
                        this.inputVisible = false
                        this.inputValue = ''
                    })
            }
        }
    },
}
</script>
<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
