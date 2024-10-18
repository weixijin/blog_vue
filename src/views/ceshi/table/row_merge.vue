<template>
    <div class="">
        <el-table
            border
            :data="listData"
            :span-method="objectSpanMethod"
            class="tableArea"
            style="width: 100%"
        >
            <el-table-column
                align="center"
                header-align="center"
                prop="type"
                label="序号"
                width="50"
            />
            <el-table-column
                align="center"
                header-align="center"
                prop="sheetType"
                label="工单类型"
            />
            <el-table-column align="center" header-align="center" prop="taskKey" label="taskKey" />
            <el-table-column
                align="center"
                header-align="center"
                prop="templateUrl"
                label="templateUrl"
            />
            <el-table-column width="150px" align="center" header-align="center" label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                        <i class="el-icon-edit-outline" @click="modify(scope)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <i class="el-icon-delete" @click="deleteData(scope)" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'myNeedDeal',
    data() {
        return {
            rowList: [],
            spanArr: [],
            position: 0,
            listData: [],
        }
    },

    methods: {
        modify(data) {
            // console.log(data)
        },
        deleteData(data) {
            // console.log(data)
        },
        queryData() {
            //查询操作
            this.listData = [
                {
                    id: 1,
                    type: 1,
                    sheetType: '事件单',
                    taskKey: 'shijian_01',
                    templateUrl: '/shijian_01',
                },
                {
                    id: 2,
                    type: 1,
                    sheetType: '事件单',
                    taskKey: 'shijian_02',
                    templateUrl: '/shijian_02',
                },
                {
                    id: 3,
                    type: 1,
                    sheetType: '事件单',
                    taskKey: 'shijian_03',
                    templateUrl: '/shijian_04',
                },
                {
                    id: 4,
                    type: 2,
                    sheetType: '问题单',
                    taskKey: 'wenti_01',
                    templateUrl: '/wenti_01',
                },
                {
                    id: 5,
                    type: 2,
                    sheetType: '问题单',
                    taskKey: 'wenti_02',
                    templateUrl: '/wenti_02',
                },
                {
                    id: 6,
                    type: 2,
                    sheetType: '问题单',
                    taskKey: 'wenti_03',
                    templateUrl: '/wenti_03',
                },
            ]
            this.rowspan()
        },
        rowspan() {
            this.listData.forEach((item, index) => {
                if (index === 0) {
                    this.spanArr.push(1)
                    this.position = 0
                } else {
                    if (this.listData[index].type === this.listData[index - 1].type) {
                        this.spanArr[this.position] += 1
                        this.spanArr.push(0)
                    } else {
                        this.spanArr.push(1)
                        this.position = index
                    }
                }
            })
            // console.log(this.spanArr)
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            //表格合并行
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col,
                }
            }
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col,
                }
            }
        },
    },
    mounted() {
        this.queryData()
    },
}
</script>
<style lang="scss" scoped></style>
