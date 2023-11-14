import { apiRootUrl, unraidApi } from '../common/base-api'
import { DisksHistory } from './response/DisksHistory'
import { BlockDevicesAll } from './response/BlockDevicesAll'
import { ArrayInfo } from './response/ArrayInfo'

const basePath = '/disks'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export const ApiDisks = {
  getHistory: (): Promise<DisksHistory[]> => api.get('history').json(),
  getArrayInfo: () => api.get('array/info').json<ArrayInfo>(),
  getTick: () => api.get('history/tick').json<DisksHistory>(),
  getLsblk: () => api.get('info/lsblk').json<BlockDevicesAll>()
}
