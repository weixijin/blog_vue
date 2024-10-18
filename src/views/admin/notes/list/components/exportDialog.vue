<template>
    <e-dialog
        class="zl-dialog"
        title="任务盒子"
        width="800px"
        v-model="value"
        :close-on-click-modal="false"
        :footer="false"
        @closed="handleClose"
    >
        <div class="zl-dialog-main p-r-20 p-t-10 p-b-20">
            <div id="example">
                <div v-for="(item, index) in list" :key="index">
                    <div>【{{ getnote_type1(item.note_type1) }}】 {{ item.note_version }} 迭代</div>
                    <div>git:{{ getnote_type2(item.note_type1) }}</div>
                    <div>分支：</div>
                    <div v-if="isArray(item.children)">
                        <div v-for="(itey, indey) in item.children" :key="itey._id">
                            {{ indey + 1 }}、feature/{{ itey.note_content }}
                        </div>
                    </div>
                    <br />
                </div>

                <div>下周工作计划</div>
                <div v-for="(item, index) in list1" :key="'kl-' + index">
                    {{index+1 }}、 {{ item.note_content }}
                </div>
            </div>
            <el-button size="small" type="primary" class="testCopy m-t-20" @click="copy"
                >复制文案</el-button
            >
        </div>
    </e-dialog>
</template>

<script>
import ClipboardJS from 'clipboard'
import { getExportNotes } from '@/api/blog'
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            option: [
                {
                    label: '需要',
                    value: '1',
                },
                {
                    label: '不需要',
                    value: '2',
                },
            ],
            clipBoard: null,
            checkedCities: [],
            notes: [],
            exportTypes: [
                {
                    label: '本周任务',
                    name: '1',
                },
                {
                    label: '下周任务',
                    name: '2',
                },
                {
                    label: '本月任务',
                    name: '3',
                },
                {
                    label: '下月任务',
                    name: '4',
                },
            ],
            params: {
                exportType: '1',
                status: '1',
                collapse: true,
                progress: '1',
            },
        }
    },
    watch: {
        value(val) {
            if (val) {
                // 打开弹窗时，重置相关值
                this.init()
            }
        },
    },
    computed: {
        ...Vuex.mapGetters(['noteWprkTypesOptions']),
        list1() {
            let result = []
            this.list.forEach((item) => {
                if (this.isArrayLength(item.children)) {
                    item.children.forEach((itey) => {
                        if (!result.find((itez) => itez.note_content === itey.note_content)) {
                            result.push({
                                note_type1: item.note_type1,
                                note_content: itey.note_content,
                            })
                        }
                    })
                }
            })

            return result
        },
        computedText() {
            let { notes } = this
            let { status, progress } = this.params
            let currentDate = Date.now()
            let statusObj = {
                1: '开发中',
                2: '测试中',
                3: '已上线',
                4: '未开始',
            }
            let index = 1
            return notes
                .filter((item) => item.is_check)
                .map((item) => {
                    let { note_begin_time, note_testing_time, note_end_time, note_content } = item
                    if (currentDate < note_begin_time) {
                        item.my_status = 4
                        item.my_status_text = statusObj[4]
                    }

                    if (currentDate > note_begin_time && currentDate < note_testing_time) {
                        item.my_status = 1
                        item.my_status_text = statusObj[1]
                    }

                    if (currentDate > note_testing_time && currentDate < note_end_time) {
                        item.my_status = 2
                        item.my_status_text = statusObj[2]
                    }

                    if (currentDate > note_end_time) {
                        item.my_status = 3
                        item.my_status_text = statusObj[3]
                    }
                    let progressNumber = Math.floor(
                        ((currentDate - note_begin_time) / (note_testing_time - note_begin_time)) *
                            100,
                    )
                    let str = `${index}、${note_content}${
                        +status === 1 ? `【${item.my_status_text}】` : ''
                    }${+progress === 1 && item.my_status === 1 ? `（${progressNumber}%）` : ''}`
                    index++
                    return str
                })
                .join('<br/>')
        },
    },
    methods: {
        getnote_type2(str) {
            return this.noteWprkTypesOptions.find((item) => item.value === str)?.gitUrl || '--'
        },
        getnote_type1(str) {
            return this.noteWprkTypesOptions.find((item) => item.value === str)?.label || '--'
        },
        // 处理各个类型的参数
        handleClick() {
            // 处理参数
            let { exportType } = this.params
            this.params.status = [1, 3].includes(+exportType) ? '1' : '2'
            const params = {
                date_arr: [],
                note_type: 7,
            }
            // 获取今天的年月日
            let [y, M, d] = this.klDateFormat(Date.now(), '[yyyy,M,dd]')
            // 获取今天 00:00:00 的时间戳
            let todayTime = new Date(`${y}/${M}/${d}`).getTime()
            // 一天的时间戳
            let dayTime = 24 * 60 * 60 * 1000

            switch (+exportType) {
                // 获取本周的开始与结束时间戳
                case 1:
                    // 获取今天是周几
                    let week = this.getWeek(y, M, d)
                    // 获取本周的开始与结束时间戳
                    params.date_arr.push(todayTime - (week - 1) * dayTime)
                    params.date_arr.push(todayTime + (7 - week) * dayTime)
                    break
                // 获取下周的开始与结束时间戳
                case 2:
                    // 获取今天是周几
                    let week2 = this.getWeek(y, M, d)
                    // 获取下周的开始与结束时间戳
                    params.date_arr.push(todayTime + (8 - week2) * dayTime)
                    params.date_arr.push(todayTime + (14 - week2) * dayTime)
                    break
                // 获取本月的开始与结束时间戳
                case 3:
                    // 获取本月的开始与结束时间戳
                    params.date_arr.push(new Date(y, M - 1, 1).getTime())
                    params.date_arr.push(new Date(y, M, 0).getTime())
                    break
                // 获取下月的开始与结束时间戳
                case 4:
                    // 获取下月的开始与结束时间戳 需要注意跨年
                    if (+M === 11) {
                        y = y + 1
                        M = 0
                    }
                    params.date_arr.push(new Date(y, M, 1).getTime())
                    params.date_arr.push(new Date(y, M + 1, 0).getTime())
                    break
            }

            getExportNotes(params)
                .then((res) => {
                    this.notes = []
                    if (this.isArray(res.data.data)) {
                        this.notes = res.data.data.map((item) => {
                            item.is_check = true
                            return item
                        })
                    }
                })
                .catch(() => {
                    this.notes = []
                })
                .finally(() => {
                    if (this.notes.length === 0) {
                        this.$message.warning('暂无数据')
                    }
                })
        },
        // 复制文案
        copy() {
            let that = this
            this.clipBoard = new ClipboardJS('.testCopy', {
                // 通过target指定要复印的节点
                target: function () {
                    return document.querySelector('#example')
                },
            })
            // 单一弹框
            this.clipBoard.on('success', function (e) {
                that.$message.success('复制成功')
                e.clearSelection()
                that.clipBoard.destroy()
            })
            this.clipBoard.on('error', function (e) {
                that.$message.error('复制失败，请重试')
            })
        },
        init() {
            this.handleClick()
        },
        handleClose() {
            this.$emit('input', false)
        },
        submitDialogVisible() {},
    },
}
</script>

<style lang="scss" scoped>
::v-deep {
    // 重置头部样式
    .zl-dialog {
        .el-dialog {
            border-radius: 0px;
        }
        .el-dialog__header {
            height: 56px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            padding-left: 24px;
            font-size: 16px;
            font-weight: 600;
            color: #303133;
        }
        .el-dialog__headerbtn {
            top: 16px;
        }
        .el-dialog__body {
            padding: 0px !important;
        }
    }

    // 居中
    .zl-dialog.el-dialog__wrapper {
        text-align: center;
        white-space: nowrap;
        overflow: auto;
        &:after {
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }
        .el-dialog {
            margin: 30px auto !important;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
}
.zl-dialog-main {
    max-height: 600px;
    overflow: auto;
}
</style>
