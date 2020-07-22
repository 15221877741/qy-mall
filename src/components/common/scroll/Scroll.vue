<template>
<!-- 滚动组件 -->
  <!-- ref/children 用在子组件中 用以获取 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象 
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType
    })
    this.scroll.scrollTo(0,0)

    // 2监听滚动位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
  },
  methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
 }
</script>

<style scoped>
  .scroll {

  }
</style>