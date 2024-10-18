<template>
    <div :class="['kl-table',klTableId]">
        <div class="kl-table">
            <div class="kl-table-header">
                <div
                    class="kl-table-header-colum"
                    v-for="(item, index) in headerOption"
                    :key="'kl' + index"
                    :style="{ width: item.width + 'px', flex: item.flex }"
                >
                    {{ item.name }}
                </div>
            </div>

            <div
                class="kl-table-body kl-bar better-scroll"
                :style="{
                    maxHeight: scrollHeight?scrollHeight + 'px':'auto',
                }"
            >
                <div class="kl-table-list" v-for="item in data" :key="item._id">
                    <div
                        class="kl-table-list-colum"
                        v-for="(itey, index) in headerOption"
                        :key="'zl_a' + index"
                        :style="{ width: itey.width + 'px', flex: itey.flex }"
                    >
                        <div v-if="!itey.custom">
                            {{ item[itey.key] }}
                        </div>

                        <!-- 链接 -->
                        <div v-if="itey.custom == 'ac_url'">
                            {{ item.ac_url }}
                        </div>

                        <!-- 操作 -->
                        <div v-if="itey.custom == 'operation'">
                            <div v-if="(itey.key = 'action')">
                                <el-button type="success" size="small" @click="edit(item)">
                                    编辑
                                </el-button>
                                <el-button type="danger" size="small" @click="delAcPage(item)">
                                    删除
                                </el-button>
                                <el-button type="primary" size="small" @click="copyLink(item)">
                                    复制链接
                                </el-button>
                                <el-button type="info" size="small" @click="showCode(item)">
                                    生成二维码
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'kl-table',
    props: {
        // 表格数据
        data: {
            type: Array,
            default: () => [],
        },

        // 表头数据配置项
        headerOption: {
            type: Array,
            default: () => [],
        },

        // 表格的最大高度
        maxHeight: {
            type: Number,
            default:0
        },
    },
    data() {
        return {
            inputVal: '',
            scrollHeight: 0,
            klTableId: '',
        }
    },
    mounted() {
        this.init()
    },
    watch:{
      maxHeight(val){
         this.setStyle()
      }  
    },
    methods: {
        // 设置样式
        setStyle() {
            let { maxHeight, klTableId } = this
            let kl_table_header_el = document.querySelector(`.${klTableId} .kl-table-header`)
            if (kl_table_header_el) {
                // 获取表头的高度
                let header_height = kl_table_header_el.offsetHeight
                this.scrollHeight = maxHeight - header_height
            }
        },
        // 初始化
        init() {
            this.klTableId = this.createId()
            this.setStyle()
        },
    },
}
</script>

<style lang="scss" scoped>
.kl-table {
    border: 1px solid #ebeef5;
    border-radius: 4px;
}
.kl-table-header,
.kl-table-list {
    display: flex;
}

.kl-table-header {
    min-height: 48px;
    color: #3399ff;
    font-weight: 550;
    background-color: #edf5ff !important;
}
.kl-table-header-colum,
.kl-table-list-colum {
    // flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.kl-table-list-colum {
    min-height: 58px;
    color: #555;
}
</style>
