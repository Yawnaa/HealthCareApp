import { defineStore } from 'pinia'
import type { LoginResult } from '../types/member'

export const useMemberStore = defineStore('member', {
  state: () => ({
    profile: null as LoginResult | null
  }),
  actions: {
    setProfile(profile: LoginResult) {
      this.profile = profile
    }
  }
}) 