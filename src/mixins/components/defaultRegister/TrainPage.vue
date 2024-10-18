<template>
    <div class="app-container-new">
        <SearchComp
            ref="searchCompRef"
            :search-config="searchConfig"
            :label-width="labelWidth"
            :autoSearch="autoSearch"
            :isSearchFormBtn="isSearchFormBtn"
            :showFormToggle="showFormToggle"
            :needDor="needDor"
            :storageId="storageId"
            :isCacheSearch="isCacheSearch"
            @search="searchFn"
            @resetFieldFn="resetFieldFn"
        >
            <!-- 插槽 -->
            <template v-for="item in searchConfig" :slot="item.slot">
                <slot :name="item.slot" />
            </template>
        </SearchComp>
        <div class="content-block content-block-table m-t-20">
            <!-- 操作按钮块 -->
            <YewuTable
                ref="YewuTableRef"
                :customize="customize"
                :storageId="storageId"
                :tab-data-list="tableData"
                :table-config="tableConfig"
                :pagination="pagination"
                :isLoading="isLoading"
                :visOptions="visOptions"
                @tableChange="tableCallBack"
                @sortEnd="sortEnd"
            >
                <template slot="btnList">
                    <slot name="btnList" />
                </template>

                <template slot="kl-table">
                    <slot name="kl-table" />
                </template>

                <template slot="kl-echarts">
                    <div :style="getVisStyle" ref="echartsRef"></div>
                </template>

                <template v-for="item in tableConfig.columnObj" :slot="item.headerSlot">
                    <slot :name="item.headerSlot" />
                </template>

                <template
                    v-for="item in tableConfig.columnObj"
                    :slot="item.slot"
                    slot-scope="slotProps"
                >
                    <slot :name="item.slot" :record="slotProps.rowData" />
                </template>
            </YewuTable>
        </div>
    </div>
</template>
<script>
const pagination = {
    page: 1,
    limit: 20,
    showPageInfo: true,
    totalRecords: 0,
    totalPages: 0,
}
export default {
    name: 'TrainPage',
    components: {
        echartsPage: () => import('@/components/echartsPage/index.vue'),
    },
    props: {
        // 是否需要默认提示
        isNeedTip: {
            type: Boolean,
            default: true,
        },
        // 是否缓存搜索条件
        isCacheSearch: {
            type: Boolean,
            default: true,
        },
        // 默认开启缓存表头设置与搜索条件，传入 '' 则不缓存
        storageKey: {
            type: String,
            default: '',
        },

        // 搜索配置项
        searchConfig: {
            type: Array,
            default: function () {
                return []
            },
        },

        // 搜索表单label宽度
        labelWidth: {
            type: String,
            default: '',
        },

        // 表格配置项
        tableConfig: {
            type: Object,
            default: function () {
                return {}
            },
        },

        // table发送请求的url, 必传 string
        sendUrl: {
            type: String,
            required: true,
            validator(value) {
                return typeof value === 'string' && value.trim() !== ''
            },
        },

        // 补充的其他请求参数
        othData: {
            type: Object,
            default: function () {
                return {}
            },
        },

        // 第一次加载是否自动请求列表数据
        autoSearch: {
            type: Boolean,
            default: true,
        },

        // 是否显示自定义列表栏
        customize: {
            type: Boolean,
            default: true,
            validator(value) {
                // 没执行
                if (typeof this.storageId !== 'string' || this.storageId.trim() === '') {
                    this.$message.warn('storageId不能为空')
                    return false
                }
                return true
            },
        },

        // 基本搜索栏
        isSearchFormBtn: {
            type: Boolean,
            default: true,
        },

        // 功能栏的展开收起是否展示
        showFormToggle: {
            type: Boolean,
            default: true,
        },
        needDor: {
            type: Boolean,
            default: false,
        },
        visOptions: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            pagination: this.deepCopy(pagination),
            tableData: [],
            searchData: {},
            isLoading: true,
            width: 0,
            height: 0,
            visInfo:{}
        }
    },
    computed: {
        storageId() {
            return this.storageKey || this.$route.path
        },
        visPlugins() {
            if (this.tableConfig.visType === 'echarts') {
                return [
                    {
                        js: 'http://139.9.210.43:5000/netdist/echarts543min-1728272924292~1~.js',
                        remove:true
                    },
                ]
            }
            if (this.tableConfig.visType === 'chart') {
                return [
                    {
                        js: 'http://139.9.210.43:5000/netdist/chatmin-1728231268160~1~.js',
                        remove:true
                    },
                ]
            }

            return []
        },

        getVisStyle() {
            return {
                height: this.height + 'px',
                width: this.width + 'px',
            }
        },
    },
    created() {
        if (this.sendUrl === '' || JSON.stringify(this.tableConfig) === '{}') {
            console.warn('sendUrl, searchConfig, tableConfig不允许为空')
            return
        }

        const { storageId } = this
        if (storageId) {
            const old = this.getLocalStorage(this.storageId + '_' + 'pages', {})
            Object.assign(this.pagination, old)
        }
    },
    mounted() {
        // TODO: 初始化列表
        this.$parent.initTable = this.getList

        // 如果配置了isEacharts，加载echarts
        if (this.tableConfig.visType) {
            this.getIndexDBJS(this.visPlugins)
                .then(() => {
                    this.handlerVis()
                })
                .catch((err) => {
                    this.Toast(err)
                })

            // 监听窗口大小改变
            window.onresize = this.debounce(() => {
                this.handlerVis(true)
            }, 50)
        }
    },
    methods: {
        async handlerVis(isRize = false) {
            const { visType } = this.tableConfig
            await this.$nextTick()
            if (
                (visType === 'echarts' && typeof echarts === 'undefined') ||
                (visType === 'chart' && typeof Chart === 'undefined') ||
                Object.keys(this.visOptions).length === 0
            ){
                return
            }

            const {echartsRef} = this.$refs  
            if (!echartsRef) return 
            // 获取到左右的距离
            let { left, top } = echartsRef.getBoundingClientRect()
            // 获取可视区宽高
            let viewportWidth = window.innerWidth || document.documentElement.clientWidth
            let viewportHeight = window.innerHeight || document.documentElement.clientHeight
            this.width = viewportWidth - left - 30
            this.height = viewportHeight - top - 30
            if (visType === 'echarts') {
                if (isRize) {
                    this.visInfo.resize()
                    return
                }
                await this.$nextTick()
                this.visInfo = echarts.init(echartsRef)
                this.visInfo.setOption(this.visOptions)
            }

            if (visType === 'chart') {
                this.visInfo = new Chart(echartsRef.getContext('2d'), this.visOptions);
            }
        },
        sortEnd(row) {
            this.$emit('sortEnd', row)
            this.tableData = row.newList
        },
        resetFieldFn() {
            Object.assign(this.pagination, pagination)
            this.cachePageInfo()
            this.$emit('resetFieldFn')
        },
        async searchFn(data) {
            Object.assign(this.pagination, {
                page: 1,
                showPageInfo: true,
            })
            this.searchData = data
            await this.$emit('input', data) // 此方法必须异步 可能会传入新的othData去查询
            this.getList()
        },

        cachePageInfo() {
            const { storageId } = this
            if (storageId) {
                this.setLocalStorage(this.storageId + '_' + 'pages', this.pagination)
            }
        },
        tableCallBack(obj) {
            const { fnType, data } = obj
            if (fnType === 'handleSizeChange') {
                this.pagination.limit = data
                this.pagination.page = 1
                this.getList({}, true)
                this.cachePageInfo()
            } else if (fnType === 'handleCurrentChange') {
                this.pagination.page = data
                this.getList({}, true)
                this.cachePageInfo()
            } else if (fnType === 'selectionChange') {
                this.selectionList = data
                this.$emit('getSelectionList', data)
            }
        },
        getList(params = {}, relaod = false,autoTip=true) {
            if (!this.sendUrl) {
                this.$message.error('sendUrl必传')
                return
            }
            for (const k in this.searchData) {
                if (
                    this.searchData[k] === '' ||
                    this.searchData[k] === undefined ||
                    this.searchData[k] === null
                ) {
                    delete this.searchData[k]
                }
            }

            const postData = {
                page: this.pagination.page,
                limit: this.pagination.limit,
                ...this.searchData,
                ...this.othData,
                ...params
            }

            this.$apis[this.sendUrl](postData)
                .then(async (res) => {
                    if(!res || res.code !== 200){
                        return 
                    }
                    if (relaod) {
                        this.tableData = []
                        await this.$nextTick()
                    }
                    let { data, list, total = 0 } = res?.data || {}
                    this.tableData = data || list || []

                    // 需要区分方法
                    const funType = this.getType(this.tableConfig.filterData)
                    if (funType === 'function') {
                        this.tableData = this.tableConfig.filterData(this.tableData)
                    }
                    if (funType === 'asyncfunction') {
                        this.tableData = await this.tableConfig.filterData(this.tableData)
                    }
                    Object.assign(this.pagination, {
                        totalPages: total,
                        totalRecords: total,
                    })

                    if (autoTip && this.isNeedTip && +total === 0 && this.tableData.length === 0) {
                        this.$message({
                            type: 'warning',
                            message: '暂无数据',
                            duration: 800,
                        })
                    }

                    // 如果配置了isEacharts，则需要把数据传给echarts
                    if (this.tableConfig.visType) {
                        this.handlerVis()
                    }
                    await this.$nextTick()
                    if(this.$refs.YewuTableRef){
                        this.$refs.YewuTableRef.renderColumns(true)
                    }
                   
                })
                .catch((err) => {
                    this.Toast(err)
                })
                .finally(() => {
                    this.isLoading = false
                })
        },
        getData() {
            return this.tableData
        },
        getAddData() {
            const dataObj = this.$refs.searchCompRef.getSearchData()
            this.searchFn(dataObj)
        },
    },
}
</script>
