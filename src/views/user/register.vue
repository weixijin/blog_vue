<template>
    <div class="login">
        <!-- <particles-bg type="circle" :config="config" :bg="true" /> -->
        <div class="right-wrap">
            <div class="login-wrap common_bck_1">
                <div class="form">
                    <h3>注册</h3>
                    <el-col style="margin-top: 30px">
                        <span class="input-label">邮箱</span>
                        <el-input placeholder="请输入邮箱" size="medium" v-model.trim="email" />
                    </el-col>

                    <el-col style="margin-top: 30px">
                        <span class="input-label">密码</span>
                        <el-input
                            placeholder="请输入密码(5~20)"
                            size="medium"
                            v-model.trim="password"
                            type="password"
                            autocomplete="off"
                            @keyup.enter.native="findPassword"
                        />
                    </el-col>
                    <el-col style="margin-top: 30px">
                        <span class="input-label">确认密码</span>
                        <el-input
                            placeholder="请输入确认密码(5~20)"
                            size="medium"
                            v-model.trim="checkPass"
                            type="password"
                            autocomplete="off"
                            @keyup.enter.native="findPassword"
                        />
                    </el-col>
                    <el-col style="margin-top: 30px">
                        <span class="input-label">验证码</span>
                        <el-col class="code">
                            <el-input
                                size="medium"
                                v-model.trim="code"
                                @keyup.enter.native="login"
                            />

                            <p class="handleyzm" @click="getEmailCode" v-if="!isTrue">获取验证码</p>
                            <p class="handleyzm" v-else>{{ isNum }}秒后可以重新获取</p>
                        </el-col>
                    </el-col>

                    <el-col style="margin-top: 30px">
                        <el-button class="login-btn" @click="findPassword" :loading="loading">
                            提交注册
                        </el-button>
                    </el-col>

                    <div class="gologincover">
                        <router-link to="/login" class="gologin">返回登陆</router-link>
                        <router-link to="/findPassword" class="findPassword">重置密码</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { register, getMail } from '@/api/data'

export default {
    data() {
        return {
            isTrue: false, // 是否处于倒计时阶段
            isNum: 60, // 倒计时
            email: '',
            password: '',
            checkPass: '',
            code: '',
            loading: false,
            btnText: '登录',
        }
    },

    methods: {
        // 获取邮箱验证码
        async getEmailCode() {
            if (this.email == '') {
                return this.$message.error('请先输入邮箱,才能获取验证码')
            }

            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (!reg.test(this.email)) {
                return this.$message.error('请检查邮箱是否合法')
            }
            let data = await getMail({
                email: this.email,
            })
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

        // 提交登陆
        async findPassword() {
            let { email, password, code, checkPass } = this

            if (!email) {
                this.$message.error('请输入账号')
                return
            }

            if (!password) {
                this.$message.error('请输入密码')
                return
            }

            if (password.length < 5 || password.length > 30) {
                this.$message.error('密码长度5~30个字符')
                return
            }

            if (this.password != this.checkPass) {
                this.$message.error('两次密码输入不一致')
                return
            }

            if (!code) {
                this.$message.error('请输入验证码')
                return
            }

            let data = await register({
                email,
                password,
                code,
                checkPass,
            })

            if (data.code == 200) {
                this.$message.success(data.msg)
                this.$router.push("/login");
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

    .left-wrap {
        width: 520px;
        height: 100%;
        background: #555;
        background-size: cover;
        padding: 20px;
        box-sizing: border-box;

        .left-img {
            display: block;
            margin: auto;
            margin-top: 300px;
        }
    }

    .right-wrap {
        width: calc(100% - 520px);
        height: 100%;
        position: relative;

        .header {
            display: none;
        }

        .login-wrap {
            width: 440px;
            height: 550px;
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

            .form {
                widows: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 0px 30px;
                background: #555;
                padding-top: 30px;

                h3 {
                    color: #555;
                    font-size: 23px;
                    text-align: center;
                    font-weight: 600;
                    margin-bottom: 0px !important;
                }

                .input-label {
                    color: #333;
                    font-size: 14px;
                    padding: 8px 0;
                    display: block;
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

                .login-btn {
                    width: 100%;
                    height: 40px;
                    border: 0;
                    color: #fff;
                    background: $primary;
                }
            }
        }
    }
}

.handleyzm {
    height: 36px;
    line-height: 36px;
    text-align: center;
    padding: 0 15px;
    background-color: #f3f4fb;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    color: #444;
}

.code {
    display: flex;
    align-items: center;
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

.el-col {
    display: flex;
    span {
        width: 80px;
        margin-right: 10px;

        text-align: right;
    }
}
</style>
