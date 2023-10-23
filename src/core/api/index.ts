import axios from 'axios'
import { useAuth } from '@store/auth.store'
import { TokenPair } from '@models/token-pair.ts'
import { Statistics } from '@models/statistics.ts'
import { Task } from '@models/task.ts'

export const baseURL = 'http://77.91.122.158:8080/'
export const axiosInstance = axios.create({
  baseURL: baseURL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth().accessToken

  if (token) config.headers.setAuthorization('Bearer ' + token)

  return config
})

export const loginRequest = (login: string, password: string) => {
  return axiosInstance.post<TokenPair>('users/login', {
    login,
    password,
  })
}

export const getStatistics = (row: number) => {
  return axiosInstance.post<Statistics[]>('/statistics', {
    row,
  })
}

export const updateById = (
  id: number,
  startDate?: string,
  endDate?: string,
) => {
  return axiosInstance.put<Task>('/statistics/update', {
    id,
    startDate,
    endDate,
  })
}

export const loadTasks = (tasks: string[]) => {
  return axiosInstance.post<Task[]>('/tasks', {
    uuids: tasks,
  })
}

export const resetProxy = (
  proxyId: number,
  type: 'softReset' | 'hardReset',
) => {
  return axiosInstance.post('/proxy/reset', {
    proxyId,
    type,
  })
}

export const checkIp = (proxyId: number) => {
  return axiosInstance.get('/proxy/check/' + proxyId)
}

export const changeStatusRequest = (
  profileId: number,
  name: string,
  status: 'active' | 'stopped',
) => {
  return axiosInstance.put('statistics/changeStatus', {
    id: profileId,
    profileName: name,
    profileStatus: status,
  })
}
