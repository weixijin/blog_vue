<template>

        <svg @click="click" class="kl-svg" aria-hidden="true" :width="width" :height="height">
        <use :href="'#icon-' + name"></use>
    </svg>

</template>

<script>
export default {
    props: {
        width:{
           type: String,
           default:'16' 
        },
        height:{
           type: String,
           default:'16' 
        },
        name: {
            type: String,
        },

    },
    methods:{
      click(...args){
          this.$emit('click',...args)
      }
    }
}
</script>

<style lang="scss" scoped>
svg:last-of-type {
    fill: #555;
}
svg:last-of-type:hover {
    fill: #555;
}
</style>
