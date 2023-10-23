import { AxiosResponse } from 'axios'
import { useToast } from 'vue-toastification'

export const handleRequest = <T>(
  a: Promise<AxiosResponse<T>>,
  callback: (data: T) => void,
  badCallback?: () => void,
) => {
  a.then((e) => {
    callback(e.data)
  }).catch((e) => {
    useToast().error(e.response.data.message)
    if (badCallback) badCallback()
  })
}
