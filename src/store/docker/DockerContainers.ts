import { create } from 'zustand'
import { Api } from '../../../../api/api'
import {DockerContainer} from '../../../../api/docker/response/Container'

interface DockerContainersStore {
  data: DockerContainer[];
  fetch: () => void;
}

export const useDockerContainersStore = create<DockerContainersStore>(set => ({
  data: [],
  fetch: async () => {
    const data = await Api.docker.getContainers()
    set({data})
  }
}))
