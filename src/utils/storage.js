// 约定一个通用的键名
const INFO_KEY = 'SXX'

// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const cookies = document.cookie.split('; ').find(row => row.startsWith(INFO_KEY + '='))
  return cookies ? JSON.parse(cookies.split('=')[1]) : defaultObj
}

// 设置个人信息
export const setInfo = (obj) => {
  const expiryDate = new Date()
  expiryDate.setHours(expiryDate.getHours() + 1) // 设置1小时后过期
  document.cookie = `${INFO_KEY}=${JSON.stringify(obj)}; expires=${expiryDate.toUTCString()}; path=/`
}

// 移除个人信息
export const removeInfo = () => {
  document.cookie = `${INFO_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
