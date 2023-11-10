import {apiRootUrl, unraidApi} from '../common/base-api'
import {Mdcmdstats} from './response/Mdcmdstats'

const basePath = '/raid'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export const ApiRaid = {
  getMdcmdStat: () => api.get('mdcmdstat').json<Mdcmdstats>()
}
