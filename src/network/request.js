/** 封装第三方请求 这里是指axios */
import axios from 'axios'
import {baseURL} from 'common'

//instance本身就是一个promise
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 3000
  })

  // 2.axios拦截器
  instance.interceptors.request.use(config => {
    // console.log(config)
    // config.url = '/home/multidata'
    /** 这里需要将拦截到的请求的config返回  不然在请求的时候获取不到config */
    return config
  },err => {
    // console.log(err)
    return err
  })

  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  },err => {
    // console.log(err)
    return err
  })

  // 3.发送请求
  return instance(config)
}

// 使用promise封装请求
// export function request(config) {
//   return new Promise((resolve,reject) => {
//     const instance = axios.create({
//       baseURL: baseURL,
//       timeout: 3000
//     })

//     //发送请求
//     instance(config).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

// consig: 请求的配置信息  success 和 failure 两个回调函数
// export function request(config,success,failure) {
//   const instance = axios.create({
//     baseURL: baseURL,
//     timeout: 3000
//   })

//   //发送网络请求
//   instance(config).then(res => {
//     success(res)
//   }).catch(res => {
//     failure(res)
//   })
// }