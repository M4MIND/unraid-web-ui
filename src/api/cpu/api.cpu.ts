import { apiRootUrl, unraidApi } from '../common/base-api'
import { CpuInfo } from './response/CpuInfo'
import { ApiCpuHistory } from './response/CpuHistory'

const basePath = '/cpu'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})
export const ApiCpu = {
  cpuInfo: (): Promise<CpuInfo> => api.get('info').json<CpuInfo>(),
  history: (): Promise<ApiCpuHistory[]> =>
    api.get('history').json<ApiCpuHistory[]>(),
  tick: () => api.get('history/tick').json<ApiCpuHistory>()
}
