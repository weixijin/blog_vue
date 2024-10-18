<template>
    <!-- 日历 -->
    <div class="kl-calendar">
        <div
            v-if="!isCalendar"
            :class="[
                'p-f kl-calendar-no-show cu',
                IS_PC ? '' : 'f-14 flex-center c-fff mobile-kl-calendar-dor',
            ]"
            @click.stop="openCalendar"
        >
            <template v-if="IS_PC">
                <p class="f-14 m-b-5">{{ showTime[3] }}:{{ showTime[4] }}</p>
                <p>{{ showTime[0] }}/{{ showTime[1] }}/{{ showTime[2] }}</p>
            </template>
            <template v-else> 日历 </template>
        </div>

        <!-- 日历 -->
        <transition name="com-pre-an" mode="out-in">
            <div
                v-if="isCalendar"
                :class="['kl-calendar-show', IS_PC ? '' : 'mobile-kl-calendar-show']"
                @click.stop="isCalendar = true"
                v-clickoutside="handleClickOutside"
            >
                <!-- 日历头 -->
                <div class="kl-calendar-show-times">
                    <div class="kl-calendar-show-left f-16 f-blod no-wrap">
                        <span class="m-r-20 cu" @click="closeCandar"
                            >{{ calendarDate[0] }}年{{ calendarDate[1] }}月
                        </span>

                        <el-radio @change="typeChange" v-model="type" label="7">工作任务</el-radio>
                        <el-radio @change="typeChange" v-model="type" label="0">全部任务</el-radio>
                    </div>
                    <div class="kl-calendar-show-right no-wrap">
                        <kl-svg
                            @click.stop="changeCalendar('pre')"
                            name="yooxi"
                            class="cu"
                        ></kl-svg>
                        <kl-svg
                            @click.stop="changeCalendar('next')"
                            class="next-svg cu m-l-20"
                            name="yooxi"
                        ></kl-svg>
                    </div>
                </div>

                <!-- 星期几 -->
                <div class="kl-calendar-time-sex m-b-10">
                    <div class="header-item" v-for="item in headerArr" :key="item">
                        {{ item }}
                    </div>
                </div>

                <!-- 日历主体 -->
                <div
                    class="kl-calendar-time-sex calendar-scroll kl-calendar-times"
                    v-if="daysArr.length"
                >
                    <div class="calendar-scroll-container" :style="getBgStyle">
                        <div
                            @mousedown.stop="mousedownChangeDayEvent"
                            @mouseup.stop="changeDayEvent(item)"
                            :class="[
                                'pr',
                                'time-item',
                                item.isToday ? 'today-item' : '',
                                isActive(item) ? 'today-class' : '',
                                item.type === 'active' ? 'hover-bg' : '',
                                getTodayEvent(item),
                                getFlyClass(item),
                                item.festival ? 'festival-box' : '',
                            ]"
                            v-for="item in daysArr"
                            :key="item.id"
                        >
                            <!-- 当天待完成任务数 -->
                            <p
                                class="needdone-note"
                                v-if="item.todayEvent && item.todayEvent.needDone"
                            >
                                {{ item.todayEvent.needDone }}
                            </p>
                            {{ item.value }}
                        </div>
                        <div class="time-item-i" v-for="item in 7" :key="item + 'wxl'"></div>
                    </div>
                </div>

                <!-- 事件列表 -->
                <div class="events">
                    <div
                        class="kl-calendar-show-left f-16 f-blod cu flex-center-wrap"
                        @click="openNoteDialog"
                    >
                        <div>{{ activeDate[0] }}年{{ activeDate[1] }}月{{ activeDate[2] }}日</div>

                        <div v-if="festival" class="m-l-20 c-primary f-14">
                            {{ festival }}
                        </div>
                    </div>

                    <div
                        :class="[
                            'better-scroll event-days-list',
                            IS_PC ? '' : 'mobile-event-days-list',
                        ]"
                        v-if="todayEvent.length"
                    >
                        <div
                            :class="[
                                'pr event-item',
                                item.note_done == 2 ? 'c-success' : '',
                                item.note_done == 3 ? 'c-danger' : '',
                                item.note_done == 5 ? 'c-dote-done-5' : '',
                                isTodayEnd(item) ? 'c-end-task' : '',
                            ]"
                            v-for="(item, index) in todayEvent"
                            :key="index"
                            @click="editNote(item)"
                        >
                            <div
                                class="event-progress"
                                :style="{ height: item.note_progress + '%' }"
                            ></div>
                            <div class="flex-wrap">
                                <div class="note-type-c"></div>
                                <div>
                                    <!-- 任务内容： -->
                                    <div
                                        v-if="item.note_content"
                                        class="f-550 w-b"
                                        v-html="item.note_content.replace(/\n/g, '<br />')"
                                    ></div>

                                    <!-- 任务详情： -->
                                    <div
                                        v-if="item.note_details"
                                        class="f-14 m-t-5 w-b"
                                        v-html="item.note_details.replace(/\n/g, '<br />')"
                                    ></div>
                                </div>
                            </div>
                            <div class="flex-wrap m-t-10">
                                <!-- 任务状态 -->
                                <div
                                    @click="copyContent(item.note_content)"
                                    :class="[
                                        'flex-center note-type-c',
                                        getNoteType(item).className,
                                    ]"
                                >
                                    {{ getNoteType(item).content }}
                                </div>

                                <!-- 任务时间 -->
                                <div class="f-14">
                                    <div>
                                        开始时间：{{ item.note_begin_time | filterNoteTime(that) }}
                                    </div>
                                    <div class="m-t-5" v-if="+item.note_type === 7">
                                        提测时间：{{
                                            item.note_testing_time | filterNoteTime(that)
                                        }}
                                    </div>
                                    <div class="m-t-5">
                                        完成时间：{{ item.note_end_time | filterNoteTime(that) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-center no-event" v-else>暂无任务</div>
                </div>
            </div>
        </transition>

        <!-- 新增与编辑纪要弹窗 -->
        <NoteEditDialog
            ref="noteEditDialogRef"
            :activeDate="activeDate"
            :title="noteDialogTitle"
            :editNoteId="editNoteId"
            @determine="determineEditDialog"
        />

    </div>
</template>

<script>
import calendar from 'js-calendar-converter'
import adminApi from '@/api/blog/admin.js'
import { getFlyColor } from '@/plugins/config.js'
export default {
    components: {
        NoteEditDialog:()=>import('@/mixins/components/kl-calendar/components/noteEditDialog.vue'),
    },
    data() {
        return {
            bPushs: [],
            festival: '',
            flyArr: [],
            editNoteId: '',
            noteDialogTitle: '新增纪要',
            type: '7', // 默认只查询日历任务
            that: this,
            isCalendar: false,
            calendarDate: [], // 当前查看的月份信息
            activeDate: [], // 当前选中的日期 默认今日
            showTime: [], // 时钟
            timer0: null,
            headerArr: ['一', '二', '三', '四', '五', '六', '日'],
            daysArr: [],
            todayEvent: [],
            flyBgBase64: '',
            styleSize: '',
        }
    },

    computed: {
        ...Vuex.mapState(['options', 'userdata']),
        IS_PC() {
            return this.isPc()
        },
        getBgStyle() {
            let { flyBgBase64, styleSize } = this
            return {
                backgroundSize: `${styleSize}px ${styleSize}px`,
                backgroundImage: `url('${flyBgBase64}')`,
            }
        },
    },
    filters: {
        filterNoteTime(val, that) {
            return that.klDateFormat(val, 'yyyy-MM-dd hh-mm-ss')
        },
    },
    watch: {
        flyArr: {
            handler() {
                this.setIolationsNumber()
            },
            immediate: true,
            deep: true,
        },
    },
    created() {
        // 获取当前时间 开启时钟
        this.setShowTime()
    },

    beforeDestroy() {
        clearInterval(this.timer0)
        this.timer0 = null
    },
    methods: {
        ...Vuex.mapActions(['POST_USER_SYNC']),
        closeCandar(){
            this.isCalendar = false  
        },
        // 设置违规次数
        setIolationsNumber() {
            this.flyBgBase64 = ''
            this.styleSize = ''
            const flysFiter = this.flyArr.filter((item) => item.time_number > 0)
            if (!this.isArrayLength(flysFiter)) return
            let iolationsNumber = flysFiter.length
            let { user_first_show_type } = this.userdata || {}
            if (user_first_show_type == 1) {
                // 当前月多少天
                // 如果是当前月以前，计算整个月
                // 当前月，计算到今天
                // 未来都是0
                let [yyyy, MM] = this.calendarDate

                let [cy, cM] = this.klDateFormat(Date.now(), '[yyyy,M]')
                let currentTimer = new Date(`${cy}/${cM}/1`).getTime()
                let calendaeTimer = new Date(`${yyyy}/${MM}/1`).getTime()
                // 计算频率 频率越高，颜色越深
                let frequency = 0
                if (calendaeTimer < currentTimer) {
                    const days = new Date(yyyy, MM, 0).getDate()
                    frequency = iolationsNumber / days
                }

                if (calendaeTimer === currentTimer) {
                    const [days] = this.klDateFormat(Date.now(), '[d]')
                    frequency = iolationsNumber / days
                }

                let { base64, styleSize } = this.useWatermarkBg({
                    text: Math.ceil(frequency*100),
                    fontSize: 160,
                    deg: 0,
                    fillStyle: getFlyColor(frequency),
                })
                this.flyBgBase64 = base64
                this.styleSize = styleSize
            }
        },
        // 判断当前任务是否今天结束
        isTodayEnd(task) {
            let { note_end_time, note_done } = task
            let [yyyy, MM, dd] = this.activeDate
            let currentStr = Date.now()
            let isFlag = false
            if (+note_done === 1 && note_end_time) {
                let time1 = this.klDateFormat(note_end_time, 'yyyy-MM-dd')
                let time2 = `${yyyy}-${this.addZero(MM)}-${this.addZero(dd)}`
                isFlag = time1 == time2 && currentStr < note_end_time
            }

            return isFlag
        },
        // 处理今天是否存在健康
        getFlyClass({ value }, need = true) {
            if (!this.flyArr || !Array.isArray(this.flyArr)) {
                return ''
            }
            let [yyyy, MM] = this.calendarDate
            let isFlag = this.flyArr.some(({ today, time_number }) => {
                if (!time_number && need) {
                    return false
                }
                let time1 = this.klDateFormat(today, 'yyyy-MM-dd')
                let time2 = `${yyyy}-${this.addZero(MM)}-${this.addZero(value)}`

                return time1 == time2
            })

            return isFlag ? 'is-fly-bg' : ''
        },
        // 处理出今日是否有结束的任务
        getTodayEvent(row) {
            if (!row || !Array.isArray(row.day_notes)) {
                return ''
            }
            let { day_notes, value } = row
            let [yyyy, MM] = this.calendarDate
            let currentStr = Date.now()
            let isFlag = day_notes.some(({ note_end_time, note_done }) => {
                let time1 = this.klDateFormat(note_end_time, 'yyyy-MM-dd')
                let time2 = `${yyyy}-${this.addZero(MM)}-${this.addZero(value)}`
                return +note_done === 1 && time1 == time2 && currentStr < note_end_time
            })

            return isFlag ? 'c-danger' : ''
        },
        handleClickOutside() {
            this.isCalendar = false
        },
        getNoteType(row) {
            if (!this.isObject(row)) {
                return {}
            }

            let obj = {
                1: '未', // 未开始
                2: '开', // 开发中
                3: '测', // 测试中
                4: '完', // 已完成
                5: '败', // 未完成 -- 明确选了超时
                6: '超', // 超时  -- 只是过了结束时间没来标记
                7:'废' // 已废弃
            }

            let { note_type, note_done, note_begin_time, note_end_time, note_testing_time } = row

            let currentTime = Date.now()

            let type = 0
            if (currentTime < note_begin_time) {
                type = 1
            }

            if (
                (+note_type === 7 &&
                    currentTime > note_begin_time &&
                    currentTime < note_testing_time) ||
                (+note_type === 5 && currentTime > note_begin_time && currentTime < note_end_time)
            ) {
                type = 2
            }

            if (
                +note_type === 7 &&
                currentTime > note_testing_time &&
                currentTime < note_end_time
            ) {
                type = 3
            }

            if (+note_done === 2) {
                type = 4
            }

            if (+note_done === 3) {
                type = 5
            }

            if (+note_done === 1 && currentTime > note_end_time) {
                type = 6
            }

            if (+note_done === 5) {
                type = 7
            }

            return type
                ? {
                      className: `note_type_${type}`,
                      content: obj[type],
                  }
                : {}
        },

        copyContent(text) {
            if (!text) {
                this.$message.warning('没有文案')
                return
            }
            this.copyText(text)
                .then(() => {
                    this.$message.success('复制成功')
                })
                .catch(() => {
                    this.$message.warning('复制失败')
                })
        },
        // 切换任务类型
        typeChange() {
            // 保存到本地
            localStorage.setItem('historyType', JSON.stringify({ type: this.type }))
            // 更新日历
            this.initCalendar()
        },
        getHistoryType() {
            let historyType = localStorage.getItem('historyType')
            if (historyType) {
                this.type = JSON.parse(historyType).type
            }
        },
        // 关闭
        close() {
            this.isCalendar = false
        },
        // 打开编辑弹窗
        editNote({ _id }) {
            this.dbClick().then(() => {
                this.noteDialogTitle = '编辑纪要'
                this.editNoteId = _id
                if (this.$refs.noteEditDialogRef) {
                    this.$refs.noteEditDialogRef.init()
                }
            })
        },
        // 提交了纪要
        determineEditDialog() {
            this.initCalendar()
        },
        // 打开纪要弹窗--新增
        openNoteDialog() {
            this.noteDialogTitle = '新增纪要'
            this.editNoteId = ''
            if (this.$refs.noteEditDialogRef) {
                this.$refs.noteEditDialogRef.init()
            }
        },
        // 打开日历
        openCalendar() {
            // 获取历史的分类选项
            this.getHistoryType()
            this.isCalendar = true
            this.calendarDate = this.moment(-1, 'array')

            this.activeDate = this.deepClone(this.calendarDate)
            // 初始化日历
            this.initCalendar('init')
        },

        // 选中激活
        isActive({ value }) {
            let { activeDate, calendarDate } = this
            let activeDateStr = '' + activeDate[0] + activeDate[1] + activeDate[2]
            let selectDateStr = '' + calendarDate[0] + calendarDate[1] + value
            return activeDateStr === selectDateStr
        },
        // 设置时钟
        setShowTime() {
            this.showTime = this.moment(-1, 'array')
            this.timer0 = setInterval(() => {
                this.showTime = this.moment(-1, 'array')
            }, 1000)
        },
        mousedownChangeDayEvent() {
            this.timer1 = Date.now()
        },
        // 查看当前日安排
        async changeDayEvent(row) {
            // 判断是长按还是点击
            let currentTime = Date.now()
            if (currentTime - this.timer1 > 500) {
                let { value } = row
                let isFlag = this.getFlyClass(row, false)
                let fly = null
                if (isFlag) {
                    // 找出这天的fly记录
                    let time = new Date(
                        this.calendarDate[0],
                        this.calendarDate[1] - 1,
                        value,
                    ).getTime()
                    fly = this.flyArr.find((item) => {
                        return item.today == time
                    })
                }

                let params = {}

                if (fly) {
                    let { time_number } = fly
                    params.time_number = time_number ? 0 : 1
                    params = Object.assign(fly, params)
                } else {
                    // 获取当天00:00:00的时间戳
                    let time = new Date(
                        this.calendarDate[0],
                        this.calendarDate[1] - 1,
                        value,
                    ).getTime()
                    params.today = time
                }
                adminApi
                    .post_author_fly(params)
                    .then((res) => {
                        if (fly) {
                            let { _id } = fly
                            this.flyArr = this.flyArr.map((item) => {
                                if (item._id === _id) {
                                    item.time_number = params.time_number
                                }
                                return item
                            })
                        } else {
                            this.flyArr.push(res.data.data)
                        }

                        this.POST_USER_SYNC(true)

                        this.$message.success(res.msg || '操作成功')
                    })
                    .catch((err) => {
                        this.Toast(err)
                    })
                return
            }
            let { value, type, festival } = row
            if (type === 'pre') return
            this.festival = festival
            this.activeDate = this.deepClone(this.calendarDate)
            this.activeDate[2] = value
            this.todayEvent = row.day_notes
            await this.$nextTick()
            // 滚回顶部
            let el = document.querySelector('.event-days-list')
            if (!el) return
            // 滚动到name节点的位置
            el.scrollTop = 0
        },
        // 切换月份
        changeCalendar(type) {
            // 当前月份
            let year = this.calendarDate[0]
            let month = this.calendarDate[1]

            let changeMonth = {
                pre: () => {
                    month = month - 1
                    if (month === 0) {
                        year = year - 1
                        month = 12
                    }
                },
                next: () => {
                    month = month + 1
                    if (month === 13) {
                        year = year + 1
                        month = 1
                    }
                },
            }
            if (Object.prototype.hasOwnProperty.call(changeMonth, type)) {
                changeMonth[type]()
                this.calendarDate[0] = year
                this.calendarDate[1] = month

                // 更新日历
                this.initCalendar()
            }
        },

        // 创建一个年月下的月展示日期
        createMonthDays(year, month) {
            // 默认非润年
            let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            // 计算闰年
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                days[1] = 29
            }

            let result = []

            // 补充每月的前置空格
            // 获取每月1号星期几
            let week = this.getWeek(year, month, '01')
            for (let i = 0; i < week - 1; i++) {
                let obj = {
                    id: this.createId(),
                    value: '',
                    isToday: false,
                    type: 'pre',
                    isWeek: false, // 是否是周六，周日
                    festival: '', // 节日
                }

                result.push(obj)
            }

            // 日历日期
            for (let index = 0; index < days[month - 1]; index++) {
                let obj = {
                    id: this.createId(),
                    value: index + 1,
                    isToday: false,
                    type: 'active',
                    isWeek: this.getIsWeek(year, month, index + 1),
                }

                if (
                    year === this.showTime[0] &&
                    month === this.showTime[1] &&
                    index + 1 === this.showTime[2]
                ) {
                    obj.isToday = true
                }
                result.push(obj)
            }
            return result
        },

        // 判断是否是周末
        getIsWeek(y, m, d) {
            return [6, 7].includes(this.getWeek(y, m, d))
        },

        // 创建默认的展示日历
        initCalendar(init) {
            let year = this.calendarDate[0]
            let month = this.calendarDate[1]

            // 获取当前月份的天数数组
            this.daysArr = this.createMonthDays(year, month)

            // 获取当前月任务信息
            this.getMonthData(init)
        },

        // 获取月份安排信息
        getMonthData(init) {
            let year1 = this.calendarDate[0]
            let month1 = this.calendarDate[1]
            let day1 = this.calendarDate[2]

            let month = this.calendarDate[0] + '-' + this.addZero(this.calendarDate[1])
            this.$apis.get_month_notes({ month, type: this.type }).then((res) => {
                if (!res.data) return
                let { flys, bPushs = [] } = res.data
                this.flyArr = this.isArray(flys) ? flys : []
                this.bPushs = this.isArray(bPushs) ? bPushs : []
                if (this.isArray(res.data.data)) {
                    const TodayStr = Date.now()
                    // 处理每日的note数据
                    this.daysArr = this.daysArr.map((item) => {
                        if (!item.day_notes) {
                            item.day_notes = []
                        }
                        if (item.type === 'active') {
                            // 当前月
                            res.data.data.forEach((itey) => {
                                if (
                                    itey.note_implement_time.includes(
                                        month + '-' + this.addZero(item.value),
                                    )
                                ) {
                                    item.day_notes.push(itey)
                                }
                            })

                            // 将任务按 权重排序 完成的排在最后
                            var arr0 = [] // 已超时的任务
                            var arr1 = [] // 待完成
                            var arr2 = [] // 已提测
                            var arr3 = [] // 已完成
                            var arr4 = [] // 已失败
                            let arr6 = [] // 已废弃
                            var arr5 = [] //其他类型

                            let currentTime = Date.now()
                            item.day_notes.forEach((itey) => {
                                let { note_done, note_end_time, note_testing_time, note_type } =
                                    itey
                                if (note_end_time < currentTime && +note_done === 1) {
                                    arr0.push(itey)
                                    return
                                }

                                if (+note_type === 7 && currentTime > note_testing_time) {
                                    arr2.push(itey)
                                    return
                                }

                                if (+note_done === 1) {
                                    arr1.push(itey)
                                    return
                                }

                                if (+note_done === 2) {
                                    arr3.push(itey)
                                    return
                                }

                                if (+note_done === 3) {
                                    arr4.push(itey)
                                    return
                                }

                                if(+note_done === 5){
                                    arr6.push(itey)
                                }

                                arr5.push(itey)
                            })

                            let day_notes_arr = []
                            for (let index = 0; index < 6; index++) {
                                var arr = eval('arr' + index)
                                arr.sort((a, b) => {
                                    return b.note_weight_import - a.note_weight_import
                                })

                                day_notes_arr = [...day_notes_arr, ...arr]
                            }
                            item.day_notes = day_notes_arr
                        }

                        return item
                    })

                    // 统计出每日的note数据类型
                    this.daysArr = this.daysArr.map((item) => {
                        let { day_notes, value } = item

                        // 计算出每日的几种类型的任务
                        item.todayEvent = {
                            needDone: 0, // 待完成
                            completedDone: 0, // 已完成
                            errDone: 0, // 未完成
                        }

                        day_notes.forEach((itey) => {
                            let { note_done } = itey
                            if (+note_done === 3) {
                                item.todayEvent.errDone += 1
                                return
                            }

                            if (+note_done === 2) {
                                item.todayEvent.completedDone += 1
                                return
                            }
                            if([1,4].includes(+note_done)){
                                item.todayEvent.needDone += 1
                            }
                        })

                        if (
                            this.calendarDate.slice(0, 2).join('') + item.value ==
                            this.activeDate.slice(0, 3).join('')
                        ) {
                            this.todayEvent = item.day_notes
                            this.festival = item.festival
                        }
                        return item
                    })

                    // 重新设置
                }

                // 默认阳历节日
                let festivalObj = {
                    '1-1': { title: '元旦节' },
                    '2-14': { title: '情人节' },
                    '3-8': { title: '妇女节' },
                    '3-11': { title: '龙抬头' },
                    '3-12': { title: '植树节' },
                    '4-1': { title: '愚人节' },
                    '5-1': { title: '劳动节' },
                    '5-4': { title: '青年节' },
                    '5-12': { title: '护士节' },
                    '5-20': { title: '情人节' },
                    '6-1': { title: '儿童节' },
                    '7-1': { title: '建党节' },
                    '8-1': { title: '建军节' },
                    '9-10': { title: '教师节' },
                    '10-1': { title: '国庆节' },
                    '12-24': { title: '平安夜' },
                    '12-25': { title: '圣诞节' },
                }

                // 默认农历节日
                let lfestival = {
                    '1-1': { title: '春节' },
                    '1-15': { title: '元宵节' },
                    '5-5': { title: '端午节' },
                    '7-7': { title: '七夕' },
                    '8-15': { title: '中秋节' },
                    '9-9': { title: '重阳节' },
                    '12-30': { title: '除夕' },
                }

                // 新增母亲节与父亲节
                // 母亲节通常是在每年的五月的第二个星期日
                // 父亲节则是在每年的六月的第三个星期日
                let motherDay = this.getMothersDay(year1)
                let fatherDay = this.getFathersDay(year1)

                let mStr = this.klDateFormat(new Date(motherDay).getTime(), 'M-d')
                let fStr = this.klDateFormat(new Date(fatherDay).getTime(), 'M-d')
                festivalObj[mStr] = festivalObj[mStr]
                    ? { title: `${festivalObj[mStr].title}-母亲节` }
                    : { title: '母亲节' }
                festivalObj[fStr] = festivalObj[fStr]
                    ? { title: `${festivalObj[fStr].title}-父亲节` }
                    : { title: '父亲节' }

                this.bPushs.forEach((item) => {
                    let { time, content } = item
                    // 通过阴历获取阳历
                    let [yyyy, MM, dd] = this.klDateFormat(time, '[yyyy,MM,dd]')
                    let date = calendar.lunar2solar(yyyy, MM, dd)
                    let { cYear, cMonth, cDay } = date
                    // 表示不是当前年份
                    if (cYear != year1) return
                    if (!content.includes('生日')) {
                        content = `${content}【生日】`
                    }

                    let key = `${cMonth}-${cDay}`

                    if (festivalObj[key]) {
                        festivalObj[key].title = `${festivalObj[key].title} | ${content}`
                    } else {
                        festivalObj[key] = { title: content }
                    }
                })

                calendar.setFestival(festivalObj)
                calendar.setLunarFestival(lfestival)
                this.daysArr = this.daysArr.map((item) => {
                    let { value } = item
                    if (!value) return item

                    let { festival, lYear, lMonth, lDay } = calendar.solar2lunar(
                        year1,
                        month1,
                        value,
                    )
                    // 农历节日
                    // 获取阴历日期
                    let { lunarFestival } = calendar.lunar2solar(lYear, lMonth, lDay)
                    item.festival = lunarFestival || festival || ''

                    return item
                })
            })
        },

        // 获取母亲节
        getMothersDay(year) {
            // 设置五月的第一天为基准日期
            let date = new Date(year, 4, 1) // 注意：月份是从0开始的，所以4代表五月

            // 找到五月的第一个星期日（可能是4月30日或5月1日-7日）
            // 然后加7天来得到第二个星期日
            let dayOfWeek = date.getDay() // getDay()返回的是0（周日）到6（周六）
            let mothersDayOffset = (dayOfWeek === 0 ? 0 : 7 - dayOfWeek) + 7 // 如果5月1日是周日，则偏移量为7（即当天），否则是当周的星期几加7

            // 设置母亲节的日期
            date.setDate(date.getDate() + mothersDayOffset)

            // 返回格式化后的日期字符串
            return date.toLocaleDateString()
        },

        // 获取父亲节
        getFathersDay(year) {
            // 设置六月的第一天为基准日期
            let date = new Date(year, 5, 1) // 注意：月份是从0开始的，所以5代表六月
            // 找到六月的第一个星期日（可能是5月31日或6月1日-7日）
            // 然后加14天来得到第三个星期日
            let dayOfWeek = date.getDay() // getDay()返回的是0（周日）到6（周六）
            let fathersDayOffset = (dayOfWeek === 0 ? 0 : 7 - dayOfWeek) + 14 // 如果6月1日是周日，则偏移量为7（即当天），否则是当周的星期几加14
            // 设置父亲节的日期
            date.setDate(date.getDate() + fathersDayOffset)
            // 返回格式化后的日期字符串
            return date.toLocaleDateString()
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-calendar {
    color: #555;
    .kl-calendar-bg-mask {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        padding: 20px;
        z-index: 980;
    }
}
.kl-calendar-no-show {
    right: 10px;
    bottom: 10px;
    padding: 6px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    z-index: 990;
    p {
        text-align: center;
    }
}
.kl-calendar-show {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 700px;
    width: 393px;
    background-color: #f1f1f1;
    z-index: 990;
    .kl-calendar-show-header {
        padding: 15px;
        border-bottom: 1px solid #ccc;
    }
    .kl-calendar-show-times {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        .next-svg {
            margin-left: 10px;
            transform: rotate(180deg);
        }
    }
}

.mobile-kl-calendar-show {
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
}

.kl-calendar-time-sex {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .calendar-scroll-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-repeat: no-repeat;
        background-position: center;
    }
    .header-item {
        font-size: 14px;
        margin: 0;
        width: 45px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .time-item-i {
        width: 45px;
        margin: 0 2px;
    }
    .time-item {
        font-size: 14px;
        margin: 2px;
        cursor: pointer;
        width: 45px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #f1f1f1;
    }
    .hover-bg {
        &:hover {
            border-color: #fff;
        }
    }
    .today-item {
        background-color: $primary_0;
        color: #fff;
    }

    .today-class {
        border: 2px solid #fff !important;
        background-color: $primary;
        color: #fff;
    }
}
.events {
    border-top: 1px solid #ccc;
    padding: 15px;
}
.calendar-scroll {
    height: 270px;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
.c-ccc {
    color: #ccc !important;
}
.needdone-note {
    text-align: center;
    font-size: 12px;
    color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: $warning;
    position: absolute;
    right: 0;
    top: 0;
}
.event-days-list {
    max-height: 300px;
    overflow-y: auto;
    margin-top: 10px;
}
.mobile-event-days-list {
    max-height: calc(100vh - 414px);
}
.event-item {
    padding: 20px 5px 5px 5px;
    user-select: auto !important;
    font-size: 14px;
    cursor: pointer;
    min-height: 35px;
    margin-bottom: 10px;
    padding-left: 10px;
    border-left: 3px solid $primary_0;
    &:nth-last-of-type(1) {
        margin-bottom: 0px;
    }
}
.el-radio {
    margin-right: 10px;
}
.no-event {
    height: 200px;
}
.event-progress {
    position: absolute;
    left: -3px;
    bottom: 0;
    width: 3px;
    height: 100%;
    background-color: $primary;
}
.mobile-kl-calendar-dor {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    bottom: 180px;
    background-color: rgba(0, 0, 0, 0.4);
}
.note-type-c {
    position: absolute;
    top: 0px;
    left: -3px;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: #fff;
    font-size: 11px;
    margin-right: 5px;
}
.note_type_1 {
    background-color: #656065;
    font-weight: 550;
}
.note_type_2 {
    background-color: #0ecbf1;
    font-weight: 550;
}
.note_type_3 {
    background-color: #a3a858;
    font-weight: 550;
}
.note_type_4 {
    background-color: #89cc9c;
    font-weight: 550;
}
.note_type_5 {
    background-color: #d81515;
    font-weight: 550;
}
.note_type_6 {
    background-color: #e12cba;
    font-weight: 550;
}
.note_type_7 {
    background-color: #957e8e;
    font-weight: 550;
}
.c-dote-done-5{
    color: #957e8e;
}
.c-danger {
    color: #d81515 !important;
}
.c-end-task {
    color: #e12cba !important;
}

.is-fly-bg {
    // 模糊背景
    background-image: url('https://gd-hbimg.huaban.com/58680e4b889977594078d688454481eeb149ff7d7b56-3HV1EL_fw480webp');
    background-size: 14px 14px;
    background-repeat: no-repeat;
    background-position: left top;
}

.festival-box {
    &::before {
        display: block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $success;
    }
}
</style>
