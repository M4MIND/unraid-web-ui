import { Api } from "../api";

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
const ApiNetwork = {
  GetHistory: async () => {
    return await Api.get<ApiNetworkHistoryData[]>("/network/history");
  },
  GetTick: async () => {
    return await Api.get<ApiNetworkHistoryData>("/network/history/tick");
  },
};
export default ApiNetwork;
