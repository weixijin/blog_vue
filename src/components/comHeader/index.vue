<template>
    <div class="com-header">
        <div class="width-1100">
            <div class="log-cover">
                <kl-logo @click="goCeshi" />
            </div>
            <div class="nav-list">
                <div
                    :class="['item', +getterNavId === +item.id ? 'nav-active' : '']"
                    v-for="item in getNavList"
                    :key="item.id"
                    @click="goLink(item)"
                >
                    {{ item.navTitle }}
                </div>
            </div>

            <div class="user-info flex-center" @mouseleave="handleUserInfo('leave')">
                <div
                    @mouseenter="isShowUserInfo = true"
                    v-if="userdata.header_img"
                    :class="['user-header-img', isShowUserInfo ? 'pos-center' : '']"
                >
                    <img :src="parseResourceUrl(userdata.header_img)" />
                    <input
                        @change="handleUserInfo('input_change', $event)"
                        ref="userImgRef"
                        type="file"
                        class="pos-so"
                    />
                    <div @click="handleUserInfo('upload_header_img')" class="upload-box">
                        上传头像
                    </div>
                </div>

                <router-link to="/login" v-else>
                    <span class="c-primary f-14 cu"> 登录</span>
                </router-link>

                <!-- 弹出个人信息框 -->
                <div class="user-infos" v-if="isShowUserInfo" @click="isShowUserInfo = false">
                    <div class="username">
                        <div @click.stop="gopage" class="cu c-primary ell-1 flex-1">
                            {{ userdata.username ? userdata.username : userdata.email }}
                            <span v-if="article_total" class="c-success">
                                ({{ article_total }})
                            </span>
                        </div>
                    </div>
                    <div
                        v-for="(item, index) in listC"
                        :key="index"
                        class="kl-button cu kl-button-30 m-t-10"
                        @click="goPath(item)"
                    >
                        {{ item.label }}
                    </div>

                    <div class="kl-button cu kl-button-30 m-t-10" @click="logOut">退出</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { navList } from '@/router/config'

import { postUploadImgs, putAuthor } from '@/api/blog'

export default {
    components: {},
    data() {
        return {
            isShowUserInfo: false,
            navList,
            list: [
                {
                    url: '/admin/notes/list',
                    label: '纪要列表',
                    roles: ['admin'],
                },
                {
                    url: '/blog/ac',
                    label: '动画中心',
                    roles: ['admin', 'tourist', 'normal'],
                },
                {
                    url: '/blog/user_center',
                    label: '个人中心',
                    roles: ['admin', 'tourist', 'normal'],
                },
                // {
                //     url: '/tool/jsmind',
                //     label: '在线脑图',
                //     roles: ['admin', 'tourist', 'normal'],
                // },
            ],
        }
    },
    computed: {
        ...Vuex.mapState(['userdata', 'article_total']),
        ...Vuex.mapGetters(['getterNavId', 'isAdmin']),
        listC() {
            return this.list.filter((item) => {
                return item.roles.includes(this.userdata.role)
            })
        },
        getNavList() {
            return navList.filter(({ roles }) => {
                if (this.isArray(roles) && !roles.includes(this.userdata.role)) {
                    return false
                }
                if (!roles || (this.isArray(roles) && roles.includes(this.userdata.role))) {
                    return true
                }
            })
        },
    },
    methods: {
        ...Vuex.mapMutations(['setUserData']),
        goMailCenter() {
            window.open('http://139.9.210.43:5000/mail/note.html')
        },
        goCeshi() {
            if (!this.isAdmin) return
            this.$router.push('/ceshi')
        },
        gopage() {
            let { article_anchor_point } = this.userdata
            if (!article_anchor_point) return
            this.isShowUserInfo = false
            this.$router.push('/blog/page/' + article_anchor_point)
        },
        // 修改用户信息相关
        handleUserWrite(type, row) {
            // console.log(type, row)
            let obj = {
                username: () => {
                    this.userWrite.isNameWrite = !this.userWrite.isNameWrite
                },
            }

            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },
        // 用户下拉弹窗
        handleUserInfo(type, row) {
            let obj = {
                leave: () => {
                    this.isShowUserInfo = false
                },
                upload_header_img: () => {
                    // 上传
                    this.$refs.userImgRef.click()
                },
                input_change: async () => {
                    try {
                        let file = row.target.files[0]
                        if (
                            file &&
                            ['image/png', 'image/jpg', 'image/jpeg'].includes(
                                file.type.toLowerCase(),
                            )
                        ) {
                            var param = new FormData()
                            param.append('file', file)
                            param.append('file_type_name', 'author')
                            let data = await postUploadImgs(param)
                            let { path } = data.data.files[0]
                            let header_img = path.split('public')[1]
                            // 跟新用户头像
                            await putAuthor({ header_img })

                            // 同步用户信息
                            let user = JSON.parse(JSON.stringify(this.userdata))
                            user.header_img = header_img
                            this.setUserData({
                                user,
                            })
                            this.$message.success('修改头像成功')
                        }
                    } catch (err) {
                        this.Toast(err)
                    }
                },
            }
            if (type && Object.prototype.hasOwnProperty.call(obj, type)) {
                obj[type]()
            }
        },

        goPath({ url }) {
            this.$router.push(url)
            this.isShowUserInfo = false
        },
        // 退出
        logOut() {
            this.$confirm('确定退出吗')
                .then(() => {
                    this.isShowUserInfo = false
                    this.setUserData({
                        token: 'loginout',
                        user: {},
                    })
                    this.$message.success('退出成功')
                })
                .catch(() => {
                    this.$message.success('取消成功')
                })
        },

        //
        goLink(nav) {
            let { isNewPage, href } = nav
            if (!href) {
                return this.$message({
                    message: '该页面暂未开放',
                    type: 'warning',
                    duration: 1000,
                })
            }
            // 当前选中的nav id
            if (this.getterNavId === nav.id) return

            // 这个用于触发首页的搜索数据后，重新拉取数据
            if (this.getterNavId === -1 && window.location.pathname === '/') {
                this.$parent.getRankingClasss()
                return
            }

            if (isNewPage) {
                let routeData = this.$router.resolve({
                    path: href,
                })
                window.open(routeData.href, '_blank')

                return
            }

            this.$router.push(href)
        },
    },
}
</script>

<style lang="scss" scoped>
.com-header {
    color: #555;
    position: fixed;
    height: 80px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 1px 1px 5px $primary;
    -webkit-box-shadow: 1px 1px 5px $primary;
    -moz-box-shadow: 1px 1px 5px $primary;
    -o-box-shadow: 1px 1px 5px $primary;
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: center;
    .width-1100 {
        height: 80px;
        width: 1100px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .log-cover {
        width: 160px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
        .log {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: block;
            width: 120px;
        }
    }

    .nav-list {
        display: flex;
        align-content: center;
        .item {
            height: 80px;
            line-height: 80px;
            white-space: nowrap;
            padding: 0 35px;
            cursor: pointer;
        }
        .nav-active {
            background-color: $primary;
            color: #fff;
        }
    }
}

.user-info {
    width: 100px;
    height: 80px;
    position: relative;
    .user-header-img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .upload-box {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            justify-content: center;
            align-items: center;
            display: none;
            font-size: 14px;
            transform: all 1s;
        }

        &:hover {
            .upload-box {
                display: flex;
            }
        }
    }
    .pos-center {
        width: 80px;
        height: 80px;
        left: 0;
        top: 0;
        bottom: -5px;
        left: 50%;
        transform: translate(-50%, 50%);
        z-index: 201;
        transition: all 0.5s;
    }
}

.user-infos {
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translate(-50%, 100%);
    width: 280px;
    padding: 40px 20px 20px 20px;
    z-index: 200;
    background-color: #fff;
    transition: all 0.5s;

    .username {
        font-size: 16px;
        color: #333;
        text-align: center;
        height: 35px;
        line-height: 35px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        .kl-svg {
            margin-left: 15px;
        }
        .kl-svg:last-of-type {
            fill: $primary_0;
        }
        .kl-svg:last-of-type:hover {
            fill: $primary;
        }
    }
}
.m-t-10 {
    margin-top: 10px;
}
.pos-so {
    position: absolute;
    left: -9999px;
    top: -9999px;
    opacity: 0;
    z-index: -1;
}
</style>
