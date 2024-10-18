<template>
    <div
        ref="tabArea"
        :class="[
            'tabArea',
            tableConfig.visType ? 'p-b-20' : '',
            isRenderOver ? '' : 'is-no-render-over',
        ]"
    >
        <div :class="['table-top', customize || btnsChildrenOver ? 'm-b-10' : '']">
            <div>
                <slot name="btnList" />
                <div v-if="btnsChildrenOver">
                    <el-button
                        :type="item.type"
                        @click="clickFun(item)"
                        v-for="(item, index) in newTableConfig.btns.children"
                        :key="index"
                        >{{ item.label }}</el-button
                    >
                </div>
            </div>
            <div class="table_extra" v-if="customize">
                <TableFileter
                    :storageId="storageId"
                    :columns="newTableConfig.columnObj"
                    @update="renderColumns"
                />
            </div>
        </div>

        <template v-if="tableConfig.isShowTable !== false">
            <el-table
                ref="sortTable"
                :max-height="maxHeight"
                v-loading="isLoading"
                :header-cell-style="
                    newTableConfig.headerCellStyle
                        ? newTableConfig.headerCellStyle
                        : { background: '#f7f9fc', color: '#475365 !important' }
                "
                :data="tabDataListComputed"
                :stripe="Boolean(newTableConfig.stripe)"
                :show-summary="newTableConfig.showSummary || false"
                :summary-method="summaryMethod"
                @selection-change="tabSelectionChange"
                v-bind="$attrs"
                :class="[tableClassName]"
                v-if="isShow"
            >
                <el-table-column
                    align="center"
                    header-align="center"
                    v-if="newTableConfig.isSelection"
                    type="selection"
                    fixed="left"
                    width="30"
                    :selectable="
                        (row, index) => {
                            return newTableConfig.selectable !== undefined
                                ? newTableConfig.selectable(row, index)
                                : true
                        }
                    "
                />
                <el-table-column
                    v-if="newTableConfig.tableIndex !== false && isRenderOver"
                    type="index"
                    label="序号"
                    width="50"
                    fixed="left"
                >
                    <template slot-scope="scope">
                        {{ (page.page - 1) * page.limit + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <template v-for="(item, index) in columns">
                    <!-- 正常插入节点 -->
                    <el-table-column
                        v-if="!item.slot && (item.isShow === false ? false : true)"
                        :key="index"
                        :align="item.align ? item.align : 'left'"
                        header-align="left"
                        :label="item.label"
                        :fixed="item.fixed ? item.fixed : false"
                        :width="item.width ? item.width : 'inherit'"
                        :min-width="item.minWidth ? item.minWidth : 'inherit'"
                        :show-overflow-tooltip="item.tooltip ? item.tooltip : false"
                        :sortable="item.sortable ? item.sortable : false"
                        :prop="item.props"
                        :formatter="
                            (row) => {
                                return item.formatter
                                    ? item.formatter(row, row[item.props])
                                    : row[item.props]
                            }
                        "
                    >
                        <template slot="header" v-if="item.headerSlot">
                            <slot :name="item.headerSlot" :slotName="item.headerSlot" />
                        </template>
                        <template slot-scope="scope">
                            <!-- 对于v-HTML的解析展示 -->
                            <div
                                v-if="item.html"
                                :class="['t-a-l', item.clickFn ? 'c-primary cu' : '']"
                                @click="clickFun(item, scope.row)"
                                v-html="scope.row[item.props]"
                            ></div>

                            <!-- 对于图片的展示 -->
                            <div v-else-if="item.isImage" :class="['t-a-l']">
                                <template v-if="isArrayLength(scope.row[item.props])">
                                    <e-image
                                        :style="getStyle(item)"
                                        :otherClass="getClass(item)"
                                        v-for="(itey, index) in scope.row[item.props]"
                                        :key="index"
                                        :title="itey.title"
                                        :previewA="item.previewA"
                                        :width="getWH(item.imageWidth)"
                                        :height="getWH(item.imageHeight)"
                                        :src="parseResourceUrl(itey.url)"
                                        @click="clickFun(item, scope.row)"
                                    />
                                </template>
                                <template v-else> -- </template>
                            </div>

                            <span
                                v-else
                                :class="[item.clickFn ? 'c-primary cu' : '']"
                                @click="clickFun(item, scope.row)"
                            >
                                <template v-if="item.ell">
                                    <kl-max-ell
                                        v-model="scope.row[item.props]"
                                        :ell="item.ell"
                                        :lineHeight="19"
                                    />
                                </template>

                                <template v-else>
                                    {{
                                        item.formatter
                                            ? item.formatter(scope.row, scope.row[item.props])
                                            : [undefined, null, ''].includes(scope.row[item.props])
                                            ? '--'
                                            : scope.row[item.props]
                                    }}
                                </template>
                            </span>
                        </template>
                    </el-table-column>

                    <!-- 插槽插入节点 -->
                    <el-table-column
                        v-if="item.slot && (item.isShow === false ? false : true)"
                        :key="index"
                        :align="item.align ? item.align : 'left'"
                        header-align="left"
                        :label="item.label"
                        :prop="item.props"
                        :fixed="item.fixed ? item.fixed : false"
                        :width="getWidth(item)"
                        :min-width="item.minWidth ? item.minWidth : 'inherit'"
                    >
                        <template slot="header" v-if="item.headerSlot">
                            <slot :name="item.headerSlot" :slotName="item.headerSlot" />
                        </template>
                        <template slot-scope="scope">
                            <!-- 操作区域的特殊处理，由于放在了 slot中，所以在配置时必须加slot值 -->
                            <div
                                :class="[
                                    'action',
                                    isArrayLength(item.children) ? 'action-length' : '',
                                ]"
                                v-if="item.props === 'action'"
                            >
                                <el-link
                                    @click="clickFun(itey, scope.row)"
                                    v-for="(itey, index) in getActionList(
                                        scope.row.actionBtns,
                                        true,
                                    )"
                                    :key="index"
                                    :type="itey.type"
                                    :class="['no-unline', index !== 0 ? 'm-l-20' : '']"
                                    >{{ itey.label }}</el-link
                                >

                                <el-dropdown
                                    v-if="getActionList(scope.row.actionBtns, false).length"
                                    @command="(val) => clickFun(val, scope.row)"
                                >
                                    <span class="el-dropdown-link">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                            v-for="(itey, index) in getActionList(
                                                scope.row.actionBtns,
                                                false,
                                            )"
                                            :key="index"
                                            :command="itey"
                                            :style="getActionStyle(itey)"
                                            >{{ itey.label }}</el-dropdown-item
                                        >
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>

                            <slot
                                :rowData="scope.row"
                                :name="item.slot"
                                :slotName="item.slot"
                                :index="scope.$index"
                            />
                        </template>
                    </el-table-column>
                </template>
                <template slot="empty" v-if="newTableConfig.emptySlot">
                    <slot name="empty" slotName="empty" />
                </template>
            </el-table>

            <div ref="page" class="pagin">
                <template v-if="page && page.showPageInfo && page.totalRecords > 0">
                    <div class="leftShowInfo">
                        共
                        <span v-text="page.totalRecords" />
                        条记录 第
                        <span v-text="page.page" />
                        /
                        <span v-text="page.totalPages" />
                        页
                    </div>
                    <div class="rightPaging">
                        <el-pagination
                            background
                            layout="prev, pager, next, sizes, jumper"
                            :current-page.sync="page.page"
                            :total="page.totalRecords"
                            :page-size="page.limit"
                            :page-sizes="[5, 10, 20, 30, 50, 100]"
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                        />
                    </div>
                </template>
            </div>
        </template>

        <template v-else-if="tableConfig.visType">
            <!-- 自定义核心区域 -->
            <slot name="kl-echarts"></slot>
        </template>

        <template v-else>
            <!-- 自定义核心区域 -->
            <slot name="kl-table"></slot>
        </template>
    </div>
</template>

<script>
import Sortable from 'sortablejs'
import { colorsMap } from '@/plugins/config.js'
export default {
    name: 'YewuTable',

    props: {
        // 保存storage的名称
        storageId: {
            type: String,
        },
        tabDataList: {
            type: Array,
            default: function () {
                return []
            },
        },
        tableConfig: {
            type: Object,
            default: function () {
                return {}
            },
        },
        pagination: {
            type: Object,
            default: function () {
                return {}
            },
        },
        afertSummaryMethod: {
            type: Function,
        },
        customize: {
            type: Boolean,
            default: false,
        },
        isLoading: {
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
            isShow: true,
            tableClassName: this.createId(),
            maxHei: null,
            columns: [],
            newTableConfig: { ...this.tableConfig },
            tabDataList: [],
            isRenderOver: false,
        }
    },
    computed: {
        // 是否设置最大高度, 默认为设置高度
        maxHeightFlag() {
            return this.tableConfig.maxHeightFlag === false ? false : true
        },
        maxHeight() {
            return this.tableConfig.maxHeight || this.maxHei
        },

        page() {
            return Object.assign({}, this.pagination)
        },
        totalPages() {
            return Math.ceil(this.pagination.totalRecords / this.pagination.limit)
        },
        btnsChildrenOver() {
            return (
                this.isArrayLength(this.newTableConfig?.btns?.children) &&
                this.newTableConfig?.btns?.isOver
            )
        },
        tabDataListComputed() {
            return this.tabDataList.map((item) => {
                return {
                    ...item,
                    actionBtns: this.getActionBtns(item),
                }
            })
        },
    },
    watch: {
        tabDataList: {
            handler(val) {},
            deep: true,
        },
    },
    mounted() {
        this.renderColumns()
    },
    methods: {
        getActionBtns(row) {
            if (!this.isArrayLength(this.newTableConfig?.columnObj)) {
                return []
            }
            const actionOption = this.newTableConfig.columnObj.find(
                (item) => item.props === 'action',
            )
            if (!actionOption || !this.isArrayLength(actionOption.children)) {
                return []
            }

            return actionOption.children.filter((item) => {
                const { show } = item
                const showType = this.getType(show)
                if (showType === 'undefined') {
                    return true
                }

                if (showType === 'boolean') {
                    return show
                }

                if (showType === 'function') {
                    return show(row)
                }

                this.Toast(`actions配置错误,得到了${showType}类型的${show}`)
            })
        },
        // 对于操作区域自动设置宽度
        getWidth(row) {
            const { width, props } = row
            if (width) {
                return width
            }

            if (props === 'action') {
                // 操作列，需要计算出最大的那个宽度
                let actionWidth = 0
                this.tabDataListComputed.forEach((item) => {
                    const { actionBtns } = item
                    if (!this.isArrayLength(actionBtns)) {
                        return 'inherit'
                    }
                    const { length } = actionBtns || {}
                    let currentActionWidth = 0
                    const oneStrLength = actionBtns[0].label.length
                    if (length === 1) {
                        currentActionWidth = 32 + oneStrLength * 16
                    } else if (length === 2) {
                        const twoStrLength = actionBtns[1].label.length
                        currentActionWidth = 32 + (oneStrLength + twoStrLength) * 16 + 20
                    } else {
                        currentActionWidth = 32 + (oneStrLength + 3) * 16 + 20
                    }
                    if (currentActionWidth > actionWidth) {
                        actionWidth = currentActionWidth
                    }
                })

                return actionWidth
            }

            return 'inherit'
        },
        async getBtnsList() {
            if (!this.isArrayLength(this.newTableConfig?.btns?.children)) {
                return []
            }
            const result = []
            for (let i = 0; i < this.newTableConfig?.btns?.children.length; i++) {
                const item = this.newTableConfig?.btns?.children[i]
                const { show } = item
                const showType = this.getType(show)
                if (
                    showType === 'undefined' ||
                    (showType === 'boolean' && showType) ||
                    (showType === 'function' && show())
                ) {
                    result.push(item)
                    continue
                }

                if (showType === 'asyncfunction') {
                    if (await show()) {
                        result.push(item)
                        continue
                    }
                }
            }
            return result
        },
        getActionStyle({ type = 'info' } = {}) {
            return {
                color: colorsMap[type],
            }
        },
        // 获取列表
        getActionList(list, isOne) {
            if (!this.isArrayLength(list)) {
                return []
            }
            if (list.length <= 2) {
                return isOne ? list : list.slice(2)
            }
            // 取第一个或除了第一个以外的
            return isOne ? list.slice(0, 1) : list.slice(1)
        },
        getWH(old) {
            if (this.getType(old) === 'number') {
                return old
            }
            return 50
        },
        getClass(item) {
            const result = []

            const type = this.getType(item.class)
            if (type === 'string') {
                result.push(item.class)
            } else if (type === 'array') {
                result.push(...item.class)
            }

            return result
        },
        getStyle(item) {
            const result = {
                width: '50px',
                height: '50px',
            }

            if (this.isObject(item.style)) {
                return { ...result, ...item.style }
            }

            return result
        },
        async rowDrop() {
            await this.$nextTick()
            const table = this.$refs.sortTable.$el.querySelectorAll(
                '.el-table__body-wrapper > table > tbody',
            )[0]
            const that = this
            Sortable.create(table, {
                animation: 500,
                onEnd({ newIndex, oldIndex }) {
                    const newList = that.deepCopy(that.tabDataList)
                    newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
                    that.$emit('sortEnd', {
                        oldList: that.tabDataList, //拖拽前的列表
                        newList, //拖拽后的列表
                    })

                    that.isShow = false
                    that.$nextTick(() => {
                        that.isShow = true
                        that.$nextTick(() => {
                            that.rowDrop()
                        })
                    })
                },
            })
        },
        clickFun(row1 = {}, row2) {
            if (this.getType(row1.clickFn) !== 'function') return
            row1.clickFn(row2, row1)
        },
        // 对象比较是否相等
        // arr 需要比较的 key
        isSomeObject(obj1, obj2, arr = ['label', 'props', 'slot', 'isMuli', 'type']) {
            let isFlag = true
            arr.forEach((key) => {
                // 这儿只做了简单的数据比较
                if (obj1[key] != obj2[key]) {
                    isFlag = false
                }
            })
            return isFlag
        },
        // 数组配置覆盖
        arrayKeysReload(arrOld, arrNew) {
            let result = []

            // 1、遍历旧数组，找出新数组中相同的字段，并覆盖旧数组的配置;如果找不到说明已经被移除了
            arrOld.forEach((item) => {
                let obj = arrNew.find((item1) => this.isSomeObject(item, item1))
                if (obj) {
                    result.push({
                        ...item,
                        ...obj,
                    })
                }
            })

            // 2、新增加的字段，默认展示
            arrNew.forEach((item) => {
                let obj = arrOld.find((item1) => this.isSomeObject(item, item1))
                if (!obj) {
                    result.push({
                        show: true,
                        ...item,
                    })
                }
            })
            return result
        },
        // 渲染表格
        async renderColumns(isReload = false) {
            this.newTableConfig = { ...this.tableConfig }
            if (this.tableConfig.isShowTable === false && isReload) {
                // 自定义主体
                // btns
                if (this.isArrayLength(this.newTableConfig?.btns?.children)) {
                    this.newTableConfig.btns.children = await this.getBtnsList()
                    this.newTableConfig.btns.isOver = true
                }
                this.isRenderOver = true
                return
            }
            if (!this.tableConfig.visType) {
                // 表格需要渲染列数据
                this.columns = [...this.newTableConfig.columnObj]
                if (this.customize && this.storageId) {
                    // 自定义表格
                    let storageColumns = this.getLocalStorage(this.storageId + '_table', [])
                    this.newTableConfig = { ...this.tableConfig }
                    if (this.isArrayLength(storageColumns)) {
                        // 需要使用最新的来覆盖，而直接使用缓存中的
                        this.newTableConfig.columnObj = this.arrayKeysReload(
                            storageColumns,
                            this.tableConfig.columnObj,
                        )
                        this.columns = this.newTableConfig.columnObj.filter(
                            (item) => item.lock || item.show,
                        )
                    } else {
                        this.newTableConfig.columnObj.forEach((item) => {
                            this.$set(item, 'show', true)
                        })
                        this.columns = [...this.newTableConfig.columnObj]
                    }
                }

                // 字段菜单权限校验
                this.columns = this.columns.filter((item) => !item.perm)
            }

            // btns
            if (this.isArrayLength(this.newTableConfig?.btns?.children) && isReload) {
                this.newTableConfig.btns.children = await this.getBtnsList()
                this.newTableConfig.btns.isOver = true
            }

            this.setTableMaxHeight()
            // 判断是否需要排序
            if (this.tableConfig.sort) {
                this.rowDrop()
            }
            if (isReload) {
            }
            this.isRenderOver = true
        },
        async setTableMaxHeight(num = 0) {
            await this.$nextTick()
            if (this.maxHeightFlag) return
            let el = document.querySelector(`.${this.tableClassName}`)
            if (el) {
                // 获取可视区高度
                let clientHeight =
                    document.documentElement.clientHeight || document.body.clientHeight
                let style = el.getBoundingClientRect() || {}
                let top = style.top - 0 || 65
                // 距离底部的高度
                let bottomD = 60
                this.maxHei = Math.floor(clientHeight - top - bottomD)
            }

            await this.sleep(500)
            num += 1
            if (num < 10) {
                this.setTableMaxHeight(num)
            }
        },
        handleClick(index, row, id) {},
        handleSizeChange(val) {
            this.$emit('tableChange', {
                fnType: 'handleSizeChange',
                data: val,
            })
        },
        handleCurrentChange(val) {
            this.$emit('tableChange', {
                fnType: 'handleCurrentChange',
                data: val,
            })
        },
        tabSelectionChange(selection) {
            this.$emit('tableChange', {
                fnType: 'selectionChange',
                data: selection,
            })
        },
        summaryMethod(param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((rows, rowsIndex) => {
                if (rowsIndex === 0) {
                    sums[rowsIndex] = this.newTableConfig.sumText || '合计'
                    return
                }
                const values = data.map((item) => Number(item[rows.property]))
                if (!values.every((value) => isNaN(value))) {
                    let tempVal = values.reduce((prev, curr) => {
                        const value = Number(curr)
                        if (!isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0)
                    if (this.afertSummaryMethod) {
                        sums[rowsIndex] = this.afertSummaryMethod(param, rows, rowsIndex, tempVal)
                    } else {
                        sums[rowsIndex] = tempVal
                    }
                } else {
                    if (this.afertSummaryMethod) {
                        sums[rowsIndex] = this.afertSummaryMethod(param, rows, rowsIndex)
                    } else {
                        sums[rowsIndex] = '--'
                    }
                }
            })

            return sums
        },
    },
}
</script>

<style lang="scss" scoped>
.tabArea {
    padding: 20px 20px 10px;
    background: #ffffff;
    border-radius: 20px;

    .pagin {
        box-sizing: border-box;
        overflow: hidden;

        .leftShowInfo {
            float: left;
            font-size: 14px;
            color: #666;
            height: 28px;
            line-height: 28px;
            margin-top: 12px;
        }

        .rightPaging {
            float: right;
            margin-top: 12px;
        }
    }
}

.table-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tabArea ::v-deep {
    tr,
    th,
    td {
        border: none;
        outline: none;
    }
    .el-table {
        border-radius: 4px;
    }
    thead > tr {
        th {
            background-color: #f3f3f3 !important;
            color: #909399 !important;
            font-weight: 400 !important;
            height: 50px;
            padding: 0;
            padding-left: 16px !important;
            text-align: left;
            // 可复制
            user-select: auto !important;

            &:nth-of-type(1) {
                border-radius: 6px 0 0 6px;
            }
            &:nth-last-of-type(1) {
                border-radius: 0 6px 6px 0;
            }
        }
        .el-table-column--selection {
            padding-left: 14px !important;
            text-align: center;
        }
        .cell {
            padding: 0;
        }
    }

    tbody > tr {
        border: none !important;
        td {
            padding: 12px 16px !important;
            color: #303133;
            border: none !important;
            text-align: left;
            &:not(.el-table-column--selection) {
                .cell {
                    padding: 0 !important;
                }
            }
            &.el-table-column--selection {
                padding-left: 0px !important;
            }
            .action-length {
                display: flex;
                button {
                    text-align: left;
                }
                .el-button + .el-button {
                    margin-left: 20px;
                }
                .el-dropdown {
                    cursor: pointer;
                    height: 40px;
                    line-height: 40px;
                    color: $primary;
                    .el-icon-arrow-down {
                        color: $primary;
                    }
                }

                & > .el-dropdown {
                    margin-left: 10px;
                }
            }

            &.el-table-column--selection .el-checkbox.is-checked {
                margin-right: -13px;
            }
        }
        &.hover-row {
            td {
                background-color: #f8f8f8;
            }
        }

        &.el-table__row--striped {
            border-radius: 6px !important;
            td {
                background: #f8f8f8;
                &:nth-of-type(1) {
                    border-radius: 6px 0 0 6px;
                }
                &:nth-last-of-type(1) {
                    border-radius: 0 6px 6px 0;
                }
            }
        }
    }

    .ellipsis {
        .tooltip {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .title {
        display: flex;
        justify-content: flex-start;

        .tool {
            display: flex;
            align-items: center;

            .search-all {
                margin-right: 20px;
            }

            .reload {
                margin-right: 16px;
                font-size: 15px;
            }

            .tool-bar {
                margin-right: 20px;
            }
        }
    }
    .el-table__body-wrapper {
        &::-webkit-scrollbar {
            height: 8px;
        }
    }
    .el-table::before {
        background-color: white;
        z-index: 10;
    }
}
.p-b-20 {
    padding-bottom: 20px !important;
}
.no-unline {
    &::after {
        display: none;
    }
}
.is-no-render-over {
    ::v-deep {
        .el-table__empty-text,
        th {
            display: none !important;
        }
    }
}
</style>
