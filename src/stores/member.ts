import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义用户信息接口
export interface UserInfo {
  avatar: string
  name: string
  doctorName: string
  healthInfo: {
    height: number
    weight: number
    bloodType: string
    allergies: string[]
  }
}

// 定义 store
export const useMemberStore = defineStore('member', {
  state: () => ({
    userInfo: ref<UserInfo>({
      avatar: '/static/images/default-avatar.png',
      name: '张三',
      doctorName: '李医生',
      healthInfo: {
        height: 170,
        weight: 65,
        bloodType: 'A型',
        allergies: ['花粉', '海鲜'],
      },
    }),
  }),

  actions: {
    // 更新用户信息
    updateUserInfo(info: Partial<UserInfo>) {
      this.userInfo = {
        ...this.userInfo,
        ...info,
      }
    },

    // 更新头像
    updateAvatar(avatar: string) {
      this.userInfo.avatar = avatar
    },

    // 更新健康信息
    updateHealthInfo(info: Partial<UserInfo['healthInfo']>) {
      this.userInfo.healthInfo = {
        ...this.userInfo.healthInfo,
        ...info,
      }
    },
  },

  // 开启数据持久化
  persist: {
    storage: {
      getItem: (key: string) => {
        return uni.getStorageSync(key)
      },
      setItem: (key: string, value: string) => {
        uni.setStorageSync(key, value)
      },
    },
  },
})
