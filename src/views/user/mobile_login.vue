<template>
    <div class="mobile-login">
        <div class="container">
            <div class="login-center">
                <h2>{{ title }}</h2>

                <div class="item">
                    <p>邮箱</p>
                    <input type="email" v-model="params.email" />
                </div>

                <div class="item">
                    <p>密码</p>
                    <input type="password" v-model="params.password" />
                </div>

                <button>登录</button>

                <div class="fun-footer">
                    <div
                        :class="['m-r-20']"
                        v-if="isActive !== 'login'"
                        @click="switchActive('login')"
                    >
                        登录
                    </div>
                    <div
                        :class="[isActive !== 'find_password' ? 'm-r-20' : '']"
                        v-if="isActive !== 'register'"
                        @click="switchActive('register')"
                    >
                        注册
                    </div>
                    <div v-if="isActive !== 'find_password'" @click="switchActive('find_password')">
                        找回密码
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isActive: 'login',
            title: '登录',
            params: {
                email: '',
                password: '',
                code: '',
            },
            time: 60,
            timer: null,
        }
    },
    watch: {
        isActive(val) {
            let obj = {
                login: '登录',
                register: '注册',
                find_password: '找回密码',
            }
            this.resetData()
            this.title = obj[val]
        },
    },
    methods: {
        resetData() {
            this.params = {
                email: '',
                password: '',
                code: '',
            }
            this.time = 60
            clearInterval(this.timer)
            this.timer = null
        },
        switchActive(name) {
            if (name === this.isActive) return
            this.isActive = name
        },
    },
}
</script>

<style lang="scss" scoped>
.mobile-login {
    background-image: url('https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g5/M00/00/00/ChMkJ1fJTeOIXPZzAARX_oGxFVoAAU9KQMfMTsABFgW673.jpg');
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        width: 6rem;
        background-color: rgba(255, 255, 255, 0.3);
        // backdrop-filter:blur(0.2rem);
        border-radius: 0.2rem;
        padding: 0.4rem 0 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-center {
            width: 5.2rem;
        }
        h2 {
            font-weight: 500;
            color: #fff;
            text-align: center;
            font-size: 0.4rem;
        }

        .item {
            margin-bottom: 0.4rem;
            p {
                font-size: 0.28rem;
                color: #fff;
                margin-bottom: 0.1rem;
            }

            input {
                width: 100%;
                height: 0.6rem;
                line-height: 0.6rem;
                border-radius: 0.08rem;
                font-size: 0.28rem;
                color: #555;
                padding: 0 0.1rem;
                background-color: #f5f5f5;
            }
        }

        button {
            height: 0.72rem;
            line-height: 0.72rem;
            text-align: center;
            width: 100%;
            background-color: #fff;
            border-radius: 0.08rem;
            margin-bottom: 0.4rem;
            color: #333;
            font-size: 0.32rem;
        }

        .fun-footer {
            display: flex;
            div {
                flex: 1;
                text-align: center;
                color: #fff;
                font-size: 0.28rem;
                height: 0.72rem;
                line-height: 0.72rem;
                border-radius: 0.08rem;
                background-color: #aaa;
                margin-bottom: 0.4rem;
            }
        }
    }
}
</style>
