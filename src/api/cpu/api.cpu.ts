import { apiRootUrl, unraidApi } from '../common/base-api'
import { CpuInfo } from './response/CpuInfo'
import { ApiCpuHistory } from './response/CpuHistory'

const basePath = '/cpu'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})
export const ApiCpu = {
  getCpuInfo: (): Promise<InfoStat[]> => api.get('info').json(),
  getHistory: (): Promise<ApiCpuData[]> => api.get('history').json<ApiCpuData[]>(),
  getTick: () => api.get('history/tick').json<ApiCpuData>()
}
