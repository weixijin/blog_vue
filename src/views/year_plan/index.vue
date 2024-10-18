<template>
    <div class="demo">
        <div class="flex-center-wrap">
            <el-date-picker
                v-model="form.year"
                type="year"
                placeholder="选择年"
                @change="getList"
                class="w-100"
            ></el-date-picker>
            <el-button
                class="m-l-10"
                :size="IS_PC ? '' : 'small'"
                type="primary"
                @click="openDialog"
                >add</el-button
            >

            <el-button type="success" @click="addChange">确定</el-button>
        </div>
        <el-tree
            class="m-t-10"
            :data="list"
            show-checkbox
            node-key="_id"
            default-expand-all
            :expand-on-click-node="false"
        >
            <div class="custom-tree-node flex-wrap" slot-scope="{ node, data }">
                <div class="label-width ell-1">{{ node.label }}</div>
                <div class="m-l-20">
                    <el-button type="text" size="mini" @click="() => openDialog(data)">
                        Append
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(data)">
                        Delete
                    </el-button>
                </div>
            </div>
        </el-tree>
        <e-dialog v-model="visable" :width="IS_PC ? '400px' : '300px'" @confirm="confirmD" @closed="closed">
            <div class="p-10">
                <el-input v-model.trim="rowData.label"></el-input>
            </div>
        </e-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            form: {
                year: '',
            },
            list: [],
            visable: false,
            rowData: {
                _id: '',
                label: '',
            },
        }
    },
    computed: {
        IS_PC() {
            return this.isPc()
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        closed() {
            this.visable = false
            this.rowData = {
                _id: '',
                label: '',
            }
        },
        addChange(){
            let {list} = this
             let query = {
                list
             }
            let { year } = this.form
            if (!year) {
                query.year = new Date().getFullYear()
            } else {
                query.year = new Date(year).getFullYear()
            }
        },
        init() {
            this.getList()
        },
        getList() {
            let query = {}
            let { year } = this.form
            if (!year) {
                query.year = new Date().getFullYear()
            } else {
                query.year = new Date(year).getFullYear()
            }
        },
        confirmD() {
            this.visable = false
            let { _id, label } = this.rowData
            
            let obj = {
                _id: this.createId(),
                label,
                children: [],
            }
            if (!_id) {
                // 新增一级
                this.list.push(obj)
                return
            }
            // 下级新增
            this.list = this.list.reduce((acc, cur) => {
                if (cur._id === _id) {
                    Array.isArray(cur.children)?cur.children.push(obj):cur.children = [obj]
                }
                if(Array.isArray(cur.children)){
                    cur.children = cur.children.reduce((acc2, cur2) => {
                        if (cur2._id === _id) {
                            cur2.children.push(obj)
                        }
                        acc2.push(cur2)
                        return acc2
                    }, [])
                }
                
                return acc
            }, [])

        },
        openDialog(row) {
            if (this.isObject(row)) {
                this.rowData = this.deepCopy(row)
            }
            this.visable = true
        },
   

        // 删除
        remove(data) {
            let { _id } = data
            this.list = this.list.reduce((acc, cur) => {
                if (cur._id === _id) {
                    return acc
                }
                if (Array.isArray(cur.children)) {
                    cur.children = cur.children.reduce((acc2, cur2) => {
                        if (cur2._id === _id) {
                            return acc2
                        }
                        acc2.push(cur2)
                        return acc2
                    }, [])
                }
                acc.push(cur)
                return acc
            }, [])  
        },
    },
}
</script>

<style lang="scss" scoped>
.label-width {
    width: 200px;
}
</style>
