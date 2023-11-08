import { apiRootUrl, unraidApi } from '../common/base-api'
import { CpuInfo } from './response/CpuInfo'
import { ApiCpuHistory } from './response/CpuHistory'

const basePath = '/cpu'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})
export const ApiCpu = {
  getCpuInfo: (): Promise<CpuInfo[]> => api.get('info').json(),
  getHistory: (): Promise<ApiCpuHistory[]> => api.get('history').json<ApiCpuHistory[]>(),
  getTick: () => api.get('history/tick').json<ApiCpuHistory>()
}
