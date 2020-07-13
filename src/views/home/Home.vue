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
  <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
  <ul>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
    <li>123</li>
  </ul>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

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
    Feature,
    TabControl
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
  /**标题随滚动条悬停样式 */
  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>