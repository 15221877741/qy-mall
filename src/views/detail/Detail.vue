<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar'
import DetailSwiper from './detailComps/DetailSwiper'
import DetailBaseInfo from './detailComps/DetailBaseInfo'

import {getDetail, Goods} from 'network/detail'
export default {
  name: 'Detail',
  data() { 
    return {
      iid: null,
      //轮播图
      topImages: [],
      goods: {}
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
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  }
 }
</script>

<style scoped>
  .detail {

  }
</style>