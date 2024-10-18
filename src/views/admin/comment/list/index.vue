<template>
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_comments"
            customize
        >
        </TrainPage>
</template>

<script>
export default {
    name: 'adminCommentList',
    data() {
        return {
            list: [],
            searchConfig: [
                {
                    label: '用户',
                    type: 'select',
                    modelName: 'author_id',
                    options: async () => {
                        return new Promise((resolve) => {
                            this.$apis
                                .get_authors({
                                    page: 1,
                                    limit: 50,
                                    cache: true,
                                })
                                .then((res) => {
                                    const result = res.data.data.map((item) => {
                                        return {
                                            label: item.username,
                                            value: item._id,
                                        }
                                    })

                                    resolve(result)
                                })
                        })
                    },
                },
                {
                    label: '评论内容',
                    type: 'input',
                    modelName: 'comment_content',
                },
                {
                    label: '文章标题',
                    type: 'input',
                    modelName: 'article_name',
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { author_id, article_id, comment_create_time } = item
                        return {
                            ...item,
                            _email: author_id?.email || '',
                            _username: author_id?.username || '',
                            _article_name: article_id?.article_name || '公共留言板回复',
                            _comment_create_time: this.klDateFormat(comment_create_time),
                        }
                    })
                },
                columnObj: [
                    {
                        label: '用户邮箱',
                        props: '_email',
                        width: 200,
                    },
                    { label: '用户呢称', props: '_username', width: 200 },

                    {
                        label: '评论内容',
                        props: 'comment_content',
                        html: 'comment_content',
                        minWidth: 300,
                    },
                    { label: '文章标题', props: '_article_name', width: 200 },
                    {
                        label: '创建时间',
                        width: 200,
                        props: '_comment_create_time',
                    },
                    {
                        label: '点赞数',
                        width: 100,
                        props: 'up_number',
                    },
                    { label: '踩数', props: 'lower_number', width: 100 },
                    { label: '用户ip', props: 'user_ip', width: 200 },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '跳转查看',
                                type: 'success',
                                clickFn: (row) => {
                                    this.handleTable('delete', row)
                                },
                            },
                            {
                                label: '直接删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.handleTable('delete', row)
                                },
                            },
                            {
                                label: '拉黑并删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.handleTable('delete', row)
                                },
                            },
                        ],
                    },
                ],
            },
        }
    },
    computed: {
        ...Vuex.mapGetters(['jsmindTypes', 'jsmindTypes1']),
        ...Vuex.mapGetters(['getterNavId', 'isAdmin']),
    },
    methods: {
        // table相关操作
        handleTable(type, row) {
            let obj = {
                delete: () => {
                    return this.$message.warning('no----')
                    admin
                        .deleteCode({ _id: row._id })
                        .then((res) => {
                            // console.log(res);
                            this.$message.success(res.msg)
                            this.handleTable('get_comments')
                        })
                        .catch((_) => {})
                },
            }

            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
    },
}
</script>
