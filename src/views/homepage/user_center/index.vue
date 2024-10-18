<template>
    <div class="demo">
        <component :is="page"></component>
    </div>
</template>

<script>
import pc from '@/views/homepage/user_center/pc/index.vue'
import mobile from '@/views/homepage/user_center/mobile/index.vue'
export default {
    components: {
        pc,
        mobile,
    },
    computed: {
        page() {
            return this.isPc() ? 'pc' : 'mobile'
        }
    },

}
</script>
