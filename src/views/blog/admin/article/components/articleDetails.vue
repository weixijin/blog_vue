<template>
    <el-drawer
        size="600px"
        title="文章详情"
        :visible.sync="value"
        direction="rtl"
        :before-close="handleClose"
    >
        <div class="edit-container p-t-20 p-b-20">
            <div class="flex-wrap flex-center-wrap p-l-20 p-r-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">所属分类</div>
                </div>

                <el-select filterable class="flex-1" v-model="params.class_id" placeholder="请选择">
                    <el-option
                        v-for="item in articleClasss"
                        :key="item._id"
                        :label="item.class_name"
                        :value="item._id"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="flex-wrap flex-center-wrap p-l-20 p-r-20 m-t-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger bg-fff b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">标签</div>
                </div>

                <!-- 最多同事选择5个标签 -->
                <el-select
                    multiple
                    collapse-tags
                    filterable
                    class="flex-1"
                    v-model="params.blog_tags"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in tagsList"
                        :key="item._id"
                        :label="item.tag_name"
                        :value="item._id"
                    >
                    </el-option>
                </el-select>

                <el-button class="m-l-20" type="primary" @click="openAddTagDialog">新增标签</el-button>
            </div>

            <div class="flex-wrap flex-center-wrap p-l-20 p-r-20 m-t-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">标题</div>
                </div>

                <el-input
                    class="flex-1"
                    type="text"
                    placeholder="请输入文章标题"
                    maxlength="30"
                    show-word-limit
                    v-model="params.article_name"
                ></el-input>
            </div>

            <div class="flex-wrap p-l-20 p-r-20 m-t-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">文章SEO</div>
                </div>

                <el-input
                    :rows="5"
                    class="flex-1"
                    type="textarea"
                    placeholder="请输入文章seo项"
                    v-model="params.article_keywords"
                ></el-input>
            </div>

            <div class="flex-wrap flex-center-wrap p-l-20 p-r-20 m-t-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">阅读量</div>
                </div>

                <kl-input
                    v-model="params.article_watch_numbers"
                    integer
                    :min="0"
                    placeholder="请输入文章阅读量"
                ></kl-input>
            </div>

            <div class="flex-wrap flex-center-wrap p-l-20 p-r-20 m-t-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">私密分类</div>
                </div>

                <e-switch
                    v-model="params.article_need_token"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    successText="公开"
                    errorText="私密"
                >
                </e-switch>
            </div>

            <div class="flex-wrap p-l-20 p-r-20 m-t-20">
                <div class="h-40 flex-wrap flex-center-wrap w-90">
                    <div class="w-10 h-10 bg-danger b-r-2 m-r-7"></div>
                    <div class="dor-title c-555">背景图片</div>
                </div>

                <selectImg v-model="params.article_bck_url" @confirm="getImg"></selectImg>
            </div>

            <div class="m-t-30 p-l-20">
                <el-button type="primary" @click="save">保 存</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import httpApi from '@/api/blog/admin'

export default {
    components: {
        selectImg: () => import('@/views/blog/admin/article/components/selectImg.vue'),
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        editObj: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            tagsList: [],
            articleClasss: [],
            params: {
                blog_tags: [],
                class_id: '',
                article_keywords: '',
                article_bck_url: '',
                article_name: '',
                article_need_token: '2',
                article_watch_numbers: 0, 
            },
        }
    },
    watch:{
        editObj:{
            handler(val){
                if(val){
                    this.params = {
                        ...val
                    }
                }
            },
            deep:true
        }
    },
    created() {
        this.init()
    },
    methods: {
        save(){
            this.$emit('save')
        },
        openAddTagDialog() {
            this.$emit('openAddTagDialog')
        },
        // 获取选择的背景图片
        getImg(article_bck_url) {
            this.params.article_bck_url = article_bck_url
        },
        // 获取文章分类
        getArticleClasss() {
            return httpApi.getArticleClasss()
        },

        // 初始化
        init() {
            if (!this.isEdit) {
                httpApi.get_img({cache:true,expire_time:24*3600*1000}).then((res) => {
                    if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
                        this.params.article_bck_url = res.data.data[0].imgs_url
                    }
                }).catch(() => {})
            }
            Promise.all([this.getArticleClasss(), this.get_blog_tag_list()])
                .then((res) => {
                    this.articleClasss = res[0]?.data?.list || []
                    this.articleClasss = this.articleClasss.map(item=>{
                        let {roles,class_name} = item
                        if(roles.length === 1 && roles[0] === 'admin'){
                            return {
                                ...item,
                                class_name: `${class_name}【私密】`
                            }
                        }
                        return {
                            ...item
                        }
                    })
                })
                .catch(() => {})
        },
        get_blog_tag_list() {
            httpApi.get_blog_tag_list({ page: 1, limit: 100 }).then((res) => {
                if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
                    this.tagsList = res.data.data
                }
            })
        },

        // 关闭
        handleClose() {
            this.$emit('input', false)
            this.$emit('close')
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-drawer__header {
        padding-top: 0;
        padding-left: 0;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-weight: 550;
        font-size: 17px;
        color: #333;
        background-color: #f5f7fa;
        margin: 0;
    }
}

.edit-container {
    height: calc(100vh - 60px);
    overflow-y: auto;
}
</style>
