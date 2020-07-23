//防抖函数  func需要被防抖的函数  delay等待时间
export function debounce(func,delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}