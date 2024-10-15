import request from '@/utils/request'
import { getInfo } from '@/utils/storage'
// 获取用户登录信息传递给后端
export const getUserInfoForm = (userId) => {
  return request.get('/getUserInfo', {
    params: {
      userId
    }
  })
}
