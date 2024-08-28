import axios from 'axios'
import {showLoadingToast,showFailToast,closeToast} from 'vant'
import { useUserStore } from '@/stores/modeules/user.js' // 使用 Pinia 的用户状态存储

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  withCredentials: false
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })

  // 获取 Pinia 的 store 实例
  const userStore = useUserStore()
  const token = userStore.token // 从 Pinia 中获取 token

  if (token !== '') {
    config.headers['Authorization-Token'] = token
  }
  return config
}, function (error) {
  closeToast()
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  const res = response.data
  if (res.code !== 200) {
    showFailToast(res.msg)
  } else {
    closeToast()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
