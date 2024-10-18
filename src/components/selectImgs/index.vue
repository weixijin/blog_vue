<template>
    <!-- 不需要遮罩 -->
    <e-dialog
        class="dialog-center"
        :title="`图片挑选(${selectImgs.length})`"
        v-model="value"
        width="1000px"
        :modal="modal"
        @closed="handleClose"
        @confirm="confirm"

    >
        <div class="imgs-container p-15 p-b-0">
            <div class="img-flex">
                <img
                    @click="selectImg(item)"
                    v-for="item in imgsList"
                    :key="item._id"
                    :src="item.imgs_url"
                    :class="[
                        selectImgs.findIndex((itey) => itey._id == item._id) !== -1
                            ? 'select-img'
                            : '',
                    ]"
                />
            </div>
            <div class="flex-center m-t-20" v-if="pageOption.total">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageOption.page"
                    :page-sizes="pageOption.pageSizes"
                    :page-size="pageOption.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageOption.total"
                >
                </el-pagination>
            </div>
        </div>
    </e-dialog>
</template>

<script>
import httpApi from '@/api/blog/admin.js'
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        isArray: {
            // 是否只能同时选一张 默认只能选一张
            type: Boolean,
            default: false,
        },
        modal: {
            // 是否需要遮罩
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            imgsList: [],
            pageOption: {
                page: 1,
                limit: 9,
                pageSizes: [9, 15, 20, 30],
                totle: 0,
            },
            selectImgs: [],
        }
    },
    created() {
        this.getImgs()
    },
    methods: {
        confirm() {
            this.$emit('determine', this.selectImgs)
        },
        selectImg(row) {
            if (!this.isArray) {
                this.$set(this.selectImgs, 0, row)
                return
            }
            if (this.selectImgs.findIndex((item) => item._id == row._id) === -1) {
                this.selectImgs.push(row)
            } else {
                this.selectImgs = this.selectImgs.filter((item) => item._id != row._id)
            }
        },
        handleSizeChange(val) {
            this.pageOption.limit = val
            this.getImgs()
        },
        handleCurrentChange(val) {
            this.pageOption.page = val
            this.getImgs()
        },
        getImgs() {
            let { page, limit } = this.pageOption
            let params = {
                page,
                limit,
            }
            httpApi
                .getImgs(params)
                .then((res) => {
                    let { imgs, total } = res?.data || {}

                    this.imgsList = imgs
                    this.pageOption.total = total
                })
                .catch(err=>{
                    this.Toast(err)
                })
        },
        handleClose() {
            this.$emit('input', false)
            this.$emit('close')
        },
    },
}
</script>

<style lang="scss" scoped>
div.imgs-container {
    div.img-flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        img {
            width: 300px;
            height: 180px;
            margin-bottom: 15px;
        }
        .select-img {
            border: 3px solid $primary;
        }
    }
}
</style>
