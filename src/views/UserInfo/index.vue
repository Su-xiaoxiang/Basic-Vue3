<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center w-full h-full">
    <header class="w-full h-28 flex flex-col">
      <div class="bg-blue-400 w-full h-2/3 text-xl sm:text-2xl text-white text-left pl-8 pt-5 font-semibold flex justify-between md:text-3xl">
        <span class="overflow-hidden">班级教学综合信息服务平台</span>
        <div class="hidden md:block ml-auto mr-2 -mt-2">
          <el-button type="info" @click="drawer = true">个人信息</el-button>
          <el-drawer
            title="个人信息"
            v-model="drawer"
            :with-header="true">
            <XInXiFromFalse v-model:modelValue="stuId">
              <template v-slot:HeaderName>学号</template>
            </XInXiFromFalse>
            <XInXiFromFalse v-model:modelValue="stuUsername">
              <template v-slot:HeaderName>姓名</template>
            </XInXiFromFalse>
            <XInXiFromFalse v-model="Class">
              <template v-slot:HeaderName>班级</template>
            </XInXiFromFalse>
            <XinXiFromTrue v-model="Phone">
              <template v-slot:HeaderName>电话号码</template>
            </XinXiFromTrue>
          </el-drawer>
        </div>
        <div class="block md:hidden ml-auto mr-2 -mt-2">

        </div>
      </div>
      <div class="hidden bg-cyan-50 w-full h-1/3 md:block"></div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getInfo } from '@/utils/storage'
import XInXiFromFalse from '@/components/XInXiFromFalse.vue'
import XinXiFromTrue from '@/components/XinXiFromTrue.vue'
import { getUserInfoForm } from '@/api/UserInfoForm'

// 定义响应式变量
const drawer = ref(false)
const stuId = ref('')
const stuUsername = ref('')
const Phone = ref('')
const Class = ref('')


// 获取用户信息
const fetchUserInfo = async () => {
  try {
    stuId.value = getInfo().userId
    const res = await getUserInfoForm(stuId.value)
    if (res.code === 200) {
      stuUsername.value = res.data.username
      Phone.value = res.data.Phone
      Class.value = res.data.ClassName
    } else {
      ElMessage.error('无法获取用户信息')
    }
  } catch (error) {
    ElMessage.error('网络错误')
  }
}

// 在组件挂载时获取用户信息
onMounted(fetchUserInfo)
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: pink;
  font-size: 40px;
}
</style>
