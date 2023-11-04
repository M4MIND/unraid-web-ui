import { Api } from "../api";

const basePath = "/disks";

export interface ApiDisksHistoryData {
  Time: string;
  Avg: {
    major: number;
    minor: number;
    name: string;
    readios: number;
    readmerges: number;
    readbytes: number;
    writeios: number;
    writemerges: number;
    writebytes: number;
    inflight: number;
    ioticks: number;
    timeinqueue: number;
  }[];
}

const ApiDisks = {
  GetHistory: async () => {
    return await Api.get<ApiDisksHistoryData[]>(`${basePath}/history`);
  },
  GetTick: async () => {
    return await Api.get<ApiDisksHistoryData>(`${basePath}/history/tick`);
  },
};

export default ApiDisks;
