<template>
    <el-dialog :visible.sync="value" width="1200px">
        <div class="dialog-main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="工作表格" name="1"></el-tab-pane>
                <el-tab-pane label="通用表格" name="2"></el-tab-pane>
            </el-tabs>
            <div class="flex-wrap m-b-20 m-t-10">
                <el-input
                    @keyup.enter.native="oldTableDataCreate"
                    v-model="oldTableData"
                ></el-input>
            </div>
            <template v-if="+activeName === 1">
                <el-table max-height="550" height="550" border :data="tableData">
                    <el-table-column
                        v-for="(item, index) in tableLineOption"
                        :key="item.value"
                        :prop="item.value"
                        :label="item.title"
                        :width="index == 1 ? '200' : ''"
                    >
                        <template slot-scope="{ row }">
                            <el-input
                                v-if="index == 0"
                                :type="item.type || 'text'"
                                v-model="row[item.value]"
                                placeholder="请输入"
                            />
                            <el-input-number
                                v-if="index == 1"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                v-model="row[item.value]"
                                placeholder="请输入"
                            />
                        </template>
                    </el-table-column>

                    <el-table-column prop="address" label="操作" width="180">
                        <template slot-scope="{ row }">
                            <el-button type="primary" size="small" @click="addTableLine(row)">
                                新增
                            </el-button>
                            <el-button type="danger" size="small" @click="delTableLine(row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <template v-if="+activeName === 2">
                <div class="flex-center-wrap">
                    <div class="m-r-10 flex-0">表头配置</div>
                    <el-tag
                        class="m-r-10"
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="delTag(tag)"
                    >
                        {{ tag }}
                    </el-tag>
                    <el-input
                        class="input-new-tag w-200"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput"
                        >+ New Tag</el-button
                    >
                </div>
                <el-table class="m-t-10" max-height="508" height="508" border :data="tableData">
                    <el-table-column
                        v-for="(item, index) in tableLineOption"
                        :key="item.value"
                        :prop="item.value"
                        :label="item.title"
                        :width="index == 1 ? '200' : ''"
                    >
                        <template slot-scope="{ row }">
                            <el-input
                                v-if="index == 0"
                                :type="item.type || 'text'"
                                v-model="row[item.value]"
                                placeholder="请输入"
                            />
                            <el-input-number
                                v-if="index == 1"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                v-model="row[item.value]"
                                placeholder="请输入"
                            />
                        </template>
                    </el-table-column>

                    <el-table-column prop="address" label="操作" width="180">
                        <template slot-scope="{ row }">
                            <el-button type="primary" size="small" @click="addTableLine(row)">
                                新增
                            </el-button>
                            <el-button type="danger" size="small" @click="delTableLine(row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div
            slot="footer"
            class="dialog-footer p-r-20 flex-wrap flex-center-wrap flex-justify-between p-l-20"
        >
            <div class="c-danger f-14">注意重新赋值时，只要表体的数据</div>

            <div class="c-danger f-14 m-l-20" v-if="+activeName === 1">
                总时长{{getNumbers}}
            </div>
            <div>
                <el-button type="success" class="m-t-10" @click="createLineData">
                    生成表格
                </el-button>
                <el-button type="danger" @click="clear">清空</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            activeName: '1',
            oldTableData: '',
            tableData: [
                {
                    kl_0: '',
                    kl_1: '',
                    id: 0,
                },
            ],
            tableLineOption: [
                {
                    title: '任务安排',
                    value: 'kl_0',
                },
                {
                    title: '时间安排(day)',
                    value: 'kl_1',
                    type: 'number',
                },
            ],
        }
    },
    watch:{
        value(val){
            if(!val){
                this.$emit('input',false)
            }
        }
    },
    computed:{
        getNumbers(){
            return this.tableData.reduce((total,item)=>{
                return total + Number(item.kl_1)
            },0)
        }
    },
    methods: {
        delTag(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
    handleClick() {},
    // 删除
    delTableLine({ id }) {
        this.tableData = this.tableData.filter((item) => item.id !== id)
    },
    // 新增行
    addTableLine(row) {
        let { id } = row
        let index = this.tableData.findIndex((item) => item.id == id)
        let obj = {
            id: this.createId(),
            kl_0: '',
            kl_1: '',
        }
        this.tableData.splice(index + 1, 0, obj)

        // console.log(this.tableData);
    },

    // 清空
    clear() {
        this.tableData = [
            {
                kl_0: '',
                kl_1: '',
                id: 0,
            },
        ]
    },

    // 反向生成表格内容
    oldTableDataCreate() {
        this.tableData = []
        let { oldTableData } = this
        // 1. 去除首尾的|线
        oldTableData = oldTableData.slice(1, oldTableData.length - 1)
        // console.log(oldTableData.split("| |"));
        let arr = oldTableData.split('| |')

        arr.forEach((item) => {
            let arr = item.split('|')
            this.tableData.push({
                kl_0: arr[0],
                kl_1: arr[1],
                id: this.createId(),
            })
        })
    },

    // 创建表格
    async createLineData() {
        let str = '|'
        let str1 = '|-|-|'
        let alltime = 0
        let { tableLineOption, tableData } = this
        // 表头
        tableLineOption.forEach((item) => {
            str += item.title + '|'
        })
        str += '\n'
        str += str1

        // 表体
        tableData.forEach((item) => {
            str += '\n'
            str += '|'
            tableLineOption.forEach((item1) => {
                str += item[item1.value] + '|'
                if (item1.value === 'kl_1') {
                    alltime += Number(item[item1.value])
                }
            })
        })

        // 时间总结
        str += '\n'
        // 计算出总时间
        str += `|合计|${alltime}天|`
        this.copyText(str)
            .then((res) => {
                this.$message.success('复制成功')
            })
            .catch((err) => {
                this.$message.error('复制失败')
            })
    }
    }
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-dialog {
        .el-dialog__header {
            display: none;
        }
    }
    .el-dialog__body {
        padding: 0px 20px;
    }
    .el-dialog .el-dialog__footer {
        padding: 10px 0 !important;
    }
    tr {
        td {
            padding-top: 10px;
            padding-bottom: 0px;
        }
    }
}
.dialog-main {
    padding: 10px 0 0;
}
</style>
