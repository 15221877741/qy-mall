<template>
  <div class="detail">
    详情页{{iid}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() { 
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.iid
  }
 }
</script>

<style scoped>
  .detail {

  }
</style>