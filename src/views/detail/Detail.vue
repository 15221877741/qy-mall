<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar'
import DetailSwiper from './detailComps/DetailSwiper'
import DetailBaseInfo from './detailComps/DetailBaseInfo'
import DetailShopInfo from './detailComps/DetailShopInfo'
import DetailGoodsInfo from './detailComps/DetailGoodsInfo'
import DetailParamInfo from './detailComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
export default {
  name: 'Detail',
  data() { 
    return {
      iid: null,
      //轮播图
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据 idd 请求数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })

  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
 }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>