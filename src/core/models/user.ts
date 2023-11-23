export interface User {
  login: string
  id: number
  tag: string
  role: 'admin' | 'media' | 'mediaSupport'
}

export type CreateUser = User & {
  password: string
}

export type UpdateUser = Partial<User> & {
  id: number
}
