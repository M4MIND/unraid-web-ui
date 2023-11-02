import { create } from "zustand";
import { Api } from "../../../../service/api";

interface Root {
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

interface IUseMemoryStore {
  data: Root[];
  fetch: () => void;
}

const useMemoryHistoryStore = create<IUseMemoryStore>((set) => ({
  data: [
    {
      active: 18851068,
      buffers: 2668,
      cached: 49494272,
      commitlimit: 32864320,
      committed_as: 24128112,
      dirty: 784,
      inactive: 43221032,
      mapped: 1790040,
      memfree: 1192256,
      memtotal: 65728644,
      memused: 64536388,
      realfree: 50689196,
      slab: 1813156,
      swapcached: 0,
      swapfree: 0,
      swaptotal: 0,
      swapused: 0,
      writeback: 0,
    },
  ],
  fetch: async () => {
    const response = await Api.get<Root[]>("v1/memory/history");

    set({ data: response.data });
  },
}));

export default useMemoryHistoryStore;
