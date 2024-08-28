import request from '@/utils/request'
// 获取用户登录信息传递给后端
export const login = (stuUserName, password) => {
  return request.post('/login', {
    stuUserName,
    password
  })
}
