<template>
<div class="tab-bar-item" @click="itemClick">
  <div v-if="!isActive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <!-- 插槽将来会被父组件中的内容替换  所以给文字插槽包上div  动态切换文字颜色样式 -->
  <div :style="activeStyle"><slot name="item-text"></slot></div>
</div>

</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive(){
      /**使用计算属性来判断当前处于活跃状态的route(被点击显示的tab-bar-item)的路径 和从外部传入的路径是否相同  达到只有被点击的组件改变颜色 */
      // console.log('this.$route.path ==>',this.$route.path,'this.path ==> ',this.path)
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
  }

</style>