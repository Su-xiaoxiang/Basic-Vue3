import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import UserInfo from '@/views/UserInfo/index.vue'
import { getInfo } from '@/utils/storage'
import { showFailToast } from 'vant'
import NotFound from '@/404.vue' // 注意这里的路径

// 定义路由
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/userInfo',
    component: UserInfo,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/:pathMatch(.*)*', component: NotFound } // 通配符路由的语法变化
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用HTML5的 history 模式
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = getInfo().token // 获取 token

  // 如果目标路由需要身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token === '') {
      // 如果用户未登录且当前路径不是登录页，重定向到登录页
      if (to.path !== '/login') {
        showFailToast('请登录')
        next('/login')
      } else {
        next(false) // 如果已经在登录页，取消导航
      }
    } else {
      // 用户已登录，继续导航
      next()
    }
  } else {
    // 不需要身份验证的路由，继续导航
    next()
  }
})

export default router
