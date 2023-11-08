import {apiRootUrl, unraidApi} from '../common/base-api'

const basePath = '/disks'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

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

export const ApiDisks = {
  getHistory: (): Promise<ApiDisksHistoryData[]> => api.get('history').json(),
  getTick: () => api.get('history/tick').json<ApiDisksHistoryData>()
}
