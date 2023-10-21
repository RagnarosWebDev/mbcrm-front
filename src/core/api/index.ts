import axios from 'axios'
import { useAuth } from '@store/auth.store'

export const baseURL = ''
export const refreshTokenUrl = ''

export const axiosInstance = axios.create({
  baseURL: baseURL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth().accessToken

  if (token) config.headers.setAuthorization(token)

  return config
})

axiosInstance.interceptors.response.use(
  (e) => {
    return e
  },
  async (error) => {
    const originalRequest = error.config

    originalRequest.headers = JSON.parse(
      JSON.stringify(originalRequest.headers || {}),
    )

    const refreshToken = useAuth().refreshToken

    if (
      refreshToken &&
      error.response?.status === 401 &&
      error.response.data.message === 'TokenExpiredError' &&
      originalRequest?.url !== refreshTokenUrl
    ) {
      const request = await
    }

    return Promise.reject(error)
  },
)
