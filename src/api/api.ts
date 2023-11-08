import { ApiCpu } from './cpu/api.cpu'
import { ApiDisks } from './disks/api.disks'
import { ApiDocker } from './docker/docker.api'
import { ApiMemory } from './memory/memory.api'
import { ApiNetwork } from './network/network.api'

export const Api = {
  cpu: ApiCpu,
  disks: ApiDisks,
  docker: ApiDocker,
  memory: ApiMemory,
  network: ApiNetwork
}
