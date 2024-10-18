<template>
    <div class="p-20 bg-F7F8FA h-100vh">
        <TrainPage
            ref="TrainPageRef"
            :searchConfig="searchConfig"
            :tableConfig="tableConfig"
            sendUrl="get_minds"
            customize
        >
            <template slot="btnList">
                <el-button type="primary" @click="goToMind('')">新增</el-button>
            </template>
            <template slot="author_name" slot-scope="{ record }">
                {{ record?.author_id?.username || '---' }}
            </template>
            <template slot="edit_users" slot-scope="{ record }">
                <userList :list="record.edit_users"></userList>
            </template>
        </TrainPage>
    </div>
</template>

<script>
import userList from './compponents/userList.vue'
export default {
    name: 'jsmindList',
    components: {
        userList,
    },
    data() {
        return {
            list: [],
            searchConfig: [
                {
                    label: '名称',
                    type: 'input',
                    modelName: 'content',
                },
                {
                    label: '分类',
                    type: 'select',
                    modelName: 'jsmind_type',
                    options: () => {
                        return this.jsmindTypes
                    },
                },
                {
                    label: '权限',
                    type: 'select',
                    modelName: 'type2',
                    options: () => {
                        return this.jsmindTypes1
                    },
                },
            ],
            tableConfig: {
                isSelection: false,
                maxHeightFlag: false,
                stripe: true,
                filterData: (data) => {
                    return data.map((item) => {
                        let { create_time, updata_time, jsmind_type, watch_users, edit_users } =
                            item
                        return {
                            ...item,
                            _jsmind_type:
                                this.jsmindTypes.find((item) => item.value == jsmind_type).label ||
                                '',
                            _watch_users: watch_users.map((item) => {
                                return {
                                    url: item.header_img,
                                    title: item.username,
                                }
                            }),
                            _edit_users: edit_users.map((item) => {
                                return {
                                    url: item.header_img,
                                    title: item.username,
                                }
                            }),
                            create_time_: this.klDateFormat(create_time),
                            updata_time_: this.klDateFormat(updata_time),
                        }
                    })
                },
                columnObj: [
                    {
                        label: '脑图名称',
                        props: 'mind_title',
                        clickFn: (row) => {
                            this.goToMind(row?._id)
                        },
                    },
                    { label: '作者', props: 'author_name', slot: 'author_name' },

                    { label: '节点数', props: 'mindLength' },
                    { label: '分类', props: '_jsmind_type' },
                    {
                        label: '可查看人员',
                        minWidth: 200,
                        props: '_watch_users',
                        previewA: true,
                        isImage: true,
                        class: ['b-r-50'],
                        clickFn: (val) => {
                            console.log(val)
                        },
                    },
                    {
                        label: '可编辑人员',
                        minWidth: 200,
                        props: '_edit_users',
                        previewA: true,
                        isImage: true,
                        class: ['b-r-50'],
                        clickFn: (val) => {
                            console.log(val)
                        },
                    },
                    { label: '更新日期', props: 'updata_time_' },
                    { label: '创建日期', props: 'create_time_' },
                    {
                        label: '操作',
                        slot: 'projectDetail',
                     
                        props: 'action',
                        lock: true,
                        fixed: 'right',
                        children: [
                            {
                                label: '删除',
                                type: 'danger',
                                clickFn: (row) => {
                                    this.del(row._id)
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
    created() {
        if (this.isAdmin) {
            this.searchConfig.push({
                label: '用户',
                type: 'select',
                modelName: '_user_id',
                options: async () => {
                    return new Promise((resolve) => {
                        this.$apis
                            .get_authors({
                                page: 1,
                                limit: 50,
                                cache: true,
                                expire_time: 3600 * 1000,
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
            })
        }
    },
    methods: {
        del(_id) {
            this.$confirm('确认删除该记录吗？')
                .then(() => {
                    this.$apis
                        .del_mind({ _id })
                        .then(() => {
                            this.$message.success('删除成功')
                            this.$refs.TrainPageRef.getAddData()
                        })
                        .catch(() => {})
                })
                .catch(() => {})
        },
        goToMind(_id) {
            let query = {}
            if (_id) {
                query._id = _id
            }
            this.goTo('/tool/jsmind_details', {
                query,
                target: '_blank',
            })
        },
    },
}
</script>
