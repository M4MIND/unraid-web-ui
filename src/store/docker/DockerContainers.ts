import { create } from 'zustand'
import { Api } from '../../api/api'
import { DockerContainer } from '../../api/docker/response/Container'
import { BaseApiStore } from '../BaseApiStore'

interface DockerContainersStore extends BaseApiStore {
  data: DockerContainer[];
}

export const useDockerContainersStore = create<DockerContainersStore>(
  set => ({
    data: [],
    loading: true,
    fetch: async () => {
      const data = await Api.docker.getContainers()
      set({ data })
      set({ loading: false })
    }
  })
)
