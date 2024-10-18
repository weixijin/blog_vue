<template>
    <e-teleport>
        <kl-popup
            :visible="dialogVisible"
            top="10%"
            :height="zlPopupHeight"
            :bottom="!IS_PC"
            @close="closeDilog"
            @determine="determineDialog"
        >
            <div v-loading="isEditLoading">
                <div class="dialog-title">
                    <span class="dialog-title-text ell-1">{{ title }}</span>
                </div>
                <div :class="['dialog-main', IS_PC ? 'pc-dialog-main' : 'mobile-dialog-main']">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="addoreditRef"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="纪要内容" prop="note_content">
                            <el-input ref="input1Ref" v-model="ruleForm.note_content"></el-input>
                        </el-form-item>
                        <el-form-item label="纪要详情" prop="note_details">
                            <el-input
                                type="textarea"
                                :rows="6"
                                v-model="ruleForm.note_details"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="纪要分类">
                            
                            <el-radio-group
                                v-if="IS_PC"
                                v-model="ruleForm.note_type"
                                @change="noteTypeChange"
                            >
                                <el-radio
                                    :label="item.value"
                                    v-for="item in summaryTypeOptions"
                                    :key="item.value"
                                    >{{ item.label }}</el-radio
                                >
                            </el-radio-group>
                            
                            <el-select
                                v-else
                                clearable
                                v-model="ruleForm.note_type"
                                placeholder="请选择"
                                @change="noteTypeChange"
                            >
                                <el-option
                                    v-for="item in summaryTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="主任务权重">
                            <el-select
                                clearable
                                v-model="ruleForm.note_weight_import"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in 5"
                                    :key="'kl_' + item"
                                    :label="item"
                                    :value="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="是否需要提醒">
                            <el-switch
                                v-model="ruleForm.note_need_remind"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                            >
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="是否完成">
                            <!-- <el-radio-group v-model="ruleForm.note_done">
                            <el-radio
                                :label="item.value"
                                v-for="item in noteDoneType"
                                :key="item.value"
                                >{{ item.label }}</el-radio
                            >
                        </el-radio-group> -->

                            <el-select clearable v-model="ruleForm.note_done" placeholder="请选择">
                                <el-option
                                    v-for="item in noteDoneType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div>
                            <!-- pc的日期选择器 -->
                            <template v-if="IS_PC">
                                <el-form-item label="任务周期时间">
                                    <el-date-picker
                                        v-model="ruleForm.task_time"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :default-time="['00:00:00', '23:59:59']"
                                        @change="noteTestingTimeChange"
                                    >
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item
                                    label="提测时间"
                                    v-if="isWorkType"
                                    prop="note_testing_time"
                                >
                                    <!-- 格式为：年-月-日 -->
                                    <el-date-picker
                                        v-model="ruleForm.note_testing_time"
                                        type="date"
                                        @change="noteTestingTimeChange"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </template>

                            <!-- 移动端的日期选择器 -->
                            <template v-else>
                                <el-form-item label="任务周期时间">
                                    <div @click="openMobileDialog">
                                        {{ ruleForm.task_time | filterTaskTime(that) }}
                                    </div>
                                </el-form-item>
                                <el-form-item label="提测时间" v-if="isWorkType">
                                    <!-- 格式为：年-月-日 -->
                                    <div @click="mobileTestVisable = true">
                                        {{
                                            ruleForm.note_testing_time
                                                ? ruleForm.note_testing_time
                                                : '---'
                                        }}
                                    </div>
                                </el-form-item>
                            </template>
                        </div>
                        <el-form-item label="任务进度" prop="">
                            <el-input
                                placeholder="请输入0~100的整数"
                                class="w-220"
                                v-model.trim="ruleForm.note_progress"
                                :disabled="ruleForm.children.length > 0"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="任务链接" prop="">
                            <el-input
                                placeholder="请输入"
                                v-model.trim="ruleForm.note_link"
                            ></el-input>
                        </el-form-item>

                        <template v-if="isWorkType">
                            <el-form-item label="ui链接" prop="">
                                <el-input
                                    placeholder="请输入"
                                    v-model.trim="ruleForm.note_ui_link"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="脑图链接" prop="">
                                <el-input
                                    placeholder="请输入"
                                    v-model.trim="ruleForm.note_brain_link"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="任务版本" prop="">
                                <el-input
                                    placeholder="请输入"
                                    v-model.trim="ruleForm.note_version"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="任务项目" prop="note_backend_name">
                                <el-select
                                    v-model="ruleForm.note_types"
                                    placeholder="请选择"
                                    multiple
                                >
                                    <el-option
                                        v-for="item in noteWprkTypesOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="后端姓名" prop="note_backend_name">
                                <el-select
                                    v-model="ruleForm.note_backend_name"
                                    placeholder="请选择"
                                    multiple
                                >
                                    <el-option
                                        v-for="item in houUserList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="提供接口时间">
                                <!-- 格式为：年-月-日 -->
                                <el-date-picker
                                    v-model="ruleForm.note_backend_time"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item label="测试姓名" prop="note_test_name">
                                <el-select
                                    v-model="ruleForm.note_test_name"
                                    placeholder="请选择"
                                    multiple
                                >
                                    <el-option
                                        v-for="item in ceUserList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="ui姓名" prop="note_ui_name">
                                <el-select
                                    v-model="ruleForm.note_ui_name"
                                    placeholder="请选择"
                                    multiple
                                >
                                    <el-option
                                        v-for="item in uiUserList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="出图时间">
                                <!-- 格式为：年-月-日 -->
                                <el-date-picker
                                    v-model="ruleForm.note_ui_time"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-form>
                </div>

                <div class="dialog-footer">
                    <el-button size="small" type="danger" @click="deleteNote" v-if="editNoteId">
                        删除纪要
                    </el-button>
                    <el-button size="small" type="primary" @click="determineDialog">确定</el-button>
                    <el-button size="small" @click="closeDilog">取消</el-button>
                </div>
            </div>

            <!-- 选择日期区间 -->
            <v-calendar
                v-if="!IS_PC && timeVisible"
                v-model="timeVisible"
                :defaultDate="defaultDateFun()"
                @confirm="confirmTime"
            ></v-calendar>

            <!-- 选择提测日期 -->
            <van-calendar
                v-if="!IS_PC && mobileTestVisable"
                v-model="mobileTestVisable"
                :default-date="testDefaultFun()"
                :min-date="new Date(2022, 1, 1)"
                @confirm="onConfirm"
            />
        </kl-popup>
    </e-teleport>
</template>

<script>
import { getNote, postNote, putNote, deleteNote } from '@/api/blog'
import VCalendar from '../../aComponents/v-calendar.vue'

function ceateRuleForm() {
    return {
        _id: '',
        note_content: '',
        note_details: '', // 纪要详情
        note_need_remind: true,
        note_begin_time: '',
        note_end_time: '',
        note_testing_time: '', // 提测时间，只能在开始与结束确定后才能选择一个中间时间
        note_done: '1',
        note_progress: 0,
        task_time: [],
        note_type: '5',
        note_weight_import: 1,
        note_weight: 100,
        note_ancestors_id: '',
        note_father_id: '',
        children: [],
        note_link: '',
        note_version: '',
        note_types: [],

        // 后端姓名
        note_backend_name: [],

        // 提供接口时间
        note_backend_time: '',

        // 测试姓名
        note_test_name: [],

        // ui姓名
        note_ui_name: [],

        // 预计出图时间
        note_ui_time: '',

        // ui链接
        note_ui_link: '',

        // 脑图链接
        note_brain_link: '',
    }
}

export default {
    components: { VCalendar },
    props: {
        title: {
            type: String,
            default: '新增纪要',
        },
        editNoteId: {
            type: String,
            default: '',
        },
        activeDate: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isEditLoading: false,
            mobileTestVisable: false,
            that: this,
            timeVisible: false,
            zlPopupHeight: 'auto',
            width: '600px',
            summaryTypeOptions: [],
            noteDoneType: [],
            dialogVisible: false,
            ruleForm: ceateRuleForm(),
            rules: {
                note_content: [
                    { required: true, message: '请输入纪要', trigger: 'blur' },
                    { min: 1, message: '长度大于0', trigger: 'blur' },
                ],
                note_progress: [{ min: 0, max: 100, message: '0~100', trigger: 'blur' }],
                note_testing_time: [{ required: true, message: '请选择提测时间', trigger: 'blur' }],
            },
        }
    },
    computed: {
        ...Vuex.mapState(['options', 'keyboardEventKay']),
        ...Vuex.mapGetters(['noteWprkTypesOptions', 'houUserList', 'ceUserList', 'uiUserList']),

        IS_PC() {
            return this.isPc()
        },
        isWorkType() {
            return +this.ruleForm.note_type === 7
        },
    },
    watch: {
        keyboardEventKay(val) {
            if (val === 'ctrl_s') {
                this.determineDialog()
            }
        },
    },
    filters: {
        filterTaskTime(val, that) {
            if (Array.isArray(val) && val.length == 2) {
                function gettimestamp(time) {
                    return Date.parse(new Date(time.replace(/-/g, '/')).toString())
                }
                return (
                    that.klDateFormat(gettimestamp(val[0]), 'yyyy-MM-dd') +
                    ' 至 ' +
                    that.klDateFormat(gettimestamp(val[1]), 'yyyy-MM-dd')
                )
            } else {
                return '请选择'
            }
        },
    },
    mounted() {
        if (this.IS_PC) {
            this.width = '600px'
        } else {
            this.width = '100vw'
            // 获取可视区高度
            let clientHeight = document.documentElement.clientHeight
            this.zlPopupHeight = clientHeight - 70 + 'px'
        }
    },

    methods: {
        // 提测时间选择
        noteTestingTimeChange() {
            // 先将时间同步到note_begin_time及note_end_time
            const { task_time = [] } = this.ruleForm || {}
            if (this.isArray(task_time)) {
                this.ruleForm.note_begin_time = task_time[0] || ''
                this.ruleForm.note_end_time = task_time[1] || ''
            } else {
                Object.assign(this.ruleForm, {
                    note_begin_time: '',
                    note_end_time: '',
                })
            }

            let { note_begin_time, note_end_time, note_testing_time } = this.ruleForm
            if (!note_begin_time || !note_end_time) {
                this.ruleForm.note_testing_time = ''
                return this.$message.warning('请先选择开始与结束时间')
            }
            note_testing_time = new Date(note_testing_time).getTime()
            note_begin_time = new Date(note_begin_time).getTime()
            note_end_time = new Date(note_end_time).getTime()
            if (note_testing_time < note_begin_time || note_testing_time > note_end_time) {
                // this.ruleForm.note_testing_time = ''
                return this.$message.warning({
                    message: `请在${this.klDateFormat(
                        note_begin_time,
                        'yyyy-MM-dd',
                    )}与${this.klDateFormat(note_end_time, 'yyyy-MM-dd')}之间选择提测时间`,
                    duration: 5000,
                })
            }
        },
        // 如果是工作任务新增时默认权重为4
        noteTypeChange(val) {
            if (val == 7 && !this.ruleForm._id) {
                this.ruleForm.note_weight_import = 4
            }
        },
        testDefaultFun() {
            let { note_testing_time } = this.ruleForm
            if (note_testing_time) {
                return new Date(note_testing_time)
            }
            return new Date()
        },
        defaultDateFun() {
            if (this.ruleForm.task_time.length === 2) {
                return this.ruleForm.task_time.map((item) => new Date(item.replace(/-/g, '/')))
            }
        },

        openMobileDialog() {
            this.timeVisible = true
        },
        onConfirm(val) {
            // 提测时间必须在开始与结束时间之间
            let { note_begin_time, note_end_time } = this.ruleForm
            if (!note_begin_time || !note_end_time) {
                this.ruleForm.note_testing_time = ''
                return this.$message.warning('请先选择开始与结束时间')
            }

            let note_testing_time = new Date(val).getTime()
            note_begin_time = new Date(note_begin_time).getTime()
            note_end_time = new Date(note_end_time).getTime()
            if (note_testing_time < note_begin_time || note_testing_time > note_end_time) {
                this.ruleForm.note_testing_time = ''
                return this.$message.warning({
                    message: `请在${this.klDateFormat(
                        note_begin_time,
                        'yyyy-MM-dd',
                    )}与${this.klDateFormat(note_end_time, 'yyyy-MM-dd')}之间选择提测时间`,
                    duration: 5000,
                })
            }
            this.ruleForm.note_testing_time = this.klDateFormat(
                note_testing_time,
                'yyyy-MM-dd hh:mm:ss',
            )
            this.mobileTestVisable = false
        },

        // 移动端开始与结束时间选择有变化时
        confirmTime(val) {
            this.ruleForm.task_time = val.map((item) => this.klDateFormat(item))
            // 同步
            this.ruleForm.note_begin_time = this.ruleForm.task_time[0]
            this.ruleForm.note_end_time = this.ruleForm.task_time[1]
            this.timeVisible = false
            this.noteTestingTimeChange()
        },
        // 删除
        deleteNote() {
            let { editNoteId } = this
            if (!editNoteId) {
                return this.$message.warning('id不存在')
            }
            this.$confirm('确定删除吗?')
                .then(() => {
                    deleteNote({ _id: this.editNoteId })
                        .then((res) => {
                            if (res.msg) {
                                this.$message.success(res.msg)
                            }

                            this.closeDilog()
                            this.$emit('determine')
                        })
                        .catch((_) => {})
                })
                .catch(() => {
                    // this.$message.info('取消成功')
                    this.$message({
                        type: 'info',
                        message: '取消成功',
                        duration: 1000,
                    })
                })
        },
        // 判断是否是时间戳
        isTimestamp(val) {
            return /^\d{13}$/.test(val)
        },
        // 初始化
        async init() {
            this.dialogVisible = true
            await this.$nextTick()
            let { editNoteId } = this
            // 解构出配置项
            this.noteDoneType = this.options.noteDoneType ?? []
            this.summaryTypeOptions = this.options.summaryTypeOptions ?? []

            if (editNoteId) {
                this.isEditLoading = true
                // 编辑
                getNote({ _id: editNoteId })
                    .then((res) => {
                        if (res && res.data && res.data.data) {
                            this.ruleForm = Object.assign(this.ruleForm, res.data.data)
                            let {
                                note_begin_time,
                                note_end_time,
                                note_testing_time,
                                note_types,
                                note_backend_time,
                                note_ui_time,
                                note_backend_name,
                                note_test_name,
                                note_ui_name,
                            } = this.ruleForm
                            this.ruleForm.note_begin_time = note_begin_time
                                ? this.klDateFormat(note_begin_time)
                                : ''
                            this.ruleForm.note_end_time = note_end_time
                                ? this.klDateFormat(note_end_time)
                                : ''
                            this.ruleForm.task_time = [
                                this.ruleForm.note_begin_time,
                                this.ruleForm.note_end_time,
                            ]

                            this.ruleForm.note_testing_time = this.isTimestamp(note_testing_time)
                                ? this.klDateFormat(note_testing_time, 'yyyy-MM-dd hh:mm:ss')
                                : ''

                            this.ruleForm.note_backend_time = this.isTimestamp(note_backend_time)
                                ? this.klDateFormat(note_backend_time, 'yyyy-MM-dd hh:mm:ss')
                                : ''

                            this.ruleForm.note_ui_time = this.isTimestamp(note_ui_time)
                                ? this.klDateFormat(note_ui_time, 'yyyy-MM-dd hh:mm:ss')
                                : ''

                            this.ruleForm.note_types = note_types ? note_types.split(',') : []

                            Object.assign(this.ruleForm, {
                                note_backend_name: note_backend_name
                                    ? note_backend_name.split(',')
                                    : [],
                                note_test_name: note_test_name ? note_test_name.split(',') : [],
                                note_ui_name: note_ui_name ? note_ui_name.split(',') : [],
                            })
                        }
                    })
                    .catch((e) => {
                        this.Toast(e)
                    })
                    .finally(() => {
                        this.isEditLoading = false
                    })

                return
            }

            // 新增 --- 对时间赋初值
            this.setInitTime()

            // 聚焦
            let { input1Ref } = this.$refs
            if (input1Ref) {
                input1Ref.focus()
            }
        },

        // 对时间赋初值
        setInitTime() {
            let { activeDate } = this
            let y = activeDate[0]
            let m = this.addZero(activeDate[1])
            let d = this.addZero(activeDate[2])
            let note_begin_time = `${y}/${m}/${d}`
            let note_end_time = `${y}/${m}/${d} 23:59:59`
            this.ruleForm.note_begin_time = note_begin_time
            this.ruleForm.note_end_time = note_end_time
            this.ruleForm.task_time = [note_begin_time, note_end_time]
        },
        // 关闭弹窗
        closeDilog() {
            this.dialogVisible = false
            this.ruleForm = ceateRuleForm()
            // 滚动回顶部
            let el = $('.dialog-main')
            if (el) {
                el.scrollTop(0)
            }
        },

        // 确定
        determineDialog() {
            let { ruleForm, title, isWorkType, dialogVisible } = this
            const { addoreditRef } = this.$refs
            if (!addoreditRef || !dialogVisible) return

            const params = this.deepClone(ruleForm)
            addoreditRef.validate((valid) => {
                if (valid) {
                    let {
                        task_time,
                        note_testing_time,
                        note_types,
                        note_backend_time,
                        note_ui_time,
                        note_backend_name,
                        note_test_name,
                        note_ui_name,
                    } = params

                    if (!this.isArray(task_time) || task_time.length !== 2) {
                        return this.$message.warning('请选择任务周期时间')
                    }
                    params.note_begin_time = new Date(task_time[0]).getTime()
                    params.note_end_time = new Date(task_time[1]).getTime()
                    if (this.isArray(note_types)) {
                        params.note_types = note_types.join(',')
                    }

                    if (isWorkType) {
                        if (!note_testing_time) {
                            return this.$message.warning('请选择提测时间')
                        }

                        note_testing_time = this.klDateFormat(
                            new Date(note_testing_time).getTime(),
                            '[yyyy,M,dd]',
                        ).join('/')

                        // console.log(note_testing_time);
                        // return
                        params.note_testing_time =
                            new Date(note_testing_time).getTime() + 1000 * 3600 * 18
                    }

                    //  处理后端提供接口时间
                    if (note_backend_time) {
                        params.note_backend_time = new Date(note_backend_time).getTime()
                    }

                    // 处理ui预计出图时间
                    if (note_ui_time) {
                        params.note_ui_time = new Date(note_ui_time).getTime()
                    }

                    if (Array.isArray(note_backend_name)) {
                        params.note_backend_name = note_backend_name.join(',')
                    }
                    if (Array.isArray(note_test_name)) {
                        params.note_test_name = note_test_name.join(',')
                    }
                    if (Array.isArray(note_ui_name)) {
                        params.note_ui_name = note_ui_name.join(',')
                    }

                    const loading = this.$loading({
                        lock: true,
                        text: '保存中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })
                    if (title.includes('新增')) {
                        postNote(this.filterQuery(params))
                            .then((res) => {
                                this.$message.success(res.msg)
                                this.closeDilog()
                                this.$emit('determine')
                            })
                            .catch((_) => {})
                            .finally(() => {
                                loading.close()
                            })
                    }
                    if (title.includes('编辑')) {
                        putNote(params)
                            .then((res) => {
                                this.$message.success(res.msg)
                                this.closeDilog()
                                this.$emit('determine', res.data)
                            })
                            .catch((_) => {})
                            .finally(() => {
                                loading.close()
                            })
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.dialog-main {
    padding: 0px 20px;
}
.pc-dialog-main {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
}
.mobile-dialog-main {
    height: calc(90vh - 110px);
    overflow-y: auto;
    ::v-deep {
        .el-form-item {
            margin-bottom: 18px;
        }
        .el-radio {
            margin-right: 10px;
            .el-radio__label {
                padding-left: 5px;
            }
            .el-radio__input {
                position: relative;
                top: 1px;
            }
        }
    }
}
// 全局重置el-mentui样式
::v-deep {
    .el-dialog {
        .el-dialog__header {
            display: flex;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 0;
            color: $primary;
            font-weight: 500;
            background-color: #edf5ff !important;
            .el-dialog__title {
                flex: 1;
                text-align: center;
                color: $primary;
            }
            .el-dialog__headerbtn .el-dialog__close {
                color: $primary;
            }
        }
        .el-dialog__footer {
            border-top: 1px solid #f1f1f1;
            padding: 20px 0;
            text-align: center;
        }
    }
    .el-dialog__wrapper {
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
            // margin: 30px auto !important;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            white-space: normal;
        }
    }
}
.dialog-title,
.dialog-footer {
    padding: 0 20px;
    display: flex;
    height: 45px;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 10px;
}
.dialog-title {
    justify-content: center;
}
.dialog-footer {
    height: 55px;
    box-shadow: 0 -2px 3px #f1f1f1;
    border-bottom: none;
    justify-content: space-around;
    margin-bottom: 0;
}
.dialog-title-text {
    font-size: 16px;
    font-weight: 550;
}
</style>
