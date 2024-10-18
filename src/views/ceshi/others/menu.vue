<template>
    <div class="demo">
        <h2 class="flex-center-wrap">menu</h2>
        <kl-menu :active="activeName" :navOptions="navOptions" @change="changeCom" />

        <h2 class="flex-center-wrap">kl-steps</h2>
        <kl-steps :active="activeStep">
            <kl-step title="步骤 1">
                <p class="f-14">步骤 1 --补充 步骤 1 --补充步骤 1 --补充</p></kl-step
            >
            <kl-step title="步骤 2"> 步骤 2 --补充 </kl-step>
            <kl-step title="步骤 3"> 步骤 3 --补充 </kl-step>
        </kl-steps>
        <div>
            <el-button @click="handleActive(1)"> 上一步 </el-button>
            <el-button @click="handleActive(0)"> 下一步 </el-button>
        </div>
        <el-button @click="postBtn"> 输出emoji </el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            myText: '',
            activeStep: 1,
            activeName: 'menu1',
            navOptions: [
                {
                    value: 'menu1',
                    name: 'menu1横向nav',
                },
                {
                    value: 'menu2',
                    name: 'menu2横向nav',
                },
                {
                    value: 'menu3',
                    name: 'menu3横向nav',
                },
            ],
        }
    },
    methods: {
        postBtn() {
            // console.log(this.myText)
        },
        onInput(event) {
            this.myText = event.data
        },
        clearTextarea() {
            this.$refs.emoji.clear()
        },
        handleActive(type) {
            if (type) {
                this.activeStep -= 1
                return
            }
            this.activeStep += 1
        },
        changeCom(val) {
            this.activeName = val
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    font-size: 16px;
}
::v-deep {
    .emoji-wysiwyg-editor {
        font-size: 24px;
        color: #444;
        padding: 10px;
    }
}

h2 {
    height: 60px;
    font-size: 20px;
}
.f-14 {
    font-size: 12px;
}
</style>
