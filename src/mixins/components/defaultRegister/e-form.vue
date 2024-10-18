<template>
    <div v-if="formConfig.length > 0">
        <el-form
            ref="submitFormRef"
            :inline="inline"
            :class="{ secForm: true, sqForm: formStatus }"
            :rules="formRule"
            :model="formData"
            :label-position="labelPson"
            :label-width="labelwth"
        >
            <span
                v-for="(item, i) in formConfig"
                :key="i"
                :class="`${
                    item.type === 'customAll' || item.type === 'datetimerange' ? 'slotStyle' : ''
                }
           ${item.widthType && item.widthType === 'half' ? 'span50' : ''}
           ${item.class ? item.class : ''}`"
            >
                <!-- 不包含label的插槽 -->
                <span v-if="item.type === 'customAll' && item.slot">
                    <slot :name="item.slot" :item="item"></slot>
                </span>
                <!-- 包含label的插槽 -->
                <el-form-item
                    v-if="item.type === 'customInput'"
                    class="secForm__item customInput"
                    :label="item.label || ''"
                    :prop="item.modelName || ''"
                    :required="item.required"
                >
                    <slot :name="item.slot" :item="item"></slot>
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'text'"
                    class="secForm__item"
                    :label="item.label || ''"
                    :prop="item.modelName || ''"
                >
                    <slot v-if="item.slot" :name="item.slot" :item="item">
                        {{
                            typeof item.render === 'function'
                                ? item.render(formData[item.modelName])
                                : formData[item.modelName]
                        }}
                    </slot>

                    <template v-else>
                        <div class="content">
                            {{
                                typeof item.render === 'function'
                                    ? item.render(formData[item.modelName])
                                    : formData[item.modelName]
                            }}
                        </div>
                    </template>
                    <div v-if="item.showTips" class="form-item-tips">
                        <span>
                            {{ item.tips }}
                        </span>
                    </div>
                </el-form-item>

                <!-- input -->
                <el-form-item
                    v-if="item.type === 'input' || item.type === 'password'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <template v-if="item.disabled && item.tooltip">
                        <el-tooltip
                            v-if="formData[item.modelName]"
                            effect="dark"
                            :content="formData[item.modelName]"
                            placement="top-start"
                        >
                            <el-input
                                v-model.trim="formData[item.modelName]"
                                :placeholder="
                                    item.disabled
                                        ? ''
                                        : item.placeholder
                                        ? item.placeholder
                                        : '请输入' + item.label
                                "
                                :clearable="true"
                                :disabled="item.disabled ? true : false"
                                :readonly="item.readonly ? true : false"
                                :show-password="item.type === 'password'"
                                :maxlength="item.maxLength || 9999"
                                :show-word-limit="item.showWordLimit || false"
                            />
                        </el-tooltip>
                        <template v-else>
                            <el-input
                                v-model.trim="formData[item.modelName]"
                                :placeholder="
                                    item.disabled
                                        ? ''
                                        : item.placeholder
                                        ? item.placeholder
                                        : '请输入' + item.label
                                "
                                :clearable="true"
                                :disabled="item.disabled ? true : false"
                                :readonly="item.readonly ? true : false"
                                :show-password="item.type === 'password'"
                                :maxlength="item.maxLength || 9999"
                                :show-word-limit="item.showWordLimit || false"
                            />
                        </template>
                    </template>

                    <el-input
                        v-else
                        v-model.trim="formData[item.modelName]"
                        :placeholder="
                            item.disabled && item.placeholder
                                ? item.placeholder
                                : item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :clearable="true"
                        :disabled="item.disabled ? true : false"
                        :readonly="item.readonly ? true : false"
                        :show-password="item.type === 'password'"
                        :maxlength="item.maxLength || 9999"
                        :show-word-limit="item.showWordLimit || false"
                        :class="[item.className]"
                        @blur="
                            (event) => {
                                item.blurFn && item.blurFn(event.target.value)
                            }
                        "
                        @keyup.enter.native="
                            (event) => {
                                item.enterFn && item.enterFn(event.target.value)
                            }
                        "
                        @clear="
                            () => {
                                item.clearFn && item.clearFn()
                            }
                        "
                    />
                </el-form-item>

                <!-- 只读展示 -->
                <el-form-item
                    v-if="item.type === 'readOnly'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <div>{{ formData[item.modelName] }}</div>
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'inputNumber'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <el-input-number
                        v-model="formData[item.modelName]"
                        :min="item.min ? item.min : 0"
                        :max="item.max || item.max === 0 ? item.max : 10000000000000"
                        :step="item.step ? item.step : 0"
                        :controls="false"
                        :controls-position="item.position ? item.position : 'right'"
                        :precision="item.precision ? item.precision : 0"
                        :clearable="item.clearable ? item.clearable : false"
                        class="widthStyle"
                        :disabled="item.disabled ? true : false"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :class="[item.className]"
                    />
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'textarea'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <el-input
                        v-model="formData[item.modelName]"
                        :type="item.type"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :disabled="item.disabled ? true : false"
                        :autosize="item.autosize ? item.autosize : true"
                        :maxlength="item.maxLength || 300"
                        :show-word-limit="item.showWordLimit || false"
                        :resize="item.resize"
                        :style="{ width: item.width ? item.width : '' }"
                        :rows="item.rows || 3"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'select'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <!-- select展示多个账单 -->
                    <el-select
                        v-if="
                            Array.isArray(formData[item.modelName]) &&
                            item.modelName == 'settlementNo'
                        "
                        v-model="formData[item.modelName][0]"
                        :clearable="item.clearable !== undefined ? item.clearable : true"
                        :multiple="item.isMuli ? item.multiple : false"
                        :filterable="item.isFilter ? item.isFilter : false"
                        :disabled="formData[item.modelName].length <= 1 ? item.disabled : false"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                        :collapse-tags="!!item.isCollapse"
                        @change="($event) => handleSelectChange($event, item)"
                    >
                        <el-option
                            v-for="(op, index) in item.options"
                            :key="index"
                            :disabled="op.disabled ? op.disabled : false"
                            :label="item.labelKey ? op[item.labelKey] : op.label"
                            :value="item.valueKey ? op[item.valueKey] : op.value"
                        >
                            <span v-if="item.optionRender">{{ item.optionRender(op) }}</span>
                        </el-option>
                    </el-select>
                    <el-select
                        v-else-if="!item.page"
                        :value.sync="formData[item.modelName]"
                        :value-key="item.valueKey || 'code'"
                        :clearable="item.clearable !== undefined ? item.clearable : true"
                        :multiple="item.isMuli ? item.multiple : false"
                        :filterable="item.isFilter ? item.isFilter : false"
                        :allow-create="item.allowCreate ? item.allowCreate : false"
                        :default-first-option="
                            item.defaultFirstOption ? item.defaultFirstOption : false
                        "
                        :remote="item.isRemote ? item.isRemote : false"
                        :remote-method="
                            item.isRemote ? ($event) => handleSelectRemote($event, item) : null
                        "
                        :disabled="item.disabled ? true : false"
                        :loading="item.loading ? item.loading : false"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : `请选择${item.label}`.replace(/(选择)\1+/g, '$1')
                        "
                        :collapse-tags="!!item.isCollapse"
                        @change="($event) => handleSelectChange($event, item)"
                        @clear="() => handleSelectClear(item)"
                        @focus="($event) => handleSelectFocus($event, item)"
                    >
                        <el-option
                            v-for="op in item.options"
                            :key="item.valueKey ? op[item.valueKey] : op.value"
                            :disabled="op.disabled ? op.disabled : false"
                            :label="item.labelKey ? op[item.labelKey] : op.label"
                            :value="
                                item.valueType === 'object'
                                    ? op
                                    : item.valueKey
                                    ? op[item.valueKey]
                                    : op.value
                            "
                        >
                            <div
                                :class="
                                    item.widthAuto
                                        ? 'select-option-width-auto'
                                        : 'select-option-width'
                                "
                            >
                                <span v-if="item.optionRender">
                                    {{ item.optionRender(op) }}
                                </span>
                                <template v-else>
                                    {{ item.labelKey ? op[item.labelKey] : op.label }}
                                </template>
                            </div>
                        </el-option>
                    </el-select>
                    <PagingSelectComp
                        v-else
                        v-model="formData[item.modelName]"
                        :select-config="item.pagingConfig"
                        style="width: 100%"
                    />
                    <el-tooltip
                        v-if="item.showLabel && formData[item.modelName]"
                        :content="formData[item.modelName].name"
                        placement="top"
                    >
                        <span class="selected-label">
                            {{ formData[item.modelName].name }}
                        </span>
                    </el-tooltip>
                    <span v-if="item.showTips" class="form-item-tips">
                        {{ item.tips }}
                    </span>
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'cascader'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <el-cascader
                        v-model="formData[item.modelName]"
                        clearable
                        filterable
                        :options="item.options"
                        :props="item.props"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                        :popper-class="item.class"
                    />
                </el-form-item>

                <el-form-item
                    v-if="item.type === 'radioGroup'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                    :label-width="item.labelWidth ? item.labelWidth : labelwth"
                >
                    <el-radio-group v-model="formData[item.modelName]" :disabled="item.disabled">
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
                    :label="item.label"
                    :prop="item.modelName"
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
                    :label="item.label"
                    :prop="item.modelName"
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
                                :label="item.valueKey ? j[item.valueKey] : j.value"
                                :disabled="j.disabled ? true : false"
                            >
                                <span v-text="item.labelKey ? j[item.labelKey] : j.label" />
                            </el-checkbox>
                        </template>
                        <template v-else>
                            <el-checkbox-button
                                v-for="(j, index) in item.options"
                                :key="index"
                                :label="item.valueKey ? j[item.valueKey] : j.value"
                                :disabled="j.disabled ? true : false"
                            >
                                <span v-text="item.labelKey ? j[item.labelKey] : j.label" />
                            </el-checkbox-button>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'datePicker'"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
                >
                    <el-date-picker
                        v-model="formData[item.modelName]"
                        :type="item.isNeedTime ? 'datetime' : 'date'"
                        :placeholder="
                            item.disabled
                                ? ''
                                : item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :picker-options="item.pickerOptions ? item.pickerOptions : ''"
                        :default-value="item.defaultValue ? item.defaultValue : ''"
                        :disabled="item.disabled ? true : false"
                        :value-format="item.valueFormat === undefined ? 'yyyy-MM-dd HH:mm:ss':item.valueFormat"
                        :format="item.format === undefined ?'yyyy-MM-dd HH:mm:ss':item.format"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'datetimerange' && item.isArray"
                    class="secForm__item2"
                    :label="item.label"
                    :prop="item.modelName.join('&')"
                >
                    <el-date-picker
                        v-model="formData[item.modelName.join('&')]"
                        class="item__datePicker"
                        :type="item.isNeedTime ? 'datetimerange' : 'daterange'"
                        :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        :value-format="item.valueType"
                        :format="item.format"
                        :disabled="item.disabled ? true : false"
                    />
                </el-form-item>
                <el-form-item
                    v-if="item.type === 'datetimerange' && !item.isArray"
                    class="secForm__item2"
                    :label="item.label"
                    :prop="item.modelName"
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
                        :disabled="item.disabled ? true : false"
                        @change="
                            (val) => {
                                item.changeFn && item.changeFn(val)
                            }
                        "
                    />
                </el-form-item>
                <!-- 多选 -->
                <el-form-item
                    v-if="item.type === 'selectAll' && item.show"
                    class="secForm__item"
                    :label="item.label"
                    :prop="item.modelName"
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
                <!-- 时间范围 -->
                <el-form-item
                    v-if="item.type === 'timerange'"
                    class="secForm__item2"
                    :label="item.label"
                    :prop="item.modelName"
                    :key="i"
                >
                    <el-time-picker
                        v-model="formData[item.modelName]"
                        class="item__timePicker"
                        is-range
                        :range-separator="item.rangeSeparator || '至'"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :clearable="!!item.clearable"
                        :value-format="item.valueType || 'HH:mm'"
                        :format="item.format || 'HH:mm'"
                        :picker-options="{ format: item.format || 'HH:mm' }"
                        :disabled="!!item.disabled"
                    />
                </el-form-item>

                <!-- 附件上传 -->
                <el-form-item
                    v-if="item.type === 'upload'"
                    class="secForm__item2"
                    :label="item.label"
                    :prop="item.modelName"
                    :key="i"
                >
                    <SceneUploader
                        :value.sync="formData[item.modelName]"
                        :readonly="!!item.disabled || !!item.readonly"
                        :max-count="item.maxCount || 10"
                        :max-size="item.maxSize || 50"
                        :is-image-only="item.isImageOnly || false"
                        :is-video-only="item.isVideoOnly || false"
                        @change="
                            (val) => {
                                item.changeFn && item.changeFn(val)
                            }
                        "
                    >
                        <template slot="head" slot-scope="scope">
                            <div>
                                <span
                                    v-if="!item.disabled && !item.readonly"
                                    v-html="
                                        item.tips
                                            ? typeof item.tips === 'function'
                                                ? item.tips()
                                                : item.tips
                                            : ''
                                    "
                                ></span>
                                （{{
                                    Array.isArray(formData[item.modelName])
                                        ? formData[item.modelName].length
                                        : 0
                                }}/{{ scope.maxCount }}）：
                            </div>
                        </template>
                    </SceneUploader>
                </el-form-item>
            </span>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'e-form',
    props: {
        formConfig: {
            type: Array,
            default: function () {
                return []
            },
        },
        labelWidth: {
            type: String,
            default: '115px',
        },
        labelPosition: {
            type: String,
            default: 'right',
        },
        formRule: {
            type: Object,
            default: function () {
                return {}
            },
        },
        formData: {
            type: Object,
            default: function () {
                return {}
            },
        },
        inline: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // formData: {},
            formStatus: false,
        }
    },
    computed: {
        labelwth() {
            return this.labelWidth ? this.labelWidth : '100px'
        },
        labelPson() {
            return this.labelPosition ? this.labelPosition : 'right'
        },
    },
    mounted() {
        this.$emit('forwardFormRef', this.$refs.submitFormRef)
    },
    methods: {
        // select类型下拉切换回调，添加自定义拦截功能，向下兼容
        async handleSelectChange(val, item) {
            if (item.beforeChange) {
                const res = await item.beforeChange(val, this.formData[item.modelName])
                if (res === false) return
            }
            this.$emit('handleChange', val, item)
            this.$set(this.formData, item.modelName, val)
        },
        handleSelectRemote(query, item) {
            if (item.remoteMethod) {
                item.remoteMethod(query, item)
            }
        },
        handleSelectClear(item) {
            if (item.clear) {
                item.clear(item)
            }
        },
        handleSelectFocus(val, item) {
            if (item.beforeFocus) {
                item.beforeFocus(val, this.formData[item.modelName])
            }
        },
        async validateFn() {
            try {
                let a = await this.$refs.submitFormRef.validate()
                return a
            } catch (error) {
                return Promise.resolve(false)
            }
        },
        validateField(ids = [], cb) {
            this.$refs.submitFormRef.validateField(ids, (valid) => {
                if (typeof cb === 'function') {
                    cb(valid)
                }
                return valid
            })
        },
        clearValidate(ids = []) {
            this.$refs.submitFormRef.clearValidate(ids)
        },
        toggleForm() {
            this.formStatus = !this.formStatus
        },
        reset() {
            this.$emit('resetFieldFn')
            this.$refs.submitFormRef && this.$refs.submitFormRef.resetFields()
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
                } else {
                    obj[q] = this.formData[q]
                }
            }
            this.$emit('search', obj)
        },
        // 根据搜索配置塞选出model属性
        getFromData() {
            const testObj = {}
            this.formConfig.map((item) => {
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
                            if (item.defaultValue) {
                                console(item.modelName)
                            }

                            testObj[item.modelName] = item.defaultValue
                        }
                    }
                }
            })
            this.formData = testObj
            if (this.autoSearch) {
                this.search()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.selected-label {
    overflow: hidden;
    display: inline-block;
    margin-left: 0.5em;
    max-width: 200px;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.sqForm {
    height: 40px !important;
    overflow: hidden;
}

.form-item-tips {
    font-size: 13px;
    color: red;
}
.select-option-width-auto {
    width: auto;
}
.select-option-width {
    overflow: hidden;
    display: inline-block;
    width: 200px;
    text-overflow: ellipsis;
}
.span-block {
    display: block;
}

::v-deep {
    .widthStyle {
        .el-input-number .el-input__inner {
            text-align: left;
        }
    }
}
</style>
