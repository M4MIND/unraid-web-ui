export interface Stats {
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
