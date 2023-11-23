export interface Statistics {
  id: number
  uuid: string
  title: string
  description: string
  tags: string[]
  proxy?: {
    id: number
    changeIpUrl: string
    host: string
    port: number
    login: string
    password: string
  }
  info?: Map<string, StatisticsInfo[]>
}
export type StatisticsInfoStatus = 'enabled' | 'disabled' | 'none'
export interface StatisticsInfo {
  name: string
  budget: string
  conversion: string
  clicks: string
  averageClicksPrice: string
  ctr: string
  views: string
  expenses: string
  status: StatisticsInfoStatus
}
