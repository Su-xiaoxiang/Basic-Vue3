<template>
  <div>
    <span class="text-2xl text-blue-400 font-bold text-center">
      <slot name="HeaderName"></slot>
    </span>
    <el-input
      placeholder="请输入您的值"
      v-model="localInfo"
      :disabled="false">
    </el-input>
  </div>
</template>

<script setup>
const localInfo = defineModel()
</script>

<style scoped>

</style>
