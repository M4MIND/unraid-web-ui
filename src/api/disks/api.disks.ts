import {apiRootUrl, unraidApi} from '../common/base-api'
import {DisksHistory} from './response/DisksHistory'

const basePath = '/disks'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export const ApiDisks = {
  getHistory: (): Promise<DisksHistory[]> => api.get('history').json(),
  getTick: () => api.get('history/tick').json<DisksHistory>()
}
