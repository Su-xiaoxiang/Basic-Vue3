import request from '@/utils/request'
// 获取用户登录信息传递给后端
export const login = (username, password,device,screenName) => {
  return request.post('/login', {
    username,
    password,
    device,
    screenName,
  })
}
// 登录校验
export const loginAction =() => {
  return request.post('/UserLoginAuthentication')
}
