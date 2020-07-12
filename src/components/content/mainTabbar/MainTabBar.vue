<template>
  <tab-bar>
      <tab-bar-item path='/home' activeColor='blue'><!-- 给组件属性path传值 因为不是变量 不用加:(绑定写法) -->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" /><!-- 在webpack中定义了别名 在dom中使用别名时前面+上'~' -->
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category' activeColor='#f622f6'>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart'>
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>