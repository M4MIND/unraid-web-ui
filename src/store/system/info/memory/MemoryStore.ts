import { create } from "zustand";
import { Api } from "../../../../service/api";

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
interface IUseMemoryStore {
  data: Root | null;
  fetch: () => void;
}

const useMemoryStore = create<IUseMemoryStore>((set) => ({
  data: null,
  fetch: async () => {
    const response = await Api.get<Root>("/v1/memory/tick");
    set({ data: response.data });
  },
}));

export default useMemoryStore;
