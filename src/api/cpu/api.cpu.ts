import {apiRootUrl, unraidApi} from '../common/base-api'

const basePath = '/cpu'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export interface CpuUtilization {
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
}

export interface CpuData {
  avg: { [index: string]: CpuUtilization };
}

interface ApiCpuDataAvg {
  [index: string | 'cpu']: {
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
  average: ApiCpuDataAvg;
  time: string;
}

export interface InfoStat {
  cpu: number;
  vendorId: string;
  family: string;
  model: string;
  stepping: number;
  physicalId: string;
  coreId: string;
  cores: number;
  modelName: string;
  mhz: number;
  cacheSize: number;
  flags: string[];
  microcode: string;
}

export const ApiCpu = {
  getCpuInfo: (): Promise<InfoStat[]> => api.get('info').json(),
  getHistory: (): Promise<ApiCpuData[]> => api.get('history').json<ApiCpuData[]>(),
  getTick: () => api.get('history/tick').json<ApiCpuData>()
}
