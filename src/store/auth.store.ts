import { defineStore } from 'pinia'

export interface IAuthData {
  accessToken?: string
  refreshToken?: string
}
export const useAuth = defineStore({
  id: 'auth',
  state: (): IAuthData => {
    return {
      accessToken: '',
      refreshToken: '',
    }
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
  persist: true,
})
