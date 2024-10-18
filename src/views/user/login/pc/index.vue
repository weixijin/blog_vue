<template>
    <div class="login">
        <div class="right-wrap">
            <div class="login-wrap common-bg-1">
                <div class="form pr">
                    <!-- 游客登录 -->
                    <div class="t-box pa c-danger cu" @click="tLogin">游客登录</div>
                    <h3>登 录</h3>
                    <div v-if="!isCode">
                        <el-col style="margin-top: 30px">
                            <div class="flex-wrap">
                                <span class="input-label">邮箱</span>
                                <el-input
                                    placeholder="请输入邮箱"
                                    size="medium"
                                    v-model.trim="email"
                                />
                            </div>
                        </el-col>
                        <el-col style="margin-top: 15px">
                            <div class="flex-wrap">
                                <span class="input-label">密码</span>
                                <el-input
                                    placeholder="请输入密码(5~30)"
                                    size="medium"
                                    v-model.trim="password"
                                    type="password"
                                    @keyup.enter.native="login"
                                />
                            </div>
                        </el-col>

                        <el-col style="margin-top: 30px">
                            <div class="flex-wrap">
                                <span class="input-label">验证码</span>
                                <el-col class="code">
                                    <el-input
                                        size="medium"
                                        v-model.trim="code"
                                        @keyup.enter.native="login"
                                    />

                                    <p v-loading="isLoading" class="handleyzm" @click="getEmailCode" v-if="!isTrue">
                                        获取验证码
                                    </p>
                                    <p class="handleyzm" v-else>{{ isNum }}秒后可以重新获取</p>
                                </el-col>
                            </div>
                        </el-col>

                        <el-col style="margin-top: 30px">
                            <el-button class="login-btn" @click="login" :loading="loading">
                                登 录
                            </el-button>
                        </el-col>
                    </div>
                    <div class="code-cover" v-else>
                        <div id="qrcode" @click="createCode" ref="codeRef"></div>
                        <span class="c-danger"> 使用网站专属app扫码登录 </span>
                    </div>

                    <div class="gologincover">
                        <span class="code-span" @click="switchCodeType"> {{ footerText }}</span>
                        <router-link to="/register" class="gologin">前往注册</router-link>
                        <router-link to="/findPassword" class="findPassword">重置密码</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLogin, getMail, getUserLogin } from '@/api/data'
import QRCode from 'qrcodejs2-fix'

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
            isLoading:false
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
        let userAgent = navigator.userAgent
        console.log(111, navigator.userAgent)
    },

    methods: {
        async tLogin() {
            // 直接本地生成一个key作为用户id
            let msg = await this.$confirm(
                '游客登录可能导致部分功能无法使用，请谨慎使用，可在个人中心完善信息，使用网站完整功能',
            )
            if (!msg) return

            // 先获取本地的

            let email = await localforage.getItem('tourist_email')
            if (!email) {
                email = this.createId()
                localforage.setItem('tourist_email', email)
            }
            getLogin({
                email,
                role: 'tourist',
            })
                .then((data) => {
                    // 保存用户信息
                    this.$store.commit('setUserData', data.data)
                    if (this.isPc()) {
                        return this.backPage()
                    }
                })
                .catch(() => {})
        },
        // 取出用户信息
        getUserInfo() {
            // 取出用户信息
            let userInfo = localStorage.getItem('userInfo')
            if (userInfo) {
                let { email, password } = JSON.parse(userInfo)
                this.email = email
                this.password = password
            }
        },
        // 保存用户信息
        saveUserData() {
            let { email, password } = this
            localStorage.setItem('userInfo', JSON.stringify({ email, password }))
        },
        // 返回原来的页面
        backPage() {
            let { path } = this.query
            // 移除path参数
            this.updateUrl('path', null)
            window.location.replace(path ? decodeURIComponent(path) : '/')
        },
        // 创建二维码
        createCode() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
            $('#qrcode').html('')
            this.$nextTick(() => {
                let that = this
                // 创建一个用来轮询的id
                const USER_CODE_ID = this.createId()
                this.qrcode = new QRCode(this.$refs.codeRef, {
                    text: `http://127.0.0.1:3999?user_code_id=${USER_CODE_ID}`,
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H,
                })
                // 开始轮询查找当前状态
                this.timer = setInterval(() => {
                    getUserLogin({
                        user_code_id: USER_CODE_ID,
                    })
                        .then((res) => {
                            let { data, token } = res.data || {}
                            this.$message.success('登录成功')
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
                return this.$message.error('请先输入邮箱,才能获取验证码')
            }

            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (!reg.test(this.email)) {
                return this.$message.error('请检查邮箱是否合法')
            }
            this.isLoading = true
            let { code } = await getMail({
                email: this.email,
            })

            this.isLoading = false
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
                this.$message.error('请输入密码')
                return
            }
            if (password.length < 5 || password.length > 20) {
                return this.$message.error('密码长度要求5~20个字符')
            }

            if (!code) {
                return this.$message.error('沒有填写验证码')
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
            // 保存登陆信息
            this.$message.success(data.msg)
            this.isTrue = false
            this.isNum = 60
            clearInterval(this.timer)
            this.timer = null
            // 保存用户信息
            this.$store.commit('setUserData', data.data)
            this.saveUserData()

            if (this.isPc()) {
                return this.backPage()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
        width: 32px;
        height: 32px;
    }

    .el-input__inner {
        &:focus {
            border: 1px solid $primary;
        }
    }

    .el-input--medium .el-input__inner {
        height: 40px;
        line-height: 40px;
    }
}
.login-wrap {
    width: 440px;
    height: 420px;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-size: cover;
    box-shadow: 0 0 10px rgba(28, 76, 186, 0.1);
    // background-color: none;

    .form {
        widows: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 50px 30px;
        background: #fff;

        h3 {
            color: #555;
            font-size: 26px;
            text-align: center;
            font-weight: 600;
        }

        .input-label {
            color: #333;
            font-size: 14px;
            padding: 8px 0;
            display: block;
            min-width: 50px;
            white-space: nowrap;
            text-align: right;
            padding-right: 8px;
        }

        .code {
            display: flex;
            justify-content: space-between;

            .el-input {
                flex: 1;
                margin-right: 20px;
            }

            img {
                width: 115px;
                height: 40px;
                cursor: pointer;
                border-radius: 5px;
                // background: #f8f8f8 !important;
            }
        }

        .login-btn {
            width: 100%;
            height: 40px;
            border: 0;
            color: #fff;
            background: $primary;
        }
    }
}

.handleyzm {
    height: 36px;
    line-height: 36px;
    text-align: center;
    padding-right: 15px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    color: #444;
}

.code {
    display: flex;
    align-items: center;
}

.form {
    position: relative;
    .mima {
        // position: absolute;
        // bottom: 10px;
        // left: 50%;
        // transform: translate(-50%, 0);
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;

        font-size: 14px;
        color: #999;
        cursor: pointer;
        &:hover {
            color: #369;
        }
    }
}

.gologincover {
    text-align: center;
    height: 50px;
    line-height: 50px;
    .gologin {
        // position: relative;
        // top: 20px;
        text-decoration: none;
        color: #555;
        margin-right: 20px;
        &:hover {
            color: $primary;
        }
    }
    .findPassword {
        text-decoration: none;
        color: #555;
        &:hover {
            color: $primary;
        }
    }
}

.form {
    background-color: none !important;
}
.code {
    display: flex;
    justify-content: space-between;

    .el-input {
        flex: 1;
        margin-right: 20px;
    }

    img {
        width: 115px;
        height: 40px;
        cursor: pointer;
        border-radius: 5px;
        background: #f8f8f8 !important;
    }
}
.code-span {
    cursor: pointer;
    margin-right: 20px;
    color: $primary;
}
.code-cover {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #qrcode {
        width: 200px;
        height: 200px;
        margin-bottom: 15px;
    }
}

.t-box {
    right: 10px;
    top: 10px;
}
</style>
