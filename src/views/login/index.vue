<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <header class="mb-6 text-2xl font-semibold text-blue-600">
      班级教学综合信息服务平台
    </header>
    <div class="bg-white shadow-md md:flex xl:flex">
      <!-- 左侧图片 -->
      <div class="hidden md:block xl:w-1/2 lg:w-1/2 md:w-1/2">
        <img src="@/assets/1.webp" alt="登录图片" class="w-full h-auto" />
      </div>
      <!-- 右侧登录表单 -->
      <div class="flex flex-col justify-center bg-gray-300 p-8 xl:w-1/2 lg:w-1/2 md:w-1/2">
        <div class="mb-4">
          <input type="text" placeholder="请输入用户名" class="w-full p-2 border rounded mb-2" v-model="stuUserName"/>
          <input type="password" placeholder="请输入密码" class="w-full p-2 border rounded" v-model="password"/>
        </div>
        <button class="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" @click="loginAction">登录</button>
      </div>
    </div>
    <footer class="mt-8 text-gray-500 text-sm">
      版权所有© Copyright 2024-2024 Couder-Su所有 中国·河南省信阳市息县
      信阳师范大学淮河校区 版本V-1.0.0
    </footer>
  </div>
</template>

<style scoped>
/* 可以根据需要添加样式 */
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setInfo } from '@/utils/storage'
import { login } from '@/api/login'
import { ElMessage } from 'element-plus'

// 使用 ref 创建响应式变量
const stuUserName = ref('')
const password = ref('')

// 获取 router 实例
const router = useRouter()

// 获取 store 实例
const loginAction = async () => {
  if (stuUserName.value === '') {
    ElMessage.error('用户名不能为空')
  } else if (password.value === '') {
    ElMessage.error('密码不能为空')
  } else {
    try {
      const res = await login(stuUserName.value, password.value)
      console.log('Login Response:', res)
      if (res.code === 200) {
        setInfo(res.data)
        router.push({
          path: '/userInfo',
          query: {
            t_lange: 'ZH-CN',
            Corder: 'Su_xiaoxiang'
          }
        })
      } else {
        ElMessage.error(res.msg)
      }
    } catch (error) {
      ElMessage.error("网络错误")
    }
  }
}

</script>
