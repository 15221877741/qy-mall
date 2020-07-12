<template>
<div>
  <nav-bar class="home-nav">
    <p slot="center">购物车</p>
  </nav-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata } from "network/home";
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar
  },
  created() {
    // 请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      console.log(res)
    })
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>