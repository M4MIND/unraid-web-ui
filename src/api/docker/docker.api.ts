import {apiRootUrl, unraidApi} from '../common/base-api'
import {DockerContainer} from './response/Container'

const basePath = '/docker'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export const ApiDocker = {
  getContainers: (): Promise<DockerContainer[]> => api.get('containers').json(),
  updateContainer: (id: string): Promise<DockerContainer> => api.put(`containers/${id}`).json()
}
