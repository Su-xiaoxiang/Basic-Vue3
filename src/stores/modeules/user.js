// src/store/userStore.js
import { defineStore } from 'pinia'
import { getInfo, setInfo, removeInfo } from '@/utils/storage'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userInfo: getInfo(),
  }),
  getters: {
    token: (state) => state.userInfo.token,
  },
  actions: {
    setUserInfo(obj) {
      this.userInfo = obj
      setInfo(obj)
    },
    logout() {
      this.setUserInfo({ token: '', userId: '' })
      removeInfo()
    },
  },
})
