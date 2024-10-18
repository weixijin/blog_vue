<template>
    <div class="left-user-info bg-555 p-t-20 p-l-20 p-r-20">
        <div class="w-80 h-80 b-r-50 o-h">
            <e-image
                class="w-80 h-80 b-r-50"
                :src="parseResourceUrl(userdata.header_img)"
                :lazy="false"
                :title="userdata.username"
            ></e-image>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        ...Vuex.mapState(['userdata'])
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
