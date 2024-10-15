import axios from 'axios'
import {showLoadingToast,showFailToast,closeToast} from 'vant'
import { getInfo, removeInfo } from '@/utils/storage.js'
import router from '@/router/index.js'
import { showDialog } from 'vant';
const instance = axios.create({
  //baseURL: 'http://47.120.63.101:8080',
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  withCredentials: false,
})

// 请求拦截器
instance.interceptors.request.use( function (config) {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 1
  })

  const token =getInfo().token
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
  // 如果有响应错误，获取错误状态码
  if (error.response) {
    const status = error.response.status;
    // 根据状态码处理逻辑
    if (status === 401) {
      // 未授权，提示用户重新登录
      showDialog({
        message: '你的账号在别的设备登录',
        theme: 'round-button',
      }).then(() => {
        removeInfo()
        router.push('/login')
      });
    } else {
      // 其他错误
      showDialog({
        message: '请求失败',
        theme: 'round-button',
      }).then(() => {
        removeInfo()
        router.push('/login')
      });
    }
  } else {
    showDialog({
      message: '网络错误，请检查网络',
      theme: 'round-button',
    }).then(() => {
      removeInfo()
      router.push('/login')
    });
  }

  return Promise.reject(error)
})

export default instance
