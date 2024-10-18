<template>
    <div class="page-1">
        <comHeader />
        <div class="h-100"></div>
        <div class="page-content w-1200">
            <nav class="tags">
                <el-checkbox-group v-model="params.blog_tags">
                    <el-checkbox
                        v-for="item in tags"
                        :key="item.id"
                        :label="item.tag_name"
                    ></el-checkbox>
                </el-checkbox-group>
            </nav>
        </div>
    </div>
</template>

<script>
import httpApi from '@/api/blog/admin.js'

export default {
    data() {
        return {
            params:{
                blog_tags:[],
                page:1,
                limit:10,
                total:0
            },
            tags: [],
        }
    },
    created() {
        this.init()
    },
    watch: {
        'params.blog_tags': {
            handler() {
                Object.assign(this.params,{
                    page:1
                })
                this.getList()
            },
            deep: true,
        },
    },
    methods: {
        getList(){
            
        },
        getTags() {
            httpApi
                .get_blog_tag_list({page:1,limit:100})
                .then((res) => {
                    if (this.getType(res.data) === 'object') {
                        let { data } = res.data
                        this.tags = data || []

                    }
                })
                .catch((err) => {
                    console.error(err)
                })
                .finally(() => {
                    this.isLoading = false
                })
        },
        init() {
            this.getTags()
        },
    },
}
</script>

<style lang="scss" scoped>
.page-1 {
    background-color: #f9f9f9;
    height: 100vh;
}
.page-content {
    margin: 0 auto;
}
</style>
