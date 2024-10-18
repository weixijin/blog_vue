<template>
    <ul class="menu">
        <li v-for="(item, index) in list" :key="index" @click="goTo(item)">
            {{ item.label }}
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    label: '新增文章',
                    url: '#/blog/admin_article',
                },
                {
                    label: '新增bug',
                    url: '#/admin/notes/err_info_c',
                },
                {
                    label: '推送邮件',
                    url: `#/normal/push_task`,
                },
                {
                    label: '体重管理',
                    url: '#/admin/echarts/weight',
                },
                {
                    label: '心得记录',
                    url: '#/blog/experience_record',
                },
            ],
        }
    },
    computed: {
        ...Vuex.mapState(['userdata']),
    },
    mounted() {
        this.init()
    },
    methods: {
        goTo({ url }) {
            if (url.includes('mail/note.html')) {
                url = `${url}?user_id=${this.userdata._id}`
            }
            window.open(url)
        },
        async init() {
            await this.$nextTick()
            if(this.isDev()) return
            // 菜单
            const menu = document.querySelector('.menu')
            // 绑定右键事件
            document.addEventListener('contextmenu', async (e) => {
                // 取消默认的浏览器自带右键
                e.preventDefault()
                // 窗口宽高
                let winWidth = window.innerWidth
                let winHeight = window.innerHeight
                // 鼠标点击的位置
                let posX = e.pageX
                let posY = e.pageY
                // 菜单宽高
                let menuWidth = menu.getBoundingClientRect().width
                let menuHeight = menu.getBoundingClientRect().height
                // 菜单要显示的位置
                let posLeft = 0,
                    posTop = 0
                // 菜单显示时可能遇到的几种情况：
                // 右边和底部同时超出
                if (posX + menuWidth >= winWidth && posY + menuHeight >= winHeight) {
                    posLeft = posX - menuWidth
                    posTop = posY - menuHeight
                }
                // 右侧超出
                else if (posX + menuWidth >= winWidth) {
                    posLeft = posX - menuWidth
                    posTop = posY
                }
                // 底部超出
                else if (posY + menuHeight >= winHeight) {
                    posLeft = posX
                    posTop = posY - menuHeight
                }
                // 默认情况，都不超出
                else {
                    posLeft = posX
                    posTop = posY
                }
                // 设置菜单的位置并显示
                menu.style.left = posLeft + 'px'
                menu.style.top = posTop + 'px'
                menu.style.opacity = 1
                menu.style.zIndex = 999
            })

            // 最后，加个单击其他地方关闭菜单
            document.addEventListener('click', function () {
                menu.style.opacity = 0
                menu.style.zIndex = -1
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.menu {
    width: 180px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    top: 0;
    /* 默认隐藏 */
    opacity: 0;
    z-index: -1;
}

.menu li {
    display: block;
    list-style-type: none;
    padding: 12px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
}

.menu li:hover {
    background-color: cornflowerblue;
    color: #fff;
}
</style>
