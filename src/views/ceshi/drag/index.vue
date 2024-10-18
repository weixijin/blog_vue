<template>
    <div class="drag">
        <el-button @click="showMessage"> kl-message </el-button>
        <el-button @click="showDialog"> kl-dialog </el-button>
        <el-button @click="dialogVisible1 = true"> kl-dialog1 </el-button>

        <el-button type="primary" @click="isCenter = true"> 出来吧拖拽 </el-button>

        <el-button type="primary" @click="putUser"> mock模拟修改用户信息 </el-button>
        <!-- 特殊的局部拖拽，只有高度被拖拽 -->
        <div ref="dragRef" :class="['drag-box', isCenter ? 'drag-center' : '']">
            <div ref="buttonRef" class="drag-button" @mousedown="mousedown($event)"></div>
            <div ref="dragmainRef" class="drag-main"></div>
        </div>

        <!-- 底层弹窗 -->
        <klDialog
            :modal="false"
            width="700px"
            title="底层弹窗"
            :dialogVisible="dialogVisible"
            @close="klDialogCloseBefore"
            center
        >
            <template slot="header">
                <div class="kl-dailog-header cc">
                    我是自定义头部哟
                </div>
            </template>
            <div class="dialog-main">
                <h4>自定义弹窗</h4>
                <el-button @click="dialogVisibleTwo = true"> 打开二层弹窗 </el-button>
            </div>
        </klDialog>

        <!-- 二层弹窗 -->
        <klDialog
            top="50"
            :modal="false"
            width="500px"
            title="二层弹窗"
            :dialogVisible="dialogVisibleTwo"
            @close="dialogVisibleTwo = false"
        >
            <div class="dialog-main">二层弹窗内容</div>
        </klDialog>

        <!-- 底层弹窗2 -->
        <klDialog
            :modal="false"
            width="600px"
            title="底层弹窗2"
            :dialogVisible="dialogVisible1"
            @close="dialogVisible1 = false"
        >
            <div class="dialog-main">底层弹窗2</div>
        </klDialog>
    </div>
</template>

<script>
// import axios from 'axios'
import { filterArray } from '@/tool/index.js'
export default {
    name: 'drag',
    components: {},
    data() {
        return {
            dialogVisible1: false,
            dialogVisibleTwo: false,
            dialogVisible: false,
            isCenter: false,
            disx: 0,
            disy: 0,
            bodyEl: null,
            clientHeight: 0,
            oldY: 0,
        }
    },
    methods: {
        // 弹窗关闭事件
        klDialogCloseBefore() {
            this.dialogVisible = false
        },
        // 显示弹窗
        showDialog() {
            this.dialogVisible = true
        },
        mousedown(el) {
            let that = this
            // 获取鼠标相对el的位置
            this.disx = el.pageX - el.target.getBoundingClientRect().left
            this.disy = el.pageY - el.target.getBoundingClientRect().top

            // 记录当前的y顶部距离
            this.oldY = el.pageY
            // 获取可视区高度
            this.clientHeight = document.body.clientHeight

            // 获取两个内部块的距离
            this.dis =
                this.$refs.dragmainRef.getBoundingClientRect().top -
                el.target.getBoundingClientRect().top

            // 但实际鼠标移动需要把事件绑定给 body(document)
            document.addEventListener('mousemove', this.mousemove)
            document.addEventListener('mouseup', function (el) {
                document.removeEventListener('mousemove', that.mousemove)
            })
        },

        mousemove(e) {
            if (this.isCenter) {
                this.isCenter = false
            }
            // 获取当前button 距离顶部的距离
            let btnTop = this.$refs.buttonRef.getBoundingClientRect().top
            let pageY = e.pageY
            let distant = pageY - this.oldY

            if (
                (btnTop >= 0 && distant < 0) ||
                (btnTop <= this.clientHeight - this.dis && distant > 0)
            ) {
                if (btnTop < 0) {
                    this.$refs.dragRef.style.top = this.dis + 'px'
                    this.oldY = pageY
                } else {
                    this.$refs.dragRef.style.top = pageY - this.disy + this.dis + 'px'
                    this.oldY = pageY
                }
            }
        },

        showMessage() {
            this$klMessage({
                message: '1245458',
                sleep: 5000,
            })
        },

        // 模拟修改用户信息
        async putUser() {
            let data = await axios.get('/api/admin/login/123456789')
        },

        // 模拟登录
        login() {
            axios
                .post('/api/user/login', {
                    name: 'wxj',
                    password: '123456',
                })
                .then((res) => {
                    // console.log(res.data.data.userdata)
                })
        },
    },
    created() {
        let arr1 = [
            { id: '1', name: 'book0' },
            { id: '2', name: 'book1' },
        ]
        let arr2 = [
            { id: '1', name: 'book0', age: '15' },
            { id: '2', name: 'book1', age: '16' },
            { id: '3', name: 'book2', age: '16' },
            { id: '4', name: 'book3', age: '16' },
        ]
        let res = filterArray(arr2, arr1)
        // console.log(res) 
        // this.getIndexDBJS('//image.zlketang.com/public/news/others/js/zepto.min.js')
    },
}
</script>

<style lang="scss" scoped>
.drag {
    position: relative;
    height: calc(100vh - 50px);
}
.box {
    position: fixed;
    top: 300px;
    left: 300px;
    width: 100px;
    min-height: 100px;
    background-color: red;
}

.drag-box {
    position: fixed;
    top: 100vh;
    left: 0px;
    min-height: 100vh;
    width: 100vw;
    background-color: #ccc;

    .drag-button {
        cursor: pointer;
        width: 100px;
        height: 40px;
        background-color: #369;
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .drag-main {
    }
}

.drag-center {
    // top: 50vh;  // 这个在再次赋值的时候没有其效果
    // transition: all 0.5s;
    animation: a 1s;
    animation-fill-mode: forwards;
}

@keyframes a {
    0% {
        top: 100vh;
    }
    100% {
        top: 50vh;
    }
}

.dialog-main {
    padding: 20px;
}
</style>
