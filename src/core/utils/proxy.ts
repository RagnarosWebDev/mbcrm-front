import { Proxy } from '@models/profile.ts'

export const castProxyToString = (proxy?: Proxy | null) => {
  if (!proxy) {
    return 'Прокси нет'
  }
  return (
    proxy.login + ':' + proxy.password + '@' + proxy.host + ':' + proxy.port
  )
}
