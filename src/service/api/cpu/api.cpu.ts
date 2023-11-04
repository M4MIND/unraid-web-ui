import { Api } from "../api";
import { Axios, AxiosResponse } from "axios";

const basePath = "/cpu";

interface ApiCpuDataAvg {
  [index: string | "cpu"]: {
    [index: string]: number;
    guest: number;
    guestnice: number;
    idle: number;
    iowait: number;
    irq: number;
    nice: number;
    softirq: number;
    steal: number;
    system: number;
    total: number;
    user: number;
  };
}
export interface ApiCpuData {
  Avg: ApiCpuDataAvg;
  Time: string;
}

export const ApiCpu = {
  History: async (): Promise<AxiosResponse<ApiCpuData[]>> => {
    return await Api.get<ApiCpuData[]>(`${basePath}/history`);
  },
  Tick: async () => {
    return await Api.get<ApiCpuData>(`${basePath}/history/tick`);
  },
};
