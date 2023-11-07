import {apiRootUrl, unraidApi} from '../common/base-api'

const basePath = '/network'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export interface ApiNetworkHistoryData {
  Time: string;
  Avg: {
    [index: string]: {
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
    };
  };
}

export const ApiNetwork = {
  getHistory: () => api.get('history').json<ApiNetworkHistoryData[]>(),
  getTick: () => api.get('history/tick').json<ApiNetworkHistoryData>()
}
