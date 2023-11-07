import {apiRootUrl, unraidApi} from '../common/base-api'

const basePath = '/memory'

const api = unraidApi.extend({
  prefixUrl: apiRootUrl + basePath
})

export interface Root {
  active: number;
  buffers: number;
  cached: number;
  commitlimit: number;
  committed_as: number;
  dirty: number;
  inactive: number;
  mapped: number;
  memfree: number;
  memtotal: number;
  memused: number;
  realfree: number;
  slab: number;
  swapcached: number;
  swapfree: number;
  swaptotal: number;
  swapused: number;
  writeback: number;
}

export interface Stat {
  stats: {
    active: number;
    buffers: number;
    cached: number;
    commitlimit: number;
    committed_as: number;
    dirty: number;
    inactive: number;
    mapped: number;
    memfree: number;
    memtotal: number;
    memused: number;
    realfree: number;
    slab: number;
    swapcached: number;
    swapfree: number;
    swaptotal: number;
    swapused: number;
    writeback: number;
  };
  time: string;
}

export const ApiMemory = {
  getHistory: () => api.get('history').json<Stat[]>(),
  getTick: () => api.get('tick').json<Stat>()
}
