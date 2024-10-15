import { decryptUserId } from '@/utils/userId.js'
// 约定一个通用的键名
const INFO_KEY = 'LingNuo'

// 设置个人信息
export const setInfo = (obj) => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 59); // 设置1小时后过期
  const dataToStore = encodeURIComponent(JSON.stringify(obj));
  document.cookie = `${INFO_KEY}=${dataToStore}; expires=${expiryDate.toUTCString()}; path=/`;
}

// 获取个人信息
export  function getInfo() {
  const defaultObj = { token: '', userId: '' };

  const cookies = document.cookie.split('; ').find(row => row.startsWith(INFO_KEY + '='));

  if (cookies) {
    try {
      const cookieValue = decodeURIComponent(cookies.split('=')[1]);
      const parsedData = JSON.parse(cookieValue);

      if (parsedData.userId) {
        parsedData.userId = decryptUserId(parsedData.userId);
      }

      return parsedData;
    } catch (error) {
      console.error('解析 Cookie 时出错:', error);
      return defaultObj;
    }
  } else {
    return defaultObj;
  }
}

// 移除个人信息
export const removeInfo = () => {
  document.cookie = `${INFO_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
// 获取浏览器和操作系统信息
export const getDeviceInfo = () => {
  return navigator.userAgent;
};
// 换取屏幕分辨率
export const getScreenResolution = () => {
  const width = window.screen.width;
  const height = window.screen.height;
  return `${width}x${height}`;
};
