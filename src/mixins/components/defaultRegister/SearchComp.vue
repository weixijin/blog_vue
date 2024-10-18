<template>
    <div v-if="filteredSearchConfig.length > 0" class="searchContainer flex-wrap">
        <el-form ref="secForm" :model="formData" :label-position="labelPson" @submit.native.prevent>
            <template v-for="(item, i) in filteredSearchConfig">
                <!-- 包含label的插槽 -->
                <template v-if="item.type === 'customAll' && item.slot">
                    <slot :name="item.slot"></slot>
                </template>
                <!-- 不包含label的插槽 -->
                <el-form-item
                    v-if="item.type === 'customInput'"
                    class="secForm__item customInput"
                    :label="item.label"
                    :key="i"
                >
                    <slot :name="item.slot"></slot>
                </el-form-item>
                <!-- input -->
                <el-form-item
                    v-if="item.type === 'input' || item.type === 'password'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-input
                        v-model.trim="formData[item.modelName]"
                        :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label"
                        :clearable="true"
                        :disabled="item.disabled ? true : false"
                        :show-password="item.type === 'password'"
                        :maxlength="item.maxLength || 9999"
                        @keyup.enter.native="middleSearch(item)"
                        @clear="middleSearch(item)"
                    />
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'inputNumber'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-input-number
                        v-model="formData[item.modelName]"
                        :min="item.min ? item.min : 0"
                        :max="item.max ? item.max : 10000000000000"
                        :step="item.step ? item.step : 1"
                        :controls="!!item.controls"
                        :controls-position="item.position ? item.position : 'right'"
                        :precision="item.precision ? item.precision : 0"
                        :clearable="item.clearable ? item.clearable : false"
                        class="search-input-number"
                        :disabled="item.disabled ? true : false"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                    />
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'textarea'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-input
                        v-model="formData[item.modelName]"
                        :type="item.type"
                        :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label"
                        :disabled="item.disabled ? true : false"
                        :autosize="item.autosize ? item.autosize : true"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'select'"
                    class="secForm__item"
                    :class="item.class"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-select
                        v-if="!item.page"
                        v-model="formData[item.modelName]"
                        :value-key="item.valueKey"
                        :multiple="item.isMuli ? item.isMuli : false"
                        :clearable="getType(item.clearable) === 'boolean' ? item.clearable : true"
                        :filterable="getType(item.isFilter) === 'boolean' ? item.isFilter : true"
                        :remote="item.isRemote ? item.isRemote : false"
                        :remote-method="
                            item.isRemote ? ($event) => handleSelectRemote($event, item) : null
                        "
                        :disabled="item.disabled ? item.disabled : false"
                        :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
                        :collapse-tags="item.isCollapse ? item.isCollapse : false"
                        @change="middleSearch(item)"
                    >
                        <el-option
                            v-for="op in item.options"
                            :key="op[item.valueKey]"
                            :disabled="op.disabled ? op.disabled : false"
                            :label="op[item.labelKey]"
                            :value="op[item.valueKey]"
                        />
                    </el-select>

                    <PagingSelectComp
                        v-else
                        v-model="formData[item.modelName]"
                        :select-config="item.pagingConfig"
                        style="width: 100%"
                    />
                </el-form-item>

                <!-- select中含有全选，取消全选，反选 功能。multiple 必须为true，支持多选 -->
                <el-form-item
                    v-if="item.type === 'selectAll'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <select-all
                        v-model="formData[item.modelName]"
                        :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
                        :options="item.options"
                        :valueKey="item.valueKey"
                        :labelKey="item.labelKey"
                        :clearable="true"
                        :multiple="true"
                        :filterable="item.isFilter ? item.isFilter : false"
                        :collapse-tags="item.isCollapse ? item.isCollapse : false"
                    />
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'cascader'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-cascader
                        v-model="formData[item.modelName]"
                        clearable
                        filterable
                        :options="item.options"
                        :props="item.props"
                        :placeholder="item.placeholder ? item.placeholder : '请选择' + item.label"
                        :popper-class="item.class"
                    />
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'radioGroup'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-radio-group v-model="formData[item.modelName]">
                        <template v-if="item.radioButton">
                            <el-radio-button
                                v-for="(j, index) in item.options"
                                :key="index"
                                :label="j.value"
                                :disabled="j.disabled ? true : false"
                            >
                                <span v-text="j.label" />
                            </el-radio-button>
                        </template>
                        <template v-else>
                            <el-radio
                                v-for="(j, index) in item.options"
                                :key="index"
                                :label="j.value"
                                :disabled="j.disabled ? true : false"
                            >
                                <span v-text="j.label" />
                            </el-radio>
                        </template>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'checkbox'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-checkbox
                        v-model="formData[item.modelName]"
                        :disabled="item.disabled ? true : false"
                    >
                        <span v-text="item.CheckboxText" />
                    </el-checkbox>
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'checkboxGroup'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-checkbox-group
                        v-model="formData[item.modelName]"
                        :min="item.min ? item.min : 0"
                        :max="item.max ? item.max : 100000"
                    >
                        <template v-if="!item.checkboxButton">
                            <el-checkbox
                                v-for="(j, index) in item.options"
                                :key="index"
                                :label="j.value"
                                :disabled="j.disabled ? true : false"
                            >
                                <span v-text="j.label" />
                            </el-checkbox>
                        </template>
                        <template v-else>
                            <el-checkbox-button
                                v-for="(j, index) in item.options"
                                :key="index"
                                :label="j.value"
                                :disabled="j.disabled ? true : false"
                            >
                                <span v-text="j.label" />
                            </el-checkbox-button>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'datePicker'"
                    class="secForm__item"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-date-picker
                        v-if="item.isNeedSeconds"
                        v-model="formData[item.modelName]"
                        type="datetime"
                        :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label"
                        :value-format="item.valueType || ''"
                        :default-value="item.defaultValue ? item.defaultValue : ''"
                        :picker-options="item.pickerOptions"
                    ></el-date-picker>
                    <el-date-picker
                        v-else
                        v-model="formData[item.modelName]"
                        :type="`${item.isNeedMonth ? 'month' : 'date'}`"
                        :placeholder="item.placeholder ? item.placeholder : '请输入' + item.label"
                        :value-format="item.valueType || ''"
                        :default-value="item.defaultValue ? item.defaultValue : ''"
                        :picker-options="item.pickerOptions"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'datetimerange' && item.isArray"
                    class="secForm__item2"
                    :label="getLabel(item.label)"
                    :prop="item.modelName.join('&')"
                    :key="i"
                >
                    <el-date-picker
                        v-model="formData[item.modelName.join('&')]"
                        class="item__datePicker"
                        :type="item.isNeedTime ? 'datetimerange' : 'daterange'"
                        :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :clearable="item.clearable !== undefined ? item.clearable : true"
                        :default-time="['00:00:00', '23:59:59']"
                        :value-format="item.valueType"
                        :format="item.format"
                        :picker-options="item.pickerOptions"
                        @change="middleSearch(item, formData[item.modelName.join('&')])"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'datetimerange' && !item.isArray"
                    class="secForm__item2"
                    :label="getLabel(item.label)"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-date-picker
                        v-model="formData[item.modelName]"
                        class="item__datePicker"
                        :type="item.isNeedTime ? 'datetimerange' : 'daterange'"
                        :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        :value-format="item.valueType"
                        :format="item.format"
                        :picker-options="item.pickerOptions"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'monthrange' && item.isArray"
                    class="secForm__item2"
                    :label="getLabel(item.label)"
                    :prop="item.modelName.join('&')"
                    :key="i"
                >
                    <el-date-picker
                        v-model="formData[item.modelName.join('&')]"
                        class="item__datePicker"
                        :type="item.type"
                        :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :clearable="item.clearable !== undefined ? item.clearable : true"
                        :value-format="item.valueType"
                        :format="item.format"
                        :picker-options="item.pickerOptions"
                    />
                </el-form-item>
            </template>
        </el-form>
        <div class="secForm__btns h-40 flex-wrap flex-justify-end flex-1" v-if="isSearchFormBtn">
            <el-button type="primary" @click="search">
                <i class="el-icon-search" />
                查询
            </el-button>
            <el-button plain type="primary" @click="reset">
                <i class="el-icon-refresh" />
                重置
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchComp',
    props: {
        searchConfig: {
            type: Array,
            default: function () {
                return []
            },
        },
        labelWidth: {
            type: String,
            default: '116px',
        },
        labelPosition: {
            type: String,
            default: 'right',
        },
        autoSearch: {
            type: Boolean,
            default: true,
        },
        isSearchFormBtn: {
            type: Boolean,
            default: true,
        },
        showFormToggle: {
            type: Boolean,
            default: true,
        },
        needDor: {
            type: Boolean,
            default: false,
        },
        // 是否需要缓存搜索条件
        isCacheSearch: {
            type: Boolean,
            default: true,
        },
        storageId: {
            type: String,
            default: '',
        },
        isAutoSearch: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            formData: {},
            typeList: [
                'input',
                'password',
                'inputNumber',
                'textarea',
                'select',
                'cascader',
                'activeCascader',
                'radioGroup',
                'checkbox',
                'checkboxGroup',
                'baseDatePicker',
                'otherDatePicker',
                'dateTimePicker',
                'datetimerange',
            ],
            formStatus: true,
            defaultValueObj: {},
        }
    },

    computed: {
        labelwth() {
            return this.labelWidth ? this.labelWidth : '110px'
        },
        labelPson() {
            return this.labelPosition ? this.labelPosition : 'right'
        },
        storageIdP() {
            return this.storageId ? `p_${this.storageId}` : ''
        },
        filteredSearchConfig() {
            let result = this.searchConfig
                .map((item) => {
                    let { labelKey, valueKey } = item
                    return {
                        ...item,
                        labelKey: labelKey ? labelKey : 'label',
                        valueKey: valueKey ? valueKey : 'value',
                    }
                })
                .filter((item) => !item.perm || this.$_hasPermission(item.perm))

            return result
        },
    },
    created() {
        this.getFromData()
    },
    methods: {
        middleSearch(row, val) {
            if (this.getType(row.onChange) === 'function') {
                row.onChange(row, val)
            }

            if (this.isAutoSearch) {
                this.search()
            }
        },
        getLabel(str) {
            return this.needDor ? str + '：' : str
        },
        toggleForm() {
            this.formStatus = !this.formStatus
        },
        reset() {
            for (const q in this.formData) {
                // 有默认值（包括0）的情况下，重置时不清空
                if (this.defaultValueObj[q] || this.defaultValueObj[q] === 0) {
                    this.formData[q] = this.defaultValueObj[q]
                } else {
                    this.formData[q] = undefined
                }
            }
            this.$emit('resetFieldFn')
            this.search()
        },
        search() {
            const obj = {}
            for (const q in this.formData) {
                if (q.indexOf('&') !== -1) {
                    const arr = q.split('&')
                    arr.forEach((k, i) => {
                        obj[k] = this.formData[q] ? this.formData[q][i] : ''
                    })
                    delete obj[q]
                } else if (Array.isArray(this.formData[q])) {
                    obj[q] = this.formData[q].join(',')
                } else {
                    obj[q] = this.formData[q]
                }
            }
            if (this.storageIdP && this.isCacheSearch) {
                this.setLocalStorage(this.storageIdP, this.formData)
            }
            this.$emit('search', obj)
        },
        getSearchData() {
            const obj = {}
            for (const q in this.formData) {
                if (q.indexOf('&') !== -1) {
                    const arr = q.split('&')
                    arr.forEach((k, i) => {
                        obj[k] = this.formData[q] ? this.formData[q][i] : ''
                    })
                    delete obj[q]
                } else if (Array.isArray(this.formData[q])) {
                    obj[q] = this.formData[q].join(',')
                } else {
                    obj[q] = this.formData[q]
                }
            }
            return obj
        },
        // 根据搜索配置塞选出model属性
        async getFromData() {
            const testObj = {}
            const defaultValueObj = {}
            this.filteredSearchConfig.forEach((item) => {
                if (item.type) {
                    if (item.clearable !== false) {
                        item.clearable = true
                    }
                    if (item.modelName) {
                        if (item.type === 'datetimerange') {
                            if (
                                Object.prototype.toString.call(item.modelName) === '[object Array]'
                            ) {
                                this.$set(item, item.modelName.join('&'), item.modelName.join('&'))
                                this.$set(item, 'isArray', true)
                                testObj[item.modelName.join('&')] = item.defaultValue
                            } else {
                                testObj[item.modelName] = item.defaultValue
                            }
                        } else {
                            testObj[item.modelName] = item.defaultValue
                        }
                    }

                    // 有默认值（包括0）的情况下，重置时不清空
                    if (item.defaultValue || item.defaultValue === 0) {
                        defaultValueObj[item.modelName] = item.defaultValue
                    }
                }
            })

            // 处理函数的情况
            for (let i = 0; i < this.filteredSearchConfig.length; i++) {
                const item = this.filteredSearchConfig[i]
                const optionsType = this.getType(item.options)
                if (optionsType === 'function') {
                    const result = item.options()
                    item.options = result
                    if (!Array.isArray(result)) {
                        this.Toast(
                            new Error(
                                `${item.label}选项的options必须是一个数组,当前是一个${this.getType(
                                    result,
                                )} `,
                            ),
                        )
                        item.options = []
                    }

                    // TODO:判断数下的对象是否都包含 label 和 value 需要考虑 0的情况
                }

                if (optionsType === 'asyncfunction') {
                    try {
                        // TODO:待优化，多个移步的函数导致性能问题，需要看下能不能做成不依赖这儿的返回，先请求表格数据
                        item.options = await item.options()
                    } catch (err) {
                        item.options = []
                        this.Toast(err)
                    }
                }
            }

            this.formData = testObj
            this.defaultValueObj = defaultValueObj

            if (this.storageIdP && this.isCacheSearch) {
                let old = this.getLocalStorage(this.storageIdP, {})
                // 需要判断两个对象的key和对应的value类型是一致的才进行合并
                if (this.isObjectKeys(old, this.formData)) {
                    Object.assign(this.formData, old)
                }
            }

            if (this.autoSearch) {
                this.search()
            }
        },
        handleSelectRemote(query, item) {
            if (item.remoteMethod) {
                item.remoteMethod(query, item)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.sqForm {
    overflow: hidden;
    height: 50px;
}

.searchContainer {
    background: #fff;
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    border-radius: 20px;
    padding: 20px;

    ::v-deep {
        .el-form {
            width: calc(100% - 200px);
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(270px, 400px));
            gap: 10px;
            .el-form-item {
                margin-bottom: 0px;
                display: flex;
            }
            & > span {
                width: 25%;
                .el-input,
                .el-select,
                .el-cascader,
                .el-date-editor,
                .el-input-number {
                    width: 100%;
                }
                .el-form-item {
                    .item__datePicker {
                        .el-icon-date,
                        .el-range-separator {
                            width: 10%;
                            padding: 0;
                        }
                        .el-range-input {
                            width: 40%;
                        }
                    }
                }
            }

            & > span.span50 {
                flex-basis: 100%;
                .secForm__item {
                    width: 50%;
                }
            }
        }

        .el-form-item {
            display: flex;
            background: #f7f8fa;
            border-radius: 6px;
            padding-left: 10px;
        }

        .el-form-item__label {
            white-space: nowrap;
            padding-right: 6px;
            &:after {
                content: '|';
                margin: 0 0 0 6px;
                top: -1.5px;
                color: #dcdfe6;
            }
        }
        .el-form-item__content {
            margin-left: 0px !important;
            background: #f7f8fa;
            flex: 1;
            .el-select,
            .el-date-editor {
                width: 100%;
            }
        }

        .form_item:not(.exclude-item) {
            margin-bottom: 7px !important;
            background: #f7f8fa;
            border-radius: 6px;
            padding-left: 10px;
        }

        .form_item.exclude-item {
            margin-bottom: 0px;
        }

        input,
        .el-date-editor {
            border: none !important;
            outline: none !important;
            background: transparent !important;
            padding-left: 0px !important;
        }
    }
}

// 媒体查询兼容1920
@media all and (max-width: 1600px) {
    .searchContainer {
        ::v-deep {
            .el-form {
                grid-template-columns: repeat(auto-fill, minmax(270px, 330px)) !important;
            }
        }
    }
}
</style>
