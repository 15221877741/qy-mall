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
    },
    pullUpLoad: {
      type: Boolean,
      default: false
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
      probeType: this.probeType, /**滚动事件 */
      pullUpLoad: this.pullUpLoad /**上拉事件 */
    })
    this.scroll.scrollTo(0,0)
    // 2监听滚动位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })  
    }
    
    // 3监听上拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        console.log('scroll刷新')
        this.scroll && this.scroll.refresh()
      }
    }
 }
</script>

<style scoped>
  .scroll {

  }
</style>