import { defineStore } from 'pinia'

export interface IAuthData {
  accessToken?: string
  refreshToken?: string
}
export const useAuth = defineStore('auth', {
  state(): IAuthData {
    return {}
  },
  actions: {
    changeToken(data: IAuthData) {
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken
    },
    reset() {
      this.accessToken = undefined
    },
    refresh() {},
  },
})
