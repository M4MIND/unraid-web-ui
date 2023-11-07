import { create } from "zustand";
import { Api } from "../../service/api/api";

interface Stat {
  Stats: {
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
  Time: string;
}

interface IUseMemoryStore {
  data: Stat[];
  fetch: () => void;
}

const useMemoryHistoryStore = create<IUseMemoryStore>((set) => ({
  data: [],
  fetch: async () => {
    const response = await Api.get<Stat[]>("/memory/history");

    set({ data: response.data });
  },
}));

export default useMemoryHistoryStore;
