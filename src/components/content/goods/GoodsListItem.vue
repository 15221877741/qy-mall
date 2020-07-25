<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" @load="imageLoaded"/><!-- 在vue中通过load监听图片加载完成 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoaded() {
      /**
       * 需求是当图片加载完刷新首页的scroll 解决滚动bug
       * 这里需要发布一个事件 
       *  实现思路： 
       *    1 父子组件通信(this.$emit('xxx)) 传递给父组件 父组件在传递给home组件(麻烦)
       *    2 Vuex 改变vuex中的属性  在home中监听vuex中枢性的变化
       *    3 使用vue的事件总先(this.$bus.$emit('xxx)) 在home组件中监听事件总线(this.$bus.$on('xxx))
       *      默认vue获取不到$bus 可以给vue原型附加属性 Vue.prototype.$bus = new Vue()  //new vue()可以当作事件总线
       *   这里采用第三种实现
       */
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
 }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;/**圆角样式 */
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>