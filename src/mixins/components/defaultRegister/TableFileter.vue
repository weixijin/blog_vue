<template>
    <div>
        <el-button type="text" icon="el-icon-setting" @click="handleShowModal">
            自定义列表
        </el-button>

        <e-dialog title="自定义列表" v-model="visible" :footer="false" width="900px">
            <div class="dialog-content p-l-20 p-t-20 p-r-20">
                <el-card class="box-card all-columns" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>全部列 ({{ newColumns.length }})</span>
                    </div>
                    <div class="search-wrapper">
                        <el-input
                            placeholder="请输入要搜索的关键字"
                            prefix-icon="el-icon-search"
                            v-model="keywords"
                            size="small"
                        ></el-input>
                    </div>
                    <div class="content">
                        <el-checkbox-group v-model="checkList">
                            <template v-for="(item, index) in filterNewColumns">
                                <el-checkbox
                                    style="width: 50%; margin: 0; padding-right: 10px"
                                    v-if="item.props"
                                    :key="index"
                                    :label="item.props"
                                    :disabled="!!item.lock"
                                    @change="onColumnsChecked(item, $event)"
                                >
                                    {{ item.label }}
                                </el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </div>
                </el-card>

                <el-card class="box-card selected-columns" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>已显示列 ({{ checkList.length }})</span>
                    </div>

                    <div class="lock-list">
                        <div
                            class="item"
                            :key="index"
                            v-for="(item, index) in newColumns.filter((item) => item.lock)"
                        >
                            <template>
                                <i class="el-icon-lock" />
                                <span>
                                    {{ item.label }}
                                </span>
                            </template>
                        </div>
                    </div>

                    <div class="columns-wrapper">
                        <vuedraggable class="fixed-list" v-model="newColumns">
                            <transition-group>
                                <div
                                    v-for="(item, index) in newColumns"
                                    :key="`${item.props}_${index}`"
                                >
                                    <template>
                                        <div
                                            class="item"
                                            v-if="item.show && item.fixed && !item.lock"
                                        >
                                            <el-icon class="el-icon-s-fold" />
                                            <p>{{ item.label }}</p>
                                            <i
                                                class="el-icon-lock fixed-icon"
                                                @click="handleSetLock(item, index)"
                                            />
                                            <i
                                                class="el-icon-close fixed-icon"
                                                :disabled="item.fixed"
                                                @click="handleDelete(item, index)"
                                            />
                                        </div>
                                    </template>
                                </div>
                            </transition-group>
                        </vuedraggable>

                        <vuedraggable class="unfixed-list" v-model="newColumns">
                            <transition-group>
                                <div
                                    v-for="(item, index) in newColumns"
                                    :key="`${item.props}_${index}`"
                                >
                                    <template>
                                        <div
                                            class="item"
                                            v-if="item.show && !item.fixed && !item.lock"
                                        >
                                            <el-icon class="el-icon-s-fold" />
                                            <p>{{ item.label }}</p>
                                            <i
                                                class="el-icon-unlock fixed-icon"
                                                @click="handleSetLock(item, index)"
                                            />
                                            <i
                                                class="el-icon-close fixed-icon"
                                                :disabled="item.fixed"
                                                @click="handleDelete(item, index)"
                                            />
                                        </div>
                                    </template>
                                </div>
                            </transition-group>
                        </vuedraggable>
                    </div>
                </el-card>
            </div>

            <div class="flex-center-end h-60 p-r-20">
                <el-button size="small" type="warning" @click="reset">重 置</el-button>
                <el-button size="small" @click="handleClose">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSave">确 定</el-button>
            </div>
        </e-dialog>
    </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
export default {
    name: 'TableFileter',
    components: {
        vuedraggable,
    },
    props: {
        storageId: {
            type: String,
            require: true,
        },
        columns: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    data() {
        return {
            visible: false,
            keywords: '',
            checkList: [],
            newColumns: [...this.columns],
            unlockList: [], // 已选择列
            lockList: [],
        }
    },
    computed: {
        checkedColumns() {
            return this.lockList.concat(this.unlockList)
        },
        filterNewColumns() {
            return this.newColumns.filter((item) => item.label.indexOf(this.keywords) >= 0)
        },
    },
    watch: {
        visible(value) {
            if (value) {
                const columns = []
                const checkList = []
                this.columns.forEach((item) => {
                    columns.push({
                        ...item,
                        lock: !!item.lock,
                        fixed: item.fixed,
                    })
                    item.show && checkList.push(item.props)
                })
                this.newColumns = [...columns]
                this.checkList = [...checkList]
                this.$forceUpdate()
            }
        },
    },
    methods: {
        // 选择列事件
        onColumnsChecked(item, value) {
            // console.log(item, value);
            item.show = value
            this.unlockList = this.newColumns.filter((item) => item.show && !item.fixed)
            this.lockList = this.newColumns.filter((item) => item.show && item.fixed)
        },
        // 设置是否锁定
        handleSetLock(column, index) {
            column.fixed = !column.fixed // 设置锁定属性
            if (column.fixed) {
                this.newColumns.splice(index, 1)
                this.newColumns.unshift(column)
            }
            this.$forceUpdate()
        },
        // 去除列
        handleDelete(column, index) {
            column.show = false
            this.$forceUpdate()
            this.checkList.splice(
                this.checkList.findIndex((item) => item === column.props),
                1,
            )
        },
        // 保存数据
        handleSave() {
            const { storageId } = this
            if (storageId) {
                this.setLocalStorage(this.storageId + '_table', this.newColumns)
            }
            this.$emit('update', true)
            this.handleClose()
        },
        handleShowModal() {
            this.visible = true
        },
        handleClose() {
            this.visible = false
        },
        reset() {
            this.$confirm('确定重制缓存？')
                .then((res) => {
                    const { storageId } = this
                    if (storageId) {
                        this.removeLocalStorage(this.storageId + '_table')
                    }
                    this.$emit('update', true)
                    this.handleClose()
                })
                .catch(() => {})
        },
    },
}
</script>

<style lang="scss" scoped>
.dialog-content {
    display: flex;
    justify-content: space-between;

    ::v-deep .el-card__body {
        padding-bottom: 0px !important;
    }

    .all-columns {
        flex: 1;
    }
    .selected-columns {
        width: 300px;
        margin-left: 20px;
        ::v-deep .el-card__body {
            padding: 0;
            height: 462px;
            overflow-y: scroll;

            .lock-list {
                width: 100%;
                display: flex;
                padding: 5px 10px;
                border-bottom: #ddd solid 1px;
                .item {
                    background: #fcfcfc;
                    border-radius: 5px;
                    padding: 3px 5px;
                    color: #999;
                    border: #ebebeb solid 1px;
                    margin-right: 5px;
                    i {
                        font-size: 16px;
                    }
                }
            }
            .columns-wrapper {
                width: 100%;
                height: auto;
                overflow: hidden;
                // border: #ddd solid 1px;
                border-radius: 3px;
                background: #fff;
                padding: 5px 10px;

                .fixed-list {
                    border-bottom: #ddd solid 1px;
                    margin-bottom: 8px;
                    .item {
                        background: #f5f5f5;
                        color: #666;
                        border: #ebebeb solid 1px;
                    }
                }
                .item {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 5px;
                    background: #b3d8ff;
                    color: #666;
                    border-radius: 5px;
                    // border-bottom: #ddd solid 1px;
                    cursor: move;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    p {
                        flex: 1;
                        padding: 0 5px;
                    }
                    .fixed-icon {
                        cursor: pointer;
                        margin-right: 5px;
                        font-size: 16px;
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }
    .content {
        // padding: 10px 0;
        max-height: 400px;
        overflow: auto;
        margin-top: 10px;
    }

    ::v-deep .el-card__header {
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        background: #f4f4f4;
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
    }
    ::v-deep .el-card__body {
        padding: 10px;
    }
    ::v-deep .el-checkbox {
        padding: 5px 0;
    }
}
</style>
