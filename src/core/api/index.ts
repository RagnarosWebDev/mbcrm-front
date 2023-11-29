import axios from 'axios'
import { useAuth } from '@store/auth.store'
import { TokenPair } from '@models/token-pair.ts'
import { Statistics } from '@models/statistics.ts'
import { Task } from '@models/task.ts'
import { ProfileInfo } from '@models/profile.ts'
import { CreateUser, UpdateUser } from '@models/user.ts'
import { StatInfo } from '@models/stat-info.ts'

export const baseURL = 'http://77.91.122.158:8080/'
//export const baseURL = 'http://localhost:4000/'

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

export const updateById = (id: number) => {
  return axiosInstance.put<Task>('/statistics/update', {
    id,
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

export const userInfo = () => {
  return axiosInstance.post('/users/info')
}

export const getUsers = (row: number) => {
  return axiosInstance.post('/users', {
    row,
  })
}

export const getProfile = (row: number) => {
  return axiosInstance.post('/profiles', {
    row,
  })
}

export const createProfile = (profileInfo: ProfileInfo) => {
  return axiosInstance.post('/profiles/create', {
    ...profileInfo,
  })
}

export const updateUserInfo = (dto: UpdateUser) => {
  return axiosInstance.put('/users/edit', {
    ...dto,
  })
}

export const createUserRequest = (dto: CreateUser) => {
  return axiosInstance.post('/users/register', {
    ...dto,
  })
}

export const updateProfile = (dto: ProfileInfo) => {
  return axiosInstance.put('/profiles/update', {
    ...dto,
  })
}

export const createdProfiles = (row: number, tag?: string) => {
  return axiosInstance.post('/profiles/created', {
    row,
    tag,
  })
}

export const getProxies = (row: number) => {
  return axiosInstance.post('/proxy', {
    row,
  })
}

export const changeProxyRequest = (profileId: number, proxyId?: number) => {
  return axiosInstance.put('/profiles/changeProxy', {
    id: profileId,
    proxyId,
  })
}
export const deleteUser = (userId: number) => {
  return axiosInstance.delete('/users/delete/' + userId)
}

export const getAllStatInfo = (row: number) => {
  return axios.post('http://77.91.122.158:88/stat', {
    row: row,
  })
}

export const updateStat = (stat: StatInfo) => {
  return axios.post('http://77.91.122.158:88/stat/changesState', {
    isShowed: stat.isCheck,
    ...stat,
  })
}

export type CreateStatInfo = Omit<StatInfo, 'id'>
export const createStat = (stat: CreateStatInfo) => {
  return axios.post('http://77.91.122.158:88/stat/createStatInfo', {
    isShow: stat.isCheck,
    ...stat,
  })
}
