<template>
    <div class="demo">
        <div class="fix-header flex-center-wrap flex-justify-between" v-if="!IS_PC">
            <van-cell width="200" title="选择单个日期" :value="date" @click="show = true" />

            <el-button type="primary" size="small" class="m-l-30" @click="init">清空</el-button>
        </div>
        <div ref="klScrollRef" :class="['scroll-page', IS_PC ? 'h-100vh' : 'm-t-30']">
            <h3>推送任务一</h3>

            <el-table class="zl-ui-table m-t-10" id="list-table" :data="tableData1">
                <el-table-column width="80px" prop="type" label="分类">
                    <template slot-scope="{ row }">
                        {{ getTypeLabel(row.type) }}
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="推送内容">
                    <template slot-scope="{ row }">
                        <div
                            @click="goToLink(row)"
                            :class="[row.note_link ? 'c-link' : '']"
                            v-html="row.content"
                        ></div>
                    </template>
                </el-table-column>
            </el-table>

            <h3 class="m-t-10">推送任务二</h3>
            <el-table class="zl-ui-table m-t-10" id="list-table" :data="tableData2">
                <el-table-column width="120px" prop="note_end_time" label="结束时间">
                    <template slot-scope="{ row }">
                        {{ getTimeC(row) }}
                    </template>
                </el-table-column>
                <el-table-column prop="note_content" label="内容">
                    <template slot-scope="{ row }">
                        <div
                            @click="goToLink(row)"
                            v-html="row.note_content"
                            :class="['my-class-c-' + row.my_type, row.note_link ? 'c-link' : '']"
                        ></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 日期选择器 -->
        <van-calendar
            :min-date="minDate"
            :max-date="maxDate"
            color="#3399FF"
            v-model="show"
            :show-confirm="false"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import { klDateFormat } from '@/mixins/tool/tool'
import { get_day_push_tasks } from '@/api/blog'
const [yyyy] = klDateFormat(Date.now(), '[yyyy]')
export default {
    components: {},
    data() {
        return {
            scrollTop: 0,
            date: '',
            show: false,
            tableData1: [],
            tableData2: [],
            minDate: new Date(yyyy - 1, 0, 1),
            maxDate: new Date(yyyy + 1, 0, 31),
        }
    },
    watch: {
        date(val) {
            this.get_day_push_tasks()
        },
    },
    computed: {
        ...Vuex.mapState(['options']),
        pushDaskTypes() {
            let { options } = this
            if (!this.isObject(options)) {
                return []
            }

            return options.pushDaskTypes || []
        },
        IS_PC() {
            return this.isPc()
        },
    },
    created() {
        this.init()
    },
    async activated() {
        if (this.IS_PC) return
        // 滚动到历史记录处
        await this.$nextTick()
        let { klScrollRef } = this.$refs
        if (klScrollRef) {
            klScrollRef.scrollTop = this.scrollTop
        }
    },
    deactivated() {
        if (this.IS_PC) return
        // 保存scrollTop
        let { klScrollRef } = this.$refs
        if (klScrollRef) {
            this.scrollTop = klScrollRef.scrollTop || 0
        }
    },
    methods: {
        goToLink({ note_link }) {
            if (!note_link) return
            this.goTo(note_link, {
                target: this.IS_PC?'_blank':'_self',
            })
        },
        getTimeC(row) {
            let { date } = this
            let oneDay = 24 * 60 * 60 * 1000
            let current = new Date(date).getTime()
            let { note_begin_time, note_end_time } = row
            if (note_begin_time - current > 0) {
                return `还有${Math.abs(Math.floor((note_begin_time - current) / oneDay))}天开始`
            }
            if (current - note_end_time > 0) {
                return `已结束${Math.abs(Math.floor((current - note_end_time) / oneDay))}天`
            }

            if (note_end_time - current > 0) {
                return `还有${Math.abs(Math.floor((note_end_time - current) / oneDay))}天结束`
            }
        },

        getTypeLabel(value) {
            let obj = this.pushDaskTypes.find((item) => item.value == value)
            return obj ? obj.label : ''
        },
        get_day_push_tasks() {
            let { date } = this
            if (!date) return
            get_day_push_tasks({
                time: new Date(date).getTime(),
            })
                .then(async (res) => {
                    let { notes, pushTasks } = res.data
                    this.tableData1 = pushTasks || []
                    this.tableData2 = notes || []

                    // 处理数据
                    this.tableData1 = this.tableData1.map((item) => {
                        return {
                            ...item,
                            content: item.content.replace(/\n/g, '<br>'),
                        }
                    })

                    this.tableData2 = this.tableData2.map((item) => {
                        return {
                            ...item,
                            note_content: item.note_content.replace(/\n/g, '<br>'),
                        }
                    })
                    // 对纪要进行排序 超时，进行中，未开始
                    let arr = []
                    let current = new Date(date).getTime()

                    // 超时
                    this.tableData2.forEach((item) => {
                        let { note_begin_time, note_end_time } = item
                        if (current - note_end_time > 0) {
                            arr.push({
                                ...item,
                                my_type: 1,
                            })
                        }
                    })

                    // 进行中
                    this.tableData2.forEach((item) => {
                        let { note_begin_time, note_end_time } = item
                        if (note_begin_time - current <= 0 && current - note_end_time <= 0) {
                            arr.push({
                                ...item,
                                my_type: 2,
                            })
                        }
                    })

                    // 未开始 需要按照开始时间排序
                    let arr1 = []
                    this.tableData2.forEach((item) => {
                        let { note_begin_time, note_end_time } = item
                        if (note_begin_time - current > 0) {
                            arr1.push({
                                ...item,
                                my_type: 3,
                            })
                        }
                    })

                    arr1.sort((a, b) => a.note_begin_time - b.note_begin_time)

                    this.tableData2 = [...arr, ...arr1]

                    await this.$nextTick()
                    let el = document.querySelector('.scroll-page')
                    el.scrollTop = 0
                })
                .catch((err) => {
                    console.log(err)
                    this.$message.error('格式错误，请重新选择日期')
                })
        },
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`
        },
        onConfirm(date) {
            this.show = false
            this.date = this.klDateFormat(new Date(date).getTime(), 'yyyy/MM/dd')
        },
        init() {
            this.date = this.klDateFormat(Date.now(), 'yyyy/MM/dd')
        },
    },
}
</script>

<style lang="scss" scoped>
.c-link {
    color: $primary;
    cursor: pointer;
    text-decoration: underline;
}
.fix-header {
    height: 30px;
    padding-left: 0px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 99;
}
.p-10 {
    padding: 10px;
}
.scroll-page {
    padding: 10px;
    height: calc(100vh - 30px);
    overflow-y: auto;
}
.h-100vh {
    height: 100vh;
}
.p-t-30 {
    padding-top: 30px;
}
.my-class-c-1 {
    color: $danger;
}

.my-class-c-2 {
    color: $warning;
}

.my-class-c-3 {
    color: $success;
}
.m-l-30 {
    margin-left: 30px;
}
::v-deep {
    .zl-ui-table {
        tbody td {
            text-align: left !important;
        }
    }
}
</style>
