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
  <!-- 流行 新款 精选 -->
  <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
  <!-- 商品展示 -->
  <goods-list :goods="goods['pop'].list"></goods-list>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './chilComps/HomeSwiper'
import RecommendView from './chilComps/RecommendView'
import Feature from './chilComps/FeatureView'

import { getHomeMultidata,getHomeGoods } from "network/home";
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        console.log(res)
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page +1
      getHomeGoods(type,page).then(res => {
        // console.log(res)
        this.goods[type].page += 1
        this.goods[type].list.push(...res.data.list)
      })
    }
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

    z-index: 9;
  }
</style>