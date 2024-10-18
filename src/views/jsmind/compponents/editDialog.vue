<template>
    <e-dialog v-model="visable" title="功能栏" :footer="false" width="600px">
        <div class="flex-center-wrap p-t-20 p-l-10">
            <div class="c-primary m-l-10 f-14">
                上次修改时间：{{ klDateFormat(formdata.updata_time) }}
            </div>
        </div>

        <div class="flex-center-wrap m-t-20 p-l-20" v-if="isAuthor">
            <el-radio v-model="shareType" :label="1">查看</el-radio>
            <el-radio v-model="shareType" :label="2">编辑</el-radio>
            <el-button size="small" @click="getShareCode">分享</el-button>
        </div>

        <div class="flex-center-wrap p-l-20 m-t-10">
            查看列表：
            <userList :list="formdata.watch_users" type="watch_users" @del="delUsers"></userList>
        </div>

        <div class="flex-center-wrap p-l-20 m-t-10">
            编辑列表：
            <userList :list="formdata.edit_users" type="edit_users" @del="delUsers"></userList>
        </div>

        <div class="flex-center-wrap p-l-20 m-t-10 m-b-20">
            添加子节点：
            <el-select clearable filterable v-model="selectMind" placeholder="请选择">
                <el-option
                    v-for="item in minds"
                    :key="item._id"
                    :label="item.mind_title"
                    :value="item._id"
                >
                </el-option>
            </el-select>

            <el-button @click="putMind"> 确定 </el-button>
        </div>

        <e-form
            ref="ruleFormRef"
            :formConfig="formConfig"
            :formRule="rules"
            :formData="formdata"
            v-if="isAuthor || !formdata._id"
        >
        </e-form>
    </e-dialog>
</template>

<script>
import { createFormData } from '@/mixins/tool/tool.js'
import userList from './userList.vue'

function createFromConfig() {
    return [
        {
            label: '名字',
            type: 'input',
            modelName: 'mind_title',
            className: 'w-220',
            value: '',
        },
        {
            label: '分类',
            type: 'select',
            modelName: 'jsmind_type',
            options: [],
            value: '2',
        },
    ]
}

export default {
    components: {
        userList,
    },

    props: {
        value: {
            type: Boolean,
            default: false,
        },
        _id: {
            type: String,
            default: '',
        },
        formdata: {
            type: Object,
            default: () => {
                return {
                    ...createFormData(createFromConfig()),
                    watch_users: [],
                    edit_users: [],
                    updata_time: '',
                }
            },
        },
        isAuthor: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            selectMind: '',
            minds: [],
            shareType: 1,
            rules: {
                mind_title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                jsmind_type: [{ required: true, message: '请选择分类', trigger: 'change' }],
            },
            formConfig: createFromConfig(),
        }
    },
    computed: {
        ...Vuex.mapGetters(['jsmindTypes', 'jsmindTypes1']),
        visable: {
            get() {
                return this.value
            },
            set(val) {
                if (!val) {
                    this.$emit('rowDataChange', this.formdata)
                }
                this.$emit('input', val)
            },
        },
    },
    created() {
        this.formConfig[1].options = this.jsmindTypes
        this.init()
    },
    methods: {
        get_minds() {
            this.$apis
                .get_minds({
                    type3: 'options',
                    cache: true,
                })
                .then((res) => {
                    this.minds = res?.data?.list || []
                    this.minds = this.minds.filter((item) => item._id !== this._id)
                })
        },
        init() {
            this.get_minds()
        },
        async putMind() {
            const res = await this.$confirm('确定添加为子节点吗？').catch(() => false)
            if (!res) return

            const selectMind = await this.$apis.get_mind({
                _id: this.selectMind,
            })

            const { mind_title, mind_str = {} } = selectMind?.data?.data || {}

            // TODO: 这儿最好把子节点的id全部替换一遍，防止id重复
            const { children } = mind_str?.data || []
            const childInfo = {
                direction: 'right',
                expanded: true,
                id: this.createId(),
                topic: mind_title,
                children,
            }
            this.$emit('putMind', {
                childInfo,
            })
        },
        delUsers({ type, row }) {
            this.formdata[type] = this.formdata[type].filter((item) => item._id !== row._id)
        },
        getShareCode() {
            this.$apis
                .post_temporary({
                    expire_time: 5 * 60 * 1000,
                    info: {
                        content: '脑图权限',
                        shareType: this.shareType,
                        mind_id: this._id,
                    },
                })
                .then((res) => {
                    const { _id = '' } = res?.data?.data || {}
                    if (!_id) {
                        this.$message.error('获取分享码失败')
                        return
                    }
                    // 生成链接分享
                    const fullurl = this.joinParams(location.href, {
                        shareId: _id,
                    })
                    this.copyText(fullurl).then(() => {
                        this.$message.success('复制成功,快去分享给朋友吧!')
                    })
                })
                .catch((e) => {
                    this.Toast(e)
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
