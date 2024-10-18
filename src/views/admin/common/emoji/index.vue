<template>
    <div class="emoji">
        <kl-tab v-model="activeName" :options="tabOptions" @change="changeCom" />
        <div class="main">
            <div class="item" v-for="item in emojiList" :key="item._id">
                <img class="item-emoji" :src="emojiBasePath + item.emoji_url" alt="" />
                <el-switch
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    v-model="item.emoji_isshow"
                    @change="changeEmoji(item)"
                ></el-switch>
                <el-tag size="mini" type="danger" @click="deleteEmoji(item)">删除</el-tag>
            </div>
            <i v-for="item in 10" :key="item"></i>
        </div>
    </div>
</template>

<script>
import adminApi from '@/api/blog/admin.js'
export default {
    components: {},
    data() {
        return {
            activeName: 'wxj0',
            tabOptions: [],
            emojiList: [],
            activeIndexEmojiClass: 0,
        }
    },
    created() {
        this.getInit()
    },
    methods: {
        // 修改emoji
        changeEmoji(row) {
            let { _id, emoji_isshow } = row
            adminApi
                .putEmoji({ _id, emoji_isshow })
                .then((res) => {
                    this.$message.success(res.msg)
                })
                .catch((_) => {
                    row.emoji_isshow = !row.emoji_isshow
                })
        },
        // 删除emoji
        deleteEmoji(row) {
            this.$confirm('确定删除吗')
                .then((_) => {
                    adminApi.delEmoji({ _id: row._id }).then((res) => {
                        this.$message.success(res.msg)
                        this.getEmojis()
                    })
                })
                .catch((_) => {
                    // console.log('cancel')
                })
        },
        // 获取默认的列表数据
        async getInit() {
            let res = await this.$apis.get_emoji_class({
                cache:true
            })
            if(!this.isArrayLength(res?.data)){
                this.Toast('get_emoji_class获取数据格式错误')
                return
            }
            this.tabOptions = res.data.map((item, index) => {
                return {
                    value: 'wxj' + index,
                    label: item.emoji_class_fater_type_name,
                }
            })

            this.emojiClassList = res?.data || []
            this.getEmojis()
        },
        async getEmojis() {
            // 获取数据
            let res = await this.$apis.get_emojis({
                emoji_class_id: this.emojiClassList[this.activeIndexEmojiClass]._id,
                expire_time:-1
                
            })
            this.emojiList = res?.data || []
            if (this.emojiList.length === 0) {
                this.$message.warning('当前分类下没有数据')
            }
        },
        changeCom(value) {
            this.activeIndexEmojiClass = this.tabOptions.findIndex((item) => item.value === value)
            this.getEmojis()
        },
    },
}
</script>

<style lang="scss" scoped>
.main {
    padding-top: 15px;
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        height: 50px;
        width: 150px;
        box-shadow: 0 0 10px #ccc;
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
        .item-emoji {
            width: 23px;
            height: 23px;
        }
        .el-tag {
            cursor: pointer;
        }
    }
}

.main > i {
    width: 150px;
    margin-right: 10px;
}
</style>
