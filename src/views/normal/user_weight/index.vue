<template>
    <div class="demo">
        <div class="flex-center-wrap">
            <el-button size="small" type="primary" @click="openDialog">新增</el-button>
            <div class="m-l-30">体重67.5左右</div>
            <div class="flex-wrap m-l-30">
                <div>标准体脂率：15</div>
            </div>
        </div>
           <div class="scroll-page no-bar m-t-20">
            <el-timeline>
                <el-timeline-item
                    :timestamp="klDateFormat(item.updata_time)"
                    placement="top"
                    v-for="item in list"
                    :key="item._id"
                >
                    <el-card>
                        <div class="flex-wrap">
                            <div>体重：{{ item.weight }}(kg)</div>
                            <div class="m-l-30">体脂率：{{ getWL(item.weight) }}</div>
                        </div>
                        <div class="flex-wrap flex-justify-end">
                            <div></div>

                            <div class="flex-wrap m-t-20">
                                <el-button class="edit-el-button" type="text" @click="edit(item)">编辑</el-button>
                                <el-button class="edit-el-button" type="text" @click="del(item)">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>

        <e-dialog
            custom-class="zl-dialog"
            :title="rowDate._id ? '编辑' : '新增'"
            width="350px"
            header
            v-model="dialogVisible"
            :close-on-click-modal="false"
            @closed="handleClosed"
            @confirm="handleConfirm"
        >
            <div class="p-l-20 p-t-20">
                <el-input-number
                    v-model="weight"
                    controls-position="right"
                    @change="handleChange"
                    :min="1"
                    :max="500"
                ></el-input-number>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import adminApi from '@/api/blog/admin.js'
export default {
    components: {},
    data() {
        return {
            rowDate: {},
            dialogVisible: false,
            weight: 0,
            list: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        // 计算体脂率 28岁 男 178cm
        // 1.2 x BMI + 0.23 x 年龄 – 5.4 -10.8 x 性别（男性为1，女性为0）
        getWL(weight) {
            // weight kg
            let wl = 1.2 * (weight / 1.78 / 1.78) + 0.23 * 28 - 5.4 - 10.8 * 1
            return wl.toFixed(2)
        },
        edit(item) {
            this.rowDate = item
            this.weight = item.weight
            this.dialogVisible = true
        },
        del(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    adminApi
                        .delete_weight({
                            _id: item._id,
                        })
                        .then(() => {
                            this.getList()
                        })
                        .catch(() => {})
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        handleClosed() {
            this.rowDate = {}
            this.dialogVisible = false
        },
        handleConfirm() {
            let { _id } = this.rowDate
            let params = {
                weight: this.weight,
            }
            if (_id) {
                params._id = _id
            }
            adminApi
                .post_weight(params)
                .then((res) => {
                    this.handleClosed()
                    this.getList()
                })
                .catch(() => {})
        },
        openDialog() {
            this.dialogVisible = true
        },
        getList() {
            adminApi
                .get_weights()
                .then((res) => {
                    if (res.data && Array.isArray(res.data.list)) {
                        this.list = res.data.list
                    }
                })
                .catch(() => {})
        },
        init() {
            this.getList()
        },
    },
}
</script>

<style lang="scss" scoped>
.demo{
  padding: 10px;
}
.scroll-page{
    max-height: calc(100vh - 60px);
    overflow-y: auto;
}
::v-deep{
  .el-card__body{
    padding: 10px;
  }
  .edit-el-button{
    padding: 0;
  }
}
</style>
