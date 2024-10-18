<template>
    <div class="defaultFormCom">
        <kl-input min="1" max='10' v-model="val" type="number"></kl-input>
        <br>
        {{val}}

     
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            val: '',
        }
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
