<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-500">
    <header class="mb-6 text-2xl font-semibold  animate-pulse text-transparent bg-gradient-to-r bg-clip-text  from-red-50 via-fuchsia-500 to-green-200">
      灵诺科技工作室服务平台
    </header>
    <div class="bg-white shadow-md md:flex xl:flex">
      <!-- 左侧图片 -->
      <div class="hidden md:block xl:w-1/2 lg:w-1/2 md:w-1/2 ">
        <img src="../../assets/灵诺logo展示图.png" alt="登录图片" class="w-full h-auto" />
      </div>
      <!-- 右侧登录表单 -->
      <div class="flex flex-col justify-center bg-gray-0 p-8 xl:w-1/2 lg:w-1/2 md:w-1/2">
        <div class="mb-4">
          <input type="text" placeholder="请输入用户名" class="w-full p-2 border rounded mb-2" v-model="UserName"/>
          <input type="password" placeholder="请输入密码" class="w-full p-2 border rounded" v-model="PassWord"/>
        </div>
        <button class="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" @click="loginAction">登录</button>
        <span class="text-xl text-pink-500 text-center pointer" @click="router.push('/register')" >没有账号?点击注册</span>
      </div>
    </div>
    <footer class="mt-8 text-gray-0 text-sm text-center">
      版权所有© Copyright 2024-现在 灵诺科技工作室所有 中国·河南省信阳市息县
      信阳师范大学淮河校区 版本V-1.0.0
    </footer>
  </div>
</template>

<style scoped>
/* 可以根据需要添加样式 */
.pointer:hover{
  cursor: pointer;
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { setInfo, getDeviceInfo, getScreenResolution, getInfo } from '@/utils/storage'
import { login } from '@/api/login'
import { ElMessage } from 'element-plus'
import { encryptUserId } from '@/utils/userId.js'
// 使用 ref 创建响应式变量
const UserName = ref('')
const PassWord = ref('')
const deive = ref('')
const screen = ref('')
const rolesid = ref('')
const userInfo = {
  userId: '',
  token: '',
};
// 获取 router 实例
const router = useRouter()
const IsLogin = () => {
  const res = getInfo()
  if (res !== '') {
    if (Number(res.rolesid) === 1) {
      router.push({
        path: '/admin',
      })
    } else {
      router.push({
        path: '/userInfo',
      })
    }
  } else {
    router.push('/')
  }
}
// 获取 store 实例
const loginAction = async () => {
  if (UserName.value === '') {
    ElMessage.error('用户名不能为空')
  } else if (PassWord.value === '') {
    ElMessage.error('密码不能为空')
  } else {
    try {
      deive.value = getDeviceInfo()
      screen.value = getScreenResolution()
      const res = await login(UserName.value, PassWord.value, deive.value, screen.value)
      if (res.code === 200) {
        userInfo.userId = encryptUserId(res.data.userId)
        userInfo.token = res.data.token
        userInfo.rolesid = res.data.rolesid
        setInfo(userInfo)
        rolesid.value = res.data.rolesid
        if (Number(rolesid.value) === 1 || Number(rolesid.value) === 3) {
          router.push({ path: '/admin' })
        } else {
          router.push({ path: '/userInfo' });
        }
      } else {
        ElMessage.error(res.msg)
      }
    } catch (error) {
      ElMessage.error("网络错误")
    }
  }
}
onMounted(IsLogin)
</script>
