<template>
    <div class="demo">
        <div class="m-c">
            <klPreviewsVideo />
        </div>
        <klCalendar />

        <el-button v-waves @click="dialogVisible = true">打开弹窗</el-button>

        <el-button v-waves.button.light @click="openMessage">打开openMessage</el-button>

        <!-- 底层弹窗 -->
        <klDialog
            :modal="false"
            width="700px"
            title="底层弹窗"
            :dialogVisible="dialogVisible"
            @close="dialogVisible = false"
            center
        >
            <template slot="header">
                <div class="kl-dailog-header cc">我是自定义头部哟</div>
            </template>
        </klDialog>

        <kl-popup :visible="dialogVisible" bottom @close="dialogVisible = false">
            修复安卓bug
        </kl-popup>

        <el-button @click="dateVisable = true"> 开始选择日期 </el-button>
        <pre>
            {{ dateArr }}
        </pre>

        <el-button @click="drawerVisable = true"> 打开kl-drawer </el-button>
        <kl-drawer :visible="drawerVisable">
            <div class="h-v-100" @click="drawerVisable = false">31</div>
        </kl-drawer>

        <el-button @click.stop="vPopupVisible = true"> 打开v-popup </el-button>

        <v-popup v-model="vPopupVisible"> ahjahahj </v-popup>

        <h2>v-tabs</h2>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            vPopupVisible: false,
            drawerVisable: false,
            dateVisable: false,
            dateArr: [],
            dialogVisible: false,
        }
    },
    created() {},
    methods: {
        openMessage() {
            this$klMessage('你好！')
        },
        // 弹窗关闭事件
        klDialogCloseBefore() {
            this.dialogVisible = false
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 300vh;
    background-color: #fff;
    width: 100vw;
    overflow-y: auto;
}
::v-deep {
    .kl-nav-pane {
        padding: 0 10px;
    }
}
.m-c {
    width: 1000px;
    margin: 50px auto;
}
</style>
