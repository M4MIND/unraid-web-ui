import {apiRootUrl, unraidApi} from '../common/base-api'

const basePath = '/network'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export interface NetworkData {
  [index: string]: InterfaceState;
}

interface InterfaceState {
  rxbytes: number;
  rxcompr: number;
  rxdrop: number;
  rxerrs: number;
  rxfifo: number;
  rxframe: number;
  rxmulti: number;
  rxpkts: number;
  txbytes: number;
  txcarr: number;
  txcolls: number;
  txcompr: number;
  txdrop: number;
  txerrs: number;
  txfifo: number;
  txpkts: number;
}

export const ApiNetwork = {
  getHistory: async () => api.get('history').json<NetworkData[]>()
}
