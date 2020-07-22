<template>
<div id="home">
  <!-- 标题 -->
  <nav-bar class="home-nav"><p slot="center">购物街</p></nav-bar>

  <scroll class="content" ref="scroll">
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 导航栏 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!--  -->
    <feature></feature>
    <!-- 流行 新款 精选 -->
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tab-item-click="tabItemClick"></tab-control>
    <!-- 商品展示 -->
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <!-- 要使组件监听点击事件(原生事件)需要.native修饰符 -->
  <back-top @click.native="backTop"></back-top>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

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
      },
      currentType: 'pop'
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
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

    /**
     * 事件相关方法
     */
    tabItemClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },

    /**
     * 网络请求相关方法
     */
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
    /* padding-top: 44px; */
    /**适口 */
    height: 100vh;
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
  /**标题随滚动条悬停样式  使用scroll组件之后失效了。。*/
  .tab-control {
    position: sticky;
    top: 44px;

    z-index: 9;
  }

  .content {
    /* height: 200px; */
    overflow: hidden;
    position: absolute;/**使用绝对定位 上下顶出位置为表一和菜单高度 */
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  /* .content {
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>