import { apiRootUrl, unraidApi } from '../common/base-api'
import { Stats } from './respone/Stats'

const basePath = '/memory'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export const ApiMemory = {
  getHistory: () => api.get('history').json<Stats[]>(),
  getTick: () => api.get('tick').json<Stats>()
}
