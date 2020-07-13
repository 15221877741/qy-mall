<template>
<div id="home">
  <!-- 标题 -->
  <nav-bar class="home-nav"><p slot="center">购物街</p></nav-bar>
  <!-- 轮播图 -->
  <home-swiper :banners="banners"></home-swiper>
  <!-- 导航栏 -->
  <recommend-view :recommends="recommends"></recommend-view>
  <!--  -->
  <feature></feature>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './chilComps/HomeSwiper'
import RecommendView from './chilComps/RecommendView'
import Feature from './chilComps/FeatureView'

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
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature
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
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>