export type ProxyType = 'socks' | 'mobile' | 'ChangeIp'
export interface Proxy {
  id: number
  host: string
  port: number
  login: string
  password: string
  type: ProxyType
  changeIpUrl: string
  httpPort: number
}

export interface ProfileInfo {
  id: number
  link: string
  uuid: string
  proxy: Proxy | null
}
export interface Profile {
  profile?: ProfileInfo
  octoInfo: {
    uuid: string
    title: string
    tags: string[]
  }
}
