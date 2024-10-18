<template>
    <div class="login" :style="getStyle()">
        <kl-popup class="login-page" filter visible>
            <div class="login-wrap p-t-20 c-f5 p-b-20">
                <div class="p-l-15 p-r-15">
                    <div class="flex-center f-28 f-550 h-50 m-b-20">登 录</div>

                    <!-- 账号登录 -->
                    <div v-if="!isCode">
                        <div class="flex-wrap m-t-20">
                            <span
                                class="min-w-50 f-14 w-s-n flex-center flex-justify-end h-36 m-r-10"
                                >邮箱</span
                            >
                            <el-input
                                placeholder="请输入邮箱"
                                size="medium"
                                v-model.trim="email"
                                class="flex-1"
                            />
                        </div>

                        <div class="flex-wrap m-t-20">
                            <span
                                class="min-w-50 f-14 w-s-n flex-center flex-justify-end h-36 m-r-10"
                                >密码</span
                            >
                            <el-input
                                class="flex-1"
                                placeholder="请输入密码(5~30)"
                                size="medium"
                                v-model.trim="password"
                                type="password"
                                @keyup.enter.native="login"
                            />
                        </div>

                        <div class="flex-center-wrap m-t-20">
                            <span
                                class="min-w-50 f-14 w-s-n flex-center flex-justify-end h-36 m-r-10"
                                >验证码</span
                            >
                            <el-col class="flex-center-wrap flex-justify-between">
                                <el-input
                                    size="medium"
                                    v-model.trim="code"
                                    @keyup.enter.native="login"
                                    class="m-r-10 flex-1"
                                />

                                <p class="w-s-n f-14" @click="getEmailCode" v-if="!isTrue">
                                    获取验证码
                                </p>
                                <p class="w-s-n f-14" v-else>{{ isNum }}秒后可以重新获取</p>
                            </el-col>
                        </div>

                        <div
                            class="h-40 flex-center c-fff bg-primary b-r-4 f-14 m-t-20"
                            @click="login"
                            :loading="loading"
                        >
                            登 录
                        </div>
                    </div>

                    <!-- 扫码登录 -->
                    <div class="flex-center flex-column-wrap m-b-10" v-else>
                        <div
                            id="qrcode"
                            class="flex-center w-200 h-200 m-b-20 bg-fff b-r-4"
                            @click="createCode"
                            ref="codeRef"
                        ></div>
                        <span class="c-warning"> 使用网站专属app扫码登录 </span>
                    </div>

                    <!-- 登录切换 -->
                    <div class="flex-center h-50 flex">
                        <span class="c-primary" @click="switchCodeType"> {{ footerText }}</span>
                        <router-link to="/register" class="m-l-15 c-f5">前往注册</router-link>
                        <router-link to="/findPassword" class="m-l-15 c-f5">重置密码</router-link>
                    </div>
                </div>
            </div>
        </kl-popup>
    </div>
</template>

<script>
import { getLogin, getMail, getUserLogin } from '@/api/data'
import QRCode from 'qrcodejs2-fix'
import { baseURL } from '@/plugins/config.js'
export default {
    components: {},
    data() {
        return {
            numberCode: 0,
            timer: null,
            qrcode: '',
            isCode: false,
            isTrue: false, // 是否处于倒计时阶段
            isNum: 60, // 倒计时
            password: '',
            email: '',
            loading: false,
            btnText: '登录',
            timer: null,
            code: '',
            bgImg: '',
        }
    },
    computed: {
        footerText() {
            if (!this.isCode) {
                return '扫码登录'
            }
            return '账号登录'
        },
        query() {
            return this.getQuery(location.href)
        },
    },
    created() {
        this.getUserInfo()
    },
    mounted() {
        this.winSleep(() => {
            try {
                this.getIndexDBIMJ({
                    bgImg: `${baseURL}netdist/b55dba33e5c476a1d751ca7c4a41a369-1709302423536~1~.jpg`,
                })
            } catch (err) {
                this.Toast(err)
            }
        })
    },

    methods: {
        getStyle() {
            return {
                backgroundImage: `url(${this.bgImg})`,
            }
        },
        // 取出用户信息
        async getUserInfo() {
            // 取出用户信息
            let userInfo = await localforage.getItem('userInfo')
            if (userInfo) {
                let { email, password } = JSON.parse(userInfo)
                this.email = email
                this.password = password
            }
        },
        // 保存用户信息
        saveUserData() {
            let { email, password } = this
            localforage.setItem('userInfo', JSON.stringify({ email, password }))
        },
        // 返回原来的页面
        backPage() {
            let { path } = this.query
            // 移除path参数
            this.updateUrl('path', null)
            window.location.replace(path ? decodeURIComponent(path) : '/')
        },
        createCode() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
            $('#qrcode').html('')
            this.$nextTick(() => {
                let that = this
                this.user_code_id = this.createId()
                this.qrcode = new QRCode(this.$refs.codeRef, {
                    text: `http://127.0.0.1:3999?user_code_id=${this.user_code_id}`,
                    width: 180,
                    height: 180,
                    colorDark: '#000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H,
                })
                // 开始轮询查找当前状态
                this.timer = setInterval(() => {
                    getUserLogin({
                        user_code_id: that.user_code_id,
                    })
                        .then((res) => {
                            let { data, token } = res.data
                            this.$klMessage('登录成功')
                            clearInterval(that.timer)
                            that.time = null
                            // 保存用户信息
                            that.$store.commit('setUserData', {
                                user: data,
                                token,
                            })
                            this.backPage()
                            this.saveUserData()
                        })
                        .catch(() => {
                            if (that.numberCode >= 20) {
                                clearInterval(that.timer)
                                that.time = null
                            }

                            this.numberCode += 1
                        })
                }, 3000)
            })
        },

        switchCodeType() {
            this.isCode = !this.isCode
            if (this.isCode) {
                this.createCode()
            } else {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        // 获取邮箱验证码
        async getEmailCode() {
            if (this.email == '') {
                return this.$klMessage('请先输入邮箱,才能获取验证码')
            }

            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (!reg.test(this.email)) {
                return this.$klMessage('请检查邮箱是否合法')
            }
            let { code } = await getMail({
                email: this.email,
            })
            if (+code !== 200) {
                return
            }
            this.isTrue = true
            let timer = null
            timer = setInterval(() => {
                if (this.isNum > 1) {
                    this.isNum -= 1
                } else {
                    timer = null
                    this.isTrue = false
                    this.isNum = 60
                }
            }, 1000)
        },
        // 登录
        async login() {
            let { email, password, code } = this

            if (!password) {
                this.$klMessage('请输入密码')
                return
            }
            if (password.length < 5 || password.length > 20) {
                return this.$klMessage('密码长度要求5~20个字符')
            }

            if (!code) {
                return this.$klMessage('沒有填写验证码')
            }

            let data = null
            try {
                data = await getLogin({
                    email,
                    password,
                    code,
                })
            } catch (err) {
                this.isTrue = false
                this.isNum = 60
                clearInterval(this.timer)
                return
            }
            let { options } = data.data
            // 保存登陆信息
            this.$klMessage(data.msg)
            this.isTrue = false
            this.isNum = 60
            clearInterval(this.timer)
            this.timer = null
            // 保存用户信息
            this.$store.commit('setUserData', data.data)
            this.saveUserData()
            this.backPage()
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    .login-page {
        .zl-popup-container-filter {
            border-radius: 8px !important;
        }
    }
    .el-input {
        input:-internal-autofill-previewed,
        input:-internal-autofill-selected {
            -webkit-text-fill-color: #f1f1f1 !important;
            transition: background-color 5000s ease-in-out 0s !important;
        }
        input {
            background-color: transparent;
            background-color: transparent;
            border-color: #aaa;
            color: #f1f1f1;
            &:focus {
                border-color: $primary;
            }
        }
    }
}

.login {
    width: 100vw;
    height: 100vh;
    // background-image: url('https://uploadfile.bizhizu.cn/up/b5/5d/ba/b55dba33e5c476a1d751ca7c4a41a369.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.login-wrap {
    width: 85vw;
}

.el-input {
    flex: 1;
}

#qrcode {
    border-radius: 8px;
    overflow: hidden;
}
</style>
