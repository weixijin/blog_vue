<template>
    <div class="common-cover">
        <comHeader />
        <div class="common-scroll better-scroll p-t-10">
            <div class="w-1100 common-bg-1 p-20">
                <div class="user-infos">
                    <div class="left pr">
                        <el-form
                            :model="params"
                            :rules="rules"
                            ref="ruleForm"
                            label-width="140px"
                            class="demo-ruleForm"
                        >
                            <el-form-item label="用户昵称：" prop="username">
                                <el-input class="w-320" v-model="params.username"> </el-input>
                            </el-form-item>
                            <el-form-item label="邮箱：" prop="email">
                                <el-input
                                    class="w-320"
                                    v-model="email"
                                    clearable
                                    :disabled="['normal', 'admin'].includes(userdata.role)"
                                >
                                </el-input>
                            </el-form-item>

                            <div class="c-danger f-14 p-l-20 m-b-10" v-if="isTourist">
                                请确保邮箱的正确性，后续修改密码、找回密码等操作都会用到
                            </div>

                            <el-form-item label="密码：" prop="password" v-if="isTourist">
                                <el-input class="w-320" v-model="password" clearable> </el-input>
                            </el-form-item>

                            <el-form-item label="主题色：" prop="primary_color">
                                <div class="flex-center-wrap">
                                    <input
                                        type="color"
                                        class="w-100 h-40 m-r-10"
                                        v-model="params.primary_color"
                                    />
                                    <el-button @click="params.primary_color = '#409EFF'"
                                        >默认</el-button
                                    >
                                </div>
                            </el-form-item>
                            <el-form-item label="个人标签：" v-if="isAdmin">
                                <el-tag
                                    class="m-r-5"
                                    :key="tag._id"
                                    v-for="tag in userTags"
                                    :disable-transitions="false"
                                >
                                    {{ tag.tag_content }}
                                </el-tag>
                            </el-form-item>

                            <el-form-item label="文章内容搜索：" prop="user_blog_search_type">
                                <el-radio v-model="params.user_blog_search_type" label="1">
                                    关键字</el-radio
                                >
                                <el-radio v-model="params.user_blog_search_type" label="2"
                                    >内容搜索</el-radio
                                >
                            </el-form-item>

                            <el-form-item label="违规次数展示：" prop="user_first_show_type">
                                <el-radio v-model="params.user_first_show_type" label="1"
                                    >打开</el-radio
                                >
                                <el-radio v-model="params.user_first_show_type" label="2"
                                    >关闭</el-radio
                                >
                            </el-form-item>

                            <el-form-item label="阅读记录上报：" prop="user_blog_history">
                                <el-radio v-model="params.user_blog_history" label="1"
                                    >打开</el-radio
                                >
                                <el-radio v-model="params.user_blog_history" label="2"
                                    >关闭</el-radio
                                >
                            </el-form-item>

                            
                            <el-form-item label="每日邮件推送提示：" prop="tipGoEmailDayStatus" v-if="isAdmin">
                                <el-radio v-model="params.tipGoEmailDayStatus" :label="1"
                                    >未开启</el-radio
                                >
                                <el-radio v-model="params.tipGoEmailDayStatus" :label="2"
                                    >开启</el-radio
                                >
                            </el-form-item>

                            <el-form-item
                                v-if="+params.user_first_show_type === 1"
                                label="违规目标"
                                prop="user_violation_target"
                            >
                                <el-input
                                    class="w-320"
                                    v-model="params.user_violation_target"
                                    type="number"
                                ></el-input>
                            </el-form-item>

                            <div class="h-60 flex-center-wrap p-l-50">
                                <el-button type="primary" @click="submit">确 认</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { putAuthor } from '@/api/blog/index.js'
export default {
    components: {},
    data() {
        return {
            pageOption: {
                page: 1,
                limit: 10,
                total: 0,
            },
            params: {
                username: '',
                primary_color: '',
                user_blog_history: '1',
                user_blog_search_type: '1',
                user_first_show_type: '1',
                user_violation_target: '',
                tipGoEmailDayStatus:1
            },
            email: '', // 游客才需要去绑定邮箱
            password: '',
            rules: {
                username: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    {
                        type: 'string',
                        min: 3,
                        max: 30,
                        message: '长度在 3 到 30 个字符',
                        trigger: 'blur',
                    },
                ],

                // 范围0~100
                user_violation_target: [
                    { required: true, message: '请输入违规目标', trigger: 'blur' },
                    // { type:'number',min: 0, max: 100, message: '范围0~100', trigger: 'blur' },
                    {
                        validator: (rule, value, cb) => {
                            if (value < 0 || value > 100) {
                                return cb(new Error('范围0~100'))
                            }
                            cb()
                        },
                        trigger: 'change',
                    },
                ],
            },
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'userTags']),
        ...Vuex.mapGetters(['isAdmin']),
        isTourist() {
            return this.userdata.role === 'tourist'
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        ...Vuex.mapMutations(['setUserData']),
        submit() {
            let { ruleForm } = this.$refs
            if (ruleForm) {
                ruleForm.validate((val) => {
                    if (!val) {
                        return false
                    }

                    // 额外校验
                    let { _id, role } = this.userdata
                    const { password, email, params, isTourist } = this

                    let params1 = {}
                    if (isTourist) {
                        if ((email || password) && (!email || !password)) {
                            this.$message.error('邮箱或密码不能为空')
                            return false
                        }
                        Object.assign(
                            params1,
                            {
                                _id,
                                email,
                                password,
                            },
                            params,
                        )
                    } else {
                        params1 = Object.assign(params1, params)
                    }
                    putAuthor(params1).then((res) => {
                        if (this.isObject(res.data)) {
                            this.setUserData({
                                user: res.data,
                            })
                            this.$message.success('修改成功')
                            localforage.removeItem('tourist_email')
                        }
                    })
                })
            }
        },
        init() {
            let {
                username,
                primary_color,
                user_blog_history,
                user_blog_search_type,
                user_first_show_type,
                email,
                user_violation_target,
                tipGoEmailDayStatus
            } = this.userdata || {}
            Object.assign(this.params, {
                username,
                primary_color,
                user_blog_history,
                user_blog_search_type,
                user_first_show_type,
                user_violation_target,
                tipGoEmailDayStatus
            })
            this.email = email
            if (this.isTourist) {
                this.email = ''
                this.password = ''
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.p-20 {
    padding: 20px;
}
h2,
h3,
p {
    color: #444;
}
h3 {
    margin: 12px 0;
}
p {
    line-height: 27px;
}
.o-h {
    overflow: hidden;
}
.pos-user-image {
    right: 20px;
    top: 20px;
    z-index: 100;
}
</style>
