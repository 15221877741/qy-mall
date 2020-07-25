<template>
<div id="home">
  <!-- 标题 -->
  <nav-bar class="home-nav"><p slot="center">购物街</p></nav-bar>

  <tab-control class="tab-control1" :titles="['流行','新款','精选']" @tab-item-click="tabItemClick" ref="tabControl1" :class="{fixed:istabFixed}" v-show="istabFixed"></tab-control><!-- 吸顶占位用的 -->

  <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    :pull-up-load="true"
    @scroll="contenePosition"
    @pullingUp="loadingMore">
    <!-- 轮播图 -->
    <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad"></home-swiper>
    <!-- 导航栏 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!--  -->
    <feature></feature>
    <!-- 流行 新款 精选 -->
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tab-item-click="tabItemClick" ref="tabControl2" :class="{fixed:istabFixed}"></tab-control>
    <!-- 商品展示 -->
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <!-- 要使组件监听点击事件(原生事件)需要.native修饰符 -->
  <back-top @click.native="backTop" v-show="isBtnShow"></back-top>
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
import { debounce } from 'common/util'
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
      currentType: 'pop',
      isBtnShow: false,
      tabOffsetTop: 0, /**tab-control组件的距顶部值 */
      istabFixed: false,
      saveY: 0
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
  mounted() {
    //监听item中图片加载完成  刷新scroll以计算scroll的content的最新高度 使滚动顺滑
    const refresh = debounce(this.$refs.scroll.refresh,200)//注意这里传递的参数[this.$refs.scroll.refresh] 是函数不要加() 加()变成了调用函数了
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })

  },
  /**在点击底部菜单切换router-view时 保持切换原来的位置信息 */
  activated() {
    //路由进入时(活跃时)调用
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //在路由离开时调用
    const y = this.$refs.scroll.scroll.y
    this.saveY = y ? y : 0
  },
  methods: {
    /**
     * 事件相关方法
     */
    swipperImageLoad() {
      // 获取tabControl组件对应元素的offsetTop
      // 所有组件都有$el 用于获取组件对应的dom元素()

      //这里等轮播图组件的图片加载完成执行 以获取实际的准确高度
      // console.log(this.$refs.tabControl.$el.offsetTop)3
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contenePosition(position) {
      //决定置顶按钮是否显示
      this.isBtnShow = -position.y > 1000
      //决定tab-control是否吸顶
      this.istabFixed = (-position.y) > this.tabOffsetTop
    },
    loadingMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
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
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /**在使用浏览器原生滚动时为了使导航不跟随浏览器滚动设置的 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /**标题随滚动条悬停样式  使用scroll组件之后失效了。。*/
  /* .tab-control {
    position: sticky;
    top: 44px;

    z-index: 9;
  } */
  .tab-control1 {
    position: relative;
    z-index: 9;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

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